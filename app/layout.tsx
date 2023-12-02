import "tw-elements/dist/css/tw-elements.min.css";
import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/logo.jpg" />
			</head>
			<body>{children}</body>
		</html>
	);
}
