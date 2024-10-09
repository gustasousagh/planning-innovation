import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type RevealNumbersRequest = { roomId: Id<"rooms"> };
type ResponseNumberType = Boolean;
type RevealNumbersOptions = {
  onSuccess?: (res: ResponseNumberType) => void;
  onError?: () => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useRevealNumbers = () => {
  const [status, setStatus] = useState<
    "success" | "error" | "settled" | "pending" | null
  >(null);
  const [error, setError] = useState<Error | null>(null);

  const isPending = useMemo(() => status === "pending", [status]);
  const isSuccess = useMemo(() => status === "success", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);

  const mutation = useMutation(api.rooms.revealNumbers);

  const mutate = useCallback(
    async (values: RevealNumbersRequest, options?: RevealNumbersOptions) => {
      try {
        setError(null);
        setStatus("pending");

        const response = await mutation(values);
        setStatus("success");
        console.log(response)
        options?.onSuccess?.(response);
        return response;
      } catch (error) {
        setStatus("error");
        options?.onError?.();
        if (options?.throwError) {
          throw error;
        }
      } finally {
        setStatus("settled");
        options?.onSettled?.();
      }
    },
    [mutation]
  );

  return { mutate, error, isPending, isSuccess, isError, isSettled };
};
