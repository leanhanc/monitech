"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

/* Zod */
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* Date Picker */
import CurrencyInput from "react-currency-input-field";
import { DateFormatter, DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";

/* Styles */
import "react-day-picker/dist/style.css";
import "@frontend/lib/styles/date-picker.css";

/* Utils */
import { API } from "apps/frontend/lib/utils/fetchWraper";
import ROUTES from "@frontend/lib/utils/routes";
import { capitalizeFirstLetter } from "@frontend/lib/utils/formatting";

/* Components */
import Button from "@frontend/components/Button";

/* Server Actions */
import { createInvoice } from "@frontend/invoice/new/action";

export const newInvoiceformSchema = z.object({
	amount: z.string({ required_error: "Ingresá el importe de tu factura." }),
	date: z.date({ required_error: "Ingresá la fecha de tu factura." }),
});

export default function NewInvoiceForm() {
	/* Hooks */
	const [isPending, startTransition] = useTransition();
	const {
		handleSubmit,
		setValue,
		getValues,
		watch,
		formState: { errors },
	} = useForm<z.infer<typeof newInvoiceformSchema>>({
		resolver: zodResolver(newInvoiceformSchema),
	});
	const router = useRouter();

	async function onSubmit(data: z.infer<typeof newInvoiceformSchema>) {
		const amount = getValues("amount").replace(",", ".");
		const date = getValues("date").toISOString();

		startTransition(async () => {
			const action = await createInvoice({ amount, date });

			if (action?.result === "error") {
				// TODO: Fire error Toast
				return;
			}
			// TODO: Fire success Toast
			router.push(ROUTES.INVOICES.LIST);
		});
	}

	/* Renders */
	const formatCaption: DateFormatter = (date, options) => {
		return (
			<header>
				<h2 className="text-2xl font-bold text-slate-700">
					{format(date, "yyyy", { locale: options?.locale })}
				</h2>
				<p className="text-lg font-light text-slate-600">
					{capitalizeFirstLetter(
						format(date, "MMMM", { locale: options?.locale }),
					)}
				</p>
			</header>
		);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
			<div className="mt-6 flex flex-col gap-2">
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
					className="h-[132px] rounded-lg border border-indigo-600 bg-indigo-50 p-6 text-center text-3xl font-bold text-slate-700 placeholder:text-3xl placeholder:text-slate-700 placeholder:opacity-30 md:text-5xl md:placeholder:text-5xl lg:text-7xl lg:placeholder:text-7xl"
					onValueChange={(value) => {
						if (!value) return;
						setValue("amount", value);
					}}
				/>
				{errors.amount && (
					<p className="mt-2 text-red-700">{errors.amount.message}</p>
				)}
			</div>

			<div>
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
					selected={watch("date")}
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
	);
}
