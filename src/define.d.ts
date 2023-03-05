import type { Button } from "./tl/custom/button.ts";
import { Api } from "./tl/mod.ts";
import type { CustomFile } from "./client/uploads.ts";
import TypeUser = Api.TypeUser;
import TypeChat = Api.TypeChat;
import TypeInputUser = Api.TypeInputUser;
import TypeInputChannel = Api.TypeInputChannel;
import bigInt from "npm:big-integer";
import { WriteStream } from "node:fs";
import { Buffer } from "node:buffer";

type ValueOf<T> = T[keyof T];
type Phone = string;
type Username = string;
type PeerID = number;
type Entity = Api.User | Api.Chat | Api.Channel | TypeUser | TypeChat;
type FullEntity =
  | Api.UserFull
  | Api.messages.ChatFull
  | Api.ChatFull
  | Api.ChannelFull;
type PeerLike = Api.TypePeer | Api.TypeInputPeer | Entity | FullEntity;
type EntityLike =
  | bigInt.BigInteger
  | Phone
  | Username
  | PeerID
  | Api.TypePeer
  | Api.TypeInputPeer
  | Entity
  | FullEntity
  | TypeUser
  | TypeChat
  | TypeInputChannel
  | TypeInputUser;

type EntitiesLike = EntityLike[];
type MessageIDLike =
  | number
  | Api.Message
  | Api.MessageService
  | Api.TypeInputMessage;
type MessageLike = string | Api.Message;

type LocalPath = string;
type ExternalUrl = string;
type BotFileID = string;

type FileLike =
  | LocalPath
  | ExternalUrl
  | BotFileID
  | Buffer
  | Api.TypeMessageMedia
  | Api.TypeInputMedia
  | Api.TypeInputFile
  | Api.TypeInputFileLocation
  | File
  | Api.TypePhoto
  | Api.TypeDocument
  | CustomFile;
type OutFile =
  | string
  | Buffer
  | WriteStream
  | { write: Function; close?: Function };
type ProgressCallback = (
  total: bigInt.BigInteger,
  downloaded: bigInt.BigInteger,
) => void;
type ButtonLike = Api.TypeKeyboardButton | Button;

type MarkupLike =
  | Api.TypeReplyMarkup
  | ButtonLike
  | ButtonLike[]
  | ButtonLike[][];
type DateLike = number;
