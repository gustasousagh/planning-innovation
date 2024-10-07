/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = {name: string};
type ResponseType = Id<"rooms"> | null;
type Options = {
  onSucess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  trowError?: boolean
}
export const useCreateRoom = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<"success" | "error" | "settled" | "pending" | null>(null);


  const isPending = useMemo(() => status === "pending", [status])
  const isSuccess = useMemo(() => status === "success", [status])
  const iserror = useMemo(() => status === "error", [status])
  const isSettled = useMemo(() => status === "settled", [status])


  const mutation = useMutation(api.rooms.createRoom);

  const mutate = useCallback(async (values: RequestType, options?: Options) => {
    try{
      setData(null);
      setError(null);
      setStatus("pending");
      const response = await mutation(values);
      options?.onSucess?.(response);
      return response;
    }catch(error) {
        options?.onError?.(error as Error);
        if(options?.trowError){
          throw error;
        }
    } finally {
      setStatus("settled")
        options?.onSettled?.()
    }
  }, [mutation]);
  return {
    mutate,
    data,
    error,
    isPending,
    isSuccess,
    isSettled,
    iserror
  }
}