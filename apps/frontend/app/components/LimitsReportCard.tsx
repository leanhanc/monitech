"use client";

import { ResponsivePie } from "@nivo/pie";
import NextLink from "next/link";

/* Icons */
import { ArrowRightIcon } from "lucide-react";

/* Components */
import Card from "@frontend/components/Card";
import Typography from "@frontend/components/Typography";

/* Types */
import { LimitsReport } from "@monitech/types";
import { WithClassName } from "apps/frontend/@types/Props";

/* Utils */
import ROUTES from "@frontend/lib/utils/routes";

interface LimitsReportCardProps extends WithClassName {
	limits: LimitsReport;
}

export default function LimitsReportCard({ limits }: LimitsReportCardProps) {
	/* Helpers */
	const currencyFormatter = new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
	});

	/* Helpers */

	return (
		<Card title="Reporte de Límites" className="relative mt-10 min-h-[820px]">
			<header>
				<h3 className="text-xl text-slate-600">Categoría H</h3>
			</header>
			<p className="mt-4">
				<span>{currencyFormatter.format(limits.ars)}</span> de{" "}
				{currencyFormatter.format(limits.limit)}
			</p>
			<div className="mt-4 h-60 w-full">
				<ResponsivePie
					colors={["#4f46e5", "#0f766e"]}
					tooltip={({ datum }) => (
						<p className="rounded-md bg-slate-200 px-4 py-2 font-medium">
							{datum.label}
						</p>
					)}
					valueFormat={(value) => currencyFormatter.format(value)}
					enableArcLinkLabels={false}
					theme={{ textColor: "#f1f5f9", fontSize: 14 }}
					data={[
						{
							id: "current",
							label: "Liquidado",
							value: limits.ars,
						},
						{
							id: "remaining",
							label: "Restante",
							value: (limits.limit - limits.ars).toFixed(2),
						},
					]}
				/>
			</div>

			<div className="mt-10 h-60 w-full">
				<header>
					<h3 className="mb-4 text-xl text-slate-600">Ingreso anual de USD</h3>
				</header>
				<p className="my-4">
					<span>{currencyFormatter.format(limits.usd)}</span> de $12.000
				</p>
				<ResponsivePie
					colors={["#4f46e5", "#0f766e"]}
					tooltip={({ datum }) => (
						<p className="rounded-md bg-slate-200 px-4 py-2 font-medium">
							{datum.label}
						</p>
					)}
					valueFormat={(value) => currencyFormatter.format(value)}
					enableArcLinkLabels={false}
					theme={{ textColor: "#f1f5f9", fontSize: 14 }}
					data={[
						{
							id: "current",
							label: "Liquidado",
							value: limits.usd,
						},
						{
							id: "remaining",
							label: "Restante",
							value: (12000 - limits.usd).toFixed(2),
						},
					]}
				/>
			</div>
		</Card>
	);
}
