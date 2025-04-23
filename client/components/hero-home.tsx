"use client";
import { ReactEventHandler, useState } from "react";
import VideoThumb from "@/public/images/hero-image-01.jpg";
import ModalVideo from "@/components/modal-video";

export default function HeroHome() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);

  const scrollToTestimonials = (e: any) => {
    e.preventDefault();
    const element = document.getElementById("planes");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openDemoModal = (e: any) => {
    e.preventDefault();
    setShowLoginModal(true);
  };

  const closeDemoModal = () => {
    setShowLoginModal(false);
    // Resetear estados de copiado al cerrar
    setEmailCopied(false);
    setPasswordCopied(false);
  };

  const redirectToDashboard = () => {
    window.open("https://dashboard.assetly.com.ar/", "_blank");
    setShowLoginModal(false);
  };

  const copyToClipboard = (text: string, type: "email" | "password") => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "email") {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      } else {
        setPasswordCopied(true);
        setTimeout(() => setPasswordCopied(false), 2000);
      }
    });
  };

  return (
    <section>
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        {/* Hero content */}
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-20">
            <h1
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl text-center"
              data-aos="fade-up"
            >
              <span className="block">Assetly</span>{" "}
              <span className="block mt-2 text-xl text-indigo-200 md:text-2xl">
                Tu forma segura y eficiente de gestionar tus activos
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="mb-8 text-xl text-indigo-200/65"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                Sistema integral para gestionar y hacer un seguimiento detallado
                de los activos, optimizando su control y depreciación.
              </p>
              <div className="max-w-xs mx-auto sm:flex sm:max-w-none sm:justify-center">
                <div data-aos="fade-up" data-aos-delay={400}>
                  <a
                    className="btn group mb-4 w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                    href="#"
                    onClick={openDemoModal}
                  >
                    <span className="relative inline-flex items-center">
                      Ver demo
                      <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                        -&gt;
                      </span>
                    </span>
                  </a>
                </div>
                <div data-aos="fade-up" data-aos-delay={600}>
                  <a
                    className="btn relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] sm:ml-4 sm:w-auto"
                    onClick={scrollToTestimonials}
                  >
                    <button>Ir a planes</button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <ModalVideo
            thumb={VideoThumb}
            thumbWidth={1104}
            thumbHeight={576}
            thumbAlt="Modal video thumbnail"
            video="videos//video.mp4"
            videoWidth={1920}
            videoHeight={1080}
          />
        </div>
      </div>

      {/* Modal de credenciales de acceso */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={closeDemoModal}
          ></div>
          <div className="relative w-full max-w-md p-8 mx-4 border border-gray-700 rounded-lg shadow-lg bg-gradient-to-b from-gray-900 to-gray-800">
            <button
              className="absolute text-gray-400 top-3 right-3 hover:text-gray-200"
              onClick={closeDemoModal}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <h3 className="mb-4 text-xl font-semibold text-transparent bg-gradient-to-r from-indigo-200 to-gray-200 bg-clip-text">
              Acceso a la demo
            </h3>
            <p className="mb-6 text-indigo-200/65">
              Para ingresar a la demo, utiliza las siguientes credenciales:
            </p>

            <div className="p-4 mb-6 border border-gray-700 rounded bg-gray-800/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400">Email:</span>
                <div className="flex items-center">
                  <span className="mr-2 font-medium text-indigo-200">
                    romer@gmail.com
                  </span>
                  <button
                    className="text-gray-400 transition-colors hover:text-indigo-300"
                    onClick={() => copyToClipboard("romer@gmail.com", "email")}
                    title="Copiar email"
                  >
                    {emailCopied ? (
                      <svg
                        className="w-5 h-5 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        ></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Contraseña:</span>
                <div className="flex items-center">
                  <span className="mr-2 font-medium text-indigo-200">
                    admin
                  </span>
                  <button
                    className="text-gray-400 transition-colors hover:text-indigo-300"
                    onClick={() => copyToClipboard("admin", "password")}
                    title="Copiar contraseña"
                  >
                    {passwordCopied ? (
                      <svg
                        className="w-5 h-5 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        ></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              className="w-full px-4 py-2 font-medium text-white transition duration-150 ease-in-out bg-gradient-to-t from-indigo-600 to-indigo-500 rounded shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] group"
              onClick={redirectToDashboard}
            >
              <span className="relative inline-flex items-center justify-center w-full">
                Ir al dashboard
                <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                  -&gt;
                </span>
              </span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
