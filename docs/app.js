var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});

// node_modules/zod/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class _ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// node_modules/zod/v3/locales/en.js
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var en_default = errorMap;

// node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}

// node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

// node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {
      } else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = /* @__PURE__ */ Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new _ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: ((arg) => ZodString.create({ ...arg, coerce: true })),
  number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
  boolean: ((arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  })),
  bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
  date: ((arg) => ZodDate.create({ ...arg, coerce: true }))
};
var NEVER = INVALID;

// src/contracts/validate.ts
var sourceTypeSchema = external_exports.enum([
  "user-provided",
  "published",
  "assumption",
  "illustrative",
  "unknown"
]);
var statusSchema = external_exports.enum(["provisional", "verified-for-stated-use", "unknown"]);
var provenanceSchema = external_exports.object({
  sourceType: sourceTypeSchema,
  source: external_exports.string().min(1),
  date: external_exports.string().nullable(),
  geography: external_exports.string().min(1),
  uncertainty: external_exports.string().nullable(),
  status: statusSchema
});
var numericValueSchema = external_exports.object({
  value: external_exports.number().nullable(),
  unit: external_exports.string().min(1),
  provenance: provenanceSchema
});
var halfMonthPattern = /^(0[1-9]|1[0-2])H[12]$/;
var windowSchema = external_exports.object({
  start: external_exports.string().regex(halfMonthPattern, 'expected half-month id like "10H1"'),
  end: external_exports.string().regex(halfMonthPattern, 'expected half-month id like "10H2"'),
  provenance: provenanceSchema
});
var farmPackSchema = external_exports.object({
  pack: external_exports.literal("farm"),
  version: external_exports.string().min(1),
  formatVersion: external_exports.literal(1),
  entries: external_exports.record(
    external_exports.object({
      id: external_exports.string().min(1),
      name: external_exports.string().min(1),
      areaHa: numericValueSchema,
      soilCategory: external_exports.string().nullable().optional(),
      synthetic: external_exports.literal(true)
    })
  )
});
var cropPackSchema = external_exports.object({
  pack: external_exports.literal("crops"),
  version: external_exports.string().min(1),
  formatVersion: external_exports.literal(1),
  entries: external_exports.record(
    external_exports.object({
      id: external_exports.string().min(1),
      name: external_exports.string().min(1),
      baseYield: numericValueSchema,
      relativeYield: external_exports.object({ cropId: external_exports.string().min(1), multiplier: numericValueSchema }).nullable().optional(),
      pricePerTonne: numericValueSchema,
      supportPerHa: numericValueSchema.nullable().optional(),
      variableCostsPerHa: external_exports.array(
        external_exports.object({ item: external_exports.string().min(1), cost: numericValueSchema })
      ),
      harvestWindow: windowSchema.nullable().optional()
    })
  )
});
var operationsPackSchema = external_exports.object({
  pack: external_exports.literal("operations"),
  version: external_exports.string().min(1),
  formatVersion: external_exports.literal(1),
  entries: external_exports.array(
    external_exports.object({
      id: external_exports.string().min(1),
      cropId: external_exports.string().min(1),
      establishmentVariant: external_exports.string().min(1),
      operations: external_exports.array(
        external_exports.object({
          id: external_exports.string().min(1),
          name: external_exports.string().min(1),
          machineSetId: external_exports.string().min(1),
          workRateHaPerH: numericValueSchema,
          passes: external_exports.number().int().positive(),
          labourPersons: external_exports.number().positive(),
          window: windowSchema,
          strawRelated: external_exports.boolean(),
          fuelLPerHa: numericValueSchema.nullable().optional()
        })
      )
    })
  )
});
var chargesPackSchema = external_exports.object({
  pack: external_exports.literal("charges"),
  version: external_exports.string().min(1),
  formatVersion: external_exports.literal(1),
  entries: external_exports.array(
    external_exports.object({
      machineSetId: external_exports.string().min(1).optional(),
      cropId: external_exports.string().min(1).optional(),
      basis: external_exports.enum(["own-equipment", "contractor", "hybrid"]),
      chargePerHa: numericValueSchema,
      note: external_exports.string().optional()
    }).refine(
      (entry) => Boolean(entry.machineSetId) !== Boolean(entry.cropId),
      "charge entry must set exactly one of machineSetId or cropId"
    )
  )
});
var scenarioSchema = external_exports.object({
  id: external_exports.string().min(1),
  name: external_exports.string().min(1),
  farmId: external_exports.string().min(1),
  areaHa: external_exports.number().positive(),
  baseline: external_exports.boolean(),
  previousCropId: external_exports.string().nullable().optional(),
  years: external_exports.array(
    external_exports.object({
      cropId: external_exports.string().min(1),
      establishmentVariant: external_exports.string().min(1)
    })
  ).min(1),
  yieldOverridesPerHa: external_exports.record(external_exports.object({ value: external_exports.number(), provenance: provenanceSchema })).optional(),
  yieldModifiers: external_exports.array(
    external_exports.object({
      precedingCropId: external_exports.string().min(1),
      cropId: external_exports.string().min(1),
      type: external_exports.enum(["percent", "t_per_ha"]),
      value: external_exports.number(),
      provenance: provenanceSchema
    })
  ).optional()
});
function parseWith(schema, raw, label) {
  const result = schema.safeParse(raw);
  if (!result.success) {
    const details = result.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`).join("; ");
    throw new Error(`${label}: invalid data: ${details}`);
  }
  return result.data;
}
function parsePacks(raw) {
  const farm = parseWith(farmPackSchema, raw.farm, "farm pack");
  const crops2 = parseWith(cropPackSchema, raw.crops, "crops pack");
  const operations = parseWith(operationsPackSchema, raw.operations, "operations pack");
  const charges = parseWith(chargesPackSchema, raw.charges, "charges pack");
  return {
    farm: {
      version: farm.version,
      entries: farm.entries
    },
    crops: {
      version: crops2.version,
      entries: crops2.entries
    },
    operations: {
      version: operations.version,
      entries: operations.entries
    },
    charges: {
      version: charges.version,
      entries: charges.entries
    }
  };
}
function parseScenario(raw, label) {
  return parseWith(scenarioSchema, raw, label);
}

// src/engine/m1.ts
function resolveRotation(scenario, crops2) {
  const problems = [];
  if (!(scenario.areaHa > 0) || !Number.isFinite(scenario.areaHa)) {
    problems.push(`${scenario.id}: area must be a positive number of hectares`);
  }
  if (scenario.years.length === 0) {
    problems.push(`${scenario.id}: rotation contains no years`);
  }
  if (scenario.previousCropId && !crops2[scenario.previousCropId]) {
    problems.push(
      `${scenario.id}: previous crop '${scenario.previousCropId}' is not in the crop pack`
    );
  }
  const years = scenario.years.map((year, index) => {
    if (!crops2[year.cropId]) {
      problems.push(`${scenario.id}: year ${index + 1} uses unknown crop '${year.cropId}'`);
    }
    const predecessorCropId = index === 0 ? scenario.previousCropId ?? null : scenario.years[index - 1]?.cropId ?? null;
    return {
      yearIndex: index,
      cropId: year.cropId,
      establishmentVariant: year.establishmentVariant,
      predecessorCropId
    };
  });
  return { years, problems };
}

// src/engine/m2.ts
function expandOperations(years, sets) {
  const problems = [];
  const results = years.map((year) => {
    const set = sets.find(
      (candidate) => candidate.cropId === year.cropId && candidate.establishmentVariant === year.establishmentVariant
    );
    if (!set) {
      problems.push(
        `no operation set for crop '${year.cropId}' with establishment '${year.establishmentVariant}' (year ${year.yearIndex + 1})`
      );
      return { ...year, operationSetId: null, operations: [] };
    }
    return { ...year, operationSetId: set.id, operations: set.operations };
  });
  return { results, problems };
}

// src/contracts/state.ts
function ok(value) {
  return { status: "ok", value };
}
function missing(...reasons) {
  return { status: "missing", reasons };
}

// src/engine/periods.ts
var pattern = /^(0[1-9]|1[0-2])H([12])$/;
function parsePeriodId(id) {
  const match = pattern.exec(id);
  if (!match) return null;
  const month = Number(match[1]);
  const half = match[2] === "1" ? 1 : 2;
  return { month, half, index: (month - 1) * 2 + (half - 1) };
}
function formatPeriodIndex(index) {
  if (!Number.isInteger(index) || index < 0 || index > 23) {
    throw new Error(`half-month index out of range: ${index}`);
  }
  const month = Math.floor(index / 2) + 1;
  const half = index % 2 === 0 ? 1 : 2;
  return `${String(month).padStart(2, "0")}H${half}`;
}
function expandWindow(start, end) {
  const from = parsePeriodId(start);
  const to = parsePeriodId(end);
  if (!from) throw new Error(`invalid start half-month id: "${start}"`);
  if (!to) throw new Error(`invalid end half-month id: "${end}"`);
  if (to.index < from.index) {
    throw new Error(`operation window ends before it starts: ${start} -> ${end}`);
  }
  const periods = [];
  for (let i = from.index; i <= to.index; i += 1) periods.push(formatPeriodIndex(i));
  return periods;
}
function splitEvenly(totalHours, periods) {
  if (periods.length === 0) throw new Error("operation window contains no periods");
  const hours = totalHours / periods.length;
  return periods.map((period) => ({ period, hours }));
}
var ALL_PERIODS = Array.from(
  { length: 24 },
  (_, i) => formatPeriodIndex(i)
);

// src/engine/m3.ts
function demandForYear(year, areaHa) {
  if (year.operationSetId === null) {
    const reason = `no operation set for crop '${year.cropId}' with establishment '${year.establishmentVariant}'`;
    return [
      {
        yearIndex: year.yearIndex,
        cropId: year.cropId,
        establishmentVariant: year.establishmentVariant,
        operationId: "(missing operation set)",
        operationName: "Missing operation set",
        machineSetId: "",
        hoursPerYear: missing(reason),
        byPeriod: missing(reason),
        labourHoursPerYear: missing(reason)
      }
    ];
  }
  return year.operations.map((operation) => demandForOperation(year, operation, areaHa));
}
function demandForOperation(year, operation, areaHa) {
  const base = {
    yearIndex: year.yearIndex,
    cropId: year.cropId,
    establishmentVariant: year.establishmentVariant,
    operationId: operation.id,
    operationName: operation.name,
    machineSetId: operation.machineSetId
  };
  const rate = operation.workRateHaPerH.value;
  if (rate === null || !(rate > 0)) {
    const reason = `no work rate supplied for ${operation.name} (${operation.id})`;
    return {
      ...base,
      hoursPerYear: missing(reason),
      byPeriod: missing(reason),
      labourHoursPerYear: missing(reason)
    };
  }
  let periods;
  try {
    periods = expandWindow(operation.window.start, operation.window.end);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    return {
      ...base,
      hoursPerYear: missing(reason),
      byPeriod: missing(reason),
      labourHoursPerYear: missing(reason)
    };
  }
  const hours = areaHa / rate * operation.passes;
  return {
    ...base,
    hoursPerYear: ok(hours),
    byPeriod: ok(splitEvenly(hours, periods)),
    labourHoursPerYear: ok(hours * operation.labourPersons)
  };
}

// src/engine/m4.ts
function evaluateYield(year, scenario, crops2) {
  const notes = [];
  const crop = crops2[year.cropId];
  const override = scenario.yieldOverridesPerHa?.[year.cropId];
  let baseValue;
  if (override) {
    baseValue = override.value;
  } else if (crop?.relativeYield) {
    const reference = crops2[crop.relativeYield.cropId];
    const referenceValue = reference?.baseYield.value ?? null;
    const multiplier = crop.relativeYield.multiplier.value;
    if (reference?.relativeYield) {
      baseValue = null;
      notes.push(`nested relative yields are not supported ('${crop.relativeYield.cropId}')`);
    } else if (referenceValue === null || multiplier === null) {
      baseValue = null;
      notes.push(`relative yield reference '${crop.relativeYield.cropId}' unavailable`);
    } else {
      baseValue = referenceValue * multiplier;
      notes.push(
        `base yield derived as ${(multiplier * 100).toFixed(2)}% of '${crop.relativeYield.cropId}' (${referenceValue} t/ha)`
      );
    }
  } else {
    baseValue = crop?.baseYield.value ?? null;
  }
  if (baseValue === null || !Number.isFinite(baseValue)) {
    const reasons = [`no base yield supplied for '${year.cropId}'`];
    return {
      base: missing(...reasons),
      modifier: null,
      effective: missing(...reasons),
      output: missing(...reasons),
      notes
    };
  }
  const base = ok(baseValue);
  if (override) {
    notes.push(`base yield overridden by scenario input (${override.provenance.source})`);
  }
  const modifierInput = (scenario.yieldModifiers ?? []).find(
    (candidate) => candidate.cropId === year.cropId && candidate.precedingCropId === (year.predecessorCropId ?? "")
  );
  let effectiveValue = baseValue;
  let modifier = null;
  if (modifierInput) {
    effectiveValue = modifierInput.type === "percent" ? baseValue * (1 + modifierInput.value / 100) : baseValue + modifierInput.value;
    modifier = {
      type: modifierInput.type,
      value: modifierInput.value,
      provenance: modifierInput.provenance
    };
    const rendered = modifierInput.type === "percent" ? `${modifierInput.value}%` : `${modifierInput.value} t/ha`;
    notes.push(
      `unverified user modifier applied (${rendered}) after '${modifierInput.precedingCropId}'`
    );
  }
  return {
    base,
    modifier,
    effective: ok(effectiveValue),
    output: ok(effectiveValue * scenario.areaHa),
    notes
  };
}

// src/engine/m5.ts
function evaluateMargin(params) {
  const crop = params.crops[params.cropId];
  const price = crop?.pricePerTonne.value ?? null;
  const support = crop?.supportPerHa;
  const supportValue = support ? support.value : 0;
  const yieldValue = params.effectiveYield.status === "ok" ? params.effectiveYield.value : null;
  const revenueReasons = [];
  if (yieldValue === null) revenueReasons.push("effective yield unavailable");
  if (price === null) revenueReasons.push(`no price supplied for '${params.cropId}'`);
  if (support && supportValue === null) {
    revenueReasons.push(`support value missing for '${params.cropId}'`);
  }
  const revenue = revenueReasons.length === 0 ? ok(yieldValue * price + supportValue) : missing(...revenueReasons);
  const items = crop?.variableCostsPerHa ?? [];
  const unpricedItems = items.filter((item) => item.cost.value === null);
  let variableCosts;
  if (items.length === 0) {
    variableCosts = missing(`no variable costs supplied for '${params.cropId}'`);
  } else if (unpricedItems.length > 0) {
    variableCosts = missing(
      ...unpricedItems.map(
        (item) => `no ${item.item} cost supplied for '${params.cropId}'`
      )
    );
  } else {
    variableCosts = ok(
      items.reduce((sum, item) => sum + item.cost.value, 0)
    );
  }
  const cropCharge = params.charges.find((candidate) => candidate.cropId === params.cropId);
  let machineryCharges;
  if (cropCharge) {
    machineryCharges = cropCharge.chargePerHa.value === null ? missing(`no crop-level machinery charge value for '${params.cropId}'`) : ok(cropCharge.chargePerHa.value);
  } else {
    let machinerySum = 0;
    const chargeReasons = [];
    for (const operation of params.operations) {
      const charge = params.charges.find(
        (candidate) => candidate.machineSetId === operation.machineSetId
      );
      if (!charge) {
        chargeReasons.push(
          `no charge entry for machine set '${operation.machineSetId}' (${operation.name})`
        );
        continue;
      }
      if (charge.chargePerHa.value === null) {
        chargeReasons.push(
          `no charge value for machine set '${operation.machineSetId}'`
        );
        continue;
      }
      machinerySum += charge.chargePerHa.value * operation.passes;
    }
    if (params.operations.length === 0) {
      machineryCharges = missing(`no operations supplied for '${params.cropId}'`);
    } else if (chargeReasons.length > 0) {
      machineryCharges = missing(...chargeReasons);
    } else {
      machineryCharges = ok(machinerySum);
    }
  }
  const states = [revenue, variableCosts, machineryCharges];
  const margin = states.every((state2) => state2.status === "ok") ? ok(
    revenue.value - variableCosts.value - machineryCharges.value
  ) : missing(
    ...states.flatMap(
      (state2) => state2.status === "missing" ? state2.reasons : []
    )
  );
  return { revenue, variableCosts, machineryCharges, margin };
}

// src/engine/m6.ts
function okValues(states) {
  const values = [];
  for (const state2 of states) {
    if (state2.status === "missing") return null;
    values.push(state2.value);
  }
  return values;
}
function reasonsFor(states, label) {
  const reasons = [];
  states.forEach((state2, index) => {
    if (state2.status === "missing") {
      for (const reason of state2.reasons) reasons.push(`year ${index + 1} ${label}: ${reason}`);
    }
  });
  return reasons.length > 0 ? reasons : [`${label}: unavailable`];
}
function summarise(cropYears, machinery, areaHa) {
  const yearCount = Math.max(cropYears.length, 1);
  const yieldStates = cropYears.map((row) => row.effectiveYieldTPerHa);
  const yields = okValues(yieldStates);
  const meanYield = yields ? ok(yields.reduce((sum, value) => sum + value, 0) / yearCount) : missing(...reasonsFor(yieldStates, "yield"));
  const outputStates = cropYears.map((row) => row.outputTonnes);
  const outputs = okValues(outputStates);
  const totalOutput = outputs ? ok(outputs.reduce((sum, value) => sum + value, 0)) : missing(...reasonsFor(outputStates, "output"));
  const marginStates = cropYears.map((row) => row.grossMarginPerHa);
  const margins = okValues(marginStates);
  const annualisedMargin = margins ? ok(margins.reduce((sum, value) => sum + value, 0) / yearCount) : missing(...reasonsFor(marginStates, "margin"));
  const annualisedMarginTotal = annualisedMargin.status === "ok" ? ok(annualisedMargin.value * areaHa) : missing(...annualisedMargin.reasons);
  let hoursByPeriod;
  const missingRecords = machinery.filter((record) => record.byPeriod.status === "missing");
  if (machinery.length === 0) {
    hoursByPeriod = missing("no operations were generated for this rotation");
  } else if (missingRecords.length > 0) {
    hoursByPeriod = missing(
      ...missingRecords.map((record) => {
        const state2 = record.byPeriod;
        return `${record.cropId} / ${record.operationName}: ${state2.reasons.join("; ")}`;
      })
    );
  } else {
    const totals = new Map(ALL_PERIODS.map((period) => [period, 0]));
    for (const record of machinery) {
      if (record.byPeriod.status !== "ok") continue;
      for (const slice of record.byPeriod.value) {
        totals.set(slice.period, (totals.get(slice.period) ?? 0) + slice.hours);
      }
    }
    hoursByPeriod = ok(
      ALL_PERIODS.map((period) => ({ period, hours: totals.get(period) ?? 0 }))
    );
  }
  const hoursStates = machinery.map((record) => record.hoursPerYear);
  const hoursValues = okValues(hoursStates);
  const totalHoursPerYear = hoursValues ? ok(hoursValues.reduce((sum, value) => sum + value, 0)) : missing(...reasonsFor(hoursStates, "hours"));
  let peakPeriod;
  if (hoursByPeriod.status === "ok") {
    let best = hoursByPeriod.value[0] ?? { period: ALL_PERIODS[0] ?? "01H1", hours: 0 };
    for (const slice of hoursByPeriod.value) {
      if (slice.hours > best.hours) best = slice;
    }
    peakPeriod = ok({ period: best.period, hours: best.hours });
  } else {
    peakPeriod = missing(...hoursByPeriod.reasons);
  }
  return {
    meanYieldTPerHa: meanYield,
    totalOutputTonnes: totalOutput,
    annualisedGrossMarginPerHa: annualisedMargin,
    annualisedGrossMarginTotal: annualisedMarginTotal,
    hoursByPeriod,
    peakPeriod,
    totalHoursPerYear
  };
}

// src/engine/index.ts
var ENGINE_VERSION = "0.1.0";
function runScenario(packs, scenario) {
  const warnings = [];
  const rotation = resolveRotation(scenario, packs.crops.entries);
  warnings.push(...rotation.problems);
  const expansion = expandOperations(rotation.years, packs.operations.entries);
  warnings.push(...expansion.problems);
  const cropYears = [];
  const machinery = [];
  for (const year of expansion.results) {
    const yieldOutcome = evaluateYield(year, scenario, packs.crops.entries);
    const marginOutcome = evaluateMargin({
      cropId: year.cropId,
      effectiveYield: yieldOutcome.effective,
      operations: year.operations,
      crops: packs.crops.entries,
      charges: packs.charges.entries
    });
    cropYears.push({
      yearIndex: year.yearIndex,
      cropId: year.cropId,
      cropName: packs.crops.entries[year.cropId]?.name ?? year.cropId,
      establishmentVariant: year.establishmentVariant,
      predecessorCropId: year.predecessorCropId,
      baseYieldTPerHa: yieldOutcome.base,
      modifier: yieldOutcome.modifier,
      effectiveYieldTPerHa: yieldOutcome.effective,
      outputTonnes: yieldOutcome.output,
      revenuePerHa: marginOutcome.revenue,
      variableCostsPerHa: marginOutcome.variableCosts,
      machineryChargePerHa: marginOutcome.machineryCharges,
      grossMarginPerHa: marginOutcome.margin,
      notes: yieldOutcome.notes
    });
    machinery.push(...demandForYear(year, scenario.areaHa));
  }
  const summary = summarise(cropYears, machinery, scenario.areaHa);
  return {
    scenario: {
      id: scenario.id,
      name: scenario.name,
      baseline: scenario.baseline,
      areaHa: scenario.areaHa
    },
    engineVersion: ENGINE_VERSION,
    packVersions: {
      farm: packs.farm.version,
      crops: packs.crops.version,
      operations: packs.operations.version,
      charges: packs.charges.version
    },
    cropYears,
    machinery,
    summary,
    warnings
  };
}

// src/web/main.ts
var state = {
  packs: null,
  drafts: [],
  initialDrafts: [],
  overrides: /* @__PURE__ */ new Map(),
  modifiers: [],
  areaHa: 100,
  results: []
};
var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var CATEGORIES = ["establishment", "spray", "harvest", "straw", "other"];
var COLOURS = {
  baseline: ["#007841", "#4bae3b", "#8fbf5a", "#b7d38a", "#d5e3b8"],
  comparison: ["#ea7d31", "#f0a05f", "#f5bd8a", "#e2c48f", "#d8b27a"]
};
function $(id) {
  const node = document.getElementById(id);
  if (!node) throw new Error(`missing element #${id}`);
  return node;
}
function h(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== void 0) element.textContent = text;
  return element;
}
function esc(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
var fmt = (value, digits = 1) => value.toLocaleString("en-IE", { minimumFractionDigits: digits, maximumFractionDigits: digits });
function uiProvenance(note) {
  return {
    sourceType: "user-provided",
    source: `UI adjustment (${note})`,
    date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    geography: "n/a",
    uncertainty: "unverified user assumption",
    status: "provisional"
  };
}
function stateText(value, render) {
  return value.status === "ok" ? render(value.value) : "Missing";
}
function cell(value, render) {
  const td = h("td", "right");
  if (value.status === "ok") {
    td.textContent = render(value.value);
  } else {
    td.textContent = "Missing";
    td.classList.add("state-missing");
    td.title = value.reasons.join("; ");
  }
  return td;
}
async function getJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to load ${path} (${response.status})`);
  return response.json();
}
function toDraft(scenario) {
  return {
    id: scenario.id,
    name: scenario.name,
    baseline: scenario.baseline,
    previousCropId: scenario.previousCropId ?? "",
    years: scenario.years.map((year) => ({
      cropId: year.cropId,
      variant: year.establishmentVariant
    }))
  };
}
async function init() {
  try {
    $("run-status").textContent = "Loading data packs\u2026";
    const [farm, crops2, operations, charges, rawScenarios] = await Promise.all([
      getJson("./data/farm.pack.json"),
      getJson("./data/crops.pack.json"),
      getJson("./data/operations.pack.json"),
      getJson("./data/charges.pack.json"),
      getJson("./data/scenarios.json")
    ]);
    state.packs = parsePacks({ farm, crops: crops2, operations, charges });
    const list = Array.isArray(rawScenarios) ? rawScenarios : rawScenarios.scenarios;
    if (!Array.isArray(list)) throw new Error("scenarios.json must be an array");
    const scenarios = list.map((entry, index) => parseScenario(entry, `scenarios[${index}]`));
    state.drafts = scenarios.map(toDraft);
    state.initialDrafts = scenarios.map(toDraft);
    state.areaHa = scenarios[0]?.areaHa ?? 100;
    $("area").value = String(state.areaHa);
    renderAllInputs();
    run();
  } catch (error) {
    showError(error instanceof Error ? error.message : String(error));
  }
}
function crops() {
  const packs = state.packs;
  if (!packs) return [];
  return Object.entries(packs.crops.entries).sort((a, b) => a[1].name.localeCompare(b[1].name));
}
function variantsFor(cropId) {
  const packs = state.packs;
  if (!packs) return [];
  const found = packs.operations.entries.filter((entry) => entry.cropId === cropId).map((entry) => entry.establishmentVariant);
  return found.length > 0 ? [...new Set(found)] : ["conventional"];
}
function packYieldText(crop) {
  if (crop.relativeYield) {
    const reference = state.packs?.crops.entries[crop.relativeYield.cropId];
    const base = reference?.baseYield.value;
    const multiplier = crop.relativeYield.multiplier.value;
    if (base !== null && base !== void 0 && multiplier !== null) {
      return `${fmt(base * multiplier)} t/ha (${fmt(multiplier * 100, 1)}% of ${reference?.name ?? "reference"})`;
    }
    return "derived (reference unavailable)";
  }
  return crop.baseYield.value === null ? "not supplied" : `${fmt(crop.baseYield.value)} t/ha`;
}
function renderAllInputs() {
  renderEditors();
  renderOverrides();
  renderModifiers();
}
function renderEditors() {
  const container = $("scenario-editors");
  container.replaceChildren();
  state.drafts.forEach((draft, draftIndex) => {
    const card = h("section", `scenario-card${draft.baseline ? "" : " comparison"}`);
    const head = h("div", "scenario-head");
    head.append(
      h("h2", void 0, draft.name),
      h("span", "badge", draft.baseline ? "Baseline" : "Comparison")
    );
    card.append(head);
    const previousLabel = h("label", "field");
    previousLabel.append(h("span", void 0, "Crop before year 1 (optional)"));
    const previousSelect = document.createElement("select");
    previousSelect.append(new Option("(none)", ""));
    for (const [id, crop] of crops()) previousSelect.append(new Option(crop.name, id));
    previousSelect.value = draft.previousCropId;
    previousSelect.addEventListener("change", () => {
      draft.previousCropId = previousSelect.value;
      scheduleRun();
    });
    previousLabel.append(previousSelect);
    card.append(previousLabel);
    const table = h("table", "years-table");
    const thead = h("thead");
    const headRow = h("tr");
    for (const label of ["Year", "Crop", "Establishment", ""]) {
      headRow.append(h("th", void 0, label));
    }
    thead.append(headRow);
    table.append(thead);
    const tbody = h("tbody");
    draft.years.forEach((year, yearIndex) => {
      const row = h("tr");
      row.append(h("td", "num", String(yearIndex + 1)));
      const cropCell = h("td");
      const cropSelect = document.createElement("select");
      for (const [id, crop] of crops()) cropSelect.append(new Option(crop.name, id));
      cropSelect.value = year.cropId;
      cropSelect.addEventListener("change", () => {
        year.cropId = cropSelect.value;
        const options = variantsFor(year.cropId);
        if (!options.includes(year.variant)) year.variant = options[0] ?? "conventional";
        renderEditors();
        scheduleRun();
      });
      cropCell.append(cropSelect);
      row.append(cropCell);
      const variantCell = h("td");
      const variantSelect = document.createElement("select");
      for (const variant of variantsFor(year.cropId)) {
        variantSelect.append(new Option(variant, variant));
      }
      variantSelect.value = year.variant;
      variantSelect.addEventListener("change", () => {
        year.variant = variantSelect.value;
        scheduleRun();
      });
      variantCell.append(variantSelect);
      row.append(variantCell);
      const actionCell = h("td");
      const remove = h("button", "ghost", "\u2715");
      remove.type = "button";
      remove.title = "Remove this year";
      remove.disabled = draft.years.length <= 1;
      remove.addEventListener("click", () => {
        draft.years.splice(yearIndex, 1);
        renderEditors();
        scheduleRun();
      });
      actionCell.append(remove);
      row.append(actionCell);
      tbody.append(row);
    });
    table.append(tbody);
    card.append(table);
    const actions = h("div", "row-actions");
    const add = h("button", "secondary", "+ Add year");
    add.type = "button";
    add.addEventListener("click", () => {
      if (draft.years.length >= 8) return;
      const options = crops().filter(
        ([id]) => state.packs?.operations.entries.some((entry) => entry.cropId === id)
      );
      const first = options[0] ?? crops()[0];
      if (!first) return;
      const variant = variantsFor(first[0])[0] ?? "conventional";
      draft.years.push({ cropId: first[0], variant });
      renderEditors();
      scheduleRun();
    });
    actions.append(add);
    if (draftIndex === 0) {
      const hint = h("span", "note", "Baseline drives the deltas.");
      actions.append(hint);
    }
    card.append(actions);
    container.append(card);
  });
}
function renderOverrides() {
  const container = $("override-editor");
  container.replaceChildren();
  const used = /* @__PURE__ */ new Set();
  for (const draft of state.drafts) {
    for (const year of draft.years) used.add(year.cropId);
  }
  if (used.size === 0) {
    container.append(h("p", "note", "No crops selected yet."));
    return;
  }
  for (const cropId of used) {
    const crop = state.packs?.crops.entries[cropId];
    if (!crop) continue;
    const row = h("div", "override-row");
    const label = h("div", "label", crop.name);
    label.append(h("span", "hint", `pack: ${packYieldText(crop)}`));
    row.append(label);
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.step = "0.1";
    input.inputMode = "decimal";
    input.title = "Base yield override (t/ha). Blank uses the pack value.";
    const existing = state.overrides.get(cropId);
    input.value = existing === void 0 ? "" : String(existing);
    input.addEventListener("input", () => {
      const value = input.value.trim();
      if (value === "") {
        state.overrides.delete(cropId);
      } else {
        const parsed = Number(value);
        if (Number.isFinite(parsed) && parsed > 0) state.overrides.set(cropId, parsed);
      }
      scheduleRun();
    });
    row.append(input);
    container.append(row);
  }
}
function renderModifiers() {
  const list = $("modifier-list");
  list.replaceChildren();
  if (state.modifiers.length === 0) {
    list.append(h("p", "note", "None set: base yields are used unchanged."));
  }
  state.modifiers.forEach((modifier, index) => {
    const previous = state.packs?.crops.entries[modifier.preceding]?.name ?? modifier.preceding;
    const crop = state.packs?.crops.entries[modifier.crop]?.name ?? modifier.crop;
    const render = modifier.type === "percent" ? `${modifier.value}%` : `${modifier.value} t/ha`;
    const row = h("div", "modifier-row");
    row.append(h("span", void 0, `${previous} \u2192 ${crop}: ${render}`));
    const remove = h("button", "ghost", "Remove");
    remove.type = "button";
    remove.addEventListener("click", () => {
      state.modifiers.splice(index, 1);
      renderModifiers();
      scheduleRun();
    });
    row.append(remove);
    list.append(row);
  });
  const form = $("modifier-form");
  form.replaceChildren();
  const previousSelect = document.createElement("select");
  previousSelect.append(new Option("Previous crop\u2026", ""));
  for (const [id, crop] of crops()) previousSelect.append(new Option(crop.name, id));
  const cropSelect = document.createElement("select");
  cropSelect.append(new Option("Current crop\u2026", ""));
  for (const [id, crop] of crops()) cropSelect.append(new Option(crop.name, id));
  const typeSelect = document.createElement("select");
  typeSelect.append(new Option("% of base", "percent"));
  typeSelect.append(new Option("t/ha delta", "t_per_ha"));
  const valueInput = document.createElement("input");
  valueInput.type = "number";
  valueInput.step = "0.1";
  valueInput.placeholder = "value";
  valueInput.inputMode = "decimal";
  const add = h("button", "primary small", "Add");
  add.type = "button";
  form.append(previousSelect, cropSelect);
  const triple = h("div", "triple");
  triple.append(typeSelect, valueInput, add);
  form.append(triple);
  add.addEventListener("click", () => {
    const value = Number(valueInput.value);
    if (!previousSelect.value || !cropSelect.value || !Number.isFinite(value)) return;
    state.modifiers.push({
      preceding: previousSelect.value,
      crop: cropSelect.value,
      type: typeSelect.value === "t_per_ha" ? "t_per_ha" : "percent",
      value
    });
    renderModifiers();
    scheduleRun();
  });
}
var runTimer;
function scheduleRun() {
  window.clearTimeout(runTimer);
  runTimer = window.setTimeout(run, 140);
}
function buildInput(draft) {
  const overrides = {};
  for (const [cropId, value] of state.overrides) {
    overrides[cropId] = {
      value,
      provenance: uiProvenance(`base yield override for ${cropId}`)
    };
  }
  return {
    id: draft.id,
    name: draft.name,
    farmId: "farm.synthetic1",
    areaHa: state.areaHa,
    baseline: draft.baseline,
    previousCropId: draft.previousCropId || null,
    years: draft.years.map((year) => ({
      cropId: year.cropId,
      establishmentVariant: year.variant
    })),
    yieldOverridesPerHa: Object.keys(overrides).length > 0 ? overrides : void 0,
    yieldModifiers: state.modifiers.length > 0 ? state.modifiers.map((modifier) => ({
      precedingCropId: modifier.preceding,
      cropId: modifier.crop,
      type: modifier.type,
      value: modifier.value,
      provenance: uiProvenance(`modifier ${modifier.preceding} -> ${modifier.crop}`)
    })) : void 0
  };
}
function run() {
  const packs = state.packs;
  if (!packs) return;
  try {
    state.results = state.drafts.map((draft) => runScenario(packs, buildInput(draft)));
    hideError();
    renderKpis();
    renderComparison();
    renderChart();
    renderCropTables();
    renderMachineryTables();
    renderMissing();
    renderSources();
    $("run-status").textContent = `Updated ${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-IE")}`;
  } catch (error) {
    showError(error instanceof Error ? error.message : String(error));
  }
}
function showError(message) {
  const banner = $("error");
  banner.hidden = false;
  banner.textContent = message;
}
function hideError() {
  $("error").hidden = true;
}
function statCard(label, value, render, sub) {
  const wrapper = h("div", "stat");
  wrapper.append(h("span", "label", label));
  const valueEl = h("span", "value");
  if (value.status === "ok") {
    valueEl.textContent = render(value.value);
  } else {
    valueEl.textContent = "Missing";
    valueEl.classList.add("state-missing");
    valueEl.title = value.reasons.join("; ");
  }
  wrapper.append(valueEl);
  if (sub) wrapper.append(h("span", "sub", sub));
  return wrapper;
}
function peakCard(label, value) {
  const wrapper = h("div", "stat");
  wrapper.append(h("span", "label", label));
  const valueEl = h("span", "value");
  if (value.status === "ok") {
    valueEl.textContent = `${value.value.period} \xB7 ${fmt(value.value.hours)} h`;
  } else {
    valueEl.textContent = "Missing";
    valueEl.classList.add("state-missing");
    valueEl.title = value.reasons.join("; ");
  }
  wrapper.append(valueEl);
  return wrapper;
}
function renderKpis() {
  const box = $("kpis");
  box.replaceChildren();
  for (const result of state.results) {
    const card = h("section", `kpi-card${result.scenario.baseline ? "" : " comparison"}`);
    const head = h("div", "kpi-head");
    head.append(
      h("h3", void 0, result.scenario.name),
      h("span", "badge", result.scenario.baseline ? "Baseline" : "Comparison")
    );
    card.append(head);
    const stats = h("div", "kpi-stats");
    stats.append(
      statCard("Mean yield", result.summary.meanYieldTPerHa, (v) => `${fmt(v)} t/ha`),
      statCard(
        "Gross margin",
        result.summary.annualisedGrossMarginPerHa,
        (v) => `\u20AC${fmt(v, 0)}/ha`,
        "annualised; excl. straw"
      ),
      statCard("Machine hours", result.summary.totalHoursPerYear, (v) => `${fmt(v)} h`, "rotation total"),
      peakCard("Peak half-month", result.summary.peakPeriod)
    );
    card.append(stats);
    box.append(card);
  }
}
function deltaText(baseline, other, digits, unit) {
  const td = h("td", "right");
  if (baseline.status === "ok" && other.status === "ok") {
    const change = other.value - baseline.value;
    td.textContent = `${change >= 0 ? "+" : ""}${fmt(change, digits)}${unit ? ` ${unit}` : ""}`;
    td.classList.add(change >= 0 ? "delta-pos" : "delta-neg");
  } else {
    td.textContent = "n/a";
    td.classList.add("state-missing");
  }
  return td;
}
function renderComparison() {
  const box = $("comparison");
  box.replaceChildren();
  if (state.results.length < 2) {
    box.append(h("p", "note", "Add a second rotation to compare."));
    return;
  }
  const baseline = state.results.find((result) => result.scenario.baseline) ?? state.results[0];
  if (!baseline) return;
  const others = state.results.filter((result) => result !== baseline);
  for (const other of others) {
    const wrapper = h("div", "table-scroll");
    const table = h("table", "data");
    const thead = h("thead");
    const headRow = h("tr");
    for (const label of ["Metric", baseline.scenario.name, other.scenario.name, "\u0394"]) {
      headRow.append(h("th", label === "\u0394" ? "right" : void 0, label));
    }
    thead.append(headRow);
    table.append(thead);
    const tbody = h("tbody");
    const addRow = (label, left, right, digits, unit, render) => {
      const row = h("tr");
      row.append(h("td", void 0, label));
      row.append(cell(left, render));
      row.append(cell(right, render));
      row.append(deltaText(left, right, digits, unit));
      tbody.append(row);
    };
    addRow("Mean yield", baseline.summary.meanYieldTPerHa, other.summary.meanYieldTPerHa, 1, "t/ha", (v) => fmt(v));
    addRow("Total output", baseline.summary.totalOutputTonnes, other.summary.totalOutputTonnes, 0, "t", (v) => fmt(v, 0));
    addRow(
      "Annualised gross margin",
      baseline.summary.annualisedGrossMarginPerHa,
      other.summary.annualisedGrossMarginPerHa,
      0,
      "\u20AC/ha",
      (v) => `\u20AC${fmt(v, 0)}`
    );
    addRow(
      "Annualised GM total",
      baseline.summary.annualisedGrossMarginTotal,
      other.summary.annualisedGrossMarginTotal,
      0,
      "\u20AC",
      (v) => `\u20AC${fmt(v, 0)}`
    );
    addRow(
      "Machine hours",
      baseline.summary.totalHoursPerYear,
      other.summary.totalHoursPerYear,
      1,
      "h",
      (v) => fmt(v)
    );
    const peakRow = h("tr");
    peakRow.append(h("td", void 0, "Peak half-month"));
    const leftPeak = h("td", "right");
    leftPeak.textContent = stateText(baseline.summary.peakPeriod, (v) => `${v.period} \xB7 ${fmt(v.hours)} h`);
    if (baseline.summary.peakPeriod.status === "missing") leftPeak.classList.add("state-missing");
    const rightPeak = h("td", "right");
    rightPeak.textContent = stateText(other.summary.peakPeriod, (v) => `${v.period} \xB7 ${fmt(v.hours)} h`);
    if (other.summary.peakPeriod.status === "missing") rightPeak.classList.add("state-missing");
    peakRow.append(leftPeak, rightPeak, h("td", "right", "\u2014"));
    tbody.append(peakRow);
    table.append(tbody);
    wrapper.append(table);
    box.append(wrapper);
    box.append(
      h(
        "p",
        "note",
        "Deltas are comparison minus baseline. Margins exclude straw revenue and BISS/CRISS/Eco payments."
      )
    );
  }
}
function categoryOf(machineSetId) {
  if (/plough|disc|drill/.test(machineSetId)) return "establishment";
  if (/sprayer/.test(machineSetId)) return "spray";
  if (/combine/.test(machineSetId)) return "harvest";
  if (/straw/.test(machineSetId)) return "straw";
  return "other";
}
function seriesFor(result) {
  const buckets = /* @__PURE__ */ new Map();
  let missing2 = 0;
  for (const record of result.machinery) {
    if (record.byPeriod.status !== "ok") {
      missing2 += 1;
      continue;
    }
    const category = categoryOf(record.machineSetId);
    for (const slice of record.byPeriod.value) {
      const bucket = buckets.get(slice.period) ?? {};
      bucket[category] = (bucket[category] ?? 0) + slice.hours;
      buckets.set(slice.period, bucket);
    }
  }
  return { buckets, missing: missing2, years: Math.max(result.cropYears.length, 1) };
}
function bucketTotal(series, period) {
  const bucket = series.buckets.get(period);
  if (!bucket) return 0;
  return CATEGORIES.reduce((sum, category) => sum + (bucket[category] ?? 0), 0);
}
function periodId(index) {
  const month = Math.floor(index / 2) + 1;
  const half = index % 2 === 0 ? 1 : 2;
  return `${String(month).padStart(2, "0")}H${half}`;
}
function niceMax(value) {
  if (!(value > 0)) return { max: 1, step: 0.25 };
  const rawStep = value / 4;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const normalised = rawStep / magnitude;
  const factor = normalised <= 1 ? 1 : normalised <= 2 ? 2 : normalised <= 5 ? 5 : 10;
  const step = factor * magnitude;
  return { max: step * 4, step };
}
function renderChart() {
  const container = $("chart");
  const notes = $("chart-notes");
  container.replaceChildren();
  notes.replaceChildren();
  if (state.results.length === 0) return;
  const series = state.results.map((result) => ({ result, data: seriesFor(result) }));
  const baseline = series.find((entry) => entry.result.scenario.baseline) ?? series[0];
  const peakValues = [];
  for (const entry of series) {
    for (let index = 0; index < 24; index += 1) {
      peakValues.push(bucketTotal(entry.data, periodId(index)) / entry.data.years);
    }
  }
  const maxObserved = Math.max(...peakValues, 0);
  if (!(maxObserved > 0)) {
    container.append(
      h(
        "p",
        "note",
        "No machinery hours can be calculated yet: work rates are still missing for every operation in these rotations."
      )
    );
  }
  const W = 1100;
  const H = 400;
  const L = 54;
  const R = 16;
  const T = 34;
  const B = 58;
  const plotW = W - L - R;
  const plotH = H - T - B;
  const groupW = plotW / 24;
  const barW = groupW * 0.34;
  const gap = groupW * 0.08;
  const { max, step } = niceMax(maxObserved);
  const y = (value) => T + plotH - value / max * plotH;
  const parts = [];
  parts.push(
    `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Machinery hours by half-month, stacked by operation group, one series per rotation">`
  );
  const bands = [
    [0, 2, "#f5f6f5", "Winter"],
    [4, 10, "#eef4ee", "Spring"],
    [10, 16, "#fbf6ea", "Summer"],
    [16, 22, "#f7eef0", "Autumn"],
    [22, 24, "#f5f6f5", ""]
  ];
  for (const [start, end, fill, label] of bands) {
    const x = L + start * groupW;
    const width = (end - start) * groupW;
    parts.push(`<rect x="${x.toFixed(1)}" y="${T}" width="${width.toFixed(1)}" height="${plotH}" fill="${fill}"/>`);
    if (label) {
      parts.push(
        `<text x="${(x + width / 2).toFixed(1)}" y="${T - 12}" text-anchor="middle" font-size="11" fill="#6a747d" font-family="Segoe UI, Arial, sans-serif">${label}</text>`
      );
    }
  }
  for (let tick = 0; tick <= 4; tick += 1) {
    const value = step * tick;
    const yy = y(value);
    parts.push(
      `<line x1="${L}" y1="${yy.toFixed(1)}" x2="${W - R}" y2="${yy.toFixed(1)}" stroke="#e2e7e3" stroke-width="1"/>`,
      `<text x="${L - 8}" y="${(yy + 3.5).toFixed(1)}" text-anchor="end" font-size="10" fill="#55606b" font-family="Segoe UI, Arial, sans-serif">${fmt(value, value < 10 ? 1 : 0)}</text>`
    );
  }
  for (let index = 2; index < 24; index += 2) {
    const x = L + index * groupW;
    parts.push(`<line x1="${x.toFixed(1)}" y1="${T}" x2="${x.toFixed(1)}" y2="${T + plotH}" stroke="#e6ebe7" stroke-width="1"/>`);
  }
  series.forEach((entry, seriesIndex) => {
    const colour = entry.result.scenario.baseline ? COLOURS.baseline ?? [] : COLOURS.comparison ?? [];
    for (let index = 0; index < 24; index += 1) {
      const period = periodId(index);
      const bucket = entry.data.buckets.get(period);
      if (!bucket) continue;
      const xA = L + index * groupW + groupW * 0.1 + (seriesIndex === 0 ? 0 : barW + gap);
      let bottom = T + plotH;
      CATEGORIES.forEach((category, categoryIndex) => {
        const hours = (bucket[category] ?? 0) / entry.data.years;
        if (hours <= 0) return;
        const height = hours / max * plotH;
        bottom -= height;
        const label = `${entry.result.scenario.name} \xB7 ${period} \xB7 ${category}: ${fmt(hours)} h`;
        parts.push(
          `<rect x="${xA.toFixed(1)}" y="${bottom.toFixed(1)}" width="${barW.toFixed(1)}" height="${height.toFixed(1)}" fill="${colour[categoryIndex] ?? "#999"}" stroke="#ffffff" stroke-width="0.4"><title>${esc(label)}</title></rect>`
        );
      });
    }
  });
  for (let index = 0; index < 24; index += 1) {
    const x = L + index * groupW + groupW / 2;
    const month = MONTHS[Math.floor(index / 2)] ?? "";
    const half = index % 2 === 0 ? "H1" : "H2";
    parts.push(
      `<text x="${x.toFixed(1)}" y="${H - B + 16}" text-anchor="middle" font-size="9" fill="#55606b" font-family="Segoe UI, Arial, sans-serif">${month}</text>`,
      `<text x="${x.toFixed(1)}" y="${H - B + 28}" text-anchor="middle" font-size="8" fill="#8b949b" font-family="Segoe UI, Arial, sans-serif">${half}</text>`
    );
  }
  parts.push(
    `<text x="${L}" y="${H - 8}" font-size="10" fill="#55606b" font-family="Segoe UI, Arial, sans-serif">Half-month period (H1 = days 1\u201315, H2 = day 16 to month end)</text>`,
    `<text x="14" y="${T + plotH / 2}" transform="rotate(-90 14 ${T + plotH / 2})" text-anchor="middle" font-size="10" fill="#55606b" font-family="Segoe UI, Arial, sans-serif">Average machine hours per rotation-year</text>`,
    `</svg>`
  );
  container.innerHTML = parts.join("");
  const legendBaseline = h("span", "legend-item");
  const swatchBaseline = h("span", "legend-swatch");
  swatchBaseline.style.background = COLOURS.baseline?.[0] ?? "#007841";
  legendBaseline.append(swatchBaseline, h("span", void 0, baseline?.result.scenario.name ?? "Baseline"));
  notes.append(legendBaseline);
  for (const entry of series) {
    if (entry === baseline) continue;
    const legend = h("span", "legend-item");
    const swatch = h("span", "legend-swatch");
    swatch.style.background = COLOURS.comparison?.[0] ?? "#ea7d31";
    legend.append(swatch, h("span", void 0, entry.result.scenario.name));
    notes.append(legend);
  }
  const peakParts = [];
  for (const entry of series) {
    let bestPeriod = "";
    let bestValue = 0;
    for (let index = 0; index < 24; index += 1) {
      const period = periodId(index);
      const value = bucketTotal(entry.data, period) / entry.data.years;
      if (value > bestValue) {
        bestValue = value;
        bestPeriod = period;
      }
    }
    peakParts.push(
      bestValue > 0 ? `${entry.result.scenario.name}: ${bestPeriod} (${fmt(bestValue)} h)` : `${entry.result.scenario.name}: unavailable`
    );
  }
  notes.append(h("span", "caption", `Peak average half-month workload \u2014 ${peakParts.join(" \xB7 ")}.`));
  const missingParts = series.filter((entry) => entry.data.missing > 0).map((entry) => `${entry.result.scenario.name}: ${entry.data.missing} operation record(s) lack work rates and are excluded`);
  notes.append(
    h(
      "span",
      "caption",
      missingParts.length > 0 ? `Partial chart \u2014 ${missingParts.join("; ")}.` : "Segments (bottom to top): establishment, spray, harvest, straw, other."
    )
  );
}
function tableFor(headers, rows) {
  const table = h("table", "data");
  const thead = h("thead");
  const headRow = h("tr");
  headers.forEach((label, index) => {
    headRow.append(h("th", index === 0 ? void 0 : "right", label));
  });
  thead.append(headRow);
  table.append(thead);
  const tbody = h("tbody");
  for (const values of rows) {
    const row = h("tr");
    values.forEach((value, index) => {
      if (typeof value === "string") {
        row.append(h("td", index === 0 ? void 0 : "right", value));
      } else {
        row.append(value);
      }
    });
    tbody.append(row);
  }
  table.append(tbody);
  return table;
}
function renderCropTables() {
  const container = $("crop-tables");
  container.replaceChildren();
  for (const result of state.results) {
    const card = h("div", "table-card");
    card.append(h("h3", void 0, result.scenario.name));
    const rows = result.cropYears.map((row) => {
      const note = [row.notes.join("; "), row.modifier ? "modifier applied" : ""].filter(Boolean).join(" \xB7 ");
      const cropCell = h("td");
      cropCell.textContent = row.cropName;
      if (note) cropCell.title = note;
      return [
        String(row.yearIndex + 1),
        cropCell,
        row.establishmentVariant,
        row.predecessorCropId ?? "\u2014",
        cell(row.effectiveYieldTPerHa, (v) => fmt(v)),
        cell(row.outputTonnes, (v) => fmt(v, 0)),
        cell(row.grossMarginPerHa, (v) => `\u20AC${fmt(v, 0)}`)
      ];
    });
    const scroll = h("div", "table-scroll");
    scroll.append(
      tableFor(
        ["Year", "Crop", "Est.", "Predecessor", "Yield t/ha", "Output t", "GM \u20AC/ha"],
        rows
      )
    );
    card.append(scroll);
    const total = h("p", "note");
    total.textContent = `Rotation total: ${stateText(result.summary.totalOutputTonnes, (v) => `${fmt(v, 0)} t`)}, annualised GM ${stateText(
      result.summary.annualisedGrossMarginPerHa,
      (v) => `\u20AC${fmt(v, 0)}/ha`
    )}. Excludes straw revenue and BISS/CRISS/Eco payments.`;
    card.append(total);
    container.append(card);
  }
}
function renderMachineryTables() {
  const container = $("machinery-tables");
  container.replaceChildren();
  for (const result of state.results) {
    const card = h("div", "table-card");
    card.append(h("h3", void 0, result.scenario.name));
    const rows = result.machinery.map((record) => {
      const peak = peakBucket(record);
      const operationCell = h("td");
      operationCell.textContent = `${record.cropId.replace("crop.", "")} \xB7 ${record.operationName}`;
      return [
        operationCell,
        record.machineSetId.replace("machine.", "") || "\u2014",
        cell(record.hoursPerYear, (v) => fmt(v)),
        peak,
        cell(record.labourHoursPerYear, (v) => fmt(v))
      ];
    });
    const scroll = h("div", "table-scroll");
    scroll.append(
      tableFor(["Operation", "Machine set", "Hours", "Peak", "Labour"], rows)
    );
    card.append(scroll);
    card.append(
      h(
        "p",
        "note",
        "Hours are rotation totals across all years. Buckets follow the half-month convention (A-015); missing work rates show as Missing and are excluded from totals."
      )
    );
    container.append(card);
  }
}
function peakBucket(record) {
  const td = h("td", "right");
  if (record.byPeriod.status === "ok") {
    let best = record.byPeriod.value[0];
    for (const slice of record.byPeriod.value) {
      if (best === void 0 || slice.hours > best.hours) best = slice;
    }
    td.textContent = best ? `${best.period} \xB7 ${fmt(best.hours)} h` : "\u2014";
  } else {
    td.textContent = "Missing";
    td.classList.add("state-missing");
    td.title = record.byPeriod.reasons.join("; ");
  }
  return td;
}
function collectMissing(result) {
  const reasons = [];
  for (const row of result.cropYears) {
    const prefix = `${result.scenario.name} \xB7 year ${row.yearIndex + 1} (${row.cropId})`;
    const states = [
      ["effective yield", row.effectiveYieldTPerHa],
      ["output", row.outputTonnes],
      ["revenue", row.revenuePerHa],
      ["variable costs", row.variableCostsPerHa],
      ["machinery charge", row.machineryChargePerHa]
    ];
    for (const [label, value] of states) {
      if (value.status === "missing") {
        for (const reason of value.reasons) reasons.push(`${prefix} ${label}: ${reason}`);
      }
    }
  }
  for (const record of result.machinery) {
    if (record.hoursPerYear.status === "missing") {
      for (const reason of record.hoursPerYear.reasons) {
        reasons.push(`${result.scenario.name} \xB7 ${record.cropId} ${record.operationName}: ${reason}`);
      }
    }
  }
  for (const warning of result.warnings) reasons.push(`${result.scenario.name}: ${warning}`);
  return [...new Set(reasons)];
}
function renderMissing() {
  const container = $("missing");
  container.replaceChildren();
  const all = state.results.flatMap(collectMissing);
  if (all.length === 0) {
    container.append(h("p", "missing-empty", "No missing states in the current run."));
    return;
  }
  container.append(
    h("p", "note", `${all.length} missing-data state(s). Values are never replaced with zeros.`)
  );
  const list = h("ul", "missing-list");
  for (const reason of all) list.append(h("li", void 0, reason));
  container.append(list);
}
function renderSources() {
  const body = $("sources-body");
  body.replaceChildren();
  const result = state.results[0];
  const lines = [
    "Yields: CSO 10-year national averages where available (winter wheat 11.5, winter barley 8.8, spring barley 7.3, winter oats 8.7, WOSR 4.4 t/ha), product-owner placeholders for other crops, and malting barley derived as 93.75% of the feed spring barley base (C&R implied target ratio 7.5/8.0). CSO reliability is questioned by the product owner; all yields are placeholders.",
    "Economics: Teagasc Crops Costs and Returns 2026 (Collins and Phelan, Oak Park, January 2026) \u2014 net prices, MATERIALS and MISCELLANEOUS subtotals, and crop-level HIRE MACHINERY totals. Protein Crops Scheme \u20AC500/ha included for peas and spring beans.",
    "Work rates: establishment rates from project assumption A-001 (product-owner concept; provisional); other work rates are not yet supplied. Operation timing windows are illustrative placeholders (A-020).",
    "Boundaries: margins exclude straw revenue and BISS/CRISS/Eco payments; land, fixed costs and machinery ownership are outside this prototype. Peak workload is not a capacity-feasibility judgement."
  ];
  if (result) {
    lines.push(
      `Engine ${result.engineVersion} \xB7 packs: ${Object.entries(result.packVersions).map(([name, version]) => `${name} ${version}`).join(", ")}.`
    );
  }
  for (const line of lines) body.append(h("p", void 0, line));
  const link = h("a", void 0, "Full source register (DATA_SOURCES.md)");
  link.href = "https://github.com/jackjamesonteagasc/wf-dss-prototype/blob/main/data/DATA_SOURCES.md";
  link.target = "_blank";
  link.rel = "noreferrer";
  body.append(link);
}
$("area").addEventListener("input", (event) => {
  const input = event.target;
  const value = Number(input.value);
  if (Number.isFinite(value) && value > 0) {
    state.areaHa = value;
    scheduleRun();
  }
});
$("reset").addEventListener("click", () => {
  state.drafts = structuredClone(state.initialDrafts);
  state.overrides.clear();
  state.modifiers = [];
  $("area").value = String(state.areaHa);
  renderAllInputs();
  scheduleRun();
});
void init();
//# sourceMappingURL=app.js.map
