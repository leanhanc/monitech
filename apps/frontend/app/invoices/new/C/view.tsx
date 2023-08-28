"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";
import { DateFormatter, DayPicker } from "react-day-picker";
import { format } from "date-fns/esm";
import { es } from "date-fns/locale";

/* Validations */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* Utils */
import { capitalizeFirstLetter } from "@frontend/lib/utils/formatting";

/* Components */
import Button from "@frontend/components/Button";
import Container from "@frontend/components/Container";
import Typography from "@frontend/components/Typography";

/* Server Actions */
import { createInvoice } from "@frontend/invoices/new/action";

/* Styles */
import "react-day-picker/dist/style.css";
import "@frontend/lib/styles/date-picker.css";

export const invoiceCSchema = z.object({
	amount: z.string({ required_error: "Ingresá el importe de tu factura." }),
	date: z.date({ required_error: "Ingresá la fecha de tu factura." }),
});

export default function NewCInvoiceView() {
	/* Hooks */
	const [isPending, startTransition] = useTransition();
	const {
		handleSubmit,
		setValue,
		getValues,
		watch,
		formState: { errors },
	} = useForm<z.infer<typeof invoiceCSchema>>({
		resolver: zodResolver(invoiceCSchema),
	});

	/* Handlers */
	async function onSubmit(_data: z.infer<typeof invoiceCSchema>) {
		const amount = getValues("amount").replace(",", ".");
		const date = getValues("date").toISOString();

		startTransition(async () => {
			const action = await createInvoice({ amount, date, type: "C" });

			if (action?.result === "error") {
				// TODO: Fire error Toast
				return;
			}
			// TODO: Fire success Toast
			alert("Factura Cargada!");
		});
	}

	/* Helpers */
	const formatCaption: DateFormatter = (date, options) => {
		return (
			<header>
				<h2 className="text-lg font-bold text-slate-700">
					{format(date, "yyyy", { locale: options?.locale })}
				</h2>
				<p className="text-base font-medium text-slate-600">
					{capitalizeFirstLetter(
						format(date, "MMMM", { locale: options?.locale }),
					)}
				</p>
			</header>
		);
	};

	/* Watchers */
	const currentDate = watch("date");

	return (
		<Container as="main">
			<header>
				<Typography.Title variant="main" as="h1">
					Factura C 🧾
				</Typography.Title>
				<Typography.Paragraph
					variant="long-subheading"
					as="p"
					className="mt-6 max-w-xl"
				>
					Cargá los datos de tu nueva factura. El importe que ingreses lo
					usaremos para ayudarte con las recategorizaciones y que nunca te pases
					del límite del régimen del monotributo.
					{/* <br /> Si el monto de la factura lo liquidaste en USD (recibiste los 💵
                    en tu cuenta en USD sin pesificar), se descontará automáticamente el
                    monto del cupo anual. */}
				</Typography.Paragraph>
			</header>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
				{/* Monto */}
				<div className="mt-6 flex flex-col">
					<label
						className="text-bold mt-6 text-xl font-bold text-indigo-900"
						htmlFor="monto"
					>
						Monto
					</label>
					<CurrencyInput
						id="monto"
						placeholder="$0,00"
						decimalsLimit={2}
						prefix="$"
						allowNegativeValue={false}
						decimalSeparator=","
						groupSeparator="."
						className="mt-2 h-[132px] w-1/2 rounded-lg border border-indigo-600 bg-indigo-50 p-6 text-center text-3xl font-bold text-slate-700 placeholder:text-3xl placeholder:text-slate-700 placeholder:opacity-30 md:text-5xl md:placeholder:text-5xl lg:text-7xl lg:placeholder:text-7xl"
						onValueChange={(value) => {
							if (!value) return;
							setValue("amount", value);
						}}
					/>
					{errors.amount && (
						<p className="mt-2 text-red-700">{errors.amount.message}</p>
					)}
				</div>

				{/* Fecha */}
				<div className="mt-6">
					<label
						className="text-bold text-xl font-bold text-indigo-900"
						htmlFor="fecha"
					>
						Fecha
					</label>
					<DayPicker
						id="fecha"
						showOutsideDays
						fixedWeeks
						mode="single"
						required
						selected={currentDate}
						onSelect={(date) => {
							if (!date) return;
							setValue("date", date);
						}}
						locale={es}
						formatters={{
							formatCaption: formatCaption,
						}}
					/>
					{errors.date && (
						<p className="mt-2 text-red-700">{errors.date.message}</p>
					)}
				</div>

				<footer className="flex justify-end gap-1">
					<Button
						variant="ghost"
						size="sm"
						color="primary"
						className="text-indigo-800"
						type="button"
					>
						Simular
					</Button>
					<Button size="sm" type="submit" disabled={isPending}>
						{isPending ? "Enviando..." : "Enviar"}
					</Button>
				</footer>
			</form>
		</Container>
	);
}
