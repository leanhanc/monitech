import CurrencyInput from "react-currency-input-field";
import { UseFormSetValue } from "react-hook-form";

interface NewInvoiceFormAmountStepProps {
	setValue: UseFormSetValue<{ amount: string }>;
}

export default function NewInvoiceFormAmountStep({
	setValue,
}: NewInvoiceFormAmountStepProps) {
	return (
		<p className="mt-6 flex flex-col gap-2">
			<label
				className="text-bold mt-6 text-lg font-bold text-slate-700"
				htmlFor="monto"
			>
				Monto
			</label>
			<CurrencyInput
				id="monto"
				placeholder="$0,00"
				decimalsLimit={2}
				onValueChange={(value) => {
					if (!value) return;
					setValue("amount", value);
				}}
				prefix="$"
				allowNegativeValue={false}
				decimalSeparator=","
				groupSeparator="."
				className="h-[132px] w-[280px] max-w-full rounded-lg border border-indigo-600 bg-indigo-50 p-6 text-center text-3xl font-bold text-slate-700 placeholder:text-3xl placeholder:text-slate-700 placeholder:opacity-30 md:w-auto md:text-5xl md:placeholder:text-5xl lg:text-7xl lg:placeholder:text-7xl"
			/>
		</p>
	);
}
