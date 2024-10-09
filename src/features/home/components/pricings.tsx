import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

interface iAppProps {
  id: number;
  cardTitle: string;
  cardDescription: string;
  priceTitle: string;
  benefits: string[];
}

export const PricingPlans: iAppProps[] = [
  {
    id: 0,
    cardTitle: "Iniciante",
    cardDescription:
      "O plano ideal para quem está começando a usar estimativas.",
    benefits: [
      "1 Sala de Estimativa",
      "Até 5 Jogadores por Sala",
      "1 Líder por Sala",
      "Histórico de Estimativas Limitado",
      "Estimativas em Pontos e Horas",
    ],
    priceTitle: "Gratuito",
  },
  {
    id: 1,
    cardTitle: "Profissional",
    cardDescription: "O plano perfeito para equipes que desejam crescer.",
    priceTitle: "R$ 19",
    benefits: [
      "Salas Ilimitadas",
      "Jogadores Ilimitados",
      "Líderes Ilimitados",
      "Histórico de Estimativas Ilimitado",
      "Acesso a Funcionalidades Avançadas",
      "Suporte Prioritário",
      "Convites para Membros da Equipe",
    ],
  },
];

export function PricingTable() {
  return (
    <>
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-semibold text-primary">Planos de Preço</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Planos de Estimativas para todas as equipes e orçamentos!
        </h1>
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center leading-tight text-muted-foreground">
        Seja você um iniciante ou um profissional, temos o plano ideal para sua
        equipe realizar estimativas de pontos e horas com facilidade e
        agilidade.
      </p>

      <div className="grid grid-cols-1 gap-8 mt-16 lg:grid-cols-2">
        {PricingPlans.map((item) => (
          <Card key={item.id} className={item.id === 1 ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>
                {item.id === 1 ? (
                  <div className="flex items-center justify-between">
                    <h3 className="text-primary">Profissional</h3>

                    <p className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold leading-5 text-primary">
                      Mais Popular
                    </p>
                  </div>
                ) : (
                  <>{item.cardTitle}</>
                )}
              </CardTitle>
              <CardDescription>{item.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mt-6 text-4xl font-bold tracking-tight">
                {item.priceTitle}
              </p>

              <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                {item.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-x-3">
                    <Check className="text-primary size-5" />

                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {item.id === 1 ? (
                <form className="w-full">
                  <Button className="mt-5 w-full">Comprar Plano</Button>
                </form>
              ) : (
                <Button variant="outline" className="mt-5 w-full" asChild>
                  <Link href="/dashboard">Experimente Gratuitamente</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
