export const metadata = {
  title: 'Eftekar Hossen | Software Engineer',
  description: 'Portfolio of Eftekar Hossen - Software Engineer building innovative solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
