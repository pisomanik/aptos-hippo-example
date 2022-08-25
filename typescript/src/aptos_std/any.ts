import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Std from "../std";
import * as Type_info from "./type_info";
export const packageName = "AptosStdlib";
export const moduleAddress = new HexString("0x1");
export const moduleName = "any";

export const ETYPE_MISMATCH : U64 = u64("0");


export class Any 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "Any";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "type_name", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "data", typeTag: new VectorTag(AtomicTypeTag.U8) }];

  type_name: Std.String.String;
  data: U8[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.type_name = proto['type_name'] as Std.String.String;
    this.data = proto['data'] as U8[];
  }

  static AnyParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Any {
    const proto = $.parseStructProto(data, typeTag, repo, Any);
    return new Any(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "Any", []);
  }
  async loadFullState(app: $.AppType) {
    await this.type_name.loadFullState(app);
    this.__app = app;
  }

}
export function from_bytes_ (
  bytes: U8[],
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): any {
  return $.aptos_std_any_from_bytes(bytes, $c, [$p[0]]);

}
export function pack_ (
  x: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): Any {
  return new Any({ type_name: Type_info.type_name_($c, [$p[0]]), data: Std.Bcs.to_bytes_(x, $c, [$p[0]]) }, new SimpleStructTag(Any));
}

export function type_name_ (
  x: Any,
  $c: AptosDataCache,
): Std.String.String {
  return x.type_name;
}

export function unpack_ (
  x: Any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): any {
  if (!$.deep_eq(Type_info.type_name_($c, [$p[0]]), $.copy(x.type_name))) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(ETYPE_MISMATCH), $c));
  }
  return from_bytes_($.copy(x.data), $c, [$p[0]]);
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::any::Any", Any.AnyParser);
}
export class App {
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
    public cache: AptosLocalCache,
  ) {
  }
  get moduleAddress() {{ return moduleAddress; }}
  get moduleName() {{ return moduleName; }}
  get Any() { return Any; }
}

