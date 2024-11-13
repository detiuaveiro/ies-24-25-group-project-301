import { User, X, AtSign } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
  setCompanyName: (name: string) => void;
  setCompanyEmail: (email: string) => void;
  setCompanyPassword: (password: string) => void;
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setCompanyName,
  setCompanyEmail,
  setCompanyPassword,
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Registar conta</h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={closeConfirmTripModal} />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
          Vamos embarcar e projetar a tua viagem ao espaço!
          </p>
        </div>
        
        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              type="text"
              name="name"
              placeholder="Nome completo da empresa"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={event => setCompanyName(event.target.value)}
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="E-mail da empresa"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={event => setCompanyEmail(event.target.value)}
            />
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              type="password"
              name="password"
              placeholder="Password da empresa"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={event => setCompanyPassword(event.target.value)}
            />
          </div>

          <Button type="submit" size="full">
            Confirmar conta
          </Button>
        </form>
      </div>
    </div>
  )
}