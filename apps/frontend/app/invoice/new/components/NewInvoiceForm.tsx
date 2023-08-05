"use client";
import { useForm } from "react-hook-form";

/* Zod */
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* Steps */
import NewInvoiceFormAmountStep from "@frontend/invoice/new/components/NewInvoiceFormAmountStep";

/* Components */
import Button from "@frontend/components/Button";
import { useState } from "react";

export const newInvoiceformSchema = z.object({
	amount: z.string({ required_error: "Ingresá un importe de la factura." }),
});

type STEP = "AMOUNT" | "DATE";

const STEPS = {
	AMOUNT: {
		prev: false,
		next: "DATE",
		Component: NewInvoiceFormAmountStep,
	},
	DATE: {
		prev: "AMOUNT",
		next: false,
		Component: NewInvoiceFormAmountStep,
	},
} as const;

export default function NewInvoiceForm() {
	const [currentStep, setCurrentStep] = useState<STEP>("AMOUNT");

	/* Derived State */
	const StepComponent = STEPS[currentStep].Component;
	const hasPrevStep = STEPS[currentStep].prev;
	const hasNextStep = STEPS[currentStep].next;

	/* Hooks */
	const { handleSubmit, setValue, getValues } = useForm<
		z.infer<typeof newInvoiceformSchema>
	>({
		resolver: zodResolver(newInvoiceformSchema),
	});

	/* Handlers */
	function handleGoToNextStep() {
		setCurrentStep(STEPS[currentStep].next as STEP);
	}

	function handleGoToPrevStep() {
		setCurrentStep(STEPS[currentStep].prev as STEP);
	}

	function onSubmit(data: z.infer<typeof newInvoiceformSchema>) {
		const parsedAmount = parseFloat(getValues("amount").replace(",", "."));
		console.log({ parsedAmount });
	}

	return (
		<article>
			<form onSubmit={handleSubmit(onSubmit)}>
				<StepComponent setValue={setValue} />

				<footer className="flex justify-end gap-1">
					{hasPrevStep && (
						<Button
							className="mt-16"
							type="button"
							size="sm"
							variant="ghost"
							onClick={handleGoToPrevStep}
						>
							Anterior
						</Button>
					)}

					<Button
						className="mt-16"
						type={hasNextStep ? "button" : "submit"}
						size="sm"
						onClick={() => hasNextStep && handleGoToNextStep()}
					>
						Siguiente
					</Button>
				</footer>
			</form>
		</article>
	);
}
