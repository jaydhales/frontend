import type { TCreateVaultFields } from "@/lib/types";

interface Props {
  setError: (e: string) => void;
  formData: TCreateVaultFields;
}
export function useCheckValidityCreactVault({ formData }: Props) {
  if (!formData.leverageTier || !formData.longToken || !formData.versusToken) {
    return;
  }

  if (formData.leverageTier) {
  }
}
