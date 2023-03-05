/**
 * Converts a Telegram's RPC Error to a Python error.
 * @param rpcError the RPCError instance
 * @param request the request that caused this error
 * @constructor the RPCError as a Python exception that represents this error
 */
import { Api } from "../tl/mod.ts";

import { RPCError } from "./RPCBaseErrors.ts";
import { rpcErrorRe } from "./RPCErrorList.ts";

export function RPCMessageToError(
  rpcError: Api.RpcError,
  request: Api.AnyRequest,
) {
  for (const [msgRegex, Cls] of rpcErrorRe) {
    const m = rpcError.errorMessage.match(msgRegex);
    if (m) {
      const capture = m.length === 2 ? parseInt(m[1]) : null;
      return new Cls({ request: request, capture: capture });
    }
  }
  return new RPCError(rpcError.errorMessage, request, rpcError.errorCode);
}

export * from "./Common.ts";
export * from "./RPCBaseErrors.ts";
export * from "./RPCErrorList.ts";
