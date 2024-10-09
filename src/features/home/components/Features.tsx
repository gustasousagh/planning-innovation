import { UserPlus, Rocket, ShieldCheck, Smile } from "lucide-react";

const features = [
  {
    name: "Cadastre-se gratuitamente",
    description:
      "Comece a usar nossa ferramenta agora mesmo sem custo inicial e descubra como as estimativas podem ser simples e rápidas.",
    icon: UserPlus,
  },
  {
    name: "Extremamente ágil",
    description:
      "Realize estimativas de pontos Scrum de forma rápida, permitindo que sua equipe se concentre no que realmente importa: entregar valor.",
    icon: Rocket,
  },
  {
    name: "Super seguro",
    description:
      "Todas as informações são protegidas com as melhores práticas de segurança, garantindo que seus dados estejam sempre seguros.",
    icon: ShieldCheck,
  },
  {
    name: "Fácil de usar",
    description:
      "Uma interface intuitiva que qualquer pessoa na sua equipe pode usar facilmente, promovendo colaboração e alinhamento.",
    icon: Smile,
  },
];

export function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold leading-7 text-primary">
          Marque Pontos Rápido
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Faça suas estimativas em minutos
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          Com nossa ferramenta, você e sua equipe podem fazer estimativas de
          pontos Scrum de maneira rápida e prática, permitindo que o foco esteja
          sempre na entrega de valor.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-semibold leading-7">
                <div className="absolute text-primary left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-white">
                  <feature.icon className="w-6 h-6 text-black" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
