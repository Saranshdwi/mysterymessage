import { Message } from "@/model/User";

export interface Apiresponse {
  success: boolean;
  message: string;
  isAcceptingMessage?: boolean;
  messages?: Array<Message>;
}