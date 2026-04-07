import { STRAPI_BASE_URL } from "@/lib/strapi";

export function HeroSection({ data }: {
  readonly data: {
    heading: string; subheading: string; image: { url: string; alternativeText: string };
    link: { href: string; url: string; text: string }
  }
}) {
  if (!data) return null;

  const { heading, subheading, image, link } = data;
  const imageUrl = image.url.startsWith("http")
    ? image.url
    : `${STRAPI_BASE_URL}${image.url}`;
  //Crear section con imagen como fondo y texto encima
  return (
    <section
      className="relative bg-cover bg-center h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
     
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative text-center text-white p-4">
        <h1 className="text-4xl font-bold mb-4">{heading}</h1>
        <p className="text-lg mb-6">{subheading}</p>
        {link && (
          <a
            href={link.href}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {link.url || "Iniciá Sesión"}
          </a>
        )}
      </div>
    </section>
  );
}
