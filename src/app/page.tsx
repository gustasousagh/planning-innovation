"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg";
import Background from "./background";
import { NavBar } from "@/features/navbar/navbar";

const HomeScreen = () => {
    return (
        <div className="relative min-h-screen">
            <Background />
            <div className="relative z-10 max-w-[1800px] mx-auto px-0">
                <NavBar />
                <section className="  mb-24">
                    <div className="pt-5 max-w-3xl mx-auto text-3xl lg:text-6xl font-semibold text-center space-y-4">
                        <div>
                            <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 px-2 py-1 rounded-full">
                                Transforme Suas Ideias em Realidade
                            </span>
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Encontre Projetos Prontos{" "}
                                <span className="text-blue-600 text-3xl sm:text-5xl">
                                    Impulsione Seu Negócio
                                </span>
                                .
                            </h1>
                        </div>
                        <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-sm">
                            oferecemos os melhores projetos prontos para compra e uso imediato,
                            simplificando sua jornada de criação e acelerando o sucesso do seu
                            negócio. Compre, personalize e implemente rapidamente para ganhar uma
                            vantagem competitiva.
                        </p>
                    </div>
                    <div className="px-6 pt-6 items-center flex justify-center md:mb-0">
                        {/* <SearchInput /> */}
                    </div>
                    <div className="p-6 space-y-4 ">
                        {/* <Categories
          items={categories || []}
          onSelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        /> */}
                        {/* <ProjetosList projects={projects} selectedCategory={selectedCategory} purchasedProjectIds={purchasedProjectIds} 
        /> */}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomeScreen;
