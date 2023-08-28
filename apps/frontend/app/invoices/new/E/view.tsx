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

export const invoiceESchema = z.object({
	amount: z.string({ required_error: "Ingresá el importe de tu factura." }),
	date: z.date({ required_error: "Ingresá la fecha de tu factura." }),
	exchangeCurrency: z.enum(["ARS", "USD"]),
	exchangeRate: z.string(),
});

export default function NewEInvoiceView() {
	/* Hooks */
	const [isPending, startTransition] = useTransition();
	const {
		handleSubmit,
		register,
		setValue,
		getValues,
		watch,
		formState: { errors },
	} = useForm<z.infer<typeof invoiceESchema>>({
		resolver: zodResolver(invoiceESchema),
		defaultValues: {
			exchangeCurrency: "ARS",
		},
	});

	/* Handlers */
	function onSimulate() {
		const amount = parseFloat(getValues("amount").replace(",", "."));
		const exchangeRate = parseFloat(
			getValues("exchangeRate").replace(",", "."),
		);

		const finalAmount = amount * exchangeRate;

		if (!finalAmount) {
			return;
		}

		alert(`Vas a cargar una factura por $${finalAmount.toFixed(2)}`);
	}

	async function onSubmit(data: z.infer<typeof invoiceESchema>) {
		const amount = parseFloat(getValues("amount").replace(",", "."));
		const exchangeRate = parseFloat(
			getValues("exchangeRate").replace(",", "."),
		);

		const finalAmount = amount * exchangeRate;

		startTransition(async () => {
			const action = await createInvoice({
				amount: finalAmount.toFixed(2),
				exchangeCurrency: data.exchangeCurrency,
				foreignCurrencyAmount: amount.toFixed(2),
				date: data.date.toISOString(),
				type: "E",
			});

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
					Factura E 🧾
				</Typography.Title>
				<Typography.Paragraph
					variant="long-subheading"
					as="p"
					className="mt-6 max-w-xl"
				>
					Cargá los datos de tu nueva factura. Ingresá el valor en moneda
					extranjera que facturaste y el valor del tipo de cambio al cual se
					realizó la facturación (este dato figura en tu factura E bajo la
					leyenda &quot;Tipo de Cambio&quot;).
					<br /> Si el monto de la factura lo liquidaste en USD (recibiste los
					💵 en tu cuenta en USD sin pesificar), se descontará automáticamente
					el monto del cupo anual.
				</Typography.Paragraph>
			</header>

			<form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
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

				{/* Liquidación */}
				<div className="mt-6 flex flex-col gap-2">
					<p className="text-bold  block text-xl font-bold text-indigo-900">
						Liquidación
					</p>
					<div className="flex gap-4">
						<label htmlFor="currency-ars">Pesos</label>
						<input
							{...register("exchangeCurrency")}
							type="radio"
							id="exchange-currency-ars"
							value="ARS"
							className="relative top-[3.5px] mr-6 h-4 w-4 border-slate-300 bg-slate-100 text-indigo-600 focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:ring-offset-slate-800 dark:focus:ring-indigo-600"
						/>
						<label htmlFor="currency-usd">Dólares</label>
						<input
							type="radio"
							id="exchange-currency-usd"
							value="USD"
							className="relative top-[3.5px] h-4 w-4 border-slate-300 bg-slate-100 text-indigo-600 focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:ring-offset-slate-800 dark:focus:ring-indigo-600"
							{...register("exchangeCurrency")}
						/>
					</div>
				</div>

				{/* Amount */}
				<div className="mt-6 flex max-w-full flex-row gap-4">
					<div className="flex w-1/2 flex-col gap-2">
						<label
							className="text-bold text-xl font-bold text-indigo-900"
							htmlFor="amount"
						>
							Monto en moneda extranjera
						</label>

						<CurrencyInput
							id="amount"
							placeholder="$0,00"
							decimalsLimit={2}
							prefix="$"
							allowNegativeValue={false}
							decimalSeparator=","
							groupSeparator="."
							className="mt-2 rounded-lg border border-indigo-600 bg-indigo-50 p-6 text-center text-3xl font-bold text-slate-700 placeholder:text-3xl placeholder:text-slate-700 placeholder:opacity-30 md:text-5xl md:placeholder:text-5xl lg:text-7xl lg:placeholder:text-7xl"
							onValueChange={(value) => {
								if (!value) return;
								setValue("amount", value);
							}}
						/>
					</div>

					{/* Rate */}
					<div className=" flex w-1/2 flex-col gap-2">
						<label
							className="text-bold text-xl font-bold text-indigo-900"
							htmlFor="exchange-rate"
						>
							Valor de cambio
						</label>
						<CurrencyInput
							id="exchange-rate"
							placeholder="$0,00"
							decimalsLimit={2}
							prefix="$"
							allowNegativeValue={false}
							decimalSeparator=","
							groupSeparator="."
							className="mt-2 rounded-lg border border-indigo-600 bg-indigo-50 p-6 text-center text-3xl font-bold text-slate-700 placeholder:text-3xl placeholder:text-slate-700 placeholder:opacity-30 md:text-5xl md:placeholder:text-5xl lg:text-7xl lg:placeholder:text-7xl"
							onValueChange={(value) => {
								if (!value) return;
								setValue("exchangeRate", value);
							}}
						/>
					</div>

					{errors.amount && (
						<p className="mt-2 text-red-700">{errors.amount.message}</p>
					)}
				</div>

				<footer className="mt-12 flex justify-end gap-1">
					<Button
						variant="ghost"
						size="sm"
						color="primary"
						className="text-indigo-800"
						type="button"
						onClick={onSimulate}
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
