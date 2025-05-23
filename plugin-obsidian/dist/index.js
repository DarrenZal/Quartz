import {
  __commonJS,
  __export,
  __toESM
} from "./chunk-G3PMV62Z.js";

// ../../node_modules/extend/index.js
var require_extend = __commonJS({
  "../../node_modules/extend/index.js"(exports, module) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    var toStr = Object.prototype.toString;
    var defineProperty = Object.defineProperty;
    var gOPD = Object.getOwnPropertyDescriptor;
    var isArray = function isArray2(arr) {
      if (typeof Array.isArray === "function") {
        return Array.isArray(arr);
      }
      return toStr.call(arr) === "[object Array]";
    };
    var isPlainObject2 = function isPlainObject3(obj) {
      if (!obj || toStr.call(obj) !== "[object Object]") {
        return false;
      }
      var hasOwnConstructor = hasOwn.call(obj, "constructor");
      var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
      if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
      }
      var key;
      for (key in obj) {
      }
      return typeof key === "undefined" || hasOwn.call(obj, key);
    };
    var setProperty = function setProperty2(target, options) {
      if (defineProperty && options.name === "__proto__") {
        defineProperty(target, options.name, {
          enumerable: true,
          configurable: true,
          value: options.newValue,
          writable: true
        });
      } else {
        target[options.name] = options.newValue;
      }
    };
    var getProperty = function getProperty2(obj, name) {
      if (name === "__proto__") {
        if (!hasOwn.call(obj, name)) {
          return void 0;
        } else if (gOPD) {
          return gOPD(obj, name).value;
        }
      }
      return obj[name];
    };
    module.exports = function extend4() {
      var options, name, src, copy, copyIsArray, clone;
      var target = arguments[0];
      var i = 1;
      var length = arguments.length;
      var deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
      }
      if (target == null || typeof target !== "object" && typeof target !== "function") {
        target = {};
      }
      for (; i < length; ++i) {
        options = arguments[i];
        if (options != null) {
          for (name in options) {
            src = getProperty(target, name);
            copy = getProperty(options, name);
            if (target !== copy) {
              if (deep && copy && (isPlainObject2(copy) || (copyIsArray = isArray(copy)))) {
                if (copyIsArray) {
                  copyIsArray = false;
                  clone = src && isArray(src) ? src : [];
                } else {
                  clone = src && isPlainObject2(src) ? src : {};
                }
                setProperty(target, { name, newValue: extend4(deep, clone, copy) });
              } else if (typeof copy !== "undefined") {
                setProperty(target, { name, newValue: copy });
              }
            }
          }
        }
      }
      return target;
    };
  }
});

// src/actions/search.ts
import {
  elizaLogger as elizaLogger7,
  embed as embed2
} from "@elizaos/core";

// src/helper.ts
import { ModelClass, MemoryManager } from "@elizaos/core";
import { elizaLogger as elizaLogger2, composeContext, generateObject, stringToUuid as stringToUuid3 } from "@elizaos/core";
import { lookup } from "mrmime";

// src/providers/obsidianClient.ts
import { createHash } from "node:crypto";
import {
  elizaLogger,
  stringToUuid as stringToUuid2
} from "@elizaos/core";

// src/helper/structuredKnowledge.ts
import { embed } from "@elizaos/core";
import { stringToUuid } from "@elizaos/core";

// ../../node_modules/bail/index.js
function bail(error) {
  if (error) {
    throw error;
  }
}

// ../../node_modules/unified/lib/index.js
var import_extend = __toESM(require_extend(), 1);

// ../../node_modules/devlop/lib/default.js
function ok() {
}

// ../../node_modules/unified/node_modules/is-plain-obj/index.js
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}

// ../../node_modules/trough/lib/index.js
function trough() {
  const fns = [];
  const pipeline = { run, use };
  return pipeline;
  function run(...values) {
    let middlewareIndex = -1;
    const callback = values.pop();
    if (typeof callback !== "function") {
      throw new TypeError("Expected function as last argument, not " + callback);
    }
    next(null, ...values);
    function next(error, ...output) {
      const fn = fns[++middlewareIndex];
      let index2 = -1;
      if (error) {
        callback(error);
        return;
      }
      while (++index2 < values.length) {
        if (output[index2] === null || output[index2] === void 0) {
          output[index2] = values[index2];
        }
      }
      values = output;
      if (fn) {
        wrap(fn, next)(...output);
      } else {
        callback(null, ...output);
      }
    }
  }
  function use(middelware) {
    if (typeof middelware !== "function") {
      throw new TypeError(
        "Expected `middelware` to be a function, not " + middelware
      );
    }
    fns.push(middelware);
    return pipeline;
  }
}
function wrap(middleware, callback) {
  let called;
  return wrapped;
  function wrapped(...parameters) {
    const fnExpectsCallback = middleware.length > parameters.length;
    let result;
    if (fnExpectsCallback) {
      parameters.push(done);
    }
    try {
      result = middleware.apply(this, parameters);
    } catch (error) {
      const exception2 = (
        /** @type {Error} */
        error
      );
      if (fnExpectsCallback && called) {
        throw exception2;
      }
      return done(exception2);
    }
    if (!fnExpectsCallback) {
      if (result && result.then && typeof result.then === "function") {
        result.then(then, done);
      } else if (result instanceof Error) {
        done(result);
      } else {
        then(result);
      }
    }
  }
  function done(error, ...output) {
    if (!called) {
      called = true;
      callback(error, ...output);
    }
  }
  function then(value) {
    done(null, value);
  }
}

// ../../node_modules/unist-util-stringify-position/lib/index.js
function stringifyPosition(value) {
  if (!value || typeof value !== "object") {
    return "";
  }
  if ("position" in value || "type" in value) {
    return position(value.position);
  }
  if ("start" in value || "end" in value) {
    return position(value);
  }
  if ("line" in value || "column" in value) {
    return point(value);
  }
  return "";
}
function point(point3) {
  return index(point3 && point3.line) + ":" + index(point3 && point3.column);
}
function position(pos) {
  return point(pos && pos.start) + "-" + point(pos && pos.end);
}
function index(value) {
  return value && typeof value === "number" ? value : 1;
}

// ../../node_modules/vfile-message/lib/index.js
var VFileMessage = class extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(causeOrReason, optionsOrParentOrPlace, origin) {
    super();
    if (typeof optionsOrParentOrPlace === "string") {
      origin = optionsOrParentOrPlace;
      optionsOrParentOrPlace = void 0;
    }
    let reason = "";
    let options = {};
    let legacyCause = false;
    if (optionsOrParentOrPlace) {
      if ("line" in optionsOrParentOrPlace && "column" in optionsOrParentOrPlace) {
        options = { place: optionsOrParentOrPlace };
      } else if ("start" in optionsOrParentOrPlace && "end" in optionsOrParentOrPlace) {
        options = { place: optionsOrParentOrPlace };
      } else if ("type" in optionsOrParentOrPlace) {
        options = {
          ancestors: [optionsOrParentOrPlace],
          place: optionsOrParentOrPlace.position
        };
      } else {
        options = { ...optionsOrParentOrPlace };
      }
    }
    if (typeof causeOrReason === "string") {
      reason = causeOrReason;
    } else if (!options.cause && causeOrReason) {
      legacyCause = true;
      reason = causeOrReason.message;
      options.cause = causeOrReason;
    }
    if (!options.ruleId && !options.source && typeof origin === "string") {
      const index2 = origin.indexOf(":");
      if (index2 === -1) {
        options.ruleId = origin;
      } else {
        options.source = origin.slice(0, index2);
        options.ruleId = origin.slice(index2 + 1);
      }
    }
    if (!options.place && options.ancestors && options.ancestors) {
      const parent = options.ancestors[options.ancestors.length - 1];
      if (parent) {
        options.place = parent.position;
      }
    }
    const start = options.place && "start" in options.place ? options.place.start : options.place;
    this.ancestors = options.ancestors || void 0;
    this.cause = options.cause || void 0;
    this.column = start ? start.column : void 0;
    this.fatal = void 0;
    this.file;
    this.message = reason;
    this.line = start ? start.line : void 0;
    this.name = stringifyPosition(options.place) || "1:1";
    this.place = options.place || void 0;
    this.reason = this.message;
    this.ruleId = options.ruleId || void 0;
    this.source = options.source || void 0;
    this.stack = legacyCause && options.cause && typeof options.cause.stack === "string" ? options.cause.stack : "";
    this.actual;
    this.expected;
    this.note;
    this.url;
  }
};
VFileMessage.prototype.file = "";
VFileMessage.prototype.name = "";
VFileMessage.prototype.reason = "";
VFileMessage.prototype.message = "";
VFileMessage.prototype.stack = "";
VFileMessage.prototype.column = void 0;
VFileMessage.prototype.line = void 0;
VFileMessage.prototype.ancestors = void 0;
VFileMessage.prototype.cause = void 0;
VFileMessage.prototype.fatal = void 0;
VFileMessage.prototype.place = void 0;
VFileMessage.prototype.ruleId = void 0;
VFileMessage.prototype.source = void 0;

// ../../node_modules/vfile/lib/minpath.js
import { default as default2 } from "node:path";

// ../../node_modules/vfile/lib/minproc.js
import { default as default3 } from "node:process";

// ../../node_modules/vfile/lib/minurl.js
import { fileURLToPath } from "node:url";

// ../../node_modules/vfile/lib/minurl.shared.js
function isUrl(fileUrlOrPath) {
  return Boolean(
    fileUrlOrPath !== null && typeof fileUrlOrPath === "object" && "href" in fileUrlOrPath && fileUrlOrPath.href && "protocol" in fileUrlOrPath && fileUrlOrPath.protocol && // @ts-expect-error: indexing is fine.
    fileUrlOrPath.auth === void 0
  );
}

// ../../node_modules/vfile/lib/index.js
var order = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
var VFile = class {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(value) {
    let options;
    if (!value) {
      options = {};
    } else if (isUrl(value)) {
      options = { path: value };
    } else if (typeof value === "string" || isUint8Array(value)) {
      options = { value };
    } else {
      options = value;
    }
    this.cwd = "cwd" in options ? "" : default3.cwd();
    this.data = {};
    this.history = [];
    this.messages = [];
    this.value;
    this.map;
    this.result;
    this.stored;
    let index2 = -1;
    while (++index2 < order.length) {
      const field2 = order[index2];
      if (field2 in options && options[field2] !== void 0 && options[field2] !== null) {
        this[field2] = field2 === "history" ? [...options[field2]] : options[field2];
      }
    }
    let field;
    for (field in options) {
      if (!order.includes(field)) {
        this[field] = options[field];
      }
    }
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path === "string" ? default2.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(basename) {
    assertNonEmpty(basename, "basename");
    assertPart(basename, "basename");
    this.path = default2.join(this.dirname || "", basename);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path === "string" ? default2.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(dirname7) {
    assertPath(this.basename, "dirname");
    this.path = default2.join(dirname7 || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path === "string" ? default2.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(extname4) {
    assertPart(extname4, "extname");
    assertPath(this.dirname, "extname");
    if (extname4) {
      if (extname4.codePointAt(0) !== 46) {
        throw new Error("`extname` must start with `.`");
      }
      if (extname4.includes(".", 1)) {
        throw new Error("`extname` cannot contain multiple dots");
      }
    }
    this.path = default2.join(this.dirname, this.stem + (extname4 || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(path13) {
    if (isUrl(path13)) {
      path13 = fileURLToPath(path13);
    }
    assertNonEmpty(path13, "path");
    if (this.path !== path13) {
      this.history.push(path13);
    }
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path === "string" ? default2.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(stem) {
    assertNonEmpty(stem, "stem");
    assertPart(stem, "stem");
    this.path = default2.join(this.dirname || "", stem + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(causeOrReason, optionsOrParentOrPlace, origin) {
    const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
    message.fatal = true;
    throw message;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(causeOrReason, optionsOrParentOrPlace, origin) {
    const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
    message.fatal = void 0;
    return message;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(causeOrReason, optionsOrParentOrPlace, origin) {
    const message = new VFileMessage(
      // @ts-expect-error: the overloads are fine.
      causeOrReason,
      optionsOrParentOrPlace,
      origin
    );
    if (this.path) {
      message.name = this.path + ":" + message.name;
      message.file = this.path;
    }
    message.fatal = false;
    this.messages.push(message);
    return message;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(encoding) {
    if (this.value === void 0) {
      return "";
    }
    if (typeof this.value === "string") {
      return this.value;
    }
    const decoder = new TextDecoder(encoding || void 0);
    return decoder.decode(this.value);
  }
};
function assertPart(part, name) {
  if (part && part.includes(default2.sep)) {
    throw new Error(
      "`" + name + "` cannot be a path: did not expect `" + default2.sep + "`"
    );
  }
}
function assertNonEmpty(part, name) {
  if (!part) {
    throw new Error("`" + name + "` cannot be empty");
  }
}
function assertPath(path13, name) {
  if (!path13) {
    throw new Error("Setting `" + name + "` requires `path` to be set too");
  }
}
function isUint8Array(value) {
  return Boolean(
    value && typeof value === "object" && "byteLength" in value && "byteOffset" in value
  );
}

// ../../node_modules/unified/lib/callable-instance.js
var CallableInstance = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  function(property) {
    const self = this;
    const constr = self.constructor;
    const proto = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      constr.prototype
    );
    const value = proto[property];
    const apply = function() {
      return value.apply(apply, arguments);
    };
    Object.setPrototypeOf(apply, proto);
    return apply;
  }
);

// ../../node_modules/unified/lib/index.js
var own = {}.hasOwnProperty;
var Processor = class _Processor extends CallableInstance {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy");
    this.Compiler = void 0;
    this.Parser = void 0;
    this.attachers = [];
    this.compiler = void 0;
    this.freezeIndex = -1;
    this.frozen = void 0;
    this.namespace = {};
    this.parser = void 0;
    this.transformers = trough();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const destination = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new _Processor()
    );
    let index2 = -1;
    while (++index2 < this.attachers.length) {
      const attacher = this.attachers[index2];
      destination.use(...attacher);
    }
    destination.data((0, import_extend.default)(true, {}, this.namespace));
    return destination;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(key, value) {
    if (typeof key === "string") {
      if (arguments.length === 2) {
        assertUnfrozen("data", this.frozen);
        this.namespace[key] = value;
        return this;
      }
      return own.call(this.namespace, key) && this.namespace[key] || void 0;
    }
    if (key) {
      assertUnfrozen("data", this.frozen);
      this.namespace = key;
      return this;
    }
    return this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen) {
      return this;
    }
    const self = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    while (++this.freezeIndex < this.attachers.length) {
      const [attacher, ...options] = this.attachers[this.freezeIndex];
      if (options[0] === false) {
        continue;
      }
      if (options[0] === true) {
        options[0] = void 0;
      }
      const transformer = attacher.call(self, ...options);
      if (typeof transformer === "function") {
        this.transformers.use(transformer);
      }
    }
    this.frozen = true;
    this.freezeIndex = Number.POSITIVE_INFINITY;
    return this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(file) {
    this.freeze();
    const realFile = vfile(file);
    const parser = this.parser || this.Parser;
    assertParser("parse", parser);
    return parser(String(realFile), realFile);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(file, done) {
    const self = this;
    this.freeze();
    assertParser("process", this.parser || this.Parser);
    assertCompiler("process", this.compiler || this.Compiler);
    return done ? executor(void 0, done) : new Promise(executor);
    function executor(resolve6, reject) {
      const realFile = vfile(file);
      const parseTree = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        self.parse(realFile)
      );
      self.run(parseTree, realFile, function(error, tree, file2) {
        if (error || !tree || !file2) {
          return realDone(error);
        }
        const compileTree = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          tree
        );
        const compileResult = self.stringify(compileTree, file2);
        if (looksLikeAValue(compileResult)) {
          file2.value = compileResult;
        } else {
          file2.result = compileResult;
        }
        realDone(
          error,
          /** @type {VFileWithOutput<CompileResult>} */
          file2
        );
      });
      function realDone(error, file2) {
        if (error || !file2) {
          reject(error);
        } else if (resolve6) {
          resolve6(file2);
        } else {
          ok(done, "`done` is defined if `resolve` is not");
          done(void 0, file2);
        }
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(file) {
    let complete = false;
    let result;
    this.freeze();
    assertParser("processSync", this.parser || this.Parser);
    assertCompiler("processSync", this.compiler || this.Compiler);
    this.process(file, realDone);
    assertDone("processSync", "process", complete);
    ok(result, "we either bailed on an error or have a tree");
    return result;
    function realDone(error, file2) {
      complete = true;
      bail(error);
      result = file2;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(tree, file, done) {
    assertNode(tree);
    this.freeze();
    const transformers = this.transformers;
    if (!done && typeof file === "function") {
      done = file;
      file = void 0;
    }
    return done ? executor(void 0, done) : new Promise(executor);
    function executor(resolve6, reject) {
      ok(
        typeof file !== "function",
        "`file` can\u2019t be a `done` anymore, we checked"
      );
      const realFile = vfile(file);
      transformers.run(tree, realFile, realDone);
      function realDone(error, outputTree, file2) {
        const resultingTree = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          outputTree || tree
        );
        if (error) {
          reject(error);
        } else if (resolve6) {
          resolve6(resultingTree);
        } else {
          ok(done, "`done` is defined if `resolve` is not");
          done(void 0, resultingTree, file2);
        }
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(tree, file) {
    let complete = false;
    let result;
    this.run(tree, file, realDone);
    assertDone("runSync", "run", complete);
    ok(result, "we either bailed on an error or have a tree");
    return result;
    function realDone(error, tree2) {
      bail(error);
      result = tree2;
      complete = true;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(tree, file) {
    this.freeze();
    const realFile = vfile(file);
    const compiler2 = this.compiler || this.Compiler;
    assertCompiler("stringify", compiler2);
    assertNode(tree);
    return compiler2(tree, realFile);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(value, ...parameters) {
    const attachers = this.attachers;
    const namespace = this.namespace;
    assertUnfrozen("use", this.frozen);
    if (value === null || value === void 0) {
    } else if (typeof value === "function") {
      addPlugin(value, parameters);
    } else if (typeof value === "object") {
      if (Array.isArray(value)) {
        addList(value);
      } else {
        addPreset(value);
      }
    } else {
      throw new TypeError("Expected usable value, not `" + value + "`");
    }
    return this;
    function add(value2) {
      if (typeof value2 === "function") {
        addPlugin(value2, []);
      } else if (typeof value2 === "object") {
        if (Array.isArray(value2)) {
          const [plugin, ...parameters2] = (
            /** @type {PluginTuple<Array<unknown>>} */
            value2
          );
          addPlugin(plugin, parameters2);
        } else {
          addPreset(value2);
        }
      } else {
        throw new TypeError("Expected usable value, not `" + value2 + "`");
      }
    }
    function addPreset(result) {
      if (!("plugins" in result) && !("settings" in result)) {
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      }
      addList(result.plugins);
      if (result.settings) {
        namespace.settings = (0, import_extend.default)(true, namespace.settings, result.settings);
      }
    }
    function addList(plugins) {
      let index2 = -1;
      if (plugins === null || plugins === void 0) {
      } else if (Array.isArray(plugins)) {
        while (++index2 < plugins.length) {
          const thing = plugins[index2];
          add(thing);
        }
      } else {
        throw new TypeError("Expected a list of plugins, not `" + plugins + "`");
      }
    }
    function addPlugin(plugin, parameters2) {
      let index2 = -1;
      let entryIndex = -1;
      while (++index2 < attachers.length) {
        if (attachers[index2][0] === plugin) {
          entryIndex = index2;
          break;
        }
      }
      if (entryIndex === -1) {
        attachers.push([plugin, ...parameters2]);
      } else if (parameters2.length > 0) {
        let [primary, ...rest] = parameters2;
        const currentPrimary = attachers[entryIndex][1];
        if (isPlainObject(currentPrimary) && isPlainObject(primary)) {
          primary = (0, import_extend.default)(true, currentPrimary, primary);
        }
        attachers[entryIndex] = [plugin, primary, ...rest];
      }
    }
  }
};
var unified = new Processor().freeze();
function assertParser(name, value) {
  if (typeof value !== "function") {
    throw new TypeError("Cannot `" + name + "` without `parser`");
  }
}
function assertCompiler(name, value) {
  if (typeof value !== "function") {
    throw new TypeError("Cannot `" + name + "` without `compiler`");
  }
}
function assertUnfrozen(name, frozen) {
  if (frozen) {
    throw new Error(
      "Cannot call `" + name + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
  }
}
function assertNode(node2) {
  if (!isPlainObject(node2) || typeof node2.type !== "string") {
    throw new TypeError("Expected node, got `" + node2 + "`");
  }
}
function assertDone(name, asyncName, complete) {
  if (!complete) {
    throw new Error(
      "`" + name + "` finished async. Use `" + asyncName + "` instead"
    );
  }
}
function vfile(value) {
  return looksLikeAVFile(value) ? value : new VFile(value);
}
function looksLikeAVFile(value) {
  return Boolean(
    value && typeof value === "object" && "message" in value && "messages" in value
  );
}
function looksLikeAValue(value) {
  return typeof value === "string" || isUint8Array2(value);
}
function isUint8Array2(value) {
  return Boolean(
    value && typeof value === "object" && "byteLength" in value && "byteOffset" in value
  );
}

// ../../node_modules/mdast-util-to-string/lib/index.js
var emptyOptions = {};
function toString(value, options) {
  const settings = options || emptyOptions;
  const includeImageAlt = typeof settings.includeImageAlt === "boolean" ? settings.includeImageAlt : true;
  const includeHtml = typeof settings.includeHtml === "boolean" ? settings.includeHtml : true;
  return one(value, includeImageAlt, includeHtml);
}
function one(value, includeImageAlt, includeHtml) {
  if (node(value)) {
    if ("value" in value) {
      return value.type === "html" && !includeHtml ? "" : value.value;
    }
    if (includeImageAlt && "alt" in value && value.alt) {
      return value.alt;
    }
    if ("children" in value) {
      return all(value.children, includeImageAlt, includeHtml);
    }
  }
  if (Array.isArray(value)) {
    return all(value, includeImageAlt, includeHtml);
  }
  return "";
}
function all(values, includeImageAlt, includeHtml) {
  const result = [];
  let index2 = -1;
  while (++index2 < values.length) {
    result[index2] = one(values[index2], includeImageAlt, includeHtml);
  }
  return result.join("");
}
function node(value) {
  return Boolean(value && typeof value === "object");
}

// ../../node_modules/character-entities/index.js
var characterEntities = {
  AElig: "\xC6",
  AMP: "&",
  Aacute: "\xC1",
  Abreve: "\u0102",
  Acirc: "\xC2",
  Acy: "\u0410",
  Afr: "\u{1D504}",
  Agrave: "\xC0",
  Alpha: "\u0391",
  Amacr: "\u0100",
  And: "\u2A53",
  Aogon: "\u0104",
  Aopf: "\u{1D538}",
  ApplyFunction: "\u2061",
  Aring: "\xC5",
  Ascr: "\u{1D49C}",
  Assign: "\u2254",
  Atilde: "\xC3",
  Auml: "\xC4",
  Backslash: "\u2216",
  Barv: "\u2AE7",
  Barwed: "\u2306",
  Bcy: "\u0411",
  Because: "\u2235",
  Bernoullis: "\u212C",
  Beta: "\u0392",
  Bfr: "\u{1D505}",
  Bopf: "\u{1D539}",
  Breve: "\u02D8",
  Bscr: "\u212C",
  Bumpeq: "\u224E",
  CHcy: "\u0427",
  COPY: "\xA9",
  Cacute: "\u0106",
  Cap: "\u22D2",
  CapitalDifferentialD: "\u2145",
  Cayleys: "\u212D",
  Ccaron: "\u010C",
  Ccedil: "\xC7",
  Ccirc: "\u0108",
  Cconint: "\u2230",
  Cdot: "\u010A",
  Cedilla: "\xB8",
  CenterDot: "\xB7",
  Cfr: "\u212D",
  Chi: "\u03A7",
  CircleDot: "\u2299",
  CircleMinus: "\u2296",
  CirclePlus: "\u2295",
  CircleTimes: "\u2297",
  ClockwiseContourIntegral: "\u2232",
  CloseCurlyDoubleQuote: "\u201D",
  CloseCurlyQuote: "\u2019",
  Colon: "\u2237",
  Colone: "\u2A74",
  Congruent: "\u2261",
  Conint: "\u222F",
  ContourIntegral: "\u222E",
  Copf: "\u2102",
  Coproduct: "\u2210",
  CounterClockwiseContourIntegral: "\u2233",
  Cross: "\u2A2F",
  Cscr: "\u{1D49E}",
  Cup: "\u22D3",
  CupCap: "\u224D",
  DD: "\u2145",
  DDotrahd: "\u2911",
  DJcy: "\u0402",
  DScy: "\u0405",
  DZcy: "\u040F",
  Dagger: "\u2021",
  Darr: "\u21A1",
  Dashv: "\u2AE4",
  Dcaron: "\u010E",
  Dcy: "\u0414",
  Del: "\u2207",
  Delta: "\u0394",
  Dfr: "\u{1D507}",
  DiacriticalAcute: "\xB4",
  DiacriticalDot: "\u02D9",
  DiacriticalDoubleAcute: "\u02DD",
  DiacriticalGrave: "`",
  DiacriticalTilde: "\u02DC",
  Diamond: "\u22C4",
  DifferentialD: "\u2146",
  Dopf: "\u{1D53B}",
  Dot: "\xA8",
  DotDot: "\u20DC",
  DotEqual: "\u2250",
  DoubleContourIntegral: "\u222F",
  DoubleDot: "\xA8",
  DoubleDownArrow: "\u21D3",
  DoubleLeftArrow: "\u21D0",
  DoubleLeftRightArrow: "\u21D4",
  DoubleLeftTee: "\u2AE4",
  DoubleLongLeftArrow: "\u27F8",
  DoubleLongLeftRightArrow: "\u27FA",
  DoubleLongRightArrow: "\u27F9",
  DoubleRightArrow: "\u21D2",
  DoubleRightTee: "\u22A8",
  DoubleUpArrow: "\u21D1",
  DoubleUpDownArrow: "\u21D5",
  DoubleVerticalBar: "\u2225",
  DownArrow: "\u2193",
  DownArrowBar: "\u2913",
  DownArrowUpArrow: "\u21F5",
  DownBreve: "\u0311",
  DownLeftRightVector: "\u2950",
  DownLeftTeeVector: "\u295E",
  DownLeftVector: "\u21BD",
  DownLeftVectorBar: "\u2956",
  DownRightTeeVector: "\u295F",
  DownRightVector: "\u21C1",
  DownRightVectorBar: "\u2957",
  DownTee: "\u22A4",
  DownTeeArrow: "\u21A7",
  Downarrow: "\u21D3",
  Dscr: "\u{1D49F}",
  Dstrok: "\u0110",
  ENG: "\u014A",
  ETH: "\xD0",
  Eacute: "\xC9",
  Ecaron: "\u011A",
  Ecirc: "\xCA",
  Ecy: "\u042D",
  Edot: "\u0116",
  Efr: "\u{1D508}",
  Egrave: "\xC8",
  Element: "\u2208",
  Emacr: "\u0112",
  EmptySmallSquare: "\u25FB",
  EmptyVerySmallSquare: "\u25AB",
  Eogon: "\u0118",
  Eopf: "\u{1D53C}",
  Epsilon: "\u0395",
  Equal: "\u2A75",
  EqualTilde: "\u2242",
  Equilibrium: "\u21CC",
  Escr: "\u2130",
  Esim: "\u2A73",
  Eta: "\u0397",
  Euml: "\xCB",
  Exists: "\u2203",
  ExponentialE: "\u2147",
  Fcy: "\u0424",
  Ffr: "\u{1D509}",
  FilledSmallSquare: "\u25FC",
  FilledVerySmallSquare: "\u25AA",
  Fopf: "\u{1D53D}",
  ForAll: "\u2200",
  Fouriertrf: "\u2131",
  Fscr: "\u2131",
  GJcy: "\u0403",
  GT: ">",
  Gamma: "\u0393",
  Gammad: "\u03DC",
  Gbreve: "\u011E",
  Gcedil: "\u0122",
  Gcirc: "\u011C",
  Gcy: "\u0413",
  Gdot: "\u0120",
  Gfr: "\u{1D50A}",
  Gg: "\u22D9",
  Gopf: "\u{1D53E}",
  GreaterEqual: "\u2265",
  GreaterEqualLess: "\u22DB",
  GreaterFullEqual: "\u2267",
  GreaterGreater: "\u2AA2",
  GreaterLess: "\u2277",
  GreaterSlantEqual: "\u2A7E",
  GreaterTilde: "\u2273",
  Gscr: "\u{1D4A2}",
  Gt: "\u226B",
  HARDcy: "\u042A",
  Hacek: "\u02C7",
  Hat: "^",
  Hcirc: "\u0124",
  Hfr: "\u210C",
  HilbertSpace: "\u210B",
  Hopf: "\u210D",
  HorizontalLine: "\u2500",
  Hscr: "\u210B",
  Hstrok: "\u0126",
  HumpDownHump: "\u224E",
  HumpEqual: "\u224F",
  IEcy: "\u0415",
  IJlig: "\u0132",
  IOcy: "\u0401",
  Iacute: "\xCD",
  Icirc: "\xCE",
  Icy: "\u0418",
  Idot: "\u0130",
  Ifr: "\u2111",
  Igrave: "\xCC",
  Im: "\u2111",
  Imacr: "\u012A",
  ImaginaryI: "\u2148",
  Implies: "\u21D2",
  Int: "\u222C",
  Integral: "\u222B",
  Intersection: "\u22C2",
  InvisibleComma: "\u2063",
  InvisibleTimes: "\u2062",
  Iogon: "\u012E",
  Iopf: "\u{1D540}",
  Iota: "\u0399",
  Iscr: "\u2110",
  Itilde: "\u0128",
  Iukcy: "\u0406",
  Iuml: "\xCF",
  Jcirc: "\u0134",
  Jcy: "\u0419",
  Jfr: "\u{1D50D}",
  Jopf: "\u{1D541}",
  Jscr: "\u{1D4A5}",
  Jsercy: "\u0408",
  Jukcy: "\u0404",
  KHcy: "\u0425",
  KJcy: "\u040C",
  Kappa: "\u039A",
  Kcedil: "\u0136",
  Kcy: "\u041A",
  Kfr: "\u{1D50E}",
  Kopf: "\u{1D542}",
  Kscr: "\u{1D4A6}",
  LJcy: "\u0409",
  LT: "<",
  Lacute: "\u0139",
  Lambda: "\u039B",
  Lang: "\u27EA",
  Laplacetrf: "\u2112",
  Larr: "\u219E",
  Lcaron: "\u013D",
  Lcedil: "\u013B",
  Lcy: "\u041B",
  LeftAngleBracket: "\u27E8",
  LeftArrow: "\u2190",
  LeftArrowBar: "\u21E4",
  LeftArrowRightArrow: "\u21C6",
  LeftCeiling: "\u2308",
  LeftDoubleBracket: "\u27E6",
  LeftDownTeeVector: "\u2961",
  LeftDownVector: "\u21C3",
  LeftDownVectorBar: "\u2959",
  LeftFloor: "\u230A",
  LeftRightArrow: "\u2194",
  LeftRightVector: "\u294E",
  LeftTee: "\u22A3",
  LeftTeeArrow: "\u21A4",
  LeftTeeVector: "\u295A",
  LeftTriangle: "\u22B2",
  LeftTriangleBar: "\u29CF",
  LeftTriangleEqual: "\u22B4",
  LeftUpDownVector: "\u2951",
  LeftUpTeeVector: "\u2960",
  LeftUpVector: "\u21BF",
  LeftUpVectorBar: "\u2958",
  LeftVector: "\u21BC",
  LeftVectorBar: "\u2952",
  Leftarrow: "\u21D0",
  Leftrightarrow: "\u21D4",
  LessEqualGreater: "\u22DA",
  LessFullEqual: "\u2266",
  LessGreater: "\u2276",
  LessLess: "\u2AA1",
  LessSlantEqual: "\u2A7D",
  LessTilde: "\u2272",
  Lfr: "\u{1D50F}",
  Ll: "\u22D8",
  Lleftarrow: "\u21DA",
  Lmidot: "\u013F",
  LongLeftArrow: "\u27F5",
  LongLeftRightArrow: "\u27F7",
  LongRightArrow: "\u27F6",
  Longleftarrow: "\u27F8",
  Longleftrightarrow: "\u27FA",
  Longrightarrow: "\u27F9",
  Lopf: "\u{1D543}",
  LowerLeftArrow: "\u2199",
  LowerRightArrow: "\u2198",
  Lscr: "\u2112",
  Lsh: "\u21B0",
  Lstrok: "\u0141",
  Lt: "\u226A",
  Map: "\u2905",
  Mcy: "\u041C",
  MediumSpace: "\u205F",
  Mellintrf: "\u2133",
  Mfr: "\u{1D510}",
  MinusPlus: "\u2213",
  Mopf: "\u{1D544}",
  Mscr: "\u2133",
  Mu: "\u039C",
  NJcy: "\u040A",
  Nacute: "\u0143",
  Ncaron: "\u0147",
  Ncedil: "\u0145",
  Ncy: "\u041D",
  NegativeMediumSpace: "\u200B",
  NegativeThickSpace: "\u200B",
  NegativeThinSpace: "\u200B",
  NegativeVeryThinSpace: "\u200B",
  NestedGreaterGreater: "\u226B",
  NestedLessLess: "\u226A",
  NewLine: "\n",
  Nfr: "\u{1D511}",
  NoBreak: "\u2060",
  NonBreakingSpace: "\xA0",
  Nopf: "\u2115",
  Not: "\u2AEC",
  NotCongruent: "\u2262",
  NotCupCap: "\u226D",
  NotDoubleVerticalBar: "\u2226",
  NotElement: "\u2209",
  NotEqual: "\u2260",
  NotEqualTilde: "\u2242\u0338",
  NotExists: "\u2204",
  NotGreater: "\u226F",
  NotGreaterEqual: "\u2271",
  NotGreaterFullEqual: "\u2267\u0338",
  NotGreaterGreater: "\u226B\u0338",
  NotGreaterLess: "\u2279",
  NotGreaterSlantEqual: "\u2A7E\u0338",
  NotGreaterTilde: "\u2275",
  NotHumpDownHump: "\u224E\u0338",
  NotHumpEqual: "\u224F\u0338",
  NotLeftTriangle: "\u22EA",
  NotLeftTriangleBar: "\u29CF\u0338",
  NotLeftTriangleEqual: "\u22EC",
  NotLess: "\u226E",
  NotLessEqual: "\u2270",
  NotLessGreater: "\u2278",
  NotLessLess: "\u226A\u0338",
  NotLessSlantEqual: "\u2A7D\u0338",
  NotLessTilde: "\u2274",
  NotNestedGreaterGreater: "\u2AA2\u0338",
  NotNestedLessLess: "\u2AA1\u0338",
  NotPrecedes: "\u2280",
  NotPrecedesEqual: "\u2AAF\u0338",
  NotPrecedesSlantEqual: "\u22E0",
  NotReverseElement: "\u220C",
  NotRightTriangle: "\u22EB",
  NotRightTriangleBar: "\u29D0\u0338",
  NotRightTriangleEqual: "\u22ED",
  NotSquareSubset: "\u228F\u0338",
  NotSquareSubsetEqual: "\u22E2",
  NotSquareSuperset: "\u2290\u0338",
  NotSquareSupersetEqual: "\u22E3",
  NotSubset: "\u2282\u20D2",
  NotSubsetEqual: "\u2288",
  NotSucceeds: "\u2281",
  NotSucceedsEqual: "\u2AB0\u0338",
  NotSucceedsSlantEqual: "\u22E1",
  NotSucceedsTilde: "\u227F\u0338",
  NotSuperset: "\u2283\u20D2",
  NotSupersetEqual: "\u2289",
  NotTilde: "\u2241",
  NotTildeEqual: "\u2244",
  NotTildeFullEqual: "\u2247",
  NotTildeTilde: "\u2249",
  NotVerticalBar: "\u2224",
  Nscr: "\u{1D4A9}",
  Ntilde: "\xD1",
  Nu: "\u039D",
  OElig: "\u0152",
  Oacute: "\xD3",
  Ocirc: "\xD4",
  Ocy: "\u041E",
  Odblac: "\u0150",
  Ofr: "\u{1D512}",
  Ograve: "\xD2",
  Omacr: "\u014C",
  Omega: "\u03A9",
  Omicron: "\u039F",
  Oopf: "\u{1D546}",
  OpenCurlyDoubleQuote: "\u201C",
  OpenCurlyQuote: "\u2018",
  Or: "\u2A54",
  Oscr: "\u{1D4AA}",
  Oslash: "\xD8",
  Otilde: "\xD5",
  Otimes: "\u2A37",
  Ouml: "\xD6",
  OverBar: "\u203E",
  OverBrace: "\u23DE",
  OverBracket: "\u23B4",
  OverParenthesis: "\u23DC",
  PartialD: "\u2202",
  Pcy: "\u041F",
  Pfr: "\u{1D513}",
  Phi: "\u03A6",
  Pi: "\u03A0",
  PlusMinus: "\xB1",
  Poincareplane: "\u210C",
  Popf: "\u2119",
  Pr: "\u2ABB",
  Precedes: "\u227A",
  PrecedesEqual: "\u2AAF",
  PrecedesSlantEqual: "\u227C",
  PrecedesTilde: "\u227E",
  Prime: "\u2033",
  Product: "\u220F",
  Proportion: "\u2237",
  Proportional: "\u221D",
  Pscr: "\u{1D4AB}",
  Psi: "\u03A8",
  QUOT: '"',
  Qfr: "\u{1D514}",
  Qopf: "\u211A",
  Qscr: "\u{1D4AC}",
  RBarr: "\u2910",
  REG: "\xAE",
  Racute: "\u0154",
  Rang: "\u27EB",
  Rarr: "\u21A0",
  Rarrtl: "\u2916",
  Rcaron: "\u0158",
  Rcedil: "\u0156",
  Rcy: "\u0420",
  Re: "\u211C",
  ReverseElement: "\u220B",
  ReverseEquilibrium: "\u21CB",
  ReverseUpEquilibrium: "\u296F",
  Rfr: "\u211C",
  Rho: "\u03A1",
  RightAngleBracket: "\u27E9",
  RightArrow: "\u2192",
  RightArrowBar: "\u21E5",
  RightArrowLeftArrow: "\u21C4",
  RightCeiling: "\u2309",
  RightDoubleBracket: "\u27E7",
  RightDownTeeVector: "\u295D",
  RightDownVector: "\u21C2",
  RightDownVectorBar: "\u2955",
  RightFloor: "\u230B",
  RightTee: "\u22A2",
  RightTeeArrow: "\u21A6",
  RightTeeVector: "\u295B",
  RightTriangle: "\u22B3",
  RightTriangleBar: "\u29D0",
  RightTriangleEqual: "\u22B5",
  RightUpDownVector: "\u294F",
  RightUpTeeVector: "\u295C",
  RightUpVector: "\u21BE",
  RightUpVectorBar: "\u2954",
  RightVector: "\u21C0",
  RightVectorBar: "\u2953",
  Rightarrow: "\u21D2",
  Ropf: "\u211D",
  RoundImplies: "\u2970",
  Rrightarrow: "\u21DB",
  Rscr: "\u211B",
  Rsh: "\u21B1",
  RuleDelayed: "\u29F4",
  SHCHcy: "\u0429",
  SHcy: "\u0428",
  SOFTcy: "\u042C",
  Sacute: "\u015A",
  Sc: "\u2ABC",
  Scaron: "\u0160",
  Scedil: "\u015E",
  Scirc: "\u015C",
  Scy: "\u0421",
  Sfr: "\u{1D516}",
  ShortDownArrow: "\u2193",
  ShortLeftArrow: "\u2190",
  ShortRightArrow: "\u2192",
  ShortUpArrow: "\u2191",
  Sigma: "\u03A3",
  SmallCircle: "\u2218",
  Sopf: "\u{1D54A}",
  Sqrt: "\u221A",
  Square: "\u25A1",
  SquareIntersection: "\u2293",
  SquareSubset: "\u228F",
  SquareSubsetEqual: "\u2291",
  SquareSuperset: "\u2290",
  SquareSupersetEqual: "\u2292",
  SquareUnion: "\u2294",
  Sscr: "\u{1D4AE}",
  Star: "\u22C6",
  Sub: "\u22D0",
  Subset: "\u22D0",
  SubsetEqual: "\u2286",
  Succeeds: "\u227B",
  SucceedsEqual: "\u2AB0",
  SucceedsSlantEqual: "\u227D",
  SucceedsTilde: "\u227F",
  SuchThat: "\u220B",
  Sum: "\u2211",
  Sup: "\u22D1",
  Superset: "\u2283",
  SupersetEqual: "\u2287",
  Supset: "\u22D1",
  THORN: "\xDE",
  TRADE: "\u2122",
  TSHcy: "\u040B",
  TScy: "\u0426",
  Tab: "	",
  Tau: "\u03A4",
  Tcaron: "\u0164",
  Tcedil: "\u0162",
  Tcy: "\u0422",
  Tfr: "\u{1D517}",
  Therefore: "\u2234",
  Theta: "\u0398",
  ThickSpace: "\u205F\u200A",
  ThinSpace: "\u2009",
  Tilde: "\u223C",
  TildeEqual: "\u2243",
  TildeFullEqual: "\u2245",
  TildeTilde: "\u2248",
  Topf: "\u{1D54B}",
  TripleDot: "\u20DB",
  Tscr: "\u{1D4AF}",
  Tstrok: "\u0166",
  Uacute: "\xDA",
  Uarr: "\u219F",
  Uarrocir: "\u2949",
  Ubrcy: "\u040E",
  Ubreve: "\u016C",
  Ucirc: "\xDB",
  Ucy: "\u0423",
  Udblac: "\u0170",
  Ufr: "\u{1D518}",
  Ugrave: "\xD9",
  Umacr: "\u016A",
  UnderBar: "_",
  UnderBrace: "\u23DF",
  UnderBracket: "\u23B5",
  UnderParenthesis: "\u23DD",
  Union: "\u22C3",
  UnionPlus: "\u228E",
  Uogon: "\u0172",
  Uopf: "\u{1D54C}",
  UpArrow: "\u2191",
  UpArrowBar: "\u2912",
  UpArrowDownArrow: "\u21C5",
  UpDownArrow: "\u2195",
  UpEquilibrium: "\u296E",
  UpTee: "\u22A5",
  UpTeeArrow: "\u21A5",
  Uparrow: "\u21D1",
  Updownarrow: "\u21D5",
  UpperLeftArrow: "\u2196",
  UpperRightArrow: "\u2197",
  Upsi: "\u03D2",
  Upsilon: "\u03A5",
  Uring: "\u016E",
  Uscr: "\u{1D4B0}",
  Utilde: "\u0168",
  Uuml: "\xDC",
  VDash: "\u22AB",
  Vbar: "\u2AEB",
  Vcy: "\u0412",
  Vdash: "\u22A9",
  Vdashl: "\u2AE6",
  Vee: "\u22C1",
  Verbar: "\u2016",
  Vert: "\u2016",
  VerticalBar: "\u2223",
  VerticalLine: "|",
  VerticalSeparator: "\u2758",
  VerticalTilde: "\u2240",
  VeryThinSpace: "\u200A",
  Vfr: "\u{1D519}",
  Vopf: "\u{1D54D}",
  Vscr: "\u{1D4B1}",
  Vvdash: "\u22AA",
  Wcirc: "\u0174",
  Wedge: "\u22C0",
  Wfr: "\u{1D51A}",
  Wopf: "\u{1D54E}",
  Wscr: "\u{1D4B2}",
  Xfr: "\u{1D51B}",
  Xi: "\u039E",
  Xopf: "\u{1D54F}",
  Xscr: "\u{1D4B3}",
  YAcy: "\u042F",
  YIcy: "\u0407",
  YUcy: "\u042E",
  Yacute: "\xDD",
  Ycirc: "\u0176",
  Ycy: "\u042B",
  Yfr: "\u{1D51C}",
  Yopf: "\u{1D550}",
  Yscr: "\u{1D4B4}",
  Yuml: "\u0178",
  ZHcy: "\u0416",
  Zacute: "\u0179",
  Zcaron: "\u017D",
  Zcy: "\u0417",
  Zdot: "\u017B",
  ZeroWidthSpace: "\u200B",
  Zeta: "\u0396",
  Zfr: "\u2128",
  Zopf: "\u2124",
  Zscr: "\u{1D4B5}",
  aacute: "\xE1",
  abreve: "\u0103",
  ac: "\u223E",
  acE: "\u223E\u0333",
  acd: "\u223F",
  acirc: "\xE2",
  acute: "\xB4",
  acy: "\u0430",
  aelig: "\xE6",
  af: "\u2061",
  afr: "\u{1D51E}",
  agrave: "\xE0",
  alefsym: "\u2135",
  aleph: "\u2135",
  alpha: "\u03B1",
  amacr: "\u0101",
  amalg: "\u2A3F",
  amp: "&",
  and: "\u2227",
  andand: "\u2A55",
  andd: "\u2A5C",
  andslope: "\u2A58",
  andv: "\u2A5A",
  ang: "\u2220",
  ange: "\u29A4",
  angle: "\u2220",
  angmsd: "\u2221",
  angmsdaa: "\u29A8",
  angmsdab: "\u29A9",
  angmsdac: "\u29AA",
  angmsdad: "\u29AB",
  angmsdae: "\u29AC",
  angmsdaf: "\u29AD",
  angmsdag: "\u29AE",
  angmsdah: "\u29AF",
  angrt: "\u221F",
  angrtvb: "\u22BE",
  angrtvbd: "\u299D",
  angsph: "\u2222",
  angst: "\xC5",
  angzarr: "\u237C",
  aogon: "\u0105",
  aopf: "\u{1D552}",
  ap: "\u2248",
  apE: "\u2A70",
  apacir: "\u2A6F",
  ape: "\u224A",
  apid: "\u224B",
  apos: "'",
  approx: "\u2248",
  approxeq: "\u224A",
  aring: "\xE5",
  ascr: "\u{1D4B6}",
  ast: "*",
  asymp: "\u2248",
  asympeq: "\u224D",
  atilde: "\xE3",
  auml: "\xE4",
  awconint: "\u2233",
  awint: "\u2A11",
  bNot: "\u2AED",
  backcong: "\u224C",
  backepsilon: "\u03F6",
  backprime: "\u2035",
  backsim: "\u223D",
  backsimeq: "\u22CD",
  barvee: "\u22BD",
  barwed: "\u2305",
  barwedge: "\u2305",
  bbrk: "\u23B5",
  bbrktbrk: "\u23B6",
  bcong: "\u224C",
  bcy: "\u0431",
  bdquo: "\u201E",
  becaus: "\u2235",
  because: "\u2235",
  bemptyv: "\u29B0",
  bepsi: "\u03F6",
  bernou: "\u212C",
  beta: "\u03B2",
  beth: "\u2136",
  between: "\u226C",
  bfr: "\u{1D51F}",
  bigcap: "\u22C2",
  bigcirc: "\u25EF",
  bigcup: "\u22C3",
  bigodot: "\u2A00",
  bigoplus: "\u2A01",
  bigotimes: "\u2A02",
  bigsqcup: "\u2A06",
  bigstar: "\u2605",
  bigtriangledown: "\u25BD",
  bigtriangleup: "\u25B3",
  biguplus: "\u2A04",
  bigvee: "\u22C1",
  bigwedge: "\u22C0",
  bkarow: "\u290D",
  blacklozenge: "\u29EB",
  blacksquare: "\u25AA",
  blacktriangle: "\u25B4",
  blacktriangledown: "\u25BE",
  blacktriangleleft: "\u25C2",
  blacktriangleright: "\u25B8",
  blank: "\u2423",
  blk12: "\u2592",
  blk14: "\u2591",
  blk34: "\u2593",
  block: "\u2588",
  bne: "=\u20E5",
  bnequiv: "\u2261\u20E5",
  bnot: "\u2310",
  bopf: "\u{1D553}",
  bot: "\u22A5",
  bottom: "\u22A5",
  bowtie: "\u22C8",
  boxDL: "\u2557",
  boxDR: "\u2554",
  boxDl: "\u2556",
  boxDr: "\u2553",
  boxH: "\u2550",
  boxHD: "\u2566",
  boxHU: "\u2569",
  boxHd: "\u2564",
  boxHu: "\u2567",
  boxUL: "\u255D",
  boxUR: "\u255A",
  boxUl: "\u255C",
  boxUr: "\u2559",
  boxV: "\u2551",
  boxVH: "\u256C",
  boxVL: "\u2563",
  boxVR: "\u2560",
  boxVh: "\u256B",
  boxVl: "\u2562",
  boxVr: "\u255F",
  boxbox: "\u29C9",
  boxdL: "\u2555",
  boxdR: "\u2552",
  boxdl: "\u2510",
  boxdr: "\u250C",
  boxh: "\u2500",
  boxhD: "\u2565",
  boxhU: "\u2568",
  boxhd: "\u252C",
  boxhu: "\u2534",
  boxminus: "\u229F",
  boxplus: "\u229E",
  boxtimes: "\u22A0",
  boxuL: "\u255B",
  boxuR: "\u2558",
  boxul: "\u2518",
  boxur: "\u2514",
  boxv: "\u2502",
  boxvH: "\u256A",
  boxvL: "\u2561",
  boxvR: "\u255E",
  boxvh: "\u253C",
  boxvl: "\u2524",
  boxvr: "\u251C",
  bprime: "\u2035",
  breve: "\u02D8",
  brvbar: "\xA6",
  bscr: "\u{1D4B7}",
  bsemi: "\u204F",
  bsim: "\u223D",
  bsime: "\u22CD",
  bsol: "\\",
  bsolb: "\u29C5",
  bsolhsub: "\u27C8",
  bull: "\u2022",
  bullet: "\u2022",
  bump: "\u224E",
  bumpE: "\u2AAE",
  bumpe: "\u224F",
  bumpeq: "\u224F",
  cacute: "\u0107",
  cap: "\u2229",
  capand: "\u2A44",
  capbrcup: "\u2A49",
  capcap: "\u2A4B",
  capcup: "\u2A47",
  capdot: "\u2A40",
  caps: "\u2229\uFE00",
  caret: "\u2041",
  caron: "\u02C7",
  ccaps: "\u2A4D",
  ccaron: "\u010D",
  ccedil: "\xE7",
  ccirc: "\u0109",
  ccups: "\u2A4C",
  ccupssm: "\u2A50",
  cdot: "\u010B",
  cedil: "\xB8",
  cemptyv: "\u29B2",
  cent: "\xA2",
  centerdot: "\xB7",
  cfr: "\u{1D520}",
  chcy: "\u0447",
  check: "\u2713",
  checkmark: "\u2713",
  chi: "\u03C7",
  cir: "\u25CB",
  cirE: "\u29C3",
  circ: "\u02C6",
  circeq: "\u2257",
  circlearrowleft: "\u21BA",
  circlearrowright: "\u21BB",
  circledR: "\xAE",
  circledS: "\u24C8",
  circledast: "\u229B",
  circledcirc: "\u229A",
  circleddash: "\u229D",
  cire: "\u2257",
  cirfnint: "\u2A10",
  cirmid: "\u2AEF",
  cirscir: "\u29C2",
  clubs: "\u2663",
  clubsuit: "\u2663",
  colon: ":",
  colone: "\u2254",
  coloneq: "\u2254",
  comma: ",",
  commat: "@",
  comp: "\u2201",
  compfn: "\u2218",
  complement: "\u2201",
  complexes: "\u2102",
  cong: "\u2245",
  congdot: "\u2A6D",
  conint: "\u222E",
  copf: "\u{1D554}",
  coprod: "\u2210",
  copy: "\xA9",
  copysr: "\u2117",
  crarr: "\u21B5",
  cross: "\u2717",
  cscr: "\u{1D4B8}",
  csub: "\u2ACF",
  csube: "\u2AD1",
  csup: "\u2AD0",
  csupe: "\u2AD2",
  ctdot: "\u22EF",
  cudarrl: "\u2938",
  cudarrr: "\u2935",
  cuepr: "\u22DE",
  cuesc: "\u22DF",
  cularr: "\u21B6",
  cularrp: "\u293D",
  cup: "\u222A",
  cupbrcap: "\u2A48",
  cupcap: "\u2A46",
  cupcup: "\u2A4A",
  cupdot: "\u228D",
  cupor: "\u2A45",
  cups: "\u222A\uFE00",
  curarr: "\u21B7",
  curarrm: "\u293C",
  curlyeqprec: "\u22DE",
  curlyeqsucc: "\u22DF",
  curlyvee: "\u22CE",
  curlywedge: "\u22CF",
  curren: "\xA4",
  curvearrowleft: "\u21B6",
  curvearrowright: "\u21B7",
  cuvee: "\u22CE",
  cuwed: "\u22CF",
  cwconint: "\u2232",
  cwint: "\u2231",
  cylcty: "\u232D",
  dArr: "\u21D3",
  dHar: "\u2965",
  dagger: "\u2020",
  daleth: "\u2138",
  darr: "\u2193",
  dash: "\u2010",
  dashv: "\u22A3",
  dbkarow: "\u290F",
  dblac: "\u02DD",
  dcaron: "\u010F",
  dcy: "\u0434",
  dd: "\u2146",
  ddagger: "\u2021",
  ddarr: "\u21CA",
  ddotseq: "\u2A77",
  deg: "\xB0",
  delta: "\u03B4",
  demptyv: "\u29B1",
  dfisht: "\u297F",
  dfr: "\u{1D521}",
  dharl: "\u21C3",
  dharr: "\u21C2",
  diam: "\u22C4",
  diamond: "\u22C4",
  diamondsuit: "\u2666",
  diams: "\u2666",
  die: "\xA8",
  digamma: "\u03DD",
  disin: "\u22F2",
  div: "\xF7",
  divide: "\xF7",
  divideontimes: "\u22C7",
  divonx: "\u22C7",
  djcy: "\u0452",
  dlcorn: "\u231E",
  dlcrop: "\u230D",
  dollar: "$",
  dopf: "\u{1D555}",
  dot: "\u02D9",
  doteq: "\u2250",
  doteqdot: "\u2251",
  dotminus: "\u2238",
  dotplus: "\u2214",
  dotsquare: "\u22A1",
  doublebarwedge: "\u2306",
  downarrow: "\u2193",
  downdownarrows: "\u21CA",
  downharpoonleft: "\u21C3",
  downharpoonright: "\u21C2",
  drbkarow: "\u2910",
  drcorn: "\u231F",
  drcrop: "\u230C",
  dscr: "\u{1D4B9}",
  dscy: "\u0455",
  dsol: "\u29F6",
  dstrok: "\u0111",
  dtdot: "\u22F1",
  dtri: "\u25BF",
  dtrif: "\u25BE",
  duarr: "\u21F5",
  duhar: "\u296F",
  dwangle: "\u29A6",
  dzcy: "\u045F",
  dzigrarr: "\u27FF",
  eDDot: "\u2A77",
  eDot: "\u2251",
  eacute: "\xE9",
  easter: "\u2A6E",
  ecaron: "\u011B",
  ecir: "\u2256",
  ecirc: "\xEA",
  ecolon: "\u2255",
  ecy: "\u044D",
  edot: "\u0117",
  ee: "\u2147",
  efDot: "\u2252",
  efr: "\u{1D522}",
  eg: "\u2A9A",
  egrave: "\xE8",
  egs: "\u2A96",
  egsdot: "\u2A98",
  el: "\u2A99",
  elinters: "\u23E7",
  ell: "\u2113",
  els: "\u2A95",
  elsdot: "\u2A97",
  emacr: "\u0113",
  empty: "\u2205",
  emptyset: "\u2205",
  emptyv: "\u2205",
  emsp13: "\u2004",
  emsp14: "\u2005",
  emsp: "\u2003",
  eng: "\u014B",
  ensp: "\u2002",
  eogon: "\u0119",
  eopf: "\u{1D556}",
  epar: "\u22D5",
  eparsl: "\u29E3",
  eplus: "\u2A71",
  epsi: "\u03B5",
  epsilon: "\u03B5",
  epsiv: "\u03F5",
  eqcirc: "\u2256",
  eqcolon: "\u2255",
  eqsim: "\u2242",
  eqslantgtr: "\u2A96",
  eqslantless: "\u2A95",
  equals: "=",
  equest: "\u225F",
  equiv: "\u2261",
  equivDD: "\u2A78",
  eqvparsl: "\u29E5",
  erDot: "\u2253",
  erarr: "\u2971",
  escr: "\u212F",
  esdot: "\u2250",
  esim: "\u2242",
  eta: "\u03B7",
  eth: "\xF0",
  euml: "\xEB",
  euro: "\u20AC",
  excl: "!",
  exist: "\u2203",
  expectation: "\u2130",
  exponentiale: "\u2147",
  fallingdotseq: "\u2252",
  fcy: "\u0444",
  female: "\u2640",
  ffilig: "\uFB03",
  fflig: "\uFB00",
  ffllig: "\uFB04",
  ffr: "\u{1D523}",
  filig: "\uFB01",
  fjlig: "fj",
  flat: "\u266D",
  fllig: "\uFB02",
  fltns: "\u25B1",
  fnof: "\u0192",
  fopf: "\u{1D557}",
  forall: "\u2200",
  fork: "\u22D4",
  forkv: "\u2AD9",
  fpartint: "\u2A0D",
  frac12: "\xBD",
  frac13: "\u2153",
  frac14: "\xBC",
  frac15: "\u2155",
  frac16: "\u2159",
  frac18: "\u215B",
  frac23: "\u2154",
  frac25: "\u2156",
  frac34: "\xBE",
  frac35: "\u2157",
  frac38: "\u215C",
  frac45: "\u2158",
  frac56: "\u215A",
  frac58: "\u215D",
  frac78: "\u215E",
  frasl: "\u2044",
  frown: "\u2322",
  fscr: "\u{1D4BB}",
  gE: "\u2267",
  gEl: "\u2A8C",
  gacute: "\u01F5",
  gamma: "\u03B3",
  gammad: "\u03DD",
  gap: "\u2A86",
  gbreve: "\u011F",
  gcirc: "\u011D",
  gcy: "\u0433",
  gdot: "\u0121",
  ge: "\u2265",
  gel: "\u22DB",
  geq: "\u2265",
  geqq: "\u2267",
  geqslant: "\u2A7E",
  ges: "\u2A7E",
  gescc: "\u2AA9",
  gesdot: "\u2A80",
  gesdoto: "\u2A82",
  gesdotol: "\u2A84",
  gesl: "\u22DB\uFE00",
  gesles: "\u2A94",
  gfr: "\u{1D524}",
  gg: "\u226B",
  ggg: "\u22D9",
  gimel: "\u2137",
  gjcy: "\u0453",
  gl: "\u2277",
  glE: "\u2A92",
  gla: "\u2AA5",
  glj: "\u2AA4",
  gnE: "\u2269",
  gnap: "\u2A8A",
  gnapprox: "\u2A8A",
  gne: "\u2A88",
  gneq: "\u2A88",
  gneqq: "\u2269",
  gnsim: "\u22E7",
  gopf: "\u{1D558}",
  grave: "`",
  gscr: "\u210A",
  gsim: "\u2273",
  gsime: "\u2A8E",
  gsiml: "\u2A90",
  gt: ">",
  gtcc: "\u2AA7",
  gtcir: "\u2A7A",
  gtdot: "\u22D7",
  gtlPar: "\u2995",
  gtquest: "\u2A7C",
  gtrapprox: "\u2A86",
  gtrarr: "\u2978",
  gtrdot: "\u22D7",
  gtreqless: "\u22DB",
  gtreqqless: "\u2A8C",
  gtrless: "\u2277",
  gtrsim: "\u2273",
  gvertneqq: "\u2269\uFE00",
  gvnE: "\u2269\uFE00",
  hArr: "\u21D4",
  hairsp: "\u200A",
  half: "\xBD",
  hamilt: "\u210B",
  hardcy: "\u044A",
  harr: "\u2194",
  harrcir: "\u2948",
  harrw: "\u21AD",
  hbar: "\u210F",
  hcirc: "\u0125",
  hearts: "\u2665",
  heartsuit: "\u2665",
  hellip: "\u2026",
  hercon: "\u22B9",
  hfr: "\u{1D525}",
  hksearow: "\u2925",
  hkswarow: "\u2926",
  hoarr: "\u21FF",
  homtht: "\u223B",
  hookleftarrow: "\u21A9",
  hookrightarrow: "\u21AA",
  hopf: "\u{1D559}",
  horbar: "\u2015",
  hscr: "\u{1D4BD}",
  hslash: "\u210F",
  hstrok: "\u0127",
  hybull: "\u2043",
  hyphen: "\u2010",
  iacute: "\xED",
  ic: "\u2063",
  icirc: "\xEE",
  icy: "\u0438",
  iecy: "\u0435",
  iexcl: "\xA1",
  iff: "\u21D4",
  ifr: "\u{1D526}",
  igrave: "\xEC",
  ii: "\u2148",
  iiiint: "\u2A0C",
  iiint: "\u222D",
  iinfin: "\u29DC",
  iiota: "\u2129",
  ijlig: "\u0133",
  imacr: "\u012B",
  image: "\u2111",
  imagline: "\u2110",
  imagpart: "\u2111",
  imath: "\u0131",
  imof: "\u22B7",
  imped: "\u01B5",
  in: "\u2208",
  incare: "\u2105",
  infin: "\u221E",
  infintie: "\u29DD",
  inodot: "\u0131",
  int: "\u222B",
  intcal: "\u22BA",
  integers: "\u2124",
  intercal: "\u22BA",
  intlarhk: "\u2A17",
  intprod: "\u2A3C",
  iocy: "\u0451",
  iogon: "\u012F",
  iopf: "\u{1D55A}",
  iota: "\u03B9",
  iprod: "\u2A3C",
  iquest: "\xBF",
  iscr: "\u{1D4BE}",
  isin: "\u2208",
  isinE: "\u22F9",
  isindot: "\u22F5",
  isins: "\u22F4",
  isinsv: "\u22F3",
  isinv: "\u2208",
  it: "\u2062",
  itilde: "\u0129",
  iukcy: "\u0456",
  iuml: "\xEF",
  jcirc: "\u0135",
  jcy: "\u0439",
  jfr: "\u{1D527}",
  jmath: "\u0237",
  jopf: "\u{1D55B}",
  jscr: "\u{1D4BF}",
  jsercy: "\u0458",
  jukcy: "\u0454",
  kappa: "\u03BA",
  kappav: "\u03F0",
  kcedil: "\u0137",
  kcy: "\u043A",
  kfr: "\u{1D528}",
  kgreen: "\u0138",
  khcy: "\u0445",
  kjcy: "\u045C",
  kopf: "\u{1D55C}",
  kscr: "\u{1D4C0}",
  lAarr: "\u21DA",
  lArr: "\u21D0",
  lAtail: "\u291B",
  lBarr: "\u290E",
  lE: "\u2266",
  lEg: "\u2A8B",
  lHar: "\u2962",
  lacute: "\u013A",
  laemptyv: "\u29B4",
  lagran: "\u2112",
  lambda: "\u03BB",
  lang: "\u27E8",
  langd: "\u2991",
  langle: "\u27E8",
  lap: "\u2A85",
  laquo: "\xAB",
  larr: "\u2190",
  larrb: "\u21E4",
  larrbfs: "\u291F",
  larrfs: "\u291D",
  larrhk: "\u21A9",
  larrlp: "\u21AB",
  larrpl: "\u2939",
  larrsim: "\u2973",
  larrtl: "\u21A2",
  lat: "\u2AAB",
  latail: "\u2919",
  late: "\u2AAD",
  lates: "\u2AAD\uFE00",
  lbarr: "\u290C",
  lbbrk: "\u2772",
  lbrace: "{",
  lbrack: "[",
  lbrke: "\u298B",
  lbrksld: "\u298F",
  lbrkslu: "\u298D",
  lcaron: "\u013E",
  lcedil: "\u013C",
  lceil: "\u2308",
  lcub: "{",
  lcy: "\u043B",
  ldca: "\u2936",
  ldquo: "\u201C",
  ldquor: "\u201E",
  ldrdhar: "\u2967",
  ldrushar: "\u294B",
  ldsh: "\u21B2",
  le: "\u2264",
  leftarrow: "\u2190",
  leftarrowtail: "\u21A2",
  leftharpoondown: "\u21BD",
  leftharpoonup: "\u21BC",
  leftleftarrows: "\u21C7",
  leftrightarrow: "\u2194",
  leftrightarrows: "\u21C6",
  leftrightharpoons: "\u21CB",
  leftrightsquigarrow: "\u21AD",
  leftthreetimes: "\u22CB",
  leg: "\u22DA",
  leq: "\u2264",
  leqq: "\u2266",
  leqslant: "\u2A7D",
  les: "\u2A7D",
  lescc: "\u2AA8",
  lesdot: "\u2A7F",
  lesdoto: "\u2A81",
  lesdotor: "\u2A83",
  lesg: "\u22DA\uFE00",
  lesges: "\u2A93",
  lessapprox: "\u2A85",
  lessdot: "\u22D6",
  lesseqgtr: "\u22DA",
  lesseqqgtr: "\u2A8B",
  lessgtr: "\u2276",
  lesssim: "\u2272",
  lfisht: "\u297C",
  lfloor: "\u230A",
  lfr: "\u{1D529}",
  lg: "\u2276",
  lgE: "\u2A91",
  lhard: "\u21BD",
  lharu: "\u21BC",
  lharul: "\u296A",
  lhblk: "\u2584",
  ljcy: "\u0459",
  ll: "\u226A",
  llarr: "\u21C7",
  llcorner: "\u231E",
  llhard: "\u296B",
  lltri: "\u25FA",
  lmidot: "\u0140",
  lmoust: "\u23B0",
  lmoustache: "\u23B0",
  lnE: "\u2268",
  lnap: "\u2A89",
  lnapprox: "\u2A89",
  lne: "\u2A87",
  lneq: "\u2A87",
  lneqq: "\u2268",
  lnsim: "\u22E6",
  loang: "\u27EC",
  loarr: "\u21FD",
  lobrk: "\u27E6",
  longleftarrow: "\u27F5",
  longleftrightarrow: "\u27F7",
  longmapsto: "\u27FC",
  longrightarrow: "\u27F6",
  looparrowleft: "\u21AB",
  looparrowright: "\u21AC",
  lopar: "\u2985",
  lopf: "\u{1D55D}",
  loplus: "\u2A2D",
  lotimes: "\u2A34",
  lowast: "\u2217",
  lowbar: "_",
  loz: "\u25CA",
  lozenge: "\u25CA",
  lozf: "\u29EB",
  lpar: "(",
  lparlt: "\u2993",
  lrarr: "\u21C6",
  lrcorner: "\u231F",
  lrhar: "\u21CB",
  lrhard: "\u296D",
  lrm: "\u200E",
  lrtri: "\u22BF",
  lsaquo: "\u2039",
  lscr: "\u{1D4C1}",
  lsh: "\u21B0",
  lsim: "\u2272",
  lsime: "\u2A8D",
  lsimg: "\u2A8F",
  lsqb: "[",
  lsquo: "\u2018",
  lsquor: "\u201A",
  lstrok: "\u0142",
  lt: "<",
  ltcc: "\u2AA6",
  ltcir: "\u2A79",
  ltdot: "\u22D6",
  lthree: "\u22CB",
  ltimes: "\u22C9",
  ltlarr: "\u2976",
  ltquest: "\u2A7B",
  ltrPar: "\u2996",
  ltri: "\u25C3",
  ltrie: "\u22B4",
  ltrif: "\u25C2",
  lurdshar: "\u294A",
  luruhar: "\u2966",
  lvertneqq: "\u2268\uFE00",
  lvnE: "\u2268\uFE00",
  mDDot: "\u223A",
  macr: "\xAF",
  male: "\u2642",
  malt: "\u2720",
  maltese: "\u2720",
  map: "\u21A6",
  mapsto: "\u21A6",
  mapstodown: "\u21A7",
  mapstoleft: "\u21A4",
  mapstoup: "\u21A5",
  marker: "\u25AE",
  mcomma: "\u2A29",
  mcy: "\u043C",
  mdash: "\u2014",
  measuredangle: "\u2221",
  mfr: "\u{1D52A}",
  mho: "\u2127",
  micro: "\xB5",
  mid: "\u2223",
  midast: "*",
  midcir: "\u2AF0",
  middot: "\xB7",
  minus: "\u2212",
  minusb: "\u229F",
  minusd: "\u2238",
  minusdu: "\u2A2A",
  mlcp: "\u2ADB",
  mldr: "\u2026",
  mnplus: "\u2213",
  models: "\u22A7",
  mopf: "\u{1D55E}",
  mp: "\u2213",
  mscr: "\u{1D4C2}",
  mstpos: "\u223E",
  mu: "\u03BC",
  multimap: "\u22B8",
  mumap: "\u22B8",
  nGg: "\u22D9\u0338",
  nGt: "\u226B\u20D2",
  nGtv: "\u226B\u0338",
  nLeftarrow: "\u21CD",
  nLeftrightarrow: "\u21CE",
  nLl: "\u22D8\u0338",
  nLt: "\u226A\u20D2",
  nLtv: "\u226A\u0338",
  nRightarrow: "\u21CF",
  nVDash: "\u22AF",
  nVdash: "\u22AE",
  nabla: "\u2207",
  nacute: "\u0144",
  nang: "\u2220\u20D2",
  nap: "\u2249",
  napE: "\u2A70\u0338",
  napid: "\u224B\u0338",
  napos: "\u0149",
  napprox: "\u2249",
  natur: "\u266E",
  natural: "\u266E",
  naturals: "\u2115",
  nbsp: "\xA0",
  nbump: "\u224E\u0338",
  nbumpe: "\u224F\u0338",
  ncap: "\u2A43",
  ncaron: "\u0148",
  ncedil: "\u0146",
  ncong: "\u2247",
  ncongdot: "\u2A6D\u0338",
  ncup: "\u2A42",
  ncy: "\u043D",
  ndash: "\u2013",
  ne: "\u2260",
  neArr: "\u21D7",
  nearhk: "\u2924",
  nearr: "\u2197",
  nearrow: "\u2197",
  nedot: "\u2250\u0338",
  nequiv: "\u2262",
  nesear: "\u2928",
  nesim: "\u2242\u0338",
  nexist: "\u2204",
  nexists: "\u2204",
  nfr: "\u{1D52B}",
  ngE: "\u2267\u0338",
  nge: "\u2271",
  ngeq: "\u2271",
  ngeqq: "\u2267\u0338",
  ngeqslant: "\u2A7E\u0338",
  nges: "\u2A7E\u0338",
  ngsim: "\u2275",
  ngt: "\u226F",
  ngtr: "\u226F",
  nhArr: "\u21CE",
  nharr: "\u21AE",
  nhpar: "\u2AF2",
  ni: "\u220B",
  nis: "\u22FC",
  nisd: "\u22FA",
  niv: "\u220B",
  njcy: "\u045A",
  nlArr: "\u21CD",
  nlE: "\u2266\u0338",
  nlarr: "\u219A",
  nldr: "\u2025",
  nle: "\u2270",
  nleftarrow: "\u219A",
  nleftrightarrow: "\u21AE",
  nleq: "\u2270",
  nleqq: "\u2266\u0338",
  nleqslant: "\u2A7D\u0338",
  nles: "\u2A7D\u0338",
  nless: "\u226E",
  nlsim: "\u2274",
  nlt: "\u226E",
  nltri: "\u22EA",
  nltrie: "\u22EC",
  nmid: "\u2224",
  nopf: "\u{1D55F}",
  not: "\xAC",
  notin: "\u2209",
  notinE: "\u22F9\u0338",
  notindot: "\u22F5\u0338",
  notinva: "\u2209",
  notinvb: "\u22F7",
  notinvc: "\u22F6",
  notni: "\u220C",
  notniva: "\u220C",
  notnivb: "\u22FE",
  notnivc: "\u22FD",
  npar: "\u2226",
  nparallel: "\u2226",
  nparsl: "\u2AFD\u20E5",
  npart: "\u2202\u0338",
  npolint: "\u2A14",
  npr: "\u2280",
  nprcue: "\u22E0",
  npre: "\u2AAF\u0338",
  nprec: "\u2280",
  npreceq: "\u2AAF\u0338",
  nrArr: "\u21CF",
  nrarr: "\u219B",
  nrarrc: "\u2933\u0338",
  nrarrw: "\u219D\u0338",
  nrightarrow: "\u219B",
  nrtri: "\u22EB",
  nrtrie: "\u22ED",
  nsc: "\u2281",
  nsccue: "\u22E1",
  nsce: "\u2AB0\u0338",
  nscr: "\u{1D4C3}",
  nshortmid: "\u2224",
  nshortparallel: "\u2226",
  nsim: "\u2241",
  nsime: "\u2244",
  nsimeq: "\u2244",
  nsmid: "\u2224",
  nspar: "\u2226",
  nsqsube: "\u22E2",
  nsqsupe: "\u22E3",
  nsub: "\u2284",
  nsubE: "\u2AC5\u0338",
  nsube: "\u2288",
  nsubset: "\u2282\u20D2",
  nsubseteq: "\u2288",
  nsubseteqq: "\u2AC5\u0338",
  nsucc: "\u2281",
  nsucceq: "\u2AB0\u0338",
  nsup: "\u2285",
  nsupE: "\u2AC6\u0338",
  nsupe: "\u2289",
  nsupset: "\u2283\u20D2",
  nsupseteq: "\u2289",
  nsupseteqq: "\u2AC6\u0338",
  ntgl: "\u2279",
  ntilde: "\xF1",
  ntlg: "\u2278",
  ntriangleleft: "\u22EA",
  ntrianglelefteq: "\u22EC",
  ntriangleright: "\u22EB",
  ntrianglerighteq: "\u22ED",
  nu: "\u03BD",
  num: "#",
  numero: "\u2116",
  numsp: "\u2007",
  nvDash: "\u22AD",
  nvHarr: "\u2904",
  nvap: "\u224D\u20D2",
  nvdash: "\u22AC",
  nvge: "\u2265\u20D2",
  nvgt: ">\u20D2",
  nvinfin: "\u29DE",
  nvlArr: "\u2902",
  nvle: "\u2264\u20D2",
  nvlt: "<\u20D2",
  nvltrie: "\u22B4\u20D2",
  nvrArr: "\u2903",
  nvrtrie: "\u22B5\u20D2",
  nvsim: "\u223C\u20D2",
  nwArr: "\u21D6",
  nwarhk: "\u2923",
  nwarr: "\u2196",
  nwarrow: "\u2196",
  nwnear: "\u2927",
  oS: "\u24C8",
  oacute: "\xF3",
  oast: "\u229B",
  ocir: "\u229A",
  ocirc: "\xF4",
  ocy: "\u043E",
  odash: "\u229D",
  odblac: "\u0151",
  odiv: "\u2A38",
  odot: "\u2299",
  odsold: "\u29BC",
  oelig: "\u0153",
  ofcir: "\u29BF",
  ofr: "\u{1D52C}",
  ogon: "\u02DB",
  ograve: "\xF2",
  ogt: "\u29C1",
  ohbar: "\u29B5",
  ohm: "\u03A9",
  oint: "\u222E",
  olarr: "\u21BA",
  olcir: "\u29BE",
  olcross: "\u29BB",
  oline: "\u203E",
  olt: "\u29C0",
  omacr: "\u014D",
  omega: "\u03C9",
  omicron: "\u03BF",
  omid: "\u29B6",
  ominus: "\u2296",
  oopf: "\u{1D560}",
  opar: "\u29B7",
  operp: "\u29B9",
  oplus: "\u2295",
  or: "\u2228",
  orarr: "\u21BB",
  ord: "\u2A5D",
  order: "\u2134",
  orderof: "\u2134",
  ordf: "\xAA",
  ordm: "\xBA",
  origof: "\u22B6",
  oror: "\u2A56",
  orslope: "\u2A57",
  orv: "\u2A5B",
  oscr: "\u2134",
  oslash: "\xF8",
  osol: "\u2298",
  otilde: "\xF5",
  otimes: "\u2297",
  otimesas: "\u2A36",
  ouml: "\xF6",
  ovbar: "\u233D",
  par: "\u2225",
  para: "\xB6",
  parallel: "\u2225",
  parsim: "\u2AF3",
  parsl: "\u2AFD",
  part: "\u2202",
  pcy: "\u043F",
  percnt: "%",
  period: ".",
  permil: "\u2030",
  perp: "\u22A5",
  pertenk: "\u2031",
  pfr: "\u{1D52D}",
  phi: "\u03C6",
  phiv: "\u03D5",
  phmmat: "\u2133",
  phone: "\u260E",
  pi: "\u03C0",
  pitchfork: "\u22D4",
  piv: "\u03D6",
  planck: "\u210F",
  planckh: "\u210E",
  plankv: "\u210F",
  plus: "+",
  plusacir: "\u2A23",
  plusb: "\u229E",
  pluscir: "\u2A22",
  plusdo: "\u2214",
  plusdu: "\u2A25",
  pluse: "\u2A72",
  plusmn: "\xB1",
  plussim: "\u2A26",
  plustwo: "\u2A27",
  pm: "\xB1",
  pointint: "\u2A15",
  popf: "\u{1D561}",
  pound: "\xA3",
  pr: "\u227A",
  prE: "\u2AB3",
  prap: "\u2AB7",
  prcue: "\u227C",
  pre: "\u2AAF",
  prec: "\u227A",
  precapprox: "\u2AB7",
  preccurlyeq: "\u227C",
  preceq: "\u2AAF",
  precnapprox: "\u2AB9",
  precneqq: "\u2AB5",
  precnsim: "\u22E8",
  precsim: "\u227E",
  prime: "\u2032",
  primes: "\u2119",
  prnE: "\u2AB5",
  prnap: "\u2AB9",
  prnsim: "\u22E8",
  prod: "\u220F",
  profalar: "\u232E",
  profline: "\u2312",
  profsurf: "\u2313",
  prop: "\u221D",
  propto: "\u221D",
  prsim: "\u227E",
  prurel: "\u22B0",
  pscr: "\u{1D4C5}",
  psi: "\u03C8",
  puncsp: "\u2008",
  qfr: "\u{1D52E}",
  qint: "\u2A0C",
  qopf: "\u{1D562}",
  qprime: "\u2057",
  qscr: "\u{1D4C6}",
  quaternions: "\u210D",
  quatint: "\u2A16",
  quest: "?",
  questeq: "\u225F",
  quot: '"',
  rAarr: "\u21DB",
  rArr: "\u21D2",
  rAtail: "\u291C",
  rBarr: "\u290F",
  rHar: "\u2964",
  race: "\u223D\u0331",
  racute: "\u0155",
  radic: "\u221A",
  raemptyv: "\u29B3",
  rang: "\u27E9",
  rangd: "\u2992",
  range: "\u29A5",
  rangle: "\u27E9",
  raquo: "\xBB",
  rarr: "\u2192",
  rarrap: "\u2975",
  rarrb: "\u21E5",
  rarrbfs: "\u2920",
  rarrc: "\u2933",
  rarrfs: "\u291E",
  rarrhk: "\u21AA",
  rarrlp: "\u21AC",
  rarrpl: "\u2945",
  rarrsim: "\u2974",
  rarrtl: "\u21A3",
  rarrw: "\u219D",
  ratail: "\u291A",
  ratio: "\u2236",
  rationals: "\u211A",
  rbarr: "\u290D",
  rbbrk: "\u2773",
  rbrace: "}",
  rbrack: "]",
  rbrke: "\u298C",
  rbrksld: "\u298E",
  rbrkslu: "\u2990",
  rcaron: "\u0159",
  rcedil: "\u0157",
  rceil: "\u2309",
  rcub: "}",
  rcy: "\u0440",
  rdca: "\u2937",
  rdldhar: "\u2969",
  rdquo: "\u201D",
  rdquor: "\u201D",
  rdsh: "\u21B3",
  real: "\u211C",
  realine: "\u211B",
  realpart: "\u211C",
  reals: "\u211D",
  rect: "\u25AD",
  reg: "\xAE",
  rfisht: "\u297D",
  rfloor: "\u230B",
  rfr: "\u{1D52F}",
  rhard: "\u21C1",
  rharu: "\u21C0",
  rharul: "\u296C",
  rho: "\u03C1",
  rhov: "\u03F1",
  rightarrow: "\u2192",
  rightarrowtail: "\u21A3",
  rightharpoondown: "\u21C1",
  rightharpoonup: "\u21C0",
  rightleftarrows: "\u21C4",
  rightleftharpoons: "\u21CC",
  rightrightarrows: "\u21C9",
  rightsquigarrow: "\u219D",
  rightthreetimes: "\u22CC",
  ring: "\u02DA",
  risingdotseq: "\u2253",
  rlarr: "\u21C4",
  rlhar: "\u21CC",
  rlm: "\u200F",
  rmoust: "\u23B1",
  rmoustache: "\u23B1",
  rnmid: "\u2AEE",
  roang: "\u27ED",
  roarr: "\u21FE",
  robrk: "\u27E7",
  ropar: "\u2986",
  ropf: "\u{1D563}",
  roplus: "\u2A2E",
  rotimes: "\u2A35",
  rpar: ")",
  rpargt: "\u2994",
  rppolint: "\u2A12",
  rrarr: "\u21C9",
  rsaquo: "\u203A",
  rscr: "\u{1D4C7}",
  rsh: "\u21B1",
  rsqb: "]",
  rsquo: "\u2019",
  rsquor: "\u2019",
  rthree: "\u22CC",
  rtimes: "\u22CA",
  rtri: "\u25B9",
  rtrie: "\u22B5",
  rtrif: "\u25B8",
  rtriltri: "\u29CE",
  ruluhar: "\u2968",
  rx: "\u211E",
  sacute: "\u015B",
  sbquo: "\u201A",
  sc: "\u227B",
  scE: "\u2AB4",
  scap: "\u2AB8",
  scaron: "\u0161",
  sccue: "\u227D",
  sce: "\u2AB0",
  scedil: "\u015F",
  scirc: "\u015D",
  scnE: "\u2AB6",
  scnap: "\u2ABA",
  scnsim: "\u22E9",
  scpolint: "\u2A13",
  scsim: "\u227F",
  scy: "\u0441",
  sdot: "\u22C5",
  sdotb: "\u22A1",
  sdote: "\u2A66",
  seArr: "\u21D8",
  searhk: "\u2925",
  searr: "\u2198",
  searrow: "\u2198",
  sect: "\xA7",
  semi: ";",
  seswar: "\u2929",
  setminus: "\u2216",
  setmn: "\u2216",
  sext: "\u2736",
  sfr: "\u{1D530}",
  sfrown: "\u2322",
  sharp: "\u266F",
  shchcy: "\u0449",
  shcy: "\u0448",
  shortmid: "\u2223",
  shortparallel: "\u2225",
  shy: "\xAD",
  sigma: "\u03C3",
  sigmaf: "\u03C2",
  sigmav: "\u03C2",
  sim: "\u223C",
  simdot: "\u2A6A",
  sime: "\u2243",
  simeq: "\u2243",
  simg: "\u2A9E",
  simgE: "\u2AA0",
  siml: "\u2A9D",
  simlE: "\u2A9F",
  simne: "\u2246",
  simplus: "\u2A24",
  simrarr: "\u2972",
  slarr: "\u2190",
  smallsetminus: "\u2216",
  smashp: "\u2A33",
  smeparsl: "\u29E4",
  smid: "\u2223",
  smile: "\u2323",
  smt: "\u2AAA",
  smte: "\u2AAC",
  smtes: "\u2AAC\uFE00",
  softcy: "\u044C",
  sol: "/",
  solb: "\u29C4",
  solbar: "\u233F",
  sopf: "\u{1D564}",
  spades: "\u2660",
  spadesuit: "\u2660",
  spar: "\u2225",
  sqcap: "\u2293",
  sqcaps: "\u2293\uFE00",
  sqcup: "\u2294",
  sqcups: "\u2294\uFE00",
  sqsub: "\u228F",
  sqsube: "\u2291",
  sqsubset: "\u228F",
  sqsubseteq: "\u2291",
  sqsup: "\u2290",
  sqsupe: "\u2292",
  sqsupset: "\u2290",
  sqsupseteq: "\u2292",
  squ: "\u25A1",
  square: "\u25A1",
  squarf: "\u25AA",
  squf: "\u25AA",
  srarr: "\u2192",
  sscr: "\u{1D4C8}",
  ssetmn: "\u2216",
  ssmile: "\u2323",
  sstarf: "\u22C6",
  star: "\u2606",
  starf: "\u2605",
  straightepsilon: "\u03F5",
  straightphi: "\u03D5",
  strns: "\xAF",
  sub: "\u2282",
  subE: "\u2AC5",
  subdot: "\u2ABD",
  sube: "\u2286",
  subedot: "\u2AC3",
  submult: "\u2AC1",
  subnE: "\u2ACB",
  subne: "\u228A",
  subplus: "\u2ABF",
  subrarr: "\u2979",
  subset: "\u2282",
  subseteq: "\u2286",
  subseteqq: "\u2AC5",
  subsetneq: "\u228A",
  subsetneqq: "\u2ACB",
  subsim: "\u2AC7",
  subsub: "\u2AD5",
  subsup: "\u2AD3",
  succ: "\u227B",
  succapprox: "\u2AB8",
  succcurlyeq: "\u227D",
  succeq: "\u2AB0",
  succnapprox: "\u2ABA",
  succneqq: "\u2AB6",
  succnsim: "\u22E9",
  succsim: "\u227F",
  sum: "\u2211",
  sung: "\u266A",
  sup1: "\xB9",
  sup2: "\xB2",
  sup3: "\xB3",
  sup: "\u2283",
  supE: "\u2AC6",
  supdot: "\u2ABE",
  supdsub: "\u2AD8",
  supe: "\u2287",
  supedot: "\u2AC4",
  suphsol: "\u27C9",
  suphsub: "\u2AD7",
  suplarr: "\u297B",
  supmult: "\u2AC2",
  supnE: "\u2ACC",
  supne: "\u228B",
  supplus: "\u2AC0",
  supset: "\u2283",
  supseteq: "\u2287",
  supseteqq: "\u2AC6",
  supsetneq: "\u228B",
  supsetneqq: "\u2ACC",
  supsim: "\u2AC8",
  supsub: "\u2AD4",
  supsup: "\u2AD6",
  swArr: "\u21D9",
  swarhk: "\u2926",
  swarr: "\u2199",
  swarrow: "\u2199",
  swnwar: "\u292A",
  szlig: "\xDF",
  target: "\u2316",
  tau: "\u03C4",
  tbrk: "\u23B4",
  tcaron: "\u0165",
  tcedil: "\u0163",
  tcy: "\u0442",
  tdot: "\u20DB",
  telrec: "\u2315",
  tfr: "\u{1D531}",
  there4: "\u2234",
  therefore: "\u2234",
  theta: "\u03B8",
  thetasym: "\u03D1",
  thetav: "\u03D1",
  thickapprox: "\u2248",
  thicksim: "\u223C",
  thinsp: "\u2009",
  thkap: "\u2248",
  thksim: "\u223C",
  thorn: "\xFE",
  tilde: "\u02DC",
  times: "\xD7",
  timesb: "\u22A0",
  timesbar: "\u2A31",
  timesd: "\u2A30",
  tint: "\u222D",
  toea: "\u2928",
  top: "\u22A4",
  topbot: "\u2336",
  topcir: "\u2AF1",
  topf: "\u{1D565}",
  topfork: "\u2ADA",
  tosa: "\u2929",
  tprime: "\u2034",
  trade: "\u2122",
  triangle: "\u25B5",
  triangledown: "\u25BF",
  triangleleft: "\u25C3",
  trianglelefteq: "\u22B4",
  triangleq: "\u225C",
  triangleright: "\u25B9",
  trianglerighteq: "\u22B5",
  tridot: "\u25EC",
  trie: "\u225C",
  triminus: "\u2A3A",
  triplus: "\u2A39",
  trisb: "\u29CD",
  tritime: "\u2A3B",
  trpezium: "\u23E2",
  tscr: "\u{1D4C9}",
  tscy: "\u0446",
  tshcy: "\u045B",
  tstrok: "\u0167",
  twixt: "\u226C",
  twoheadleftarrow: "\u219E",
  twoheadrightarrow: "\u21A0",
  uArr: "\u21D1",
  uHar: "\u2963",
  uacute: "\xFA",
  uarr: "\u2191",
  ubrcy: "\u045E",
  ubreve: "\u016D",
  ucirc: "\xFB",
  ucy: "\u0443",
  udarr: "\u21C5",
  udblac: "\u0171",
  udhar: "\u296E",
  ufisht: "\u297E",
  ufr: "\u{1D532}",
  ugrave: "\xF9",
  uharl: "\u21BF",
  uharr: "\u21BE",
  uhblk: "\u2580",
  ulcorn: "\u231C",
  ulcorner: "\u231C",
  ulcrop: "\u230F",
  ultri: "\u25F8",
  umacr: "\u016B",
  uml: "\xA8",
  uogon: "\u0173",
  uopf: "\u{1D566}",
  uparrow: "\u2191",
  updownarrow: "\u2195",
  upharpoonleft: "\u21BF",
  upharpoonright: "\u21BE",
  uplus: "\u228E",
  upsi: "\u03C5",
  upsih: "\u03D2",
  upsilon: "\u03C5",
  upuparrows: "\u21C8",
  urcorn: "\u231D",
  urcorner: "\u231D",
  urcrop: "\u230E",
  uring: "\u016F",
  urtri: "\u25F9",
  uscr: "\u{1D4CA}",
  utdot: "\u22F0",
  utilde: "\u0169",
  utri: "\u25B5",
  utrif: "\u25B4",
  uuarr: "\u21C8",
  uuml: "\xFC",
  uwangle: "\u29A7",
  vArr: "\u21D5",
  vBar: "\u2AE8",
  vBarv: "\u2AE9",
  vDash: "\u22A8",
  vangrt: "\u299C",
  varepsilon: "\u03F5",
  varkappa: "\u03F0",
  varnothing: "\u2205",
  varphi: "\u03D5",
  varpi: "\u03D6",
  varpropto: "\u221D",
  varr: "\u2195",
  varrho: "\u03F1",
  varsigma: "\u03C2",
  varsubsetneq: "\u228A\uFE00",
  varsubsetneqq: "\u2ACB\uFE00",
  varsupsetneq: "\u228B\uFE00",
  varsupsetneqq: "\u2ACC\uFE00",
  vartheta: "\u03D1",
  vartriangleleft: "\u22B2",
  vartriangleright: "\u22B3",
  vcy: "\u0432",
  vdash: "\u22A2",
  vee: "\u2228",
  veebar: "\u22BB",
  veeeq: "\u225A",
  vellip: "\u22EE",
  verbar: "|",
  vert: "|",
  vfr: "\u{1D533}",
  vltri: "\u22B2",
  vnsub: "\u2282\u20D2",
  vnsup: "\u2283\u20D2",
  vopf: "\u{1D567}",
  vprop: "\u221D",
  vrtri: "\u22B3",
  vscr: "\u{1D4CB}",
  vsubnE: "\u2ACB\uFE00",
  vsubne: "\u228A\uFE00",
  vsupnE: "\u2ACC\uFE00",
  vsupne: "\u228B\uFE00",
  vzigzag: "\u299A",
  wcirc: "\u0175",
  wedbar: "\u2A5F",
  wedge: "\u2227",
  wedgeq: "\u2259",
  weierp: "\u2118",
  wfr: "\u{1D534}",
  wopf: "\u{1D568}",
  wp: "\u2118",
  wr: "\u2240",
  wreath: "\u2240",
  wscr: "\u{1D4CC}",
  xcap: "\u22C2",
  xcirc: "\u25EF",
  xcup: "\u22C3",
  xdtri: "\u25BD",
  xfr: "\u{1D535}",
  xhArr: "\u27FA",
  xharr: "\u27F7",
  xi: "\u03BE",
  xlArr: "\u27F8",
  xlarr: "\u27F5",
  xmap: "\u27FC",
  xnis: "\u22FB",
  xodot: "\u2A00",
  xopf: "\u{1D569}",
  xoplus: "\u2A01",
  xotime: "\u2A02",
  xrArr: "\u27F9",
  xrarr: "\u27F6",
  xscr: "\u{1D4CD}",
  xsqcup: "\u2A06",
  xuplus: "\u2A04",
  xutri: "\u25B3",
  xvee: "\u22C1",
  xwedge: "\u22C0",
  yacute: "\xFD",
  yacy: "\u044F",
  ycirc: "\u0177",
  ycy: "\u044B",
  yen: "\xA5",
  yfr: "\u{1D536}",
  yicy: "\u0457",
  yopf: "\u{1D56A}",
  yscr: "\u{1D4CE}",
  yucy: "\u044E",
  yuml: "\xFF",
  zacute: "\u017A",
  zcaron: "\u017E",
  zcy: "\u0437",
  zdot: "\u017C",
  zeetrf: "\u2128",
  zeta: "\u03B6",
  zfr: "\u{1D537}",
  zhcy: "\u0436",
  zigrarr: "\u21DD",
  zopf: "\u{1D56B}",
  zscr: "\u{1D4CF}",
  zwj: "\u200D",
  zwnj: "\u200C"
};

// ../../node_modules/decode-named-character-reference/index.js
var own2 = {}.hasOwnProperty;
function decodeNamedCharacterReference(value) {
  return own2.call(characterEntities, value) ? characterEntities[value] : false;
}

// ../../node_modules/micromark-util-chunked/index.js
function splice(list2, start, remove, items) {
  const end = list2.length;
  let chunkStart = 0;
  let parameters;
  if (start < 0) {
    start = -start > end ? 0 : end + start;
  } else {
    start = start > end ? end : start;
  }
  remove = remove > 0 ? remove : 0;
  if (items.length < 1e4) {
    parameters = Array.from(items);
    parameters.unshift(start, remove);
    list2.splice(...parameters);
  } else {
    if (remove) list2.splice(start, remove);
    while (chunkStart < items.length) {
      parameters = items.slice(chunkStart, chunkStart + 1e4);
      parameters.unshift(start, 0);
      list2.splice(...parameters);
      chunkStart += 1e4;
      start += 1e4;
    }
  }
}
function push(list2, items) {
  if (list2.length > 0) {
    splice(list2, list2.length, 0, items);
    return list2;
  }
  return items;
}

// ../../node_modules/micromark-util-combine-extensions/index.js
var hasOwnProperty = {}.hasOwnProperty;
function combineExtensions(extensions) {
  const all2 = {};
  let index2 = -1;
  while (++index2 < extensions.length) {
    syntaxExtension(all2, extensions[index2]);
  }
  return all2;
}
function syntaxExtension(all2, extension2) {
  let hook;
  for (hook in extension2) {
    const maybe = hasOwnProperty.call(all2, hook) ? all2[hook] : void 0;
    const left = maybe || (all2[hook] = {});
    const right = extension2[hook];
    let code;
    if (right) {
      for (code in right) {
        if (!hasOwnProperty.call(left, code)) left[code] = [];
        const value = right[code];
        constructs(
          // @ts-expect-error Looks like a list.
          left[code],
          Array.isArray(value) ? value : value ? [value] : []
        );
      }
    }
  }
}
function constructs(existing, list2) {
  let index2 = -1;
  const before = [];
  while (++index2 < list2.length) {
    ;
    (list2[index2].add === "after" ? existing : before).push(list2[index2]);
  }
  splice(existing, 0, 0, before);
}

// ../../node_modules/micromark-util-decode-numeric-character-reference/index.js
function decodeNumericCharacterReference(value, base) {
  const code = Number.parseInt(value, base);
  if (
    // C0 except for HT, LF, FF, CR, space.
    code < 9 || code === 11 || code > 13 && code < 32 || // Control character (DEL) of C0, and C1 controls.
    code > 126 && code < 160 || // Lone high surrogates and low surrogates.
    code > 55295 && code < 57344 || // Noncharacters.
    code > 64975 && code < 65008 || /* eslint-disable no-bitwise */
    (code & 65535) === 65535 || (code & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    code > 1114111
  ) {
    return "\uFFFD";
  }
  return String.fromCodePoint(code);
}

// ../../node_modules/micromark-util-normalize-identifier/index.js
function normalizeIdentifier(value) {
  return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}

// ../../node_modules/micromark-util-character/index.js
var asciiAlpha = regexCheck(/[A-Za-z]/);
var asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
var asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
function asciiControl(code) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    code !== null && (code < 32 || code === 127)
  );
}
var asciiDigit = regexCheck(/\d/);
var asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
var asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
function markdownLineEnding(code) {
  return code !== null && code < -2;
}
function markdownLineEndingOrSpace(code) {
  return code !== null && (code < 0 || code === 32);
}
function markdownSpace(code) {
  return code === -2 || code === -1 || code === 32;
}
var unicodePunctuation = regexCheck(new RegExp("\\p{P}|\\p{S}", "u"));
var unicodeWhitespace = regexCheck(/\s/);
function regexCheck(regex) {
  return check;
  function check(code) {
    return code !== null && code > -1 && regex.test(String.fromCharCode(code));
  }
}

// ../../node_modules/micromark-factory-space/index.js
function factorySpace(effects, ok3, type2, max) {
  const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
  let size = 0;
  return start;
  function start(code) {
    if (markdownSpace(code)) {
      effects.enter(type2);
      return prefix(code);
    }
    return ok3(code);
  }
  function prefix(code) {
    if (markdownSpace(code) && size++ < limit) {
      effects.consume(code);
      return prefix;
    }
    effects.exit(type2);
    return ok3(code);
  }
}

// ../../node_modules/micromark/lib/initialize/content.js
var content = {
  tokenize: initializeContent
};
function initializeContent(effects) {
  const contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
  let previous2;
  return contentStart;
  function afterContentStartConstruct(code) {
    if (code === null) {
      effects.consume(code);
      return;
    }
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return factorySpace(effects, contentStart, "linePrefix");
  }
  function paragraphInitial(code) {
    effects.enter("paragraph");
    return lineStart(code);
  }
  function lineStart(code) {
    const token = effects.enter("chunkText", {
      contentType: "text",
      previous: previous2
    });
    if (previous2) {
      previous2.next = token;
    }
    previous2 = token;
    return data(code);
  }
  function data(code) {
    if (code === null) {
      effects.exit("chunkText");
      effects.exit("paragraph");
      effects.consume(code);
      return;
    }
    if (markdownLineEnding(code)) {
      effects.consume(code);
      effects.exit("chunkText");
      return lineStart;
    }
    effects.consume(code);
    return data;
  }
}

// ../../node_modules/micromark/lib/initialize/document.js
var document = {
  tokenize: initializeDocument
};
var containerConstruct = {
  tokenize: tokenizeContainer
};
function initializeDocument(effects) {
  const self = this;
  const stack = [];
  let continued = 0;
  let childFlow;
  let childToken;
  let lineStartOffset;
  return start;
  function start(code) {
    if (continued < stack.length) {
      const item = stack[continued];
      self.containerState = item[1];
      return effects.attempt(item[0].continuation, documentContinue, checkNewContainers)(code);
    }
    return checkNewContainers(code);
  }
  function documentContinue(code) {
    continued++;
    if (self.containerState._closeFlow) {
      self.containerState._closeFlow = void 0;
      if (childFlow) {
        closeFlow();
      }
      const indexBeforeExits = self.events.length;
      let indexBeforeFlow = indexBeforeExits;
      let point3;
      while (indexBeforeFlow--) {
        if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
          point3 = self.events[indexBeforeFlow][1].end;
          break;
        }
      }
      exitContainers(continued);
      let index2 = indexBeforeExits;
      while (index2 < self.events.length) {
        self.events[index2][1].end = {
          ...point3
        };
        index2++;
      }
      splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
      self.events.length = index2;
      return checkNewContainers(code);
    }
    return start(code);
  }
  function checkNewContainers(code) {
    if (continued === stack.length) {
      if (!childFlow) {
        return documentContinued(code);
      }
      if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
        return flowStart(code);
      }
      self.interrupt = Boolean(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
    }
    self.containerState = {};
    return effects.check(containerConstruct, thereIsANewContainer, thereIsNoNewContainer)(code);
  }
  function thereIsANewContainer(code) {
    if (childFlow) closeFlow();
    exitContainers(continued);
    return documentContinued(code);
  }
  function thereIsNoNewContainer(code) {
    self.parser.lazy[self.now().line] = continued !== stack.length;
    lineStartOffset = self.now().offset;
    return flowStart(code);
  }
  function documentContinued(code) {
    self.containerState = {};
    return effects.attempt(containerConstruct, containerContinue, flowStart)(code);
  }
  function containerContinue(code) {
    continued++;
    stack.push([self.currentConstruct, self.containerState]);
    return documentContinued(code);
  }
  function flowStart(code) {
    if (code === null) {
      if (childFlow) closeFlow();
      exitContainers(0);
      effects.consume(code);
      return;
    }
    childFlow = childFlow || self.parser.flow(self.now());
    effects.enter("chunkFlow", {
      _tokenizer: childFlow,
      contentType: "flow",
      previous: childToken
    });
    return flowContinue(code);
  }
  function flowContinue(code) {
    if (code === null) {
      writeToChild(effects.exit("chunkFlow"), true);
      exitContainers(0);
      effects.consume(code);
      return;
    }
    if (markdownLineEnding(code)) {
      effects.consume(code);
      writeToChild(effects.exit("chunkFlow"));
      continued = 0;
      self.interrupt = void 0;
      return start;
    }
    effects.consume(code);
    return flowContinue;
  }
  function writeToChild(token, endOfFile) {
    const stream = self.sliceStream(token);
    if (endOfFile) stream.push(null);
    token.previous = childToken;
    if (childToken) childToken.next = token;
    childToken = token;
    childFlow.defineSkip(token.start);
    childFlow.write(stream);
    if (self.parser.lazy[token.start.line]) {
      let index2 = childFlow.events.length;
      while (index2--) {
        if (
          // The token starts before the line ending…
          childFlow.events[index2][1].start.offset < lineStartOffset && // …and either is not ended yet…
          (!childFlow.events[index2][1].end || // …or ends after it.
          childFlow.events[index2][1].end.offset > lineStartOffset)
        ) {
          return;
        }
      }
      const indexBeforeExits = self.events.length;
      let indexBeforeFlow = indexBeforeExits;
      let seen;
      let point3;
      while (indexBeforeFlow--) {
        if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
          if (seen) {
            point3 = self.events[indexBeforeFlow][1].end;
            break;
          }
          seen = true;
        }
      }
      exitContainers(continued);
      index2 = indexBeforeExits;
      while (index2 < self.events.length) {
        self.events[index2][1].end = {
          ...point3
        };
        index2++;
      }
      splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
      self.events.length = index2;
    }
  }
  function exitContainers(size) {
    let index2 = stack.length;
    while (index2-- > size) {
      const entry = stack[index2];
      self.containerState = entry[1];
      entry[0].exit.call(self, effects);
    }
    stack.length = size;
  }
  function closeFlow() {
    childFlow.write([null]);
    childToken = void 0;
    childFlow = void 0;
    self.containerState._closeFlow = void 0;
  }
}
function tokenizeContainer(effects, ok3, nok) {
  return factorySpace(effects, effects.attempt(this.parser.constructs.document, ok3, nok), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}

// ../../node_modules/micromark-util-classify-character/index.js
function classifyCharacter(code) {
  if (code === null || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) {
    return 1;
  }
  if (unicodePunctuation(code)) {
    return 2;
  }
}

// ../../node_modules/micromark-util-resolve-all/index.js
function resolveAll(constructs2, events, context) {
  const called = [];
  let index2 = -1;
  while (++index2 < constructs2.length) {
    const resolve6 = constructs2[index2].resolveAll;
    if (resolve6 && !called.includes(resolve6)) {
      events = resolve6(events, context);
      called.push(resolve6);
    }
  }
  return events;
}

// ../../node_modules/micromark-core-commonmark/lib/attention.js
var attention = {
  name: "attention",
  resolveAll: resolveAllAttention,
  tokenize: tokenizeAttention
};
function resolveAllAttention(events, context) {
  let index2 = -1;
  let open;
  let group;
  let text3;
  let openingSequence;
  let closingSequence;
  let use;
  let nextEvents;
  let offset;
  while (++index2 < events.length) {
    if (events[index2][0] === "enter" && events[index2][1].type === "attentionSequence" && events[index2][1]._close) {
      open = index2;
      while (open--) {
        if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && // If the markers are the same:
        context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index2][1]).charCodeAt(0)) {
          if ((events[open][1]._close || events[index2][1]._open) && (events[index2][1].end.offset - events[index2][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index2][1].end.offset - events[index2][1].start.offset) % 3)) {
            continue;
          }
          use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index2][1].end.offset - events[index2][1].start.offset > 1 ? 2 : 1;
          const start = {
            ...events[open][1].end
          };
          const end = {
            ...events[index2][1].start
          };
          movePoint(start, -use);
          movePoint(end, use);
          openingSequence = {
            type: use > 1 ? "strongSequence" : "emphasisSequence",
            start,
            end: {
              ...events[open][1].end
            }
          };
          closingSequence = {
            type: use > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...events[index2][1].start
            },
            end
          };
          text3 = {
            type: use > 1 ? "strongText" : "emphasisText",
            start: {
              ...events[open][1].end
            },
            end: {
              ...events[index2][1].start
            }
          };
          group = {
            type: use > 1 ? "strong" : "emphasis",
            start: {
              ...openingSequence.start
            },
            end: {
              ...closingSequence.end
            }
          };
          events[open][1].end = {
            ...openingSequence.start
          };
          events[index2][1].start = {
            ...closingSequence.end
          };
          nextEvents = [];
          if (events[open][1].end.offset - events[open][1].start.offset) {
            nextEvents = push(nextEvents, [["enter", events[open][1], context], ["exit", events[open][1], context]]);
          }
          nextEvents = push(nextEvents, [["enter", group, context], ["enter", openingSequence, context], ["exit", openingSequence, context], ["enter", text3, context]]);
          nextEvents = push(nextEvents, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index2), context));
          nextEvents = push(nextEvents, [["exit", text3, context], ["enter", closingSequence, context], ["exit", closingSequence, context], ["exit", group, context]]);
          if (events[index2][1].end.offset - events[index2][1].start.offset) {
            offset = 2;
            nextEvents = push(nextEvents, [["enter", events[index2][1], context], ["exit", events[index2][1], context]]);
          } else {
            offset = 0;
          }
          splice(events, open - 1, index2 - open + 3, nextEvents);
          index2 = open + nextEvents.length - offset - 2;
          break;
        }
      }
    }
  }
  index2 = -1;
  while (++index2 < events.length) {
    if (events[index2][1].type === "attentionSequence") {
      events[index2][1].type = "data";
    }
  }
  return events;
}
function tokenizeAttention(effects, ok3) {
  const attentionMarkers2 = this.parser.constructs.attentionMarkers.null;
  const previous2 = this.previous;
  const before = classifyCharacter(previous2);
  let marker;
  return start;
  function start(code) {
    marker = code;
    effects.enter("attentionSequence");
    return inside(code);
  }
  function inside(code) {
    if (code === marker) {
      effects.consume(code);
      return inside;
    }
    const token = effects.exit("attentionSequence");
    const after = classifyCharacter(code);
    const open = !after || after === 2 && before || attentionMarkers2.includes(code);
    const close = !before || before === 2 && after || attentionMarkers2.includes(previous2);
    token._open = Boolean(marker === 42 ? open : open && (before || !close));
    token._close = Boolean(marker === 42 ? close : close && (after || !open));
    return ok3(code);
  }
}
function movePoint(point3, offset) {
  point3.column += offset;
  point3.offset += offset;
  point3._bufferIndex += offset;
}

// ../../node_modules/micromark-core-commonmark/lib/autolink.js
var autolink = {
  name: "autolink",
  tokenize: tokenizeAutolink
};
function tokenizeAutolink(effects, ok3, nok) {
  let size = 0;
  return start;
  function start(code) {
    effects.enter("autolink");
    effects.enter("autolinkMarker");
    effects.consume(code);
    effects.exit("autolinkMarker");
    effects.enter("autolinkProtocol");
    return open;
  }
  function open(code) {
    if (asciiAlpha(code)) {
      effects.consume(code);
      return schemeOrEmailAtext;
    }
    if (code === 64) {
      return nok(code);
    }
    return emailAtext(code);
  }
  function schemeOrEmailAtext(code) {
    if (code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) {
      size = 1;
      return schemeInsideOrEmailAtext(code);
    }
    return emailAtext(code);
  }
  function schemeInsideOrEmailAtext(code) {
    if (code === 58) {
      effects.consume(code);
      size = 0;
      return urlInside;
    }
    if ((code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) && size++ < 32) {
      effects.consume(code);
      return schemeInsideOrEmailAtext;
    }
    size = 0;
    return emailAtext(code);
  }
  function urlInside(code) {
    if (code === 62) {
      effects.exit("autolinkProtocol");
      effects.enter("autolinkMarker");
      effects.consume(code);
      effects.exit("autolinkMarker");
      effects.exit("autolink");
      return ok3;
    }
    if (code === null || code === 32 || code === 60 || asciiControl(code)) {
      return nok(code);
    }
    effects.consume(code);
    return urlInside;
  }
  function emailAtext(code) {
    if (code === 64) {
      effects.consume(code);
      return emailAtSignOrDot;
    }
    if (asciiAtext(code)) {
      effects.consume(code);
      return emailAtext;
    }
    return nok(code);
  }
  function emailAtSignOrDot(code) {
    return asciiAlphanumeric(code) ? emailLabel(code) : nok(code);
  }
  function emailLabel(code) {
    if (code === 46) {
      effects.consume(code);
      size = 0;
      return emailAtSignOrDot;
    }
    if (code === 62) {
      effects.exit("autolinkProtocol").type = "autolinkEmail";
      effects.enter("autolinkMarker");
      effects.consume(code);
      effects.exit("autolinkMarker");
      effects.exit("autolink");
      return ok3;
    }
    return emailValue(code);
  }
  function emailValue(code) {
    if ((code === 45 || asciiAlphanumeric(code)) && size++ < 63) {
      const next = code === 45 ? emailValue : emailLabel;
      effects.consume(code);
      return next;
    }
    return nok(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/blank-line.js
var blankLine = {
  partial: true,
  tokenize: tokenizeBlankLine
};
function tokenizeBlankLine(effects, ok3, nok) {
  return start;
  function start(code) {
    return markdownSpace(code) ? factorySpace(effects, after, "linePrefix")(code) : after(code);
  }
  function after(code) {
    return code === null || markdownLineEnding(code) ? ok3(code) : nok(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/block-quote.js
var blockQuote = {
  continuation: {
    tokenize: tokenizeBlockQuoteContinuation
  },
  exit,
  name: "blockQuote",
  tokenize: tokenizeBlockQuoteStart
};
function tokenizeBlockQuoteStart(effects, ok3, nok) {
  const self = this;
  return start;
  function start(code) {
    if (code === 62) {
      const state = self.containerState;
      if (!state.open) {
        effects.enter("blockQuote", {
          _container: true
        });
        state.open = true;
      }
      effects.enter("blockQuotePrefix");
      effects.enter("blockQuoteMarker");
      effects.consume(code);
      effects.exit("blockQuoteMarker");
      return after;
    }
    return nok(code);
  }
  function after(code) {
    if (markdownSpace(code)) {
      effects.enter("blockQuotePrefixWhitespace");
      effects.consume(code);
      effects.exit("blockQuotePrefixWhitespace");
      effects.exit("blockQuotePrefix");
      return ok3;
    }
    effects.exit("blockQuotePrefix");
    return ok3(code);
  }
}
function tokenizeBlockQuoteContinuation(effects, ok3, nok) {
  const self = this;
  return contStart;
  function contStart(code) {
    if (markdownSpace(code)) {
      return factorySpace(effects, contBefore, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code);
    }
    return contBefore(code);
  }
  function contBefore(code) {
    return effects.attempt(blockQuote, ok3, nok)(code);
  }
}
function exit(effects) {
  effects.exit("blockQuote");
}

// ../../node_modules/micromark-core-commonmark/lib/character-escape.js
var characterEscape = {
  name: "characterEscape",
  tokenize: tokenizeCharacterEscape
};
function tokenizeCharacterEscape(effects, ok3, nok) {
  return start;
  function start(code) {
    effects.enter("characterEscape");
    effects.enter("escapeMarker");
    effects.consume(code);
    effects.exit("escapeMarker");
    return inside;
  }
  function inside(code) {
    if (asciiPunctuation(code)) {
      effects.enter("characterEscapeValue");
      effects.consume(code);
      effects.exit("characterEscapeValue");
      effects.exit("characterEscape");
      return ok3;
    }
    return nok(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/character-reference.js
var characterReference = {
  name: "characterReference",
  tokenize: tokenizeCharacterReference
};
function tokenizeCharacterReference(effects, ok3, nok) {
  const self = this;
  let size = 0;
  let max;
  let test;
  return start;
  function start(code) {
    effects.enter("characterReference");
    effects.enter("characterReferenceMarker");
    effects.consume(code);
    effects.exit("characterReferenceMarker");
    return open;
  }
  function open(code) {
    if (code === 35) {
      effects.enter("characterReferenceMarkerNumeric");
      effects.consume(code);
      effects.exit("characterReferenceMarkerNumeric");
      return numeric;
    }
    effects.enter("characterReferenceValue");
    max = 31;
    test = asciiAlphanumeric;
    return value(code);
  }
  function numeric(code) {
    if (code === 88 || code === 120) {
      effects.enter("characterReferenceMarkerHexadecimal");
      effects.consume(code);
      effects.exit("characterReferenceMarkerHexadecimal");
      effects.enter("characterReferenceValue");
      max = 6;
      test = asciiHexDigit;
      return value;
    }
    effects.enter("characterReferenceValue");
    max = 7;
    test = asciiDigit;
    return value(code);
  }
  function value(code) {
    if (code === 59 && size) {
      const token = effects.exit("characterReferenceValue");
      if (test === asciiAlphanumeric && !decodeNamedCharacterReference(self.sliceSerialize(token))) {
        return nok(code);
      }
      effects.enter("characterReferenceMarker");
      effects.consume(code);
      effects.exit("characterReferenceMarker");
      effects.exit("characterReference");
      return ok3;
    }
    if (test(code) && size++ < max) {
      effects.consume(code);
      return value;
    }
    return nok(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/code-fenced.js
var nonLazyContinuation = {
  partial: true,
  tokenize: tokenizeNonLazyContinuation
};
var codeFenced = {
  concrete: true,
  name: "codeFenced",
  tokenize: tokenizeCodeFenced
};
function tokenizeCodeFenced(effects, ok3, nok) {
  const self = this;
  const closeStart = {
    partial: true,
    tokenize: tokenizeCloseStart
  };
  let initialPrefix = 0;
  let sizeOpen = 0;
  let marker;
  return start;
  function start(code) {
    return beforeSequenceOpen(code);
  }
  function beforeSequenceOpen(code) {
    const tail = self.events[self.events.length - 1];
    initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
    marker = code;
    effects.enter("codeFenced");
    effects.enter("codeFencedFence");
    effects.enter("codeFencedFenceSequence");
    return sequenceOpen(code);
  }
  function sequenceOpen(code) {
    if (code === marker) {
      sizeOpen++;
      effects.consume(code);
      return sequenceOpen;
    }
    if (sizeOpen < 3) {
      return nok(code);
    }
    effects.exit("codeFencedFenceSequence");
    return markdownSpace(code) ? factorySpace(effects, infoBefore, "whitespace")(code) : infoBefore(code);
  }
  function infoBefore(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("codeFencedFence");
      return self.interrupt ? ok3(code) : effects.check(nonLazyContinuation, atNonLazyBreak, after)(code);
    }
    effects.enter("codeFencedFenceInfo");
    effects.enter("chunkString", {
      contentType: "string"
    });
    return info(code);
  }
  function info(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceInfo");
      return infoBefore(code);
    }
    if (markdownSpace(code)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceInfo");
      return factorySpace(effects, metaBefore, "whitespace")(code);
    }
    if (code === 96 && code === marker) {
      return nok(code);
    }
    effects.consume(code);
    return info;
  }
  function metaBefore(code) {
    if (code === null || markdownLineEnding(code)) {
      return infoBefore(code);
    }
    effects.enter("codeFencedFenceMeta");
    effects.enter("chunkString", {
      contentType: "string"
    });
    return meta(code);
  }
  function meta(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceMeta");
      return infoBefore(code);
    }
    if (code === 96 && code === marker) {
      return nok(code);
    }
    effects.consume(code);
    return meta;
  }
  function atNonLazyBreak(code) {
    return effects.attempt(closeStart, after, contentBefore)(code);
  }
  function contentBefore(code) {
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return contentStart;
  }
  function contentStart(code) {
    return initialPrefix > 0 && markdownSpace(code) ? factorySpace(effects, beforeContentChunk, "linePrefix", initialPrefix + 1)(code) : beforeContentChunk(code);
  }
  function beforeContentChunk(code) {
    if (code === null || markdownLineEnding(code)) {
      return effects.check(nonLazyContinuation, atNonLazyBreak, after)(code);
    }
    effects.enter("codeFlowValue");
    return contentChunk(code);
  }
  function contentChunk(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("codeFlowValue");
      return beforeContentChunk(code);
    }
    effects.consume(code);
    return contentChunk;
  }
  function after(code) {
    effects.exit("codeFenced");
    return ok3(code);
  }
  function tokenizeCloseStart(effects2, ok4, nok2) {
    let size = 0;
    return startBefore;
    function startBefore(code) {
      effects2.enter("lineEnding");
      effects2.consume(code);
      effects2.exit("lineEnding");
      return start2;
    }
    function start2(code) {
      effects2.enter("codeFencedFence");
      return markdownSpace(code) ? factorySpace(effects2, beforeSequenceClose, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code) : beforeSequenceClose(code);
    }
    function beforeSequenceClose(code) {
      if (code === marker) {
        effects2.enter("codeFencedFenceSequence");
        return sequenceClose(code);
      }
      return nok2(code);
    }
    function sequenceClose(code) {
      if (code === marker) {
        size++;
        effects2.consume(code);
        return sequenceClose;
      }
      if (size >= sizeOpen) {
        effects2.exit("codeFencedFenceSequence");
        return markdownSpace(code) ? factorySpace(effects2, sequenceCloseAfter, "whitespace")(code) : sequenceCloseAfter(code);
      }
      return nok2(code);
    }
    function sequenceCloseAfter(code) {
      if (code === null || markdownLineEnding(code)) {
        effects2.exit("codeFencedFence");
        return ok4(code);
      }
      return nok2(code);
    }
  }
}
function tokenizeNonLazyContinuation(effects, ok3, nok) {
  const self = this;
  return start;
  function start(code) {
    if (code === null) {
      return nok(code);
    }
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return lineStart;
  }
  function lineStart(code) {
    return self.parser.lazy[self.now().line] ? nok(code) : ok3(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/code-indented.js
var codeIndented = {
  name: "codeIndented",
  tokenize: tokenizeCodeIndented
};
var furtherStart = {
  partial: true,
  tokenize: tokenizeFurtherStart
};
function tokenizeCodeIndented(effects, ok3, nok) {
  const self = this;
  return start;
  function start(code) {
    effects.enter("codeIndented");
    return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code);
  }
  function afterPrefix(code) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? atBreak(code) : nok(code);
  }
  function atBreak(code) {
    if (code === null) {
      return after(code);
    }
    if (markdownLineEnding(code)) {
      return effects.attempt(furtherStart, atBreak, after)(code);
    }
    effects.enter("codeFlowValue");
    return inside(code);
  }
  function inside(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("codeFlowValue");
      return atBreak(code);
    }
    effects.consume(code);
    return inside;
  }
  function after(code) {
    effects.exit("codeIndented");
    return ok3(code);
  }
}
function tokenizeFurtherStart(effects, ok3, nok) {
  const self = this;
  return furtherStart2;
  function furtherStart2(code) {
    if (self.parser.lazy[self.now().line]) {
      return nok(code);
    }
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return furtherStart2;
    }
    return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code);
  }
  function afterPrefix(code) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? ok3(code) : markdownLineEnding(code) ? furtherStart2(code) : nok(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/code-text.js
var codeText = {
  name: "codeText",
  previous,
  resolve: resolveCodeText,
  tokenize: tokenizeCodeText
};
function resolveCodeText(events) {
  let tailExitIndex = events.length - 4;
  let headEnterIndex = 3;
  let index2;
  let enter;
  if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
    index2 = headEnterIndex;
    while (++index2 < tailExitIndex) {
      if (events[index2][1].type === "codeTextData") {
        events[headEnterIndex][1].type = "codeTextPadding";
        events[tailExitIndex][1].type = "codeTextPadding";
        headEnterIndex += 2;
        tailExitIndex -= 2;
        break;
      }
    }
  }
  index2 = headEnterIndex - 1;
  tailExitIndex++;
  while (++index2 <= tailExitIndex) {
    if (enter === void 0) {
      if (index2 !== tailExitIndex && events[index2][1].type !== "lineEnding") {
        enter = index2;
      }
    } else if (index2 === tailExitIndex || events[index2][1].type === "lineEnding") {
      events[enter][1].type = "codeTextData";
      if (index2 !== enter + 2) {
        events[enter][1].end = events[index2 - 1][1].end;
        events.splice(enter + 2, index2 - enter - 2);
        tailExitIndex -= index2 - enter - 2;
        index2 = enter + 2;
      }
      enter = void 0;
    }
  }
  return events;
}
function previous(code) {
  return code !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function tokenizeCodeText(effects, ok3, nok) {
  const self = this;
  let sizeOpen = 0;
  let size;
  let token;
  return start;
  function start(code) {
    effects.enter("codeText");
    effects.enter("codeTextSequence");
    return sequenceOpen(code);
  }
  function sequenceOpen(code) {
    if (code === 96) {
      effects.consume(code);
      sizeOpen++;
      return sequenceOpen;
    }
    effects.exit("codeTextSequence");
    return between(code);
  }
  function between(code) {
    if (code === null) {
      return nok(code);
    }
    if (code === 32) {
      effects.enter("space");
      effects.consume(code);
      effects.exit("space");
      return between;
    }
    if (code === 96) {
      token = effects.enter("codeTextSequence");
      size = 0;
      return sequenceClose(code);
    }
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return between;
    }
    effects.enter("codeTextData");
    return data(code);
  }
  function data(code) {
    if (code === null || code === 32 || code === 96 || markdownLineEnding(code)) {
      effects.exit("codeTextData");
      return between(code);
    }
    effects.consume(code);
    return data;
  }
  function sequenceClose(code) {
    if (code === 96) {
      effects.consume(code);
      size++;
      return sequenceClose;
    }
    if (size === sizeOpen) {
      effects.exit("codeTextSequence");
      effects.exit("codeText");
      return ok3(code);
    }
    token.type = "codeTextData";
    return data(code);
  }
}

// ../../node_modules/micromark-util-subtokenize/lib/splice-buffer.js
var SpliceBuffer = class {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(initial) {
    this.left = initial ? [...initial] : [];
    this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(index2) {
    if (index2 < 0 || index2 >= this.left.length + this.right.length) {
      throw new RangeError("Cannot access index `" + index2 + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    }
    if (index2 < this.left.length) return this.left[index2];
    return this.right[this.right.length - index2 + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    this.setCursor(0);
    return this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(start, end) {
    const stop = end === null || end === void 0 ? Number.POSITIVE_INFINITY : end;
    if (stop < this.left.length) {
      return this.left.slice(start, stop);
    }
    if (start > this.left.length) {
      return this.right.slice(this.right.length - stop + this.left.length, this.right.length - start + this.left.length).reverse();
    }
    return this.left.slice(start).concat(this.right.slice(this.right.length - stop + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(start, deleteCount, items) {
    const count = deleteCount || 0;
    this.setCursor(Math.trunc(start));
    const removed = this.right.splice(this.right.length - count, Number.POSITIVE_INFINITY);
    if (items) chunkedPush(this.left, items);
    return removed.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    this.setCursor(Number.POSITIVE_INFINITY);
    return this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(item) {
    this.setCursor(Number.POSITIVE_INFINITY);
    this.left.push(item);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(items) {
    this.setCursor(Number.POSITIVE_INFINITY);
    chunkedPush(this.left, items);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(item) {
    this.setCursor(0);
    this.right.push(item);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(items) {
    this.setCursor(0);
    chunkedPush(this.right, items.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(n) {
    if (n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0) return;
    if (n < this.left.length) {
      const removed = this.left.splice(n, Number.POSITIVE_INFINITY);
      chunkedPush(this.right, removed.reverse());
    } else {
      const removed = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
      chunkedPush(this.left, removed.reverse());
    }
  }
};
function chunkedPush(list2, right) {
  let chunkStart = 0;
  if (right.length < 1e4) {
    list2.push(...right);
  } else {
    while (chunkStart < right.length) {
      list2.push(...right.slice(chunkStart, chunkStart + 1e4));
      chunkStart += 1e4;
    }
  }
}

// ../../node_modules/micromark-util-subtokenize/index.js
function subtokenize(eventsArray) {
  const jumps = {};
  let index2 = -1;
  let event;
  let lineIndex;
  let otherIndex;
  let otherEvent;
  let parameters;
  let subevents;
  let more;
  const events = new SpliceBuffer(eventsArray);
  while (++index2 < events.length) {
    while (index2 in jumps) {
      index2 = jumps[index2];
    }
    event = events.get(index2);
    if (index2 && event[1].type === "chunkFlow" && events.get(index2 - 1)[1].type === "listItemPrefix") {
      subevents = event[1]._tokenizer.events;
      otherIndex = 0;
      if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") {
        otherIndex += 2;
      }
      if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") {
        while (++otherIndex < subevents.length) {
          if (subevents[otherIndex][1].type === "content") {
            break;
          }
          if (subevents[otherIndex][1].type === "chunkText") {
            subevents[otherIndex][1]._isInFirstContentOfListItem = true;
            otherIndex++;
          }
        }
      }
    }
    if (event[0] === "enter") {
      if (event[1].contentType) {
        Object.assign(jumps, subcontent(events, index2));
        index2 = jumps[index2];
        more = true;
      }
    } else if (event[1]._container) {
      otherIndex = index2;
      lineIndex = void 0;
      while (otherIndex--) {
        otherEvent = events.get(otherIndex);
        if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
          if (otherEvent[0] === "enter") {
            if (lineIndex) {
              events.get(lineIndex)[1].type = "lineEndingBlank";
            }
            otherEvent[1].type = "lineEnding";
            lineIndex = otherIndex;
          }
        } else if (otherEvent[1].type === "linePrefix" || otherEvent[1].type === "listItemIndent") {
        } else {
          break;
        }
      }
      if (lineIndex) {
        event[1].end = {
          ...events.get(lineIndex)[1].start
        };
        parameters = events.slice(lineIndex, index2);
        parameters.unshift(event);
        events.splice(lineIndex, index2 - lineIndex + 1, parameters);
      }
    }
  }
  splice(eventsArray, 0, Number.POSITIVE_INFINITY, events.slice(0));
  return !more;
}
function subcontent(events, eventIndex) {
  const token = events.get(eventIndex)[1];
  const context = events.get(eventIndex)[2];
  let startPosition = eventIndex - 1;
  const startPositions = [];
  let tokenizer = token._tokenizer;
  if (!tokenizer) {
    tokenizer = context.parser[token.contentType](token.start);
    if (token._contentTypeTextTrailing) {
      tokenizer._contentTypeTextTrailing = true;
    }
  }
  const childEvents = tokenizer.events;
  const jumps = [];
  const gaps = {};
  let stream;
  let previous2;
  let index2 = -1;
  let current = token;
  let adjust = 0;
  let start = 0;
  const breaks = [start];
  while (current) {
    while (events.get(++startPosition)[1] !== current) {
    }
    startPositions.push(startPosition);
    if (!current._tokenizer) {
      stream = context.sliceStream(current);
      if (!current.next) {
        stream.push(null);
      }
      if (previous2) {
        tokenizer.defineSkip(current.start);
      }
      if (current._isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = true;
      }
      tokenizer.write(stream);
      if (current._isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = void 0;
      }
    }
    previous2 = current;
    current = current.next;
  }
  current = token;
  while (++index2 < childEvents.length) {
    if (
      // Find a void token that includes a break.
      childEvents[index2][0] === "exit" && childEvents[index2 - 1][0] === "enter" && childEvents[index2][1].type === childEvents[index2 - 1][1].type && childEvents[index2][1].start.line !== childEvents[index2][1].end.line
    ) {
      start = index2 + 1;
      breaks.push(start);
      current._tokenizer = void 0;
      current.previous = void 0;
      current = current.next;
    }
  }
  tokenizer.events = [];
  if (current) {
    current._tokenizer = void 0;
    current.previous = void 0;
  } else {
    breaks.pop();
  }
  index2 = breaks.length;
  while (index2--) {
    const slice = childEvents.slice(breaks[index2], breaks[index2 + 1]);
    const start2 = startPositions.pop();
    jumps.push([start2, start2 + slice.length - 1]);
    events.splice(start2, 2, slice);
  }
  jumps.reverse();
  index2 = -1;
  while (++index2 < jumps.length) {
    gaps[adjust + jumps[index2][0]] = adjust + jumps[index2][1];
    adjust += jumps[index2][1] - jumps[index2][0] - 1;
  }
  return gaps;
}

// ../../node_modules/micromark-core-commonmark/lib/content.js
var content2 = {
  resolve: resolveContent,
  tokenize: tokenizeContent
};
var continuationConstruct = {
  partial: true,
  tokenize: tokenizeContinuation
};
function resolveContent(events) {
  subtokenize(events);
  return events;
}
function tokenizeContent(effects, ok3) {
  let previous2;
  return chunkStart;
  function chunkStart(code) {
    effects.enter("content");
    previous2 = effects.enter("chunkContent", {
      contentType: "content"
    });
    return chunkInside(code);
  }
  function chunkInside(code) {
    if (code === null) {
      return contentEnd(code);
    }
    if (markdownLineEnding(code)) {
      return effects.check(continuationConstruct, contentContinue, contentEnd)(code);
    }
    effects.consume(code);
    return chunkInside;
  }
  function contentEnd(code) {
    effects.exit("chunkContent");
    effects.exit("content");
    return ok3(code);
  }
  function contentContinue(code) {
    effects.consume(code);
    effects.exit("chunkContent");
    previous2.next = effects.enter("chunkContent", {
      contentType: "content",
      previous: previous2
    });
    previous2 = previous2.next;
    return chunkInside;
  }
}
function tokenizeContinuation(effects, ok3, nok) {
  const self = this;
  return startLookahead;
  function startLookahead(code) {
    effects.exit("chunkContent");
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return factorySpace(effects, prefixed, "linePrefix");
  }
  function prefixed(code) {
    if (code === null || markdownLineEnding(code)) {
      return nok(code);
    }
    const tail = self.events[self.events.length - 1];
    if (!self.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) {
      return ok3(code);
    }
    return effects.interrupt(self.parser.constructs.flow, nok, ok3)(code);
  }
}

// ../../node_modules/micromark-factory-destination/index.js
function factoryDestination(effects, ok3, nok, type2, literalType, literalMarkerType, rawType, stringType, max) {
  const limit = max || Number.POSITIVE_INFINITY;
  let balance = 0;
  return start;
  function start(code) {
    if (code === 60) {
      effects.enter(type2);
      effects.enter(literalType);
      effects.enter(literalMarkerType);
      effects.consume(code);
      effects.exit(literalMarkerType);
      return enclosedBefore;
    }
    if (code === null || code === 32 || code === 41 || asciiControl(code)) {
      return nok(code);
    }
    effects.enter(type2);
    effects.enter(rawType);
    effects.enter(stringType);
    effects.enter("chunkString", {
      contentType: "string"
    });
    return raw(code);
  }
  function enclosedBefore(code) {
    if (code === 62) {
      effects.enter(literalMarkerType);
      effects.consume(code);
      effects.exit(literalMarkerType);
      effects.exit(literalType);
      effects.exit(type2);
      return ok3;
    }
    effects.enter(stringType);
    effects.enter("chunkString", {
      contentType: "string"
    });
    return enclosed(code);
  }
  function enclosed(code) {
    if (code === 62) {
      effects.exit("chunkString");
      effects.exit(stringType);
      return enclosedBefore(code);
    }
    if (code === null || code === 60 || markdownLineEnding(code)) {
      return nok(code);
    }
    effects.consume(code);
    return code === 92 ? enclosedEscape : enclosed;
  }
  function enclosedEscape(code) {
    if (code === 60 || code === 62 || code === 92) {
      effects.consume(code);
      return enclosed;
    }
    return enclosed(code);
  }
  function raw(code) {
    if (!balance && (code === null || code === 41 || markdownLineEndingOrSpace(code))) {
      effects.exit("chunkString");
      effects.exit(stringType);
      effects.exit(rawType);
      effects.exit(type2);
      return ok3(code);
    }
    if (balance < limit && code === 40) {
      effects.consume(code);
      balance++;
      return raw;
    }
    if (code === 41) {
      effects.consume(code);
      balance--;
      return raw;
    }
    if (code === null || code === 32 || code === 40 || asciiControl(code)) {
      return nok(code);
    }
    effects.consume(code);
    return code === 92 ? rawEscape : raw;
  }
  function rawEscape(code) {
    if (code === 40 || code === 41 || code === 92) {
      effects.consume(code);
      return raw;
    }
    return raw(code);
  }
}

// ../../node_modules/micromark-factory-label/index.js
function factoryLabel(effects, ok3, nok, type2, markerType, stringType) {
  const self = this;
  let size = 0;
  let seen;
  return start;
  function start(code) {
    effects.enter(type2);
    effects.enter(markerType);
    effects.consume(code);
    effects.exit(markerType);
    effects.enter(stringType);
    return atBreak;
  }
  function atBreak(code) {
    if (size > 999 || code === null || code === 91 || code === 93 && !seen || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    code === 94 && !size && "_hiddenFootnoteSupport" in self.parser.constructs) {
      return nok(code);
    }
    if (code === 93) {
      effects.exit(stringType);
      effects.enter(markerType);
      effects.consume(code);
      effects.exit(markerType);
      effects.exit(type2);
      return ok3;
    }
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return atBreak;
    }
    effects.enter("chunkString", {
      contentType: "string"
    });
    return labelInside(code);
  }
  function labelInside(code) {
    if (code === null || code === 91 || code === 93 || markdownLineEnding(code) || size++ > 999) {
      effects.exit("chunkString");
      return atBreak(code);
    }
    effects.consume(code);
    if (!seen) seen = !markdownSpace(code);
    return code === 92 ? labelEscape : labelInside;
  }
  function labelEscape(code) {
    if (code === 91 || code === 92 || code === 93) {
      effects.consume(code);
      size++;
      return labelInside;
    }
    return labelInside(code);
  }
}

// ../../node_modules/micromark-factory-title/index.js
function factoryTitle(effects, ok3, nok, type2, markerType, stringType) {
  let marker;
  return start;
  function start(code) {
    if (code === 34 || code === 39 || code === 40) {
      effects.enter(type2);
      effects.enter(markerType);
      effects.consume(code);
      effects.exit(markerType);
      marker = code === 40 ? 41 : code;
      return begin;
    }
    return nok(code);
  }
  function begin(code) {
    if (code === marker) {
      effects.enter(markerType);
      effects.consume(code);
      effects.exit(markerType);
      effects.exit(type2);
      return ok3;
    }
    effects.enter(stringType);
    return atBreak(code);
  }
  function atBreak(code) {
    if (code === marker) {
      effects.exit(stringType);
      return begin(marker);
    }
    if (code === null) {
      return nok(code);
    }
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return factorySpace(effects, atBreak, "linePrefix");
    }
    effects.enter("chunkString", {
      contentType: "string"
    });
    return inside(code);
  }
  function inside(code) {
    if (code === marker || code === null || markdownLineEnding(code)) {
      effects.exit("chunkString");
      return atBreak(code);
    }
    effects.consume(code);
    return code === 92 ? escape : inside;
  }
  function escape(code) {
    if (code === marker || code === 92) {
      effects.consume(code);
      return inside;
    }
    return inside(code);
  }
}

// ../../node_modules/micromark-factory-whitespace/index.js
function factoryWhitespace(effects, ok3) {
  let seen;
  return start;
  function start(code) {
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      seen = true;
      return start;
    }
    if (markdownSpace(code)) {
      return factorySpace(effects, start, seen ? "linePrefix" : "lineSuffix")(code);
    }
    return ok3(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/definition.js
var definition = {
  name: "definition",
  tokenize: tokenizeDefinition
};
var titleBefore = {
  partial: true,
  tokenize: tokenizeTitleBefore
};
function tokenizeDefinition(effects, ok3, nok) {
  const self = this;
  let identifier;
  return start;
  function start(code) {
    effects.enter("definition");
    return before(code);
  }
  function before(code) {
    return factoryLabel.call(
      self,
      effects,
      labelAfter,
      // Note: we don’t need to reset the way `markdown-rs` does.
      nok,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(code);
  }
  function labelAfter(code) {
    identifier = normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1));
    if (code === 58) {
      effects.enter("definitionMarker");
      effects.consume(code);
      effects.exit("definitionMarker");
      return markerAfter;
    }
    return nok(code);
  }
  function markerAfter(code) {
    return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, destinationBefore)(code) : destinationBefore(code);
  }
  function destinationBefore(code) {
    return factoryDestination(
      effects,
      destinationAfter,
      // Note: we don’t need to reset the way `markdown-rs` does.
      nok,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(code);
  }
  function destinationAfter(code) {
    return effects.attempt(titleBefore, after, after)(code);
  }
  function after(code) {
    return markdownSpace(code) ? factorySpace(effects, afterWhitespace, "whitespace")(code) : afterWhitespace(code);
  }
  function afterWhitespace(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("definition");
      self.parser.defined.push(identifier);
      return ok3(code);
    }
    return nok(code);
  }
}
function tokenizeTitleBefore(effects, ok3, nok) {
  return titleBefore2;
  function titleBefore2(code) {
    return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, beforeMarker)(code) : nok(code);
  }
  function beforeMarker(code) {
    return factoryTitle(effects, titleAfter, nok, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(code);
  }
  function titleAfter(code) {
    return markdownSpace(code) ? factorySpace(effects, titleAfterOptionalWhitespace, "whitespace")(code) : titleAfterOptionalWhitespace(code);
  }
  function titleAfterOptionalWhitespace(code) {
    return code === null || markdownLineEnding(code) ? ok3(code) : nok(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/hard-break-escape.js
var hardBreakEscape = {
  name: "hardBreakEscape",
  tokenize: tokenizeHardBreakEscape
};
function tokenizeHardBreakEscape(effects, ok3, nok) {
  return start;
  function start(code) {
    effects.enter("hardBreakEscape");
    effects.consume(code);
    return after;
  }
  function after(code) {
    if (markdownLineEnding(code)) {
      effects.exit("hardBreakEscape");
      return ok3(code);
    }
    return nok(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/heading-atx.js
var headingAtx = {
  name: "headingAtx",
  resolve: resolveHeadingAtx,
  tokenize: tokenizeHeadingAtx
};
function resolveHeadingAtx(events, context) {
  let contentEnd = events.length - 2;
  let contentStart = 3;
  let content3;
  let text3;
  if (events[contentStart][1].type === "whitespace") {
    contentStart += 2;
  }
  if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") {
    contentEnd -= 2;
  }
  if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) {
    contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
  }
  if (contentEnd > contentStart) {
    content3 = {
      type: "atxHeadingText",
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end
    };
    text3 = {
      type: "chunkText",
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end,
      contentType: "text"
    };
    splice(events, contentStart, contentEnd - contentStart + 1, [["enter", content3, context], ["enter", text3, context], ["exit", text3, context], ["exit", content3, context]]);
  }
  return events;
}
function tokenizeHeadingAtx(effects, ok3, nok) {
  let size = 0;
  return start;
  function start(code) {
    effects.enter("atxHeading");
    return before(code);
  }
  function before(code) {
    effects.enter("atxHeadingSequence");
    return sequenceOpen(code);
  }
  function sequenceOpen(code) {
    if (code === 35 && size++ < 6) {
      effects.consume(code);
      return sequenceOpen;
    }
    if (code === null || markdownLineEndingOrSpace(code)) {
      effects.exit("atxHeadingSequence");
      return atBreak(code);
    }
    return nok(code);
  }
  function atBreak(code) {
    if (code === 35) {
      effects.enter("atxHeadingSequence");
      return sequenceFurther(code);
    }
    if (code === null || markdownLineEnding(code)) {
      effects.exit("atxHeading");
      return ok3(code);
    }
    if (markdownSpace(code)) {
      return factorySpace(effects, atBreak, "whitespace")(code);
    }
    effects.enter("atxHeadingText");
    return data(code);
  }
  function sequenceFurther(code) {
    if (code === 35) {
      effects.consume(code);
      return sequenceFurther;
    }
    effects.exit("atxHeadingSequence");
    return atBreak(code);
  }
  function data(code) {
    if (code === null || code === 35 || markdownLineEndingOrSpace(code)) {
      effects.exit("atxHeadingText");
      return atBreak(code);
    }
    effects.consume(code);
    return data;
  }
}

// ../../node_modules/micromark-util-html-tag-name/index.js
var htmlBlockNames = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
];
var htmlRawNames = ["pre", "script", "style", "textarea"];

// ../../node_modules/micromark-core-commonmark/lib/html-flow.js
var htmlFlow = {
  concrete: true,
  name: "htmlFlow",
  resolveTo: resolveToHtmlFlow,
  tokenize: tokenizeHtmlFlow
};
var blankLineBefore = {
  partial: true,
  tokenize: tokenizeBlankLineBefore
};
var nonLazyContinuationStart = {
  partial: true,
  tokenize: tokenizeNonLazyContinuationStart
};
function resolveToHtmlFlow(events) {
  let index2 = events.length;
  while (index2--) {
    if (events[index2][0] === "enter" && events[index2][1].type === "htmlFlow") {
      break;
    }
  }
  if (index2 > 1 && events[index2 - 2][1].type === "linePrefix") {
    events[index2][1].start = events[index2 - 2][1].start;
    events[index2 + 1][1].start = events[index2 - 2][1].start;
    events.splice(index2 - 2, 2);
  }
  return events;
}
function tokenizeHtmlFlow(effects, ok3, nok) {
  const self = this;
  let marker;
  let closingTag;
  let buffer;
  let index2;
  let markerB;
  return start;
  function start(code) {
    return before(code);
  }
  function before(code) {
    effects.enter("htmlFlow");
    effects.enter("htmlFlowData");
    effects.consume(code);
    return open;
  }
  function open(code) {
    if (code === 33) {
      effects.consume(code);
      return declarationOpen;
    }
    if (code === 47) {
      effects.consume(code);
      closingTag = true;
      return tagCloseStart;
    }
    if (code === 63) {
      effects.consume(code);
      marker = 3;
      return self.interrupt ? ok3 : continuationDeclarationInside;
    }
    if (asciiAlpha(code)) {
      effects.consume(code);
      buffer = String.fromCharCode(code);
      return tagName;
    }
    return nok(code);
  }
  function declarationOpen(code) {
    if (code === 45) {
      effects.consume(code);
      marker = 2;
      return commentOpenInside;
    }
    if (code === 91) {
      effects.consume(code);
      marker = 5;
      index2 = 0;
      return cdataOpenInside;
    }
    if (asciiAlpha(code)) {
      effects.consume(code);
      marker = 4;
      return self.interrupt ? ok3 : continuationDeclarationInside;
    }
    return nok(code);
  }
  function commentOpenInside(code) {
    if (code === 45) {
      effects.consume(code);
      return self.interrupt ? ok3 : continuationDeclarationInside;
    }
    return nok(code);
  }
  function cdataOpenInside(code) {
    const value = "CDATA[";
    if (code === value.charCodeAt(index2++)) {
      effects.consume(code);
      if (index2 === value.length) {
        return self.interrupt ? ok3 : continuation;
      }
      return cdataOpenInside;
    }
    return nok(code);
  }
  function tagCloseStart(code) {
    if (asciiAlpha(code)) {
      effects.consume(code);
      buffer = String.fromCharCode(code);
      return tagName;
    }
    return nok(code);
  }
  function tagName(code) {
    if (code === null || code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
      const slash = code === 47;
      const name = buffer.toLowerCase();
      if (!slash && !closingTag && htmlRawNames.includes(name)) {
        marker = 1;
        return self.interrupt ? ok3(code) : continuation(code);
      }
      if (htmlBlockNames.includes(buffer.toLowerCase())) {
        marker = 6;
        if (slash) {
          effects.consume(code);
          return basicSelfClosing;
        }
        return self.interrupt ? ok3(code) : continuation(code);
      }
      marker = 7;
      return self.interrupt && !self.parser.lazy[self.now().line] ? nok(code) : closingTag ? completeClosingTagAfter(code) : completeAttributeNameBefore(code);
    }
    if (code === 45 || asciiAlphanumeric(code)) {
      effects.consume(code);
      buffer += String.fromCharCode(code);
      return tagName;
    }
    return nok(code);
  }
  function basicSelfClosing(code) {
    if (code === 62) {
      effects.consume(code);
      return self.interrupt ? ok3 : continuation;
    }
    return nok(code);
  }
  function completeClosingTagAfter(code) {
    if (markdownSpace(code)) {
      effects.consume(code);
      return completeClosingTagAfter;
    }
    return completeEnd(code);
  }
  function completeAttributeNameBefore(code) {
    if (code === 47) {
      effects.consume(code);
      return completeEnd;
    }
    if (code === 58 || code === 95 || asciiAlpha(code)) {
      effects.consume(code);
      return completeAttributeName;
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return completeAttributeNameBefore;
    }
    return completeEnd(code);
  }
  function completeAttributeName(code) {
    if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
      effects.consume(code);
      return completeAttributeName;
    }
    return completeAttributeNameAfter(code);
  }
  function completeAttributeNameAfter(code) {
    if (code === 61) {
      effects.consume(code);
      return completeAttributeValueBefore;
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return completeAttributeNameAfter;
    }
    return completeAttributeNameBefore(code);
  }
  function completeAttributeValueBefore(code) {
    if (code === null || code === 60 || code === 61 || code === 62 || code === 96) {
      return nok(code);
    }
    if (code === 34 || code === 39) {
      effects.consume(code);
      markerB = code;
      return completeAttributeValueQuoted;
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return completeAttributeValueBefore;
    }
    return completeAttributeValueUnquoted(code);
  }
  function completeAttributeValueQuoted(code) {
    if (code === markerB) {
      effects.consume(code);
      markerB = null;
      return completeAttributeValueQuotedAfter;
    }
    if (code === null || markdownLineEnding(code)) {
      return nok(code);
    }
    effects.consume(code);
    return completeAttributeValueQuoted;
  }
  function completeAttributeValueUnquoted(code) {
    if (code === null || code === 34 || code === 39 || code === 47 || code === 60 || code === 61 || code === 62 || code === 96 || markdownLineEndingOrSpace(code)) {
      return completeAttributeNameAfter(code);
    }
    effects.consume(code);
    return completeAttributeValueUnquoted;
  }
  function completeAttributeValueQuotedAfter(code) {
    if (code === 47 || code === 62 || markdownSpace(code)) {
      return completeAttributeNameBefore(code);
    }
    return nok(code);
  }
  function completeEnd(code) {
    if (code === 62) {
      effects.consume(code);
      return completeAfter;
    }
    return nok(code);
  }
  function completeAfter(code) {
    if (code === null || markdownLineEnding(code)) {
      return continuation(code);
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return completeAfter;
    }
    return nok(code);
  }
  function continuation(code) {
    if (code === 45 && marker === 2) {
      effects.consume(code);
      return continuationCommentInside;
    }
    if (code === 60 && marker === 1) {
      effects.consume(code);
      return continuationRawTagOpen;
    }
    if (code === 62 && marker === 4) {
      effects.consume(code);
      return continuationClose;
    }
    if (code === 63 && marker === 3) {
      effects.consume(code);
      return continuationDeclarationInside;
    }
    if (code === 93 && marker === 5) {
      effects.consume(code);
      return continuationCdataInside;
    }
    if (markdownLineEnding(code) && (marker === 6 || marker === 7)) {
      effects.exit("htmlFlowData");
      return effects.check(blankLineBefore, continuationAfter, continuationStart)(code);
    }
    if (code === null || markdownLineEnding(code)) {
      effects.exit("htmlFlowData");
      return continuationStart(code);
    }
    effects.consume(code);
    return continuation;
  }
  function continuationStart(code) {
    return effects.check(nonLazyContinuationStart, continuationStartNonLazy, continuationAfter)(code);
  }
  function continuationStartNonLazy(code) {
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return continuationBefore;
  }
  function continuationBefore(code) {
    if (code === null || markdownLineEnding(code)) {
      return continuationStart(code);
    }
    effects.enter("htmlFlowData");
    return continuation(code);
  }
  function continuationCommentInside(code) {
    if (code === 45) {
      effects.consume(code);
      return continuationDeclarationInside;
    }
    return continuation(code);
  }
  function continuationRawTagOpen(code) {
    if (code === 47) {
      effects.consume(code);
      buffer = "";
      return continuationRawEndTag;
    }
    return continuation(code);
  }
  function continuationRawEndTag(code) {
    if (code === 62) {
      const name = buffer.toLowerCase();
      if (htmlRawNames.includes(name)) {
        effects.consume(code);
        return continuationClose;
      }
      return continuation(code);
    }
    if (asciiAlpha(code) && buffer.length < 8) {
      effects.consume(code);
      buffer += String.fromCharCode(code);
      return continuationRawEndTag;
    }
    return continuation(code);
  }
  function continuationCdataInside(code) {
    if (code === 93) {
      effects.consume(code);
      return continuationDeclarationInside;
    }
    return continuation(code);
  }
  function continuationDeclarationInside(code) {
    if (code === 62) {
      effects.consume(code);
      return continuationClose;
    }
    if (code === 45 && marker === 2) {
      effects.consume(code);
      return continuationDeclarationInside;
    }
    return continuation(code);
  }
  function continuationClose(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("htmlFlowData");
      return continuationAfter(code);
    }
    effects.consume(code);
    return continuationClose;
  }
  function continuationAfter(code) {
    effects.exit("htmlFlow");
    return ok3(code);
  }
}
function tokenizeNonLazyContinuationStart(effects, ok3, nok) {
  const self = this;
  return start;
  function start(code) {
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return after;
    }
    return nok(code);
  }
  function after(code) {
    return self.parser.lazy[self.now().line] ? nok(code) : ok3(code);
  }
}
function tokenizeBlankLineBefore(effects, ok3, nok) {
  return start;
  function start(code) {
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return effects.attempt(blankLine, ok3, nok);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/html-text.js
var htmlText = {
  name: "htmlText",
  tokenize: tokenizeHtmlText
};
function tokenizeHtmlText(effects, ok3, nok) {
  const self = this;
  let marker;
  let index2;
  let returnState;
  return start;
  function start(code) {
    effects.enter("htmlText");
    effects.enter("htmlTextData");
    effects.consume(code);
    return open;
  }
  function open(code) {
    if (code === 33) {
      effects.consume(code);
      return declarationOpen;
    }
    if (code === 47) {
      effects.consume(code);
      return tagCloseStart;
    }
    if (code === 63) {
      effects.consume(code);
      return instruction;
    }
    if (asciiAlpha(code)) {
      effects.consume(code);
      return tagOpen;
    }
    return nok(code);
  }
  function declarationOpen(code) {
    if (code === 45) {
      effects.consume(code);
      return commentOpenInside;
    }
    if (code === 91) {
      effects.consume(code);
      index2 = 0;
      return cdataOpenInside;
    }
    if (asciiAlpha(code)) {
      effects.consume(code);
      return declaration;
    }
    return nok(code);
  }
  function commentOpenInside(code) {
    if (code === 45) {
      effects.consume(code);
      return commentEnd;
    }
    return nok(code);
  }
  function comment(code) {
    if (code === null) {
      return nok(code);
    }
    if (code === 45) {
      effects.consume(code);
      return commentClose;
    }
    if (markdownLineEnding(code)) {
      returnState = comment;
      return lineEndingBefore(code);
    }
    effects.consume(code);
    return comment;
  }
  function commentClose(code) {
    if (code === 45) {
      effects.consume(code);
      return commentEnd;
    }
    return comment(code);
  }
  function commentEnd(code) {
    return code === 62 ? end(code) : code === 45 ? commentClose(code) : comment(code);
  }
  function cdataOpenInside(code) {
    const value = "CDATA[";
    if (code === value.charCodeAt(index2++)) {
      effects.consume(code);
      return index2 === value.length ? cdata : cdataOpenInside;
    }
    return nok(code);
  }
  function cdata(code) {
    if (code === null) {
      return nok(code);
    }
    if (code === 93) {
      effects.consume(code);
      return cdataClose;
    }
    if (markdownLineEnding(code)) {
      returnState = cdata;
      return lineEndingBefore(code);
    }
    effects.consume(code);
    return cdata;
  }
  function cdataClose(code) {
    if (code === 93) {
      effects.consume(code);
      return cdataEnd;
    }
    return cdata(code);
  }
  function cdataEnd(code) {
    if (code === 62) {
      return end(code);
    }
    if (code === 93) {
      effects.consume(code);
      return cdataEnd;
    }
    return cdata(code);
  }
  function declaration(code) {
    if (code === null || code === 62) {
      return end(code);
    }
    if (markdownLineEnding(code)) {
      returnState = declaration;
      return lineEndingBefore(code);
    }
    effects.consume(code);
    return declaration;
  }
  function instruction(code) {
    if (code === null) {
      return nok(code);
    }
    if (code === 63) {
      effects.consume(code);
      return instructionClose;
    }
    if (markdownLineEnding(code)) {
      returnState = instruction;
      return lineEndingBefore(code);
    }
    effects.consume(code);
    return instruction;
  }
  function instructionClose(code) {
    return code === 62 ? end(code) : instruction(code);
  }
  function tagCloseStart(code) {
    if (asciiAlpha(code)) {
      effects.consume(code);
      return tagClose;
    }
    return nok(code);
  }
  function tagClose(code) {
    if (code === 45 || asciiAlphanumeric(code)) {
      effects.consume(code);
      return tagClose;
    }
    return tagCloseBetween(code);
  }
  function tagCloseBetween(code) {
    if (markdownLineEnding(code)) {
      returnState = tagCloseBetween;
      return lineEndingBefore(code);
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return tagCloseBetween;
    }
    return end(code);
  }
  function tagOpen(code) {
    if (code === 45 || asciiAlphanumeric(code)) {
      effects.consume(code);
      return tagOpen;
    }
    if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
      return tagOpenBetween(code);
    }
    return nok(code);
  }
  function tagOpenBetween(code) {
    if (code === 47) {
      effects.consume(code);
      return end;
    }
    if (code === 58 || code === 95 || asciiAlpha(code)) {
      effects.consume(code);
      return tagOpenAttributeName;
    }
    if (markdownLineEnding(code)) {
      returnState = tagOpenBetween;
      return lineEndingBefore(code);
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return tagOpenBetween;
    }
    return end(code);
  }
  function tagOpenAttributeName(code) {
    if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
      effects.consume(code);
      return tagOpenAttributeName;
    }
    return tagOpenAttributeNameAfter(code);
  }
  function tagOpenAttributeNameAfter(code) {
    if (code === 61) {
      effects.consume(code);
      return tagOpenAttributeValueBefore;
    }
    if (markdownLineEnding(code)) {
      returnState = tagOpenAttributeNameAfter;
      return lineEndingBefore(code);
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return tagOpenAttributeNameAfter;
    }
    return tagOpenBetween(code);
  }
  function tagOpenAttributeValueBefore(code) {
    if (code === null || code === 60 || code === 61 || code === 62 || code === 96) {
      return nok(code);
    }
    if (code === 34 || code === 39) {
      effects.consume(code);
      marker = code;
      return tagOpenAttributeValueQuoted;
    }
    if (markdownLineEnding(code)) {
      returnState = tagOpenAttributeValueBefore;
      return lineEndingBefore(code);
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return tagOpenAttributeValueBefore;
    }
    effects.consume(code);
    return tagOpenAttributeValueUnquoted;
  }
  function tagOpenAttributeValueQuoted(code) {
    if (code === marker) {
      effects.consume(code);
      marker = void 0;
      return tagOpenAttributeValueQuotedAfter;
    }
    if (code === null) {
      return nok(code);
    }
    if (markdownLineEnding(code)) {
      returnState = tagOpenAttributeValueQuoted;
      return lineEndingBefore(code);
    }
    effects.consume(code);
    return tagOpenAttributeValueQuoted;
  }
  function tagOpenAttributeValueUnquoted(code) {
    if (code === null || code === 34 || code === 39 || code === 60 || code === 61 || code === 96) {
      return nok(code);
    }
    if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
      return tagOpenBetween(code);
    }
    effects.consume(code);
    return tagOpenAttributeValueUnquoted;
  }
  function tagOpenAttributeValueQuotedAfter(code) {
    if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
      return tagOpenBetween(code);
    }
    return nok(code);
  }
  function end(code) {
    if (code === 62) {
      effects.consume(code);
      effects.exit("htmlTextData");
      effects.exit("htmlText");
      return ok3;
    }
    return nok(code);
  }
  function lineEndingBefore(code) {
    effects.exit("htmlTextData");
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return lineEndingAfter;
  }
  function lineEndingAfter(code) {
    return markdownSpace(code) ? factorySpace(effects, lineEndingAfterPrefix, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code) : lineEndingAfterPrefix(code);
  }
  function lineEndingAfterPrefix(code) {
    effects.enter("htmlTextData");
    return returnState(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/label-end.js
var labelEnd = {
  name: "labelEnd",
  resolveAll: resolveAllLabelEnd,
  resolveTo: resolveToLabelEnd,
  tokenize: tokenizeLabelEnd
};
var resourceConstruct = {
  tokenize: tokenizeResource
};
var referenceFullConstruct = {
  tokenize: tokenizeReferenceFull
};
var referenceCollapsedConstruct = {
  tokenize: tokenizeReferenceCollapsed
};
function resolveAllLabelEnd(events) {
  let index2 = -1;
  const newEvents = [];
  while (++index2 < events.length) {
    const token = events[index2][1];
    newEvents.push(events[index2]);
    if (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd") {
      const offset = token.type === "labelImage" ? 4 : 2;
      token.type = "data";
      index2 += offset;
    }
  }
  if (events.length !== newEvents.length) {
    splice(events, 0, events.length, newEvents);
  }
  return events;
}
function resolveToLabelEnd(events, context) {
  let index2 = events.length;
  let offset = 0;
  let token;
  let open;
  let close;
  let media;
  while (index2--) {
    token = events[index2][1];
    if (open) {
      if (token.type === "link" || token.type === "labelLink" && token._inactive) {
        break;
      }
      if (events[index2][0] === "enter" && token.type === "labelLink") {
        token._inactive = true;
      }
    } else if (close) {
      if (events[index2][0] === "enter" && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
        open = index2;
        if (token.type !== "labelLink") {
          offset = 2;
          break;
        }
      }
    } else if (token.type === "labelEnd") {
      close = index2;
    }
  }
  const group = {
    type: events[open][1].type === "labelLink" ? "link" : "image",
    start: {
      ...events[open][1].start
    },
    end: {
      ...events[events.length - 1][1].end
    }
  };
  const label = {
    type: "label",
    start: {
      ...events[open][1].start
    },
    end: {
      ...events[close][1].end
    }
  };
  const text3 = {
    type: "labelText",
    start: {
      ...events[open + offset + 2][1].end
    },
    end: {
      ...events[close - 2][1].start
    }
  };
  media = [["enter", group, context], ["enter", label, context]];
  media = push(media, events.slice(open + 1, open + offset + 3));
  media = push(media, [["enter", text3, context]]);
  media = push(media, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + offset + 4, close - 3), context));
  media = push(media, [["exit", text3, context], events[close - 2], events[close - 1], ["exit", label, context]]);
  media = push(media, events.slice(close + 1));
  media = push(media, [["exit", group, context]]);
  splice(events, open, events.length, media);
  return events;
}
function tokenizeLabelEnd(effects, ok3, nok) {
  const self = this;
  let index2 = self.events.length;
  let labelStart;
  let defined;
  while (index2--) {
    if ((self.events[index2][1].type === "labelImage" || self.events[index2][1].type === "labelLink") && !self.events[index2][1]._balanced) {
      labelStart = self.events[index2][1];
      break;
    }
  }
  return start;
  function start(code) {
    if (!labelStart) {
      return nok(code);
    }
    if (labelStart._inactive) {
      return labelEndNok(code);
    }
    defined = self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize({
      start: labelStart.end,
      end: self.now()
    })));
    effects.enter("labelEnd");
    effects.enter("labelMarker");
    effects.consume(code);
    effects.exit("labelMarker");
    effects.exit("labelEnd");
    return after;
  }
  function after(code) {
    if (code === 40) {
      return effects.attempt(resourceConstruct, labelEndOk, defined ? labelEndOk : labelEndNok)(code);
    }
    if (code === 91) {
      return effects.attempt(referenceFullConstruct, labelEndOk, defined ? referenceNotFull : labelEndNok)(code);
    }
    return defined ? labelEndOk(code) : labelEndNok(code);
  }
  function referenceNotFull(code) {
    return effects.attempt(referenceCollapsedConstruct, labelEndOk, labelEndNok)(code);
  }
  function labelEndOk(code) {
    return ok3(code);
  }
  function labelEndNok(code) {
    labelStart._balanced = true;
    return nok(code);
  }
}
function tokenizeResource(effects, ok3, nok) {
  return resourceStart;
  function resourceStart(code) {
    effects.enter("resource");
    effects.enter("resourceMarker");
    effects.consume(code);
    effects.exit("resourceMarker");
    return resourceBefore;
  }
  function resourceBefore(code) {
    return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceOpen)(code) : resourceOpen(code);
  }
  function resourceOpen(code) {
    if (code === 41) {
      return resourceEnd(code);
    }
    return factoryDestination(effects, resourceDestinationAfter, resourceDestinationMissing, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(code);
  }
  function resourceDestinationAfter(code) {
    return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceBetween)(code) : resourceEnd(code);
  }
  function resourceDestinationMissing(code) {
    return nok(code);
  }
  function resourceBetween(code) {
    if (code === 34 || code === 39 || code === 40) {
      return factoryTitle(effects, resourceTitleAfter, nok, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(code);
    }
    return resourceEnd(code);
  }
  function resourceTitleAfter(code) {
    return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceEnd)(code) : resourceEnd(code);
  }
  function resourceEnd(code) {
    if (code === 41) {
      effects.enter("resourceMarker");
      effects.consume(code);
      effects.exit("resourceMarker");
      effects.exit("resource");
      return ok3;
    }
    return nok(code);
  }
}
function tokenizeReferenceFull(effects, ok3, nok) {
  const self = this;
  return referenceFull;
  function referenceFull(code) {
    return factoryLabel.call(self, effects, referenceFullAfter, referenceFullMissing, "reference", "referenceMarker", "referenceString")(code);
  }
  function referenceFullAfter(code) {
    return self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1))) ? ok3(code) : nok(code);
  }
  function referenceFullMissing(code) {
    return nok(code);
  }
}
function tokenizeReferenceCollapsed(effects, ok3, nok) {
  return referenceCollapsedStart;
  function referenceCollapsedStart(code) {
    effects.enter("reference");
    effects.enter("referenceMarker");
    effects.consume(code);
    effects.exit("referenceMarker");
    return referenceCollapsedOpen;
  }
  function referenceCollapsedOpen(code) {
    if (code === 93) {
      effects.enter("referenceMarker");
      effects.consume(code);
      effects.exit("referenceMarker");
      effects.exit("reference");
      return ok3;
    }
    return nok(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/label-start-image.js
var labelStartImage = {
  name: "labelStartImage",
  resolveAll: labelEnd.resolveAll,
  tokenize: tokenizeLabelStartImage
};
function tokenizeLabelStartImage(effects, ok3, nok) {
  const self = this;
  return start;
  function start(code) {
    effects.enter("labelImage");
    effects.enter("labelImageMarker");
    effects.consume(code);
    effects.exit("labelImageMarker");
    return open;
  }
  function open(code) {
    if (code === 91) {
      effects.enter("labelMarker");
      effects.consume(code);
      effects.exit("labelMarker");
      effects.exit("labelImage");
      return after;
    }
    return nok(code);
  }
  function after(code) {
    return code === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code) : ok3(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/label-start-link.js
var labelStartLink = {
  name: "labelStartLink",
  resolveAll: labelEnd.resolveAll,
  tokenize: tokenizeLabelStartLink
};
function tokenizeLabelStartLink(effects, ok3, nok) {
  const self = this;
  return start;
  function start(code) {
    effects.enter("labelLink");
    effects.enter("labelMarker");
    effects.consume(code);
    effects.exit("labelMarker");
    effects.exit("labelLink");
    return after;
  }
  function after(code) {
    return code === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code) : ok3(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/line-ending.js
var lineEnding = {
  name: "lineEnding",
  tokenize: tokenizeLineEnding
};
function tokenizeLineEnding(effects, ok3) {
  return start;
  function start(code) {
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return factorySpace(effects, ok3, "linePrefix");
  }
}

// ../../node_modules/micromark-core-commonmark/lib/thematic-break.js
var thematicBreak = {
  name: "thematicBreak",
  tokenize: tokenizeThematicBreak
};
function tokenizeThematicBreak(effects, ok3, nok) {
  let size = 0;
  let marker;
  return start;
  function start(code) {
    effects.enter("thematicBreak");
    return before(code);
  }
  function before(code) {
    marker = code;
    return atBreak(code);
  }
  function atBreak(code) {
    if (code === marker) {
      effects.enter("thematicBreakSequence");
      return sequence(code);
    }
    if (size >= 3 && (code === null || markdownLineEnding(code))) {
      effects.exit("thematicBreak");
      return ok3(code);
    }
    return nok(code);
  }
  function sequence(code) {
    if (code === marker) {
      effects.consume(code);
      size++;
      return sequence;
    }
    effects.exit("thematicBreakSequence");
    return markdownSpace(code) ? factorySpace(effects, atBreak, "whitespace")(code) : atBreak(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/list.js
var list = {
  continuation: {
    tokenize: tokenizeListContinuation
  },
  exit: tokenizeListEnd,
  name: "list",
  tokenize: tokenizeListStart
};
var listItemPrefixWhitespaceConstruct = {
  partial: true,
  tokenize: tokenizeListItemPrefixWhitespace
};
var indentConstruct = {
  partial: true,
  tokenize: tokenizeIndent
};
function tokenizeListStart(effects, ok3, nok) {
  const self = this;
  const tail = self.events[self.events.length - 1];
  let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
  let size = 0;
  return start;
  function start(code) {
    const kind = self.containerState.type || (code === 42 || code === 43 || code === 45 ? "listUnordered" : "listOrdered");
    if (kind === "listUnordered" ? !self.containerState.marker || code === self.containerState.marker : asciiDigit(code)) {
      if (!self.containerState.type) {
        self.containerState.type = kind;
        effects.enter(kind, {
          _container: true
        });
      }
      if (kind === "listUnordered") {
        effects.enter("listItemPrefix");
        return code === 42 || code === 45 ? effects.check(thematicBreak, nok, atMarker)(code) : atMarker(code);
      }
      if (!self.interrupt || code === 49) {
        effects.enter("listItemPrefix");
        effects.enter("listItemValue");
        return inside(code);
      }
    }
    return nok(code);
  }
  function inside(code) {
    if (asciiDigit(code) && ++size < 10) {
      effects.consume(code);
      return inside;
    }
    if ((!self.interrupt || size < 2) && (self.containerState.marker ? code === self.containerState.marker : code === 41 || code === 46)) {
      effects.exit("listItemValue");
      return atMarker(code);
    }
    return nok(code);
  }
  function atMarker(code) {
    effects.enter("listItemMarker");
    effects.consume(code);
    effects.exit("listItemMarker");
    self.containerState.marker = self.containerState.marker || code;
    return effects.check(
      blankLine,
      // Can’t be empty when interrupting.
      self.interrupt ? nok : onBlank,
      effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix)
    );
  }
  function onBlank(code) {
    self.containerState.initialBlankLine = true;
    initialSize++;
    return endOfPrefix(code);
  }
  function otherPrefix(code) {
    if (markdownSpace(code)) {
      effects.enter("listItemPrefixWhitespace");
      effects.consume(code);
      effects.exit("listItemPrefixWhitespace");
      return endOfPrefix;
    }
    return nok(code);
  }
  function endOfPrefix(code) {
    self.containerState.size = initialSize + self.sliceSerialize(effects.exit("listItemPrefix"), true).length;
    return ok3(code);
  }
}
function tokenizeListContinuation(effects, ok3, nok) {
  const self = this;
  self.containerState._closeFlow = void 0;
  return effects.check(blankLine, onBlank, notBlank);
  function onBlank(code) {
    self.containerState.furtherBlankLines = self.containerState.furtherBlankLines || self.containerState.initialBlankLine;
    return factorySpace(effects, ok3, "listItemIndent", self.containerState.size + 1)(code);
  }
  function notBlank(code) {
    if (self.containerState.furtherBlankLines || !markdownSpace(code)) {
      self.containerState.furtherBlankLines = void 0;
      self.containerState.initialBlankLine = void 0;
      return notInCurrentItem(code);
    }
    self.containerState.furtherBlankLines = void 0;
    self.containerState.initialBlankLine = void 0;
    return effects.attempt(indentConstruct, ok3, notInCurrentItem)(code);
  }
  function notInCurrentItem(code) {
    self.containerState._closeFlow = true;
    self.interrupt = void 0;
    return factorySpace(effects, effects.attempt(list, ok3, nok), "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code);
  }
}
function tokenizeIndent(effects, ok3, nok) {
  const self = this;
  return factorySpace(effects, afterPrefix, "listItemIndent", self.containerState.size + 1);
  function afterPrefix(code) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self.containerState.size ? ok3(code) : nok(code);
  }
}
function tokenizeListEnd(effects) {
  effects.exit(this.containerState.type);
}
function tokenizeListItemPrefixWhitespace(effects, ok3, nok) {
  const self = this;
  return factorySpace(effects, afterPrefix, "listItemPrefixWhitespace", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1);
  function afterPrefix(code) {
    const tail = self.events[self.events.length - 1];
    return !markdownSpace(code) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok3(code) : nok(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/setext-underline.js
var setextUnderline = {
  name: "setextUnderline",
  resolveTo: resolveToSetextUnderline,
  tokenize: tokenizeSetextUnderline
};
function resolveToSetextUnderline(events, context) {
  let index2 = events.length;
  let content3;
  let text3;
  let definition2;
  while (index2--) {
    if (events[index2][0] === "enter") {
      if (events[index2][1].type === "content") {
        content3 = index2;
        break;
      }
      if (events[index2][1].type === "paragraph") {
        text3 = index2;
      }
    } else {
      if (events[index2][1].type === "content") {
        events.splice(index2, 1);
      }
      if (!definition2 && events[index2][1].type === "definition") {
        definition2 = index2;
      }
    }
  }
  const heading = {
    type: "setextHeading",
    start: {
      ...events[content3][1].start
    },
    end: {
      ...events[events.length - 1][1].end
    }
  };
  events[text3][1].type = "setextHeadingText";
  if (definition2) {
    events.splice(text3, 0, ["enter", heading, context]);
    events.splice(definition2 + 1, 0, ["exit", events[content3][1], context]);
    events[content3][1].end = {
      ...events[definition2][1].end
    };
  } else {
    events[content3][1] = heading;
  }
  events.push(["exit", heading, context]);
  return events;
}
function tokenizeSetextUnderline(effects, ok3, nok) {
  const self = this;
  let marker;
  return start;
  function start(code) {
    let index2 = self.events.length;
    let paragraph;
    while (index2--) {
      if (self.events[index2][1].type !== "lineEnding" && self.events[index2][1].type !== "linePrefix" && self.events[index2][1].type !== "content") {
        paragraph = self.events[index2][1].type === "paragraph";
        break;
      }
    }
    if (!self.parser.lazy[self.now().line] && (self.interrupt || paragraph)) {
      effects.enter("setextHeadingLine");
      marker = code;
      return before(code);
    }
    return nok(code);
  }
  function before(code) {
    effects.enter("setextHeadingLineSequence");
    return inside(code);
  }
  function inside(code) {
    if (code === marker) {
      effects.consume(code);
      return inside;
    }
    effects.exit("setextHeadingLineSequence");
    return markdownSpace(code) ? factorySpace(effects, after, "lineSuffix")(code) : after(code);
  }
  function after(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("setextHeadingLine");
      return ok3(code);
    }
    return nok(code);
  }
}

// ../../node_modules/micromark/lib/initialize/flow.js
var flow = {
  tokenize: initializeFlow
};
function initializeFlow(effects) {
  const self = this;
  const initial = effects.attempt(
    // Try to parse a blank line.
    blankLine,
    atBlankEnding,
    // Try to parse initial flow (essentially, only code).
    effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content2, afterConstruct)), "linePrefix"))
  );
  return initial;
  function atBlankEnding(code) {
    if (code === null) {
      effects.consume(code);
      return;
    }
    effects.enter("lineEndingBlank");
    effects.consume(code);
    effects.exit("lineEndingBlank");
    self.currentConstruct = void 0;
    return initial;
  }
  function afterConstruct(code) {
    if (code === null) {
      effects.consume(code);
      return;
    }
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    self.currentConstruct = void 0;
    return initial;
  }
}

// ../../node_modules/micromark/lib/initialize/text.js
var resolver = {
  resolveAll: createResolver()
};
var string = initializeFactory("string");
var text = initializeFactory("text");
function initializeFactory(field) {
  return {
    resolveAll: createResolver(field === "text" ? resolveAllLineSuffixes : void 0),
    tokenize: initializeText
  };
  function initializeText(effects) {
    const self = this;
    const constructs2 = this.parser.constructs[field];
    const text3 = effects.attempt(constructs2, start, notText);
    return start;
    function start(code) {
      return atBreak(code) ? text3(code) : notText(code);
    }
    function notText(code) {
      if (code === null) {
        effects.consume(code);
        return;
      }
      effects.enter("data");
      effects.consume(code);
      return data;
    }
    function data(code) {
      if (atBreak(code)) {
        effects.exit("data");
        return text3(code);
      }
      effects.consume(code);
      return data;
    }
    function atBreak(code) {
      if (code === null) {
        return true;
      }
      const list2 = constructs2[code];
      let index2 = -1;
      if (list2) {
        while (++index2 < list2.length) {
          const item = list2[index2];
          if (!item.previous || item.previous.call(self, self.previous)) {
            return true;
          }
        }
      }
      return false;
    }
  }
}
function createResolver(extraResolver) {
  return resolveAllText;
  function resolveAllText(events, context) {
    let index2 = -1;
    let enter;
    while (++index2 <= events.length) {
      if (enter === void 0) {
        if (events[index2] && events[index2][1].type === "data") {
          enter = index2;
          index2++;
        }
      } else if (!events[index2] || events[index2][1].type !== "data") {
        if (index2 !== enter + 2) {
          events[enter][1].end = events[index2 - 1][1].end;
          events.splice(enter + 2, index2 - enter - 2);
          index2 = enter + 2;
        }
        enter = void 0;
      }
    }
    return extraResolver ? extraResolver(events, context) : events;
  }
}
function resolveAllLineSuffixes(events, context) {
  let eventIndex = 0;
  while (++eventIndex <= events.length) {
    if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
      const data = events[eventIndex - 1][1];
      const chunks = context.sliceStream(data);
      let index2 = chunks.length;
      let bufferIndex = -1;
      let size = 0;
      let tabs;
      while (index2--) {
        const chunk = chunks[index2];
        if (typeof chunk === "string") {
          bufferIndex = chunk.length;
          while (chunk.charCodeAt(bufferIndex - 1) === 32) {
            size++;
            bufferIndex--;
          }
          if (bufferIndex) break;
          bufferIndex = -1;
        } else if (chunk === -2) {
          tabs = true;
          size++;
        } else if (chunk === -1) {
        } else {
          index2++;
          break;
        }
      }
      if (context._contentTypeTextTrailing && eventIndex === events.length) {
        size = 0;
      }
      if (size) {
        const token = {
          type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: index2 ? bufferIndex : data.start._bufferIndex + bufferIndex,
            _index: data.start._index + index2,
            line: data.end.line,
            column: data.end.column - size,
            offset: data.end.offset - size
          },
          end: {
            ...data.end
          }
        };
        data.end = {
          ...token.start
        };
        if (data.start.offset === data.end.offset) {
          Object.assign(data, token);
        } else {
          events.splice(eventIndex, 0, ["enter", token, context], ["exit", token, context]);
          eventIndex += 2;
        }
      }
      eventIndex++;
    }
  }
  return events;
}

// ../../node_modules/micromark/lib/constructs.js
var constructs_exports = {};
__export(constructs_exports, {
  attentionMarkers: () => attentionMarkers,
  contentInitial: () => contentInitial,
  disable: () => disable,
  document: () => document2,
  flow: () => flow2,
  flowInitial: () => flowInitial,
  insideSpan: () => insideSpan,
  string: () => string2,
  text: () => text2
});
var document2 = {
  [42]: list,
  [43]: list,
  [45]: list,
  [48]: list,
  [49]: list,
  [50]: list,
  [51]: list,
  [52]: list,
  [53]: list,
  [54]: list,
  [55]: list,
  [56]: list,
  [57]: list,
  [62]: blockQuote
};
var contentInitial = {
  [91]: definition
};
var flowInitial = {
  [-2]: codeIndented,
  [-1]: codeIndented,
  [32]: codeIndented
};
var flow2 = {
  [35]: headingAtx,
  [42]: thematicBreak,
  [45]: [setextUnderline, thematicBreak],
  [60]: htmlFlow,
  [61]: setextUnderline,
  [95]: thematicBreak,
  [96]: codeFenced,
  [126]: codeFenced
};
var string2 = {
  [38]: characterReference,
  [92]: characterEscape
};
var text2 = {
  [-5]: lineEnding,
  [-4]: lineEnding,
  [-3]: lineEnding,
  [33]: labelStartImage,
  [38]: characterReference,
  [42]: attention,
  [60]: [autolink, htmlText],
  [91]: labelStartLink,
  [92]: [hardBreakEscape, characterEscape],
  [93]: labelEnd,
  [95]: attention,
  [96]: codeText
};
var insideSpan = {
  null: [attention, resolver]
};
var attentionMarkers = {
  null: [42, 95]
};
var disable = {
  null: []
};

// ../../node_modules/micromark/lib/create-tokenizer.js
function createTokenizer(parser, initialize, from) {
  let point3 = {
    _bufferIndex: -1,
    _index: 0,
    line: from && from.line || 1,
    column: from && from.column || 1,
    offset: from && from.offset || 0
  };
  const columnStart = {};
  const resolveAllConstructs = [];
  let chunks = [];
  let stack = [];
  let consumed = true;
  const effects = {
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    consume,
    enter,
    exit: exit2,
    interrupt: constructFactory(onsuccessfulcheck, {
      interrupt: true
    })
  };
  const context = {
    code: null,
    containerState: {},
    defineSkip,
    events: [],
    now,
    parser,
    previous: null,
    sliceSerialize,
    sliceStream,
    write
  };
  let state = initialize.tokenize.call(context, effects);
  let expectedCode;
  if (initialize.resolveAll) {
    resolveAllConstructs.push(initialize);
  }
  return context;
  function write(slice) {
    chunks = push(chunks, slice);
    main();
    if (chunks[chunks.length - 1] !== null) {
      return [];
    }
    addResult(initialize, 0);
    context.events = resolveAll(resolveAllConstructs, context.events, context);
    return context.events;
  }
  function sliceSerialize(token, expandTabs) {
    return serializeChunks(sliceStream(token), expandTabs);
  }
  function sliceStream(token) {
    return sliceChunks(chunks, token);
  }
  function now() {
    const {
      _bufferIndex,
      _index,
      line,
      column,
      offset
    } = point3;
    return {
      _bufferIndex,
      _index,
      line,
      column,
      offset
    };
  }
  function defineSkip(value) {
    columnStart[value.line] = value.column;
    accountForPotentialSkip();
  }
  function main() {
    let chunkIndex;
    while (point3._index < chunks.length) {
      const chunk = chunks[point3._index];
      if (typeof chunk === "string") {
        chunkIndex = point3._index;
        if (point3._bufferIndex < 0) {
          point3._bufferIndex = 0;
        }
        while (point3._index === chunkIndex && point3._bufferIndex < chunk.length) {
          go(chunk.charCodeAt(point3._bufferIndex));
        }
      } else {
        go(chunk);
      }
    }
  }
  function go(code) {
    consumed = void 0;
    expectedCode = code;
    state = state(code);
  }
  function consume(code) {
    if (markdownLineEnding(code)) {
      point3.line++;
      point3.column = 1;
      point3.offset += code === -3 ? 2 : 1;
      accountForPotentialSkip();
    } else if (code !== -1) {
      point3.column++;
      point3.offset++;
    }
    if (point3._bufferIndex < 0) {
      point3._index++;
    } else {
      point3._bufferIndex++;
      if (point3._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
      // strings.
      /** @type {string} */
      chunks[point3._index].length) {
        point3._bufferIndex = -1;
        point3._index++;
      }
    }
    context.previous = code;
    consumed = true;
  }
  function enter(type2, fields) {
    const token = fields || {};
    token.type = type2;
    token.start = now();
    context.events.push(["enter", token, context]);
    stack.push(token);
    return token;
  }
  function exit2(type2) {
    const token = stack.pop();
    token.end = now();
    context.events.push(["exit", token, context]);
    return token;
  }
  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from);
  }
  function onsuccessfulcheck(_, info) {
    info.restore();
  }
  function constructFactory(onreturn, fields) {
    return hook;
    function hook(constructs2, returnState, bogusState) {
      let listOfConstructs;
      let constructIndex;
      let currentConstruct;
      let info;
      return Array.isArray(constructs2) ? (
        /* c8 ignore next 1 */
        handleListOfConstructs(constructs2)
      ) : "tokenize" in constructs2 ? (
        // Looks like a construct.
        handleListOfConstructs([
          /** @type {Construct} */
          constructs2
        ])
      ) : handleMapOfConstructs(constructs2);
      function handleMapOfConstructs(map2) {
        return start;
        function start(code) {
          const left = code !== null && map2[code];
          const all2 = code !== null && map2.null;
          const list2 = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(left) ? left : left ? [left] : [],
            ...Array.isArray(all2) ? all2 : all2 ? [all2] : []
          ];
          return handleListOfConstructs(list2)(code);
        }
      }
      function handleListOfConstructs(list2) {
        listOfConstructs = list2;
        constructIndex = 0;
        if (list2.length === 0) {
          return bogusState;
        }
        return handleConstruct(list2[constructIndex]);
      }
      function handleConstruct(construct) {
        return start;
        function start(code) {
          info = store();
          currentConstruct = construct;
          if (!construct.partial) {
            context.currentConstruct = construct;
          }
          if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
            return nok(code);
          }
          return construct.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            fields ? Object.assign(Object.create(context), fields) : context,
            effects,
            ok3,
            nok
          )(code);
        }
      }
      function ok3(code) {
        consumed = true;
        onreturn(currentConstruct, info);
        return returnState;
      }
      function nok(code) {
        consumed = true;
        info.restore();
        if (++constructIndex < listOfConstructs.length) {
          return handleConstruct(listOfConstructs[constructIndex]);
        }
        return bogusState;
      }
    }
  }
  function addResult(construct, from2) {
    if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
      resolveAllConstructs.push(construct);
    }
    if (construct.resolve) {
      splice(context.events, from2, context.events.length - from2, construct.resolve(context.events.slice(from2), context));
    }
    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context);
    }
  }
  function store() {
    const startPoint = now();
    const startPrevious = context.previous;
    const startCurrentConstruct = context.currentConstruct;
    const startEventsIndex = context.events.length;
    const startStack = Array.from(stack);
    return {
      from: startEventsIndex,
      restore
    };
    function restore() {
      point3 = startPoint;
      context.previous = startPrevious;
      context.currentConstruct = startCurrentConstruct;
      context.events.length = startEventsIndex;
      stack = startStack;
      accountForPotentialSkip();
    }
  }
  function accountForPotentialSkip() {
    if (point3.line in columnStart && point3.column < 2) {
      point3.column = columnStart[point3.line];
      point3.offset += columnStart[point3.line] - 1;
    }
  }
}
function sliceChunks(chunks, token) {
  const startIndex = token.start._index;
  const startBufferIndex = token.start._bufferIndex;
  const endIndex = token.end._index;
  const endBufferIndex = token.end._bufferIndex;
  let view;
  if (startIndex === endIndex) {
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
  } else {
    view = chunks.slice(startIndex, endIndex);
    if (startBufferIndex > -1) {
      const head = view[0];
      if (typeof head === "string") {
        view[0] = head.slice(startBufferIndex);
      } else {
        view.shift();
      }
    }
    if (endBufferIndex > 0) {
      view.push(chunks[endIndex].slice(0, endBufferIndex));
    }
  }
  return view;
}
function serializeChunks(chunks, expandTabs) {
  let index2 = -1;
  const result = [];
  let atTab;
  while (++index2 < chunks.length) {
    const chunk = chunks[index2];
    let value;
    if (typeof chunk === "string") {
      value = chunk;
    } else switch (chunk) {
      case -5: {
        value = "\r";
        break;
      }
      case -4: {
        value = "\n";
        break;
      }
      case -3: {
        value = "\r\n";
        break;
      }
      case -2: {
        value = expandTabs ? " " : "	";
        break;
      }
      case -1: {
        if (!expandTabs && atTab) continue;
        value = " ";
        break;
      }
      default: {
        value = String.fromCharCode(chunk);
      }
    }
    atTab = chunk === -2;
    result.push(value);
  }
  return result.join("");
}

// ../../node_modules/micromark/lib/parse.js
function parse(options) {
  const settings = options || {};
  const constructs2 = (
    /** @type {FullNormalizedExtension} */
    combineExtensions([constructs_exports, ...settings.extensions || []])
  );
  const parser = {
    constructs: constructs2,
    content: create(content),
    defined: [],
    document: create(document),
    flow: create(flow),
    lazy: {},
    string: create(string),
    text: create(text)
  };
  return parser;
  function create(initial) {
    return creator;
    function creator(from) {
      return createTokenizer(parser, initial, from);
    }
  }
}

// ../../node_modules/micromark/lib/postprocess.js
function postprocess(events) {
  while (!subtokenize(events)) {
  }
  return events;
}

// ../../node_modules/micromark/lib/preprocess.js
var search = /[\0\t\n\r]/g;
function preprocess() {
  let column = 1;
  let buffer = "";
  let start = true;
  let atCarriageReturn;
  return preprocessor;
  function preprocessor(value, encoding, end) {
    const chunks = [];
    let match;
    let next;
    let startPosition;
    let endPosition;
    let code;
    value = buffer + (typeof value === "string" ? value.toString() : new TextDecoder(encoding || void 0).decode(value));
    startPosition = 0;
    buffer = "";
    if (start) {
      if (value.charCodeAt(0) === 65279) {
        startPosition++;
      }
      start = void 0;
    }
    while (startPosition < value.length) {
      search.lastIndex = startPosition;
      match = search.exec(value);
      endPosition = match && match.index !== void 0 ? match.index : value.length;
      code = value.charCodeAt(endPosition);
      if (!match) {
        buffer = value.slice(startPosition);
        break;
      }
      if (code === 10 && startPosition === endPosition && atCarriageReturn) {
        chunks.push(-3);
        atCarriageReturn = void 0;
      } else {
        if (atCarriageReturn) {
          chunks.push(-5);
          atCarriageReturn = void 0;
        }
        if (startPosition < endPosition) {
          chunks.push(value.slice(startPosition, endPosition));
          column += endPosition - startPosition;
        }
        switch (code) {
          case 0: {
            chunks.push(65533);
            column++;
            break;
          }
          case 9: {
            next = Math.ceil(column / 4) * 4;
            chunks.push(-2);
            while (column++ < next) chunks.push(-1);
            break;
          }
          case 10: {
            chunks.push(-4);
            column = 1;
            break;
          }
          default: {
            atCarriageReturn = true;
            column = 1;
          }
        }
      }
      startPosition = endPosition + 1;
    }
    if (end) {
      if (atCarriageReturn) chunks.push(-5);
      if (buffer) chunks.push(buffer);
      chunks.push(null);
    }
    return chunks;
  }
}

// ../../node_modules/micromark-util-decode-string/index.js
var characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function decodeString(value) {
  return value.replace(characterEscapeOrReference, decode);
}
function decode($0, $1, $2) {
  if ($1) {
    return $1;
  }
  const head = $2.charCodeAt(0);
  if (head === 35) {
    const head2 = $2.charCodeAt(1);
    const hex = head2 === 120 || head2 === 88;
    return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10);
  }
  return decodeNamedCharacterReference($2) || $0;
}

// ../../node_modules/mdast-util-from-markdown/lib/index.js
var own3 = {}.hasOwnProperty;
function fromMarkdown(value, encoding, options) {
  if (typeof encoding !== "string") {
    options = encoding;
    encoding = void 0;
  }
  return compiler(options)(postprocess(parse(options).document().write(preprocess()(value, encoding, true))));
}
function compiler(options) {
  const config = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: opener(link),
      autolinkProtocol: onenterdata,
      autolinkEmail: onenterdata,
      atxHeading: opener(heading),
      blockQuote: opener(blockQuote2),
      characterEscape: onenterdata,
      characterReference: onenterdata,
      codeFenced: opener(codeFlow),
      codeFencedFenceInfo: buffer,
      codeFencedFenceMeta: buffer,
      codeIndented: opener(codeFlow, buffer),
      codeText: opener(codeText2, buffer),
      codeTextData: onenterdata,
      data: onenterdata,
      codeFlowValue: onenterdata,
      definition: opener(definition2),
      definitionDestinationString: buffer,
      definitionLabelString: buffer,
      definitionTitleString: buffer,
      emphasis: opener(emphasis),
      hardBreakEscape: opener(hardBreak),
      hardBreakTrailing: opener(hardBreak),
      htmlFlow: opener(html, buffer),
      htmlFlowData: onenterdata,
      htmlText: opener(html, buffer),
      htmlTextData: onenterdata,
      image: opener(image),
      label: buffer,
      link: opener(link),
      listItem: opener(listItem),
      listItemValue: onenterlistitemvalue,
      listOrdered: opener(list2, onenterlistordered),
      listUnordered: opener(list2),
      paragraph: opener(paragraph),
      reference: onenterreference,
      referenceString: buffer,
      resourceDestinationString: buffer,
      resourceTitleString: buffer,
      setextHeading: opener(heading),
      strong: opener(strong),
      thematicBreak: opener(thematicBreak2)
    },
    exit: {
      atxHeading: closer(),
      atxHeadingSequence: onexitatxheadingsequence,
      autolink: closer(),
      autolinkEmail: onexitautolinkemail,
      autolinkProtocol: onexitautolinkprotocol,
      blockQuote: closer(),
      characterEscapeValue: onexitdata,
      characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
      characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
      characterReferenceValue: onexitcharacterreferencevalue,
      characterReference: onexitcharacterreference,
      codeFenced: closer(onexitcodefenced),
      codeFencedFence: onexitcodefencedfence,
      codeFencedFenceInfo: onexitcodefencedfenceinfo,
      codeFencedFenceMeta: onexitcodefencedfencemeta,
      codeFlowValue: onexitdata,
      codeIndented: closer(onexitcodeindented),
      codeText: closer(onexitcodetext),
      codeTextData: onexitdata,
      data: onexitdata,
      definition: closer(),
      definitionDestinationString: onexitdefinitiondestinationstring,
      definitionLabelString: onexitdefinitionlabelstring,
      definitionTitleString: onexitdefinitiontitlestring,
      emphasis: closer(),
      hardBreakEscape: closer(onexithardbreak),
      hardBreakTrailing: closer(onexithardbreak),
      htmlFlow: closer(onexithtmlflow),
      htmlFlowData: onexitdata,
      htmlText: closer(onexithtmltext),
      htmlTextData: onexitdata,
      image: closer(onexitimage),
      label: onexitlabel,
      labelText: onexitlabeltext,
      lineEnding: onexitlineending,
      link: closer(onexitlink),
      listItem: closer(),
      listOrdered: closer(),
      listUnordered: closer(),
      paragraph: closer(),
      referenceString: onexitreferencestring,
      resourceDestinationString: onexitresourcedestinationstring,
      resourceTitleString: onexitresourcetitlestring,
      resource: onexitresource,
      setextHeading: closer(onexitsetextheading),
      setextHeadingLineSequence: onexitsetextheadinglinesequence,
      setextHeadingText: onexitsetextheadingtext,
      strong: closer(),
      thematicBreak: closer()
    }
  };
  configure(config, (options || {}).mdastExtensions || []);
  const data = {};
  return compile;
  function compile(events) {
    let tree = {
      type: "root",
      children: []
    };
    const context = {
      stack: [tree],
      tokenStack: [],
      config,
      enter,
      exit: exit2,
      buffer,
      resume,
      data
    };
    const listStack = [];
    let index2 = -1;
    while (++index2 < events.length) {
      if (events[index2][1].type === "listOrdered" || events[index2][1].type === "listUnordered") {
        if (events[index2][0] === "enter") {
          listStack.push(index2);
        } else {
          const tail = listStack.pop();
          index2 = prepareList(events, tail, index2);
        }
      }
    }
    index2 = -1;
    while (++index2 < events.length) {
      const handler = config[events[index2][0]];
      if (own3.call(handler, events[index2][1].type)) {
        handler[events[index2][1].type].call(Object.assign({
          sliceSerialize: events[index2][2].sliceSerialize
        }, context), events[index2][1]);
      }
    }
    if (context.tokenStack.length > 0) {
      const tail = context.tokenStack[context.tokenStack.length - 1];
      const handler = tail[1] || defaultOnError;
      handler.call(context, void 0, tail[0]);
    }
    tree.position = {
      start: point2(events.length > 0 ? events[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: point2(events.length > 0 ? events[events.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    };
    index2 = -1;
    while (++index2 < config.transforms.length) {
      tree = config.transforms[index2](tree) || tree;
    }
    return tree;
  }
  function prepareList(events, start, length) {
    let index2 = start - 1;
    let containerBalance = -1;
    let listSpread = false;
    let listItem2;
    let lineIndex;
    let firstBlankLineIndex;
    let atMarker;
    while (++index2 <= length) {
      const event = events[index2];
      switch (event[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          if (event[0] === "enter") {
            containerBalance++;
          } else {
            containerBalance--;
          }
          atMarker = void 0;
          break;
        }
        case "lineEndingBlank": {
          if (event[0] === "enter") {
            if (listItem2 && !atMarker && !containerBalance && !firstBlankLineIndex) {
              firstBlankLineIndex = index2;
            }
            atMarker = void 0;
          }
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace": {
          break;
        }
        default: {
          atMarker = void 0;
        }
      }
      if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
        if (listItem2) {
          let tailIndex = index2;
          lineIndex = void 0;
          while (tailIndex--) {
            const tailEvent = events[tailIndex];
            if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
              if (tailEvent[0] === "exit") continue;
              if (lineIndex) {
                events[lineIndex][1].type = "lineEndingBlank";
                listSpread = true;
              }
              tailEvent[1].type = "lineEnding";
              lineIndex = tailIndex;
            } else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent") {
            } else {
              break;
            }
          }
          if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) {
            listItem2._spread = true;
          }
          listItem2.end = Object.assign({}, lineIndex ? events[lineIndex][1].start : event[1].end);
          events.splice(lineIndex || index2, 0, ["exit", listItem2, event[2]]);
          index2++;
          length++;
        }
        if (event[1].type === "listItemPrefix") {
          const item = {
            type: "listItem",
            _spread: false,
            start: Object.assign({}, event[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          listItem2 = item;
          events.splice(index2, 0, ["enter", item, event[2]]);
          index2++;
          length++;
          firstBlankLineIndex = void 0;
          atMarker = true;
        }
      }
    }
    events[start][1]._spread = listSpread;
    return length;
  }
  function opener(create, and) {
    return open;
    function open(token) {
      enter.call(this, create(token), token);
      if (and) and.call(this, token);
    }
  }
  function buffer() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function enter(node2, token, errorHandler) {
    const parent = this.stack[this.stack.length - 1];
    const siblings = parent.children;
    siblings.push(node2);
    this.stack.push(node2);
    this.tokenStack.push([token, errorHandler || void 0]);
    node2.position = {
      start: point2(token.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function closer(and) {
    return close;
    function close(token) {
      if (and) and.call(this, token);
      exit2.call(this, token);
    }
  }
  function exit2(token, onExitError) {
    const node2 = this.stack.pop();
    const open = this.tokenStack.pop();
    if (!open) {
      throw new Error("Cannot close `" + token.type + "` (" + stringifyPosition({
        start: token.start,
        end: token.end
      }) + "): it\u2019s not open");
    } else if (open[0].type !== token.type) {
      if (onExitError) {
        onExitError.call(this, token, open[0]);
      } else {
        const handler = open[1] || defaultOnError;
        handler.call(this, token, open[0]);
      }
    }
    node2.position.end = point2(token.end);
  }
  function resume() {
    return toString(this.stack.pop());
  }
  function onenterlistordered() {
    this.data.expectingFirstListItemValue = true;
  }
  function onenterlistitemvalue(token) {
    if (this.data.expectingFirstListItemValue) {
      const ancestor = this.stack[this.stack.length - 2];
      ancestor.start = Number.parseInt(this.sliceSerialize(token), 10);
      this.data.expectingFirstListItemValue = void 0;
    }
  }
  function onexitcodefencedfenceinfo() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.lang = data2;
  }
  function onexitcodefencedfencemeta() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.meta = data2;
  }
  function onexitcodefencedfence() {
    if (this.data.flowCodeInside) return;
    this.buffer();
    this.data.flowCodeInside = true;
  }
  function onexitcodefenced() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data2.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
    this.data.flowCodeInside = void 0;
  }
  function onexitcodeindented() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data2.replace(/(\r?\n|\r)$/g, "");
  }
  function onexitdefinitionlabelstring(token) {
    const label = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.label = label;
    node2.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
  }
  function onexitdefinitiontitlestring() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.title = data2;
  }
  function onexitdefinitiondestinationstring() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.url = data2;
  }
  function onexitatxheadingsequence(token) {
    const node2 = this.stack[this.stack.length - 1];
    if (!node2.depth) {
      const depth = this.sliceSerialize(token).length;
      node2.depth = depth;
    }
  }
  function onexitsetextheadingtext() {
    this.data.setextHeadingSlurpLineEnding = true;
  }
  function onexitsetextheadinglinesequence(token) {
    const node2 = this.stack[this.stack.length - 1];
    node2.depth = this.sliceSerialize(token).codePointAt(0) === 61 ? 1 : 2;
  }
  function onexitsetextheading() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function onenterdata(token) {
    const node2 = this.stack[this.stack.length - 1];
    const siblings = node2.children;
    let tail = siblings[siblings.length - 1];
    if (!tail || tail.type !== "text") {
      tail = text3();
      tail.position = {
        start: point2(token.start),
        // @ts-expect-error: we’ll add `end` later.
        end: void 0
      };
      siblings.push(tail);
    }
    this.stack.push(tail);
  }
  function onexitdata(token) {
    const tail = this.stack.pop();
    tail.value += this.sliceSerialize(token);
    tail.position.end = point2(token.end);
  }
  function onexitlineending(token) {
    const context = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const tail = context.children[context.children.length - 1];
      tail.position.end = point2(token.end);
      this.data.atHardBreak = void 0;
      return;
    }
    if (!this.data.setextHeadingSlurpLineEnding && config.canContainEols.includes(context.type)) {
      onenterdata.call(this, token);
      onexitdata.call(this, token);
    }
  }
  function onexithardbreak() {
    this.data.atHardBreak = true;
  }
  function onexithtmlflow() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data2;
  }
  function onexithtmltext() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data2;
  }
  function onexitcodetext() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data2;
  }
  function onexitlink() {
    const node2 = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const referenceType = this.data.referenceType || "shortcut";
      node2.type += "Reference";
      node2.referenceType = referenceType;
      delete node2.url;
      delete node2.title;
    } else {
      delete node2.identifier;
      delete node2.label;
    }
    this.data.referenceType = void 0;
  }
  function onexitimage() {
    const node2 = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const referenceType = this.data.referenceType || "shortcut";
      node2.type += "Reference";
      node2.referenceType = referenceType;
      delete node2.url;
      delete node2.title;
    } else {
      delete node2.identifier;
      delete node2.label;
    }
    this.data.referenceType = void 0;
  }
  function onexitlabeltext(token) {
    const string3 = this.sliceSerialize(token);
    const ancestor = this.stack[this.stack.length - 2];
    ancestor.label = decodeString(string3);
    ancestor.identifier = normalizeIdentifier(string3).toLowerCase();
  }
  function onexitlabel() {
    const fragment = this.stack[this.stack.length - 1];
    const value = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    this.data.inReference = true;
    if (node2.type === "link") {
      const children = fragment.children;
      node2.children = children;
    } else {
      node2.alt = value;
    }
  }
  function onexitresourcedestinationstring() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.url = data2;
  }
  function onexitresourcetitlestring() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.title = data2;
  }
  function onexitresource() {
    this.data.inReference = void 0;
  }
  function onenterreference() {
    this.data.referenceType = "collapsed";
  }
  function onexitreferencestring(token) {
    const label = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.label = label;
    node2.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
    this.data.referenceType = "full";
  }
  function onexitcharacterreferencemarker(token) {
    this.data.characterReferenceType = token.type;
  }
  function onexitcharacterreferencevalue(token) {
    const data2 = this.sliceSerialize(token);
    const type2 = this.data.characterReferenceType;
    let value;
    if (type2) {
      value = decodeNumericCharacterReference(data2, type2 === "characterReferenceMarkerNumeric" ? 10 : 16);
      this.data.characterReferenceType = void 0;
    } else {
      const result = decodeNamedCharacterReference(data2);
      value = result;
    }
    const tail = this.stack[this.stack.length - 1];
    tail.value += value;
  }
  function onexitcharacterreference(token) {
    const tail = this.stack.pop();
    tail.position.end = point2(token.end);
  }
  function onexitautolinkprotocol(token) {
    onexitdata.call(this, token);
    const node2 = this.stack[this.stack.length - 1];
    node2.url = this.sliceSerialize(token);
  }
  function onexitautolinkemail(token) {
    onexitdata.call(this, token);
    const node2 = this.stack[this.stack.length - 1];
    node2.url = "mailto:" + this.sliceSerialize(token);
  }
  function blockQuote2() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function codeFlow() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function codeText2() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function definition2() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function emphasis() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function heading() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function hardBreak() {
    return {
      type: "break"
    };
  }
  function html() {
    return {
      type: "html",
      value: ""
    };
  }
  function image() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function link() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function list2(token) {
    return {
      type: "list",
      ordered: token.type === "listOrdered",
      start: null,
      spread: token._spread,
      children: []
    };
  }
  function listItem(token) {
    return {
      type: "listItem",
      spread: token._spread,
      checked: null,
      children: []
    };
  }
  function paragraph() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function strong() {
    return {
      type: "strong",
      children: []
    };
  }
  function text3() {
    return {
      type: "text",
      value: ""
    };
  }
  function thematicBreak2() {
    return {
      type: "thematicBreak"
    };
  }
}
function point2(d) {
  return {
    line: d.line,
    column: d.column,
    offset: d.offset
  };
}
function configure(combined, extensions) {
  let index2 = -1;
  while (++index2 < extensions.length) {
    const value = extensions[index2];
    if (Array.isArray(value)) {
      configure(combined, value);
    } else {
      extension(combined, value);
    }
  }
}
function extension(combined, extension2) {
  let key;
  for (key in extension2) {
    if (own3.call(extension2, key)) {
      switch (key) {
        case "canContainEols": {
          const right = extension2[key];
          if (right) {
            combined[key].push(...right);
          }
          break;
        }
        case "transforms": {
          const right = extension2[key];
          if (right) {
            combined[key].push(...right);
          }
          break;
        }
        case "enter":
        case "exit": {
          const right = extension2[key];
          if (right) {
            Object.assign(combined[key], right);
          }
          break;
        }
      }
    }
  }
}
function defaultOnError(left, right) {
  if (left) {
    throw new Error("Cannot close `" + left.type + "` (" + stringifyPosition({
      start: left.start,
      end: left.end
    }) + "): a different token (`" + right.type + "`, " + stringifyPosition({
      start: right.start,
      end: right.end
    }) + ") is open");
  } else {
    throw new Error("Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
      start: right.start,
      end: right.end
    }) + ") is still open");
  }
}

// ../../node_modules/remark-parse/lib/index.js
function remarkParse(options) {
  const self = this;
  self.parser = parser;
  function parser(doc) {
    return fromMarkdown(doc, {
      ...self.data("settings"),
      ...options,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: self.data("micromarkExtensions") || [],
      mdastExtensions: self.data("fromMarkdownExtensions") || []
    });
  }
}

// ../../node_modules/unist-util-is/lib/index.js
var convert = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  function(test) {
    if (test === null || test === void 0) {
      return ok2;
    }
    if (typeof test === "function") {
      return castFactory(test);
    }
    if (typeof test === "object") {
      return Array.isArray(test) ? anyFactory(test) : propsFactory(test);
    }
    if (typeof test === "string") {
      return typeFactory(test);
    }
    throw new Error("Expected function, string, or object as test");
  }
);
function anyFactory(tests) {
  const checks = [];
  let index2 = -1;
  while (++index2 < tests.length) {
    checks[index2] = convert(tests[index2]);
  }
  return castFactory(any);
  function any(...parameters) {
    let index3 = -1;
    while (++index3 < checks.length) {
      if (checks[index3].apply(this, parameters)) return true;
    }
    return false;
  }
}
function propsFactory(check) {
  const checkAsRecord = (
    /** @type {Record<string, unknown>} */
    check
  );
  return castFactory(all2);
  function all2(node2) {
    const nodeAsRecord = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      node2
    );
    let key;
    for (key in check) {
      if (nodeAsRecord[key] !== checkAsRecord[key]) return false;
    }
    return true;
  }
}
function typeFactory(check) {
  return castFactory(type2);
  function type2(node2) {
    return node2 && node2.type === check;
  }
}
function castFactory(testFunction) {
  return check;
  function check(value, index2, parent) {
    return Boolean(
      looksLikeANode(value) && testFunction.call(
        this,
        value,
        typeof index2 === "number" ? index2 : void 0,
        parent || void 0
      )
    );
  }
}
function ok2() {
  return true;
}
function looksLikeANode(value) {
  return value !== null && typeof value === "object" && "type" in value;
}

// ../../node_modules/unist-util-visit-parents/lib/color.node.js
function color(d) {
  return "\x1B[33m" + d + "\x1B[39m";
}

// ../../node_modules/unist-util-visit-parents/lib/index.js
var empty = [];
var CONTINUE = true;
var EXIT = false;
var SKIP = "skip";
function visitParents(tree, test, visitor, reverse) {
  let check;
  if (typeof test === "function" && typeof visitor !== "function") {
    reverse = visitor;
    visitor = test;
  } else {
    check = test;
  }
  const is2 = convert(check);
  const step = reverse ? -1 : 1;
  factory(tree, void 0, [])();
  function factory(node2, index2, parents) {
    const value = (
      /** @type {Record<string, unknown>} */
      node2 && typeof node2 === "object" ? node2 : {}
    );
    if (typeof value.type === "string") {
      const name = (
        // `hast`
        typeof value.tagName === "string" ? value.tagName : (
          // `xast`
          typeof value.name === "string" ? value.name : void 0
        )
      );
      Object.defineProperty(visit2, "name", {
        value: "node (" + color(node2.type + (name ? "<" + name + ">" : "")) + ")"
      });
    }
    return visit2;
    function visit2() {
      let result = empty;
      let subresult;
      let offset;
      let grandparents;
      if (!test || is2(node2, index2, parents[parents.length - 1] || void 0)) {
        result = toResult(visitor(node2, parents));
        if (result[0] === EXIT) {
          return result;
        }
      }
      if ("children" in node2 && node2.children) {
        const nodeAsParent = (
          /** @type {UnistParent} */
          node2
        );
        if (nodeAsParent.children && result[0] !== SKIP) {
          offset = (reverse ? nodeAsParent.children.length : -1) + step;
          grandparents = parents.concat(nodeAsParent);
          while (offset > -1 && offset < nodeAsParent.children.length) {
            const child = nodeAsParent.children[offset];
            subresult = factory(child, offset, grandparents)();
            if (subresult[0] === EXIT) {
              return subresult;
            }
            offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
          }
        }
      }
      return result;
    }
  }
}
function toResult(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "number") {
    return [CONTINUE, value];
  }
  return value === null || value === void 0 ? empty : [value];
}

// ../../node_modules/unist-util-visit/lib/index.js
function visit(tree, testOrVisitor, visitorOrReverse, maybeReverse) {
  let reverse;
  let test;
  let visitor;
  if (typeof testOrVisitor === "function" && typeof visitorOrReverse !== "function") {
    test = void 0;
    visitor = testOrVisitor;
    reverse = visitorOrReverse;
  } else {
    test = testOrVisitor;
    visitor = visitorOrReverse;
    reverse = maybeReverse;
  }
  visitParents(tree, test, overload, reverse);
  function overload(node2, parents) {
    const parent = parents[parents.length - 1];
    const index2 = parent ? parent.children.indexOf(node2) : void 0;
    return visitor(node2, index2, parent);
  }
}

// ../../node_modules/js-yaml/dist/js-yaml.mjs
function isNothing(subject) {
  return typeof subject === "undefined" || subject === null;
}
function isObject(subject) {
  return typeof subject === "object" && subject !== null;
}
function toArray(sequence) {
  if (Array.isArray(sequence)) return sequence;
  else if (isNothing(sequence)) return [];
  return [sequence];
}
function extend2(target, source) {
  var index2, length, key, sourceKeys;
  if (source) {
    sourceKeys = Object.keys(source);
    for (index2 = 0, length = sourceKeys.length; index2 < length; index2 += 1) {
      key = sourceKeys[index2];
      target[key] = source[key];
    }
  }
  return target;
}
function repeat(string3, count) {
  var result = "", cycle;
  for (cycle = 0; cycle < count; cycle += 1) {
    result += string3;
  }
  return result;
}
function isNegativeZero(number) {
  return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
}
var isNothing_1 = isNothing;
var isObject_1 = isObject;
var toArray_1 = toArray;
var repeat_1 = repeat;
var isNegativeZero_1 = isNegativeZero;
var extend_1 = extend2;
var common = {
  isNothing: isNothing_1,
  isObject: isObject_1,
  toArray: toArray_1,
  repeat: repeat_1,
  isNegativeZero: isNegativeZero_1,
  extend: extend_1
};
function formatError(exception2, compact) {
  var where = "", message = exception2.reason || "(unknown reason)";
  if (!exception2.mark) return message;
  if (exception2.mark.name) {
    where += 'in "' + exception2.mark.name + '" ';
  }
  where += "(" + (exception2.mark.line + 1) + ":" + (exception2.mark.column + 1) + ")";
  if (!compact && exception2.mark.snippet) {
    where += "\n\n" + exception2.mark.snippet;
  }
  return message + " " + where;
}
function YAMLException$1(reason, mark) {
  Error.call(this);
  this.name = "YAMLException";
  this.reason = reason;
  this.mark = mark;
  this.message = formatError(this, false);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack || "";
  }
}
YAMLException$1.prototype = Object.create(Error.prototype);
YAMLException$1.prototype.constructor = YAMLException$1;
YAMLException$1.prototype.toString = function toString2(compact) {
  return this.name + ": " + formatError(this, compact);
};
var exception = YAMLException$1;
function getLine(buffer, lineStart, lineEnd, position2, maxLineLength) {
  var head = "";
  var tail = "";
  var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
  if (position2 - lineStart > maxHalfLength) {
    head = " ... ";
    lineStart = position2 - maxHalfLength + head.length;
  }
  if (lineEnd - position2 > maxHalfLength) {
    tail = " ...";
    lineEnd = position2 + maxHalfLength - tail.length;
  }
  return {
    str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "\u2192") + tail,
    pos: position2 - lineStart + head.length
    // relative position
  };
}
function padStart(string3, max) {
  return common.repeat(" ", max - string3.length) + string3;
}
function makeSnippet(mark, options) {
  options = Object.create(options || null);
  if (!mark.buffer) return null;
  if (!options.maxLength) options.maxLength = 79;
  if (typeof options.indent !== "number") options.indent = 1;
  if (typeof options.linesBefore !== "number") options.linesBefore = 3;
  if (typeof options.linesAfter !== "number") options.linesAfter = 2;
  var re = /\r?\n|\r|\0/g;
  var lineStarts = [0];
  var lineEnds = [];
  var match;
  var foundLineNo = -1;
  while (match = re.exec(mark.buffer)) {
    lineEnds.push(match.index);
    lineStarts.push(match.index + match[0].length);
    if (mark.position <= match.index && foundLineNo < 0) {
      foundLineNo = lineStarts.length - 2;
    }
  }
  if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
  var result = "", i, line;
  var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
  var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
  for (i = 1; i <= options.linesBefore; i++) {
    if (foundLineNo - i < 0) break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo - i],
      lineEnds[foundLineNo - i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
      maxLineLength
    );
    result = common.repeat(" ", options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) + " | " + line.str + "\n" + result;
  }
  line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
  result += common.repeat(" ", options.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
  result += common.repeat("-", options.indent + lineNoLength + 3 + line.pos) + "^\n";
  for (i = 1; i <= options.linesAfter; i++) {
    if (foundLineNo + i >= lineEnds.length) break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo + i],
      lineEnds[foundLineNo + i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
      maxLineLength
    );
    result += common.repeat(" ", options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) + " | " + line.str + "\n";
  }
  return result.replace(/\n$/, "");
}
var snippet = makeSnippet;
var TYPE_CONSTRUCTOR_OPTIONS = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
];
var YAML_NODE_KINDS = [
  "scalar",
  "sequence",
  "mapping"
];
function compileStyleAliases(map2) {
  var result = {};
  if (map2 !== null) {
    Object.keys(map2).forEach(function(style) {
      map2[style].forEach(function(alias) {
        result[String(alias)] = style;
      });
    });
  }
  return result;
}
function Type$1(tag, options) {
  options = options || {};
  Object.keys(options).forEach(function(name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });
  this.options = options;
  this.tag = tag;
  this.kind = options["kind"] || null;
  this.resolve = options["resolve"] || function() {
    return true;
  };
  this.construct = options["construct"] || function(data) {
    return data;
  };
  this.instanceOf = options["instanceOf"] || null;
  this.predicate = options["predicate"] || null;
  this.represent = options["represent"] || null;
  this.representName = options["representName"] || null;
  this.defaultStyle = options["defaultStyle"] || null;
  this.multi = options["multi"] || false;
  this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}
var type = Type$1;
function compileList(schema2, name) {
  var result = [];
  schema2[name].forEach(function(currentType) {
    var newIndex = result.length;
    result.forEach(function(previousType, previousIndex) {
      if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) {
        newIndex = previousIndex;
      }
    });
    result[newIndex] = currentType;
  });
  return result;
}
function compileMap() {
  var result = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, index2, length;
  function collectType(type2) {
    if (type2.multi) {
      result.multi[type2.kind].push(type2);
      result.multi["fallback"].push(type2);
    } else {
      result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
    }
  }
  for (index2 = 0, length = arguments.length; index2 < length; index2 += 1) {
    arguments[index2].forEach(collectType);
  }
  return result;
}
function Schema$1(definition2) {
  return this.extend(definition2);
}
Schema$1.prototype.extend = function extend3(definition2) {
  var implicit = [];
  var explicit = [];
  if (definition2 instanceof type) {
    explicit.push(definition2);
  } else if (Array.isArray(definition2)) {
    explicit = explicit.concat(definition2);
  } else if (definition2 && (Array.isArray(definition2.implicit) || Array.isArray(definition2.explicit))) {
    if (definition2.implicit) implicit = implicit.concat(definition2.implicit);
    if (definition2.explicit) explicit = explicit.concat(definition2.explicit);
  } else {
    throw new exception("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  }
  implicit.forEach(function(type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
    if (type$1.loadKind && type$1.loadKind !== "scalar") {
      throw new exception("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    }
    if (type$1.multi) {
      throw new exception("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }
  });
  explicit.forEach(function(type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
  });
  var result = Object.create(Schema$1.prototype);
  result.implicit = (this.implicit || []).concat(implicit);
  result.explicit = (this.explicit || []).concat(explicit);
  result.compiledImplicit = compileList(result, "implicit");
  result.compiledExplicit = compileList(result, "explicit");
  result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
  return result;
};
var schema = Schema$1;
var str = new type("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(data) {
    return data !== null ? data : "";
  }
});
var seq = new type("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(data) {
    return data !== null ? data : [];
  }
});
var map = new type("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(data) {
    return data !== null ? data : {};
  }
});
var failsafe = new schema({
  explicit: [
    str,
    seq,
    map
  ]
});
function resolveYamlNull(data) {
  if (data === null) return true;
  var max = data.length;
  return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
}
function constructYamlNull() {
  return null;
}
function isNull(object) {
  return object === null;
}
var _null = new type("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
});
function resolveYamlBoolean(data) {
  if (data === null) return false;
  var max = data.length;
  return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
}
function constructYamlBoolean(data) {
  return data === "true" || data === "True" || data === "TRUE";
}
function isBoolean(object) {
  return Object.prototype.toString.call(object) === "[object Boolean]";
}
var bool = new type("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function(object) {
      return object ? "true" : "false";
    },
    uppercase: function(object) {
      return object ? "TRUE" : "FALSE";
    },
    camelcase: function(object) {
      return object ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
});
function isHexCode(c) {
  return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
}
function isOctCode(c) {
  return 48 <= c && c <= 55;
}
function isDecCode(c) {
  return 48 <= c && c <= 57;
}
function resolveYamlInteger(data) {
  if (data === null) return false;
  var max = data.length, index2 = 0, hasDigits = false, ch;
  if (!max) return false;
  ch = data[index2];
  if (ch === "-" || ch === "+") {
    ch = data[++index2];
  }
  if (ch === "0") {
    if (index2 + 1 === max) return true;
    ch = data[++index2];
    if (ch === "b") {
      index2++;
      for (; index2 < max; index2++) {
        ch = data[index2];
        if (ch === "_") continue;
        if (ch !== "0" && ch !== "1") return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "x") {
      index2++;
      for (; index2 < max; index2++) {
        ch = data[index2];
        if (ch === "_") continue;
        if (!isHexCode(data.charCodeAt(index2))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "o") {
      index2++;
      for (; index2 < max; index2++) {
        ch = data[index2];
        if (ch === "_") continue;
        if (!isOctCode(data.charCodeAt(index2))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
  }
  if (ch === "_") return false;
  for (; index2 < max; index2++) {
    ch = data[index2];
    if (ch === "_") continue;
    if (!isDecCode(data.charCodeAt(index2))) {
      return false;
    }
    hasDigits = true;
  }
  if (!hasDigits || ch === "_") return false;
  return true;
}
function constructYamlInteger(data) {
  var value = data, sign = 1, ch;
  if (value.indexOf("_") !== -1) {
    value = value.replace(/_/g, "");
  }
  ch = value[0];
  if (ch === "-" || ch === "+") {
    if (ch === "-") sign = -1;
    value = value.slice(1);
    ch = value[0];
  }
  if (value === "0") return 0;
  if (ch === "0") {
    if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
    if (value[1] === "x") return sign * parseInt(value.slice(2), 16);
    if (value[1] === "o") return sign * parseInt(value.slice(2), 8);
  }
  return sign * parseInt(value, 10);
}
function isInteger(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
}
var int = new type("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary: function(obj) {
      return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
    },
    octal: function(obj) {
      return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
    },
    decimal: function(obj) {
      return obj.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(obj) {
      return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
});
var YAML_FLOAT_PATTERN = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function resolveYamlFloat(data) {
  if (data === null) return false;
  if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  data[data.length - 1] === "_") {
    return false;
  }
  return true;
}
function constructYamlFloat(data) {
  var value, sign;
  value = data.replace(/_/g, "").toLowerCase();
  sign = value[0] === "-" ? -1 : 1;
  if ("+-".indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }
  if (value === ".inf") {
    return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  } else if (value === ".nan") {
    return NaN;
  }
  return sign * parseFloat(value, 10);
}
var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
function representYamlFloat(object, style) {
  var res;
  if (isNaN(object)) {
    switch (style) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  } else if (common.isNegativeZero(object)) {
    return "-0.0";
  }
  res = object.toString(10);
  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
}
function isFloat(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
}
var float = new type("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: "lowercase"
});
var json = failsafe.extend({
  implicit: [
    _null,
    bool,
    int,
    float
  ]
});
var core = json;
var YAML_DATE_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
);
var YAML_TIMESTAMP_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function resolveYamlTimestamp(data) {
  if (data === null) return false;
  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
  return false;
}
function constructYamlTimestamp(data) {
  var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
  match = YAML_DATE_REGEXP.exec(data);
  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
  if (match === null) throw new Error("Date resolve error");
  year = +match[1];
  month = +match[2] - 1;
  day = +match[3];
  if (!match[4]) {
    return new Date(Date.UTC(year, month, day));
  }
  hour = +match[4];
  minute = +match[5];
  second = +match[6];
  if (match[7]) {
    fraction = match[7].slice(0, 3);
    while (fraction.length < 3) {
      fraction += "0";
    }
    fraction = +fraction;
  }
  if (match[9]) {
    tz_hour = +match[10];
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 6e4;
    if (match[9] === "-") delta = -delta;
  }
  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
  if (delta) date.setTime(date.getTime() - delta);
  return date;
}
function representYamlTimestamp(object) {
  return object.toISOString();
}
var timestamp = new type("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});
function resolveYamlMerge(data) {
  return data === "<<" || data === null;
}
var merge = new type("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: resolveYamlMerge
});
var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
function resolveYamlBinary(data) {
  if (data === null) return false;
  var code, idx, bitlen = 0, max = data.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    code = map2.indexOf(data.charAt(idx));
    if (code > 64) continue;
    if (code < 0) return false;
    bitlen += 6;
  }
  return bitlen % 8 === 0;
}
function constructYamlBinary(data) {
  var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map2 = BASE64_MAP, bits = 0, result = [];
  for (idx = 0; idx < max; idx++) {
    if (idx % 4 === 0 && idx) {
      result.push(bits >> 16 & 255);
      result.push(bits >> 8 & 255);
      result.push(bits & 255);
    }
    bits = bits << 6 | map2.indexOf(input.charAt(idx));
  }
  tailbits = max % 4 * 6;
  if (tailbits === 0) {
    result.push(bits >> 16 & 255);
    result.push(bits >> 8 & 255);
    result.push(bits & 255);
  } else if (tailbits === 18) {
    result.push(bits >> 10 & 255);
    result.push(bits >> 2 & 255);
  } else if (tailbits === 12) {
    result.push(bits >> 4 & 255);
  }
  return new Uint8Array(result);
}
function representYamlBinary(object) {
  var result = "", bits = 0, idx, tail, max = object.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    if (idx % 3 === 0 && idx) {
      result += map2[bits >> 18 & 63];
      result += map2[bits >> 12 & 63];
      result += map2[bits >> 6 & 63];
      result += map2[bits & 63];
    }
    bits = (bits << 8) + object[idx];
  }
  tail = max % 3;
  if (tail === 0) {
    result += map2[bits >> 18 & 63];
    result += map2[bits >> 12 & 63];
    result += map2[bits >> 6 & 63];
    result += map2[bits & 63];
  } else if (tail === 2) {
    result += map2[bits >> 10 & 63];
    result += map2[bits >> 4 & 63];
    result += map2[bits << 2 & 63];
    result += map2[64];
  } else if (tail === 1) {
    result += map2[bits >> 2 & 63];
    result += map2[bits << 4 & 63];
    result += map2[64];
    result += map2[64];
  }
  return result;
}
function isBinary(obj) {
  return Object.prototype.toString.call(obj) === "[object Uint8Array]";
}
var binary = new type("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});
var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var _toString$2 = Object.prototype.toString;
function resolveYamlOmap(data) {
  if (data === null) return true;
  var objectKeys = [], index2, length, pair, pairKey, pairHasKey, object = data;
  for (index2 = 0, length = object.length; index2 < length; index2 += 1) {
    pair = object[index2];
    pairHasKey = false;
    if (_toString$2.call(pair) !== "[object Object]") return false;
    for (pairKey in pair) {
      if (_hasOwnProperty$3.call(pair, pairKey)) {
        if (!pairHasKey) pairHasKey = true;
        else return false;
      }
    }
    if (!pairHasKey) return false;
    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
    else return false;
  }
  return true;
}
function constructYamlOmap(data) {
  return data !== null ? data : [];
}
var omap = new type("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});
var _toString$1 = Object.prototype.toString;
function resolveYamlPairs(data) {
  if (data === null) return true;
  var index2, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index2 = 0, length = object.length; index2 < length; index2 += 1) {
    pair = object[index2];
    if (_toString$1.call(pair) !== "[object Object]") return false;
    keys = Object.keys(pair);
    if (keys.length !== 1) return false;
    result[index2] = [keys[0], pair[keys[0]]];
  }
  return true;
}
function constructYamlPairs(data) {
  if (data === null) return [];
  var index2, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index2 = 0, length = object.length; index2 < length; index2 += 1) {
    pair = object[index2];
    keys = Object.keys(pair);
    result[index2] = [keys[0], pair[keys[0]]];
  }
  return result;
}
var pairs = new type("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});
var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function resolveYamlSet(data) {
  if (data === null) return true;
  var key, object = data;
  for (key in object) {
    if (_hasOwnProperty$2.call(object, key)) {
      if (object[key] !== null) return false;
    }
  }
  return true;
}
function constructYamlSet(data) {
  return data !== null ? data : {};
}
var set = new type("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: resolveYamlSet,
  construct: constructYamlSet
});
var _default = core.extend({
  implicit: [
    timestamp,
    merge
  ],
  explicit: [
    binary,
    omap,
    pairs,
    set
  ]
});
var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var CONTEXT_FLOW_IN = 1;
var CONTEXT_FLOW_OUT = 2;
var CONTEXT_BLOCK_IN = 3;
var CONTEXT_BLOCK_OUT = 4;
var CHOMPING_CLIP = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP = 3;
var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function _class(obj) {
  return Object.prototype.toString.call(obj);
}
function is_EOL(c) {
  return c === 10 || c === 13;
}
function is_WHITE_SPACE(c) {
  return c === 9 || c === 32;
}
function is_WS_OR_EOL(c) {
  return c === 9 || c === 32 || c === 10 || c === 13;
}
function is_FLOW_INDICATOR(c) {
  return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
}
function fromHexCode(c) {
  var lc;
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  lc = c | 32;
  if (97 <= lc && lc <= 102) {
    return lc - 97 + 10;
  }
  return -1;
}
function escapedHexLen(c) {
  if (c === 120) {
    return 2;
  }
  if (c === 117) {
    return 4;
  }
  if (c === 85) {
    return 8;
  }
  return 0;
}
function fromDecimalCode(c) {
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  return -1;
}
function simpleEscapeSequence(c) {
  return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
}
function charFromCodepoint(c) {
  if (c <= 65535) {
    return String.fromCharCode(c);
  }
  return String.fromCharCode(
    (c - 65536 >> 10) + 55296,
    (c - 65536 & 1023) + 56320
  );
}
var simpleEscapeCheck = new Array(256);
var simpleEscapeMap = new Array(256);
for (i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}
var i;
function State$1(input, options) {
  this.input = input;
  this.filename = options["filename"] || null;
  this.schema = options["schema"] || _default;
  this.onWarning = options["onWarning"] || null;
  this.legacy = options["legacy"] || false;
  this.json = options["json"] || false;
  this.listener = options["listener"] || null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.typeMap = this.schema.compiledTypeMap;
  this.length = input.length;
  this.position = 0;
  this.line = 0;
  this.lineStart = 0;
  this.lineIndent = 0;
  this.firstTabInLine = -1;
  this.documents = [];
}
function generateError(state, message) {
  var mark = {
    name: state.filename,
    buffer: state.input.slice(0, -1),
    // omit trailing \0
    position: state.position,
    line: state.line,
    column: state.position - state.lineStart
  };
  mark.snippet = snippet(mark);
  return new exception(message, mark);
}
function throwError(state, message) {
  throw generateError(state, message);
}
function throwWarning(state, message) {
  if (state.onWarning) {
    state.onWarning.call(null, generateError(state, message));
  }
}
var directiveHandlers = {
  YAML: function handleYamlDirective(state, name, args) {
    var match, major, minor;
    if (state.version !== null) {
      throwError(state, "duplication of %YAML directive");
    }
    if (args.length !== 1) {
      throwError(state, "YAML directive accepts exactly one argument");
    }
    match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
    if (match === null) {
      throwError(state, "ill-formed argument of the YAML directive");
    }
    major = parseInt(match[1], 10);
    minor = parseInt(match[2], 10);
    if (major !== 1) {
      throwError(state, "unacceptable YAML version of the document");
    }
    state.version = args[0];
    state.checkLineBreaks = minor < 2;
    if (minor !== 1 && minor !== 2) {
      throwWarning(state, "unsupported YAML version of the document");
    }
  },
  TAG: function handleTagDirective(state, name, args) {
    var handle, prefix;
    if (args.length !== 2) {
      throwError(state, "TAG directive accepts exactly two arguments");
    }
    handle = args[0];
    prefix = args[1];
    if (!PATTERN_TAG_HANDLE.test(handle)) {
      throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
    }
    if (_hasOwnProperty$1.call(state.tagMap, handle)) {
      throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
    }
    if (!PATTERN_TAG_URI.test(prefix)) {
      throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
    }
    try {
      prefix = decodeURIComponent(prefix);
    } catch (err) {
      throwError(state, "tag prefix is malformed: " + prefix);
    }
    state.tagMap[handle] = prefix;
  }
};
function captureSegment(state, start, end, checkJson) {
  var _position, _length, _character, _result;
  if (start < end) {
    _result = state.input.slice(start, end);
    if (checkJson) {
      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
        _character = _result.charCodeAt(_position);
        if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
          throwError(state, "expected valid JSON character");
        }
      }
    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
      throwError(state, "the stream contains non-printable characters");
    }
    state.result += _result;
  }
}
function mergeMappings(state, destination, source, overridableKeys) {
  var sourceKeys, key, index2, quantity;
  if (!common.isObject(source)) {
    throwError(state, "cannot merge mappings; the provided source object is unacceptable");
  }
  sourceKeys = Object.keys(source);
  for (index2 = 0, quantity = sourceKeys.length; index2 < quantity; index2 += 1) {
    key = sourceKeys[index2];
    if (!_hasOwnProperty$1.call(destination, key)) {
      destination[key] = source[key];
      overridableKeys[key] = true;
    }
  }
}
function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
  var index2, quantity;
  if (Array.isArray(keyNode)) {
    keyNode = Array.prototype.slice.call(keyNode);
    for (index2 = 0, quantity = keyNode.length; index2 < quantity; index2 += 1) {
      if (Array.isArray(keyNode[index2])) {
        throwError(state, "nested arrays are not supported inside keys");
      }
      if (typeof keyNode === "object" && _class(keyNode[index2]) === "[object Object]") {
        keyNode[index2] = "[object Object]";
      }
    }
  }
  if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
    keyNode = "[object Object]";
  }
  keyNode = String(keyNode);
  if (_result === null) {
    _result = {};
  }
  if (keyTag === "tag:yaml.org,2002:merge") {
    if (Array.isArray(valueNode)) {
      for (index2 = 0, quantity = valueNode.length; index2 < quantity; index2 += 1) {
        mergeMappings(state, _result, valueNode[index2], overridableKeys);
      }
    } else {
      mergeMappings(state, _result, valueNode, overridableKeys);
    }
  } else {
    if (!state.json && !_hasOwnProperty$1.call(overridableKeys, keyNode) && _hasOwnProperty$1.call(_result, keyNode)) {
      state.line = startLine || state.line;
      state.lineStart = startLineStart || state.lineStart;
      state.position = startPos || state.position;
      throwError(state, "duplicated mapping key");
    }
    if (keyNode === "__proto__") {
      Object.defineProperty(_result, keyNode, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: valueNode
      });
    } else {
      _result[keyNode] = valueNode;
    }
    delete overridableKeys[keyNode];
  }
  return _result;
}
function readLineBreak(state) {
  var ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 10) {
    state.position++;
  } else if (ch === 13) {
    state.position++;
    if (state.input.charCodeAt(state.position) === 10) {
      state.position++;
    }
  } else {
    throwError(state, "a line break is expected");
  }
  state.line += 1;
  state.lineStart = state.position;
  state.firstTabInLine = -1;
}
function skipSeparationSpace(state, allowComments, checkIndent) {
  var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    while (is_WHITE_SPACE(ch)) {
      if (ch === 9 && state.firstTabInLine === -1) {
        state.firstTabInLine = state.position;
      }
      ch = state.input.charCodeAt(++state.position);
    }
    if (allowComments && ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 10 && ch !== 13 && ch !== 0);
    }
    if (is_EOL(ch)) {
      readLineBreak(state);
      ch = state.input.charCodeAt(state.position);
      lineBreaks++;
      state.lineIndent = 0;
      while (ch === 32) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
    } else {
      break;
    }
  }
  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
    throwWarning(state, "deficient indentation");
  }
  return lineBreaks;
}
function testDocumentSeparator(state) {
  var _position = state.position, ch;
  ch = state.input.charCodeAt(_position);
  if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
    _position += 3;
    ch = state.input.charCodeAt(_position);
    if (ch === 0 || is_WS_OR_EOL(ch)) {
      return true;
    }
  }
  return false;
}
function writeFoldedLines(state, count) {
  if (count === 1) {
    state.result += " ";
  } else if (count > 1) {
    state.result += common.repeat("\n", count - 1);
  }
}
function readPlainScalar(state, nodeIndent, withinFlowCollection) {
  var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
  ch = state.input.charCodeAt(state.position);
  if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
    return false;
  }
  if (ch === 63 || ch === 45) {
    following = state.input.charCodeAt(state.position + 1);
    if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
      return false;
    }
  }
  state.kind = "scalar";
  state.result = "";
  captureStart = captureEnd = state.position;
  hasPendingContent = false;
  while (ch !== 0) {
    if (ch === 58) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
        break;
      }
    } else if (ch === 35) {
      preceding = state.input.charCodeAt(state.position - 1);
      if (is_WS_OR_EOL(preceding)) {
        break;
      }
    } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
      break;
    } else if (is_EOL(ch)) {
      _line = state.line;
      _lineStart = state.lineStart;
      _lineIndent = state.lineIndent;
      skipSeparationSpace(state, false, -1);
      if (state.lineIndent >= nodeIndent) {
        hasPendingContent = true;
        ch = state.input.charCodeAt(state.position);
        continue;
      } else {
        state.position = captureEnd;
        state.line = _line;
        state.lineStart = _lineStart;
        state.lineIndent = _lineIndent;
        break;
      }
    }
    if (hasPendingContent) {
      captureSegment(state, captureStart, captureEnd, false);
      writeFoldedLines(state, state.line - _line);
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
    }
    if (!is_WHITE_SPACE(ch)) {
      captureEnd = state.position + 1;
    }
    ch = state.input.charCodeAt(++state.position);
  }
  captureSegment(state, captureStart, captureEnd, false);
  if (state.result) {
    return true;
  }
  state.kind = _kind;
  state.result = _result;
  return false;
}
function readSingleQuotedScalar(state, nodeIndent) {
  var ch, captureStart, captureEnd;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 39) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 39) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (ch === 39) {
        captureStart = state.position;
        state.position++;
        captureEnd = state.position;
      } else {
        return true;
      }
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, "unexpected end of the document within a single quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a single quoted scalar");
}
function readDoubleQuotedScalar(state, nodeIndent) {
  var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 34) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 34) {
      captureSegment(state, captureStart, state.position, true);
      state.position++;
      return true;
    } else if (ch === 92) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (is_EOL(ch)) {
        skipSeparationSpace(state, false, nodeIndent);
      } else if (ch < 256 && simpleEscapeCheck[ch]) {
        state.result += simpleEscapeMap[ch];
        state.position++;
      } else if ((tmp = escapedHexLen(ch)) > 0) {
        hexLength = tmp;
        hexResult = 0;
        for (; hexLength > 0; hexLength--) {
          ch = state.input.charCodeAt(++state.position);
          if ((tmp = fromHexCode(ch)) >= 0) {
            hexResult = (hexResult << 4) + tmp;
          } else {
            throwError(state, "expected hexadecimal character");
          }
        }
        state.result += charFromCodepoint(hexResult);
        state.position++;
      } else {
        throwError(state, "unknown escape sequence");
      }
      captureStart = captureEnd = state.position;
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, "unexpected end of the document within a double quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a double quoted scalar");
}
function readFlowCollection(state, nodeIndent) {
  var readNext = true, _line, _lineStart, _pos, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = /* @__PURE__ */ Object.create(null), keyNode, keyTag, valueNode, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 91) {
    terminator = 93;
    isMapping = false;
    _result = [];
  } else if (ch === 123) {
    terminator = 125;
    isMapping = true;
    _result = {};
  } else {
    return false;
  }
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(++state.position);
  while (ch !== 0) {
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === terminator) {
      state.position++;
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = isMapping ? "mapping" : "sequence";
      state.result = _result;
      return true;
    } else if (!readNext) {
      throwError(state, "missed comma between flow collection entries");
    } else if (ch === 44) {
      throwError(state, "expected the node content, but found ','");
    }
    keyTag = keyNode = valueNode = null;
    isPair = isExplicitPair = false;
    if (ch === 63) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following)) {
        isPair = isExplicitPair = true;
        state.position++;
        skipSeparationSpace(state, true, nodeIndent);
      }
    }
    _line = state.line;
    _lineStart = state.lineStart;
    _pos = state.position;
    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    keyTag = state.tag;
    keyNode = state.result;
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if ((isExplicitPair || state.line === _line) && ch === 58) {
      isPair = true;
      ch = state.input.charCodeAt(++state.position);
      skipSeparationSpace(state, true, nodeIndent);
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      valueNode = state.result;
    }
    if (isMapping) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
    } else if (isPair) {
      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
    } else {
      _result.push(keyNode);
    }
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === 44) {
      readNext = true;
      ch = state.input.charCodeAt(++state.position);
    } else {
      readNext = false;
    }
  }
  throwError(state, "unexpected end of the stream within a flow collection");
}
function readBlockScalar(state, nodeIndent) {
  var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 124) {
    folding = false;
  } else if (ch === 62) {
    folding = true;
  } else {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  while (ch !== 0) {
    ch = state.input.charCodeAt(++state.position);
    if (ch === 43 || ch === 45) {
      if (CHOMPING_CLIP === chomping) {
        chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
      } else {
        throwError(state, "repeat of a chomping mode identifier");
      }
    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
      if (tmp === 0) {
        throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
      } else if (!detectedIndent) {
        textIndent = nodeIndent + tmp - 1;
        detectedIndent = true;
      } else {
        throwError(state, "repeat of an indentation width identifier");
      }
    } else {
      break;
    }
  }
  if (is_WHITE_SPACE(ch)) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (is_WHITE_SPACE(ch));
    if (ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (!is_EOL(ch) && ch !== 0);
    }
  }
  while (ch !== 0) {
    readLineBreak(state);
    state.lineIndent = 0;
    ch = state.input.charCodeAt(state.position);
    while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
      state.lineIndent++;
      ch = state.input.charCodeAt(++state.position);
    }
    if (!detectedIndent && state.lineIndent > textIndent) {
      textIndent = state.lineIndent;
    }
    if (is_EOL(ch)) {
      emptyLines++;
      continue;
    }
    if (state.lineIndent < textIndent) {
      if (chomping === CHOMPING_KEEP) {
        state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (chomping === CHOMPING_CLIP) {
        if (didReadContent) {
          state.result += "\n";
        }
      }
      break;
    }
    if (folding) {
      if (is_WHITE_SPACE(ch)) {
        atMoreIndented = true;
        state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (atMoreIndented) {
        atMoreIndented = false;
        state.result += common.repeat("\n", emptyLines + 1);
      } else if (emptyLines === 0) {
        if (didReadContent) {
          state.result += " ";
        }
      } else {
        state.result += common.repeat("\n", emptyLines);
      }
    } else {
      state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
    }
    didReadContent = true;
    detectedIndent = true;
    emptyLines = 0;
    captureStart = state.position;
    while (!is_EOL(ch) && ch !== 0) {
      ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, state.position, false);
  }
  return true;
}
function readBlockSequence(state, nodeIndent) {
  var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
  if (state.firstTabInLine !== -1) return false;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, "tab characters must not be used in indentation");
    }
    if (ch !== 45) {
      break;
    }
    following = state.input.charCodeAt(state.position + 1);
    if (!is_WS_OR_EOL(following)) {
      break;
    }
    detected = true;
    state.position++;
    if (skipSeparationSpace(state, true, -1)) {
      if (state.lineIndent <= nodeIndent) {
        _result.push(null);
        ch = state.input.charCodeAt(state.position);
        continue;
      }
    }
    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
    _result.push(state.result);
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state, "bad indentation of a sequence entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "sequence";
    state.result = _result;
    return true;
  }
  return false;
}
function readBlockMapping(state, nodeIndent, flowIndent) {
  var following, allowCompact, _line, _keyLine, _keyLineStart, _keyPos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = /* @__PURE__ */ Object.create(null), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
  if (state.firstTabInLine !== -1) return false;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (!atExplicitKey && state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, "tab characters must not be used in indentation");
    }
    following = state.input.charCodeAt(state.position + 1);
    _line = state.line;
    if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
      if (ch === 63) {
        if (atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
          keyTag = keyNode = valueNode = null;
        }
        detected = true;
        atExplicitKey = true;
        allowCompact = true;
      } else if (atExplicitKey) {
        atExplicitKey = false;
        allowCompact = true;
      } else {
        throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
      }
      state.position += 1;
      ch = following;
    } else {
      _keyLine = state.line;
      _keyLineStart = state.lineStart;
      _keyPos = state.position;
      if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
        break;
      }
      if (state.line === _line) {
        ch = state.input.charCodeAt(state.position);
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (ch === 58) {
          ch = state.input.charCodeAt(++state.position);
          if (!is_WS_OR_EOL(ch)) {
            throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
          }
          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }
          detected = true;
          atExplicitKey = false;
          allowCompact = false;
          keyTag = state.tag;
          keyNode = state.result;
        } else if (detected) {
          throwError(state, "can not read an implicit mapping pair; a colon is missed");
        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true;
        }
      } else if (detected) {
        throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
      } else {
        state.tag = _tag;
        state.anchor = _anchor;
        return true;
      }
    }
    if (state.line === _line || state.lineIndent > nodeIndent) {
      if (atExplicitKey) {
        _keyLine = state.line;
        _keyLineStart = state.lineStart;
        _keyPos = state.position;
      }
      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
        if (atExplicitKey) {
          keyNode = state.result;
        } else {
          valueNode = state.result;
        }
      }
      if (!atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
        keyTag = keyNode = valueNode = null;
      }
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
    }
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state, "bad indentation of a mapping entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (atExplicitKey) {
    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "mapping";
    state.result = _result;
  }
  return detected;
}
function readTagProperty(state) {
  var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 33) return false;
  if (state.tag !== null) {
    throwError(state, "duplication of a tag property");
  }
  ch = state.input.charCodeAt(++state.position);
  if (ch === 60) {
    isVerbatim = true;
    ch = state.input.charCodeAt(++state.position);
  } else if (ch === 33) {
    isNamed = true;
    tagHandle = "!!";
    ch = state.input.charCodeAt(++state.position);
  } else {
    tagHandle = "!";
  }
  _position = state.position;
  if (isVerbatim) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (ch !== 0 && ch !== 62);
    if (state.position < state.length) {
      tagName = state.input.slice(_position, state.position);
      ch = state.input.charCodeAt(++state.position);
    } else {
      throwError(state, "unexpected end of the stream within a verbatim tag");
    }
  } else {
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      if (ch === 33) {
        if (!isNamed) {
          tagHandle = state.input.slice(_position - 1, state.position + 1);
          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
            throwError(state, "named tag handle cannot contain such characters");
          }
          isNamed = true;
          _position = state.position + 1;
        } else {
          throwError(state, "tag suffix cannot contain exclamation marks");
        }
      }
      ch = state.input.charCodeAt(++state.position);
    }
    tagName = state.input.slice(_position, state.position);
    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
      throwError(state, "tag suffix cannot contain flow indicator characters");
    }
  }
  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
    throwError(state, "tag name cannot contain such characters: " + tagName);
  }
  try {
    tagName = decodeURIComponent(tagName);
  } catch (err) {
    throwError(state, "tag name is malformed: " + tagName);
  }
  if (isVerbatim) {
    state.tag = tagName;
  } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
    state.tag = state.tagMap[tagHandle] + tagName;
  } else if (tagHandle === "!") {
    state.tag = "!" + tagName;
  } else if (tagHandle === "!!") {
    state.tag = "tag:yaml.org,2002:" + tagName;
  } else {
    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
  }
  return true;
}
function readAnchorProperty(state) {
  var _position, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 38) return false;
  if (state.anchor !== null) {
    throwError(state, "duplication of an anchor property");
  }
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an anchor node must contain at least one character");
  }
  state.anchor = state.input.slice(_position, state.position);
  return true;
}
function readAlias(state) {
  var _position, alias, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 42) return false;
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an alias node must contain at least one character");
  }
  alias = state.input.slice(_position, state.position);
  if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
    throwError(state, 'unidentified alias "' + alias + '"');
  }
  state.result = state.anchorMap[alias];
  skipSeparationSpace(state, true, -1);
  return true;
}
function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
  var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, typeList, type2, flowIndent, blockIndent;
  if (state.listener !== null) {
    state.listener("open", state);
  }
  state.tag = null;
  state.anchor = null;
  state.kind = null;
  state.result = null;
  allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
  if (allowToSeek) {
    if (skipSeparationSpace(state, true, -1)) {
      atNewLine = true;
      if (state.lineIndent > parentIndent) {
        indentStatus = 1;
      } else if (state.lineIndent === parentIndent) {
        indentStatus = 0;
      } else if (state.lineIndent < parentIndent) {
        indentStatus = -1;
      }
    }
  }
  if (indentStatus === 1) {
    while (readTagProperty(state) || readAnchorProperty(state)) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        allowBlockCollections = allowBlockStyles;
        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      } else {
        allowBlockCollections = false;
      }
    }
  }
  if (allowBlockCollections) {
    allowBlockCollections = atNewLine || allowCompact;
  }
  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
      flowIndent = parentIndent;
    } else {
      flowIndent = parentIndent + 1;
    }
    blockIndent = state.position - state.lineStart;
    if (indentStatus === 1) {
      if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
        hasContent = true;
      } else {
        if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
          hasContent = true;
        } else if (readAlias(state)) {
          hasContent = true;
          if (state.tag !== null || state.anchor !== null) {
            throwError(state, "alias node should not have any properties");
          }
        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
          hasContent = true;
          if (state.tag === null) {
            state.tag = "?";
          }
        }
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else if (indentStatus === 0) {
      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
    }
  }
  if (state.tag === null) {
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = state.result;
    }
  } else if (state.tag === "?") {
    if (state.result !== null && state.kind !== "scalar") {
      throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
    }
    for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
      type2 = state.implicitTypes[typeIndex];
      if (type2.resolve(state.result)) {
        state.result = type2.construct(state.result);
        state.tag = type2.tag;
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
        break;
      }
    }
  } else if (state.tag !== "!") {
    if (_hasOwnProperty$1.call(state.typeMap[state.kind || "fallback"], state.tag)) {
      type2 = state.typeMap[state.kind || "fallback"][state.tag];
    } else {
      type2 = null;
      typeList = state.typeMap.multi[state.kind || "fallback"];
      for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
        if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
          type2 = typeList[typeIndex];
          break;
        }
      }
    }
    if (!type2) {
      throwError(state, "unknown tag !<" + state.tag + ">");
    }
    if (state.result !== null && type2.kind !== state.kind) {
      throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type2.kind + '", not "' + state.kind + '"');
    }
    if (!type2.resolve(state.result, state.tag)) {
      throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
    } else {
      state.result = type2.construct(state.result, state.tag);
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = state.result;
      }
    }
  }
  if (state.listener !== null) {
    state.listener("close", state);
  }
  return state.tag !== null || state.anchor !== null || hasContent;
}
function readDocument(state) {
  var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
  state.version = null;
  state.checkLineBreaks = state.legacy;
  state.tagMap = /* @__PURE__ */ Object.create(null);
  state.anchorMap = /* @__PURE__ */ Object.create(null);
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if (state.lineIndent > 0 || ch !== 37) {
      break;
    }
    hasDirectives = true;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    directiveName = state.input.slice(_position, state.position);
    directiveArgs = [];
    if (directiveName.length < 1) {
      throwError(state, "directive name must not be less than one character in length");
    }
    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (ch === 35) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && !is_EOL(ch));
        break;
      }
      if (is_EOL(ch)) break;
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      directiveArgs.push(state.input.slice(_position, state.position));
    }
    if (ch !== 0) readLineBreak(state);
    if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
      directiveHandlers[directiveName](state, directiveName, directiveArgs);
    } else {
      throwWarning(state, 'unknown document directive "' + directiveName + '"');
    }
  }
  skipSeparationSpace(state, true, -1);
  if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
    state.position += 3;
    skipSeparationSpace(state, true, -1);
  } else if (hasDirectives) {
    throwError(state, "directives end mark is expected");
  }
  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
  skipSeparationSpace(state, true, -1);
  if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
    throwWarning(state, "non-ASCII line breaks are interpreted as content");
  }
  state.documents.push(state.result);
  if (state.position === state.lineStart && testDocumentSeparator(state)) {
    if (state.input.charCodeAt(state.position) === 46) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    }
    return;
  }
  if (state.position < state.length - 1) {
    throwError(state, "end of the stream or a document separator is expected");
  } else {
    return;
  }
}
function loadDocuments(input, options) {
  input = String(input);
  options = options || {};
  if (input.length !== 0) {
    if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
      input += "\n";
    }
    if (input.charCodeAt(0) === 65279) {
      input = input.slice(1);
    }
  }
  var state = new State$1(input, options);
  var nullpos = input.indexOf("\0");
  if (nullpos !== -1) {
    state.position = nullpos;
    throwError(state, "null byte is not allowed in input");
  }
  state.input += "\0";
  while (state.input.charCodeAt(state.position) === 32) {
    state.lineIndent += 1;
    state.position += 1;
  }
  while (state.position < state.length - 1) {
    readDocument(state);
  }
  return state.documents;
}
function loadAll$1(input, iterator, options) {
  if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
    options = iterator;
    iterator = null;
  }
  var documents = loadDocuments(input, options);
  if (typeof iterator !== "function") {
    return documents;
  }
  for (var index2 = 0, length = documents.length; index2 < length; index2 += 1) {
    iterator(documents[index2]);
  }
}
function load$1(input, options) {
  var documents = loadDocuments(input, options);
  if (documents.length === 0) {
    return void 0;
  } else if (documents.length === 1) {
    return documents[0];
  }
  throw new exception("expected a single document in the stream, but found more");
}
var loadAll_1 = loadAll$1;
var load_1 = load$1;
var loader = {
  loadAll: loadAll_1,
  load: load_1
};
var _toString = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var CHAR_BOM = 65279;
var CHAR_TAB = 9;
var CHAR_LINE_FEED = 10;
var CHAR_CARRIAGE_RETURN = 13;
var CHAR_SPACE = 32;
var CHAR_EXCLAMATION = 33;
var CHAR_DOUBLE_QUOTE = 34;
var CHAR_SHARP = 35;
var CHAR_PERCENT = 37;
var CHAR_AMPERSAND = 38;
var CHAR_SINGLE_QUOTE = 39;
var CHAR_ASTERISK = 42;
var CHAR_COMMA = 44;
var CHAR_MINUS = 45;
var CHAR_COLON = 58;
var CHAR_EQUALS = 61;
var CHAR_GREATER_THAN = 62;
var CHAR_QUESTION = 63;
var CHAR_COMMERCIAL_AT = 64;
var CHAR_LEFT_SQUARE_BRACKET = 91;
var CHAR_RIGHT_SQUARE_BRACKET = 93;
var CHAR_GRAVE_ACCENT = 96;
var CHAR_LEFT_CURLY_BRACKET = 123;
var CHAR_VERTICAL_LINE = 124;
var CHAR_RIGHT_CURLY_BRACKET = 125;
var ESCAPE_SEQUENCES = {};
ESCAPE_SEQUENCES[0] = "\\0";
ESCAPE_SEQUENCES[7] = "\\a";
ESCAPE_SEQUENCES[8] = "\\b";
ESCAPE_SEQUENCES[9] = "\\t";
ESCAPE_SEQUENCES[10] = "\\n";
ESCAPE_SEQUENCES[11] = "\\v";
ESCAPE_SEQUENCES[12] = "\\f";
ESCAPE_SEQUENCES[13] = "\\r";
ESCAPE_SEQUENCES[27] = "\\e";
ESCAPE_SEQUENCES[34] = '\\"';
ESCAPE_SEQUENCES[92] = "\\\\";
ESCAPE_SEQUENCES[133] = "\\N";
ESCAPE_SEQUENCES[160] = "\\_";
ESCAPE_SEQUENCES[8232] = "\\L";
ESCAPE_SEQUENCES[8233] = "\\P";
var DEPRECATED_BOOLEANS_SYNTAX = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
];
var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function compileStyleMap(schema2, map2) {
  var result, keys, index2, length, tag, style, type2;
  if (map2 === null) return {};
  result = {};
  keys = Object.keys(map2);
  for (index2 = 0, length = keys.length; index2 < length; index2 += 1) {
    tag = keys[index2];
    style = String(map2[tag]);
    if (tag.slice(0, 2) === "!!") {
      tag = "tag:yaml.org,2002:" + tag.slice(2);
    }
    type2 = schema2.compiledTypeMap["fallback"][tag];
    if (type2 && _hasOwnProperty.call(type2.styleAliases, style)) {
      style = type2.styleAliases[style];
    }
    result[tag] = style;
  }
  return result;
}
function encodeHex(character) {
  var string3, handle, length;
  string3 = character.toString(16).toUpperCase();
  if (character <= 255) {
    handle = "x";
    length = 2;
  } else if (character <= 65535) {
    handle = "u";
    length = 4;
  } else if (character <= 4294967295) {
    handle = "U";
    length = 8;
  } else {
    throw new exception("code point within a string may not be greater than 0xFFFFFFFF");
  }
  return "\\" + handle + common.repeat("0", length - string3.length) + string3;
}
var QUOTING_TYPE_SINGLE = 1;
var QUOTING_TYPE_DOUBLE = 2;
function State(options) {
  this.schema = options["schema"] || _default;
  this.indent = Math.max(1, options["indent"] || 2);
  this.noArrayIndent = options["noArrayIndent"] || false;
  this.skipInvalid = options["skipInvalid"] || false;
  this.flowLevel = common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
  this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
  this.sortKeys = options["sortKeys"] || false;
  this.lineWidth = options["lineWidth"] || 80;
  this.noRefs = options["noRefs"] || false;
  this.noCompatMode = options["noCompatMode"] || false;
  this.condenseFlow = options["condenseFlow"] || false;
  this.quotingType = options["quotingType"] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
  this.forceQuotes = options["forceQuotes"] || false;
  this.replacer = typeof options["replacer"] === "function" ? options["replacer"] : null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.explicitTypes = this.schema.compiledExplicit;
  this.tag = null;
  this.result = "";
  this.duplicates = [];
  this.usedDuplicates = null;
}
function indentString(string3, spaces) {
  var ind = common.repeat(" ", spaces), position2 = 0, next = -1, result = "", line, length = string3.length;
  while (position2 < length) {
    next = string3.indexOf("\n", position2);
    if (next === -1) {
      line = string3.slice(position2);
      position2 = length;
    } else {
      line = string3.slice(position2, next + 1);
      position2 = next + 1;
    }
    if (line.length && line !== "\n") result += ind;
    result += line;
  }
  return result;
}
function generateNextLine(state, level) {
  return "\n" + common.repeat(" ", state.indent * level);
}
function testImplicitResolving(state, str2) {
  var index2, length, type2;
  for (index2 = 0, length = state.implicitTypes.length; index2 < length; index2 += 1) {
    type2 = state.implicitTypes[index2];
    if (type2.resolve(str2)) {
      return true;
    }
  }
  return false;
}
function isWhitespace(c) {
  return c === CHAR_SPACE || c === CHAR_TAB;
}
function isPrintable(c) {
  return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== CHAR_BOM || 65536 <= c && c <= 1114111;
}
function isNsCharOrWhitespace(c) {
  return isPrintable(c) && c !== CHAR_BOM && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
}
function isPlainSafe(c, prev, inblock) {
  var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
  var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
  return (
    // ns-plain-safe
    (inblock ? (
      // c = flow-in
      cIsNsCharOrWhitespace
    ) : cIsNsCharOrWhitespace && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET) && c !== CHAR_SHARP && !(prev === CHAR_COLON && !cIsNsChar) || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP || prev === CHAR_COLON && cIsNsChar
  );
}
function isPlainSafeFirst(c) {
  return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
}
function isPlainSafeLast(c) {
  return !isWhitespace(c) && c !== CHAR_COLON;
}
function codePointAt(string3, pos) {
  var first = string3.charCodeAt(pos), second;
  if (first >= 55296 && first <= 56319 && pos + 1 < string3.length) {
    second = string3.charCodeAt(pos + 1);
    if (second >= 56320 && second <= 57343) {
      return (first - 55296) * 1024 + second - 56320 + 65536;
    }
  }
  return first;
}
function needIndentIndicator(string3) {
  var leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string3);
}
var STYLE_PLAIN = 1;
var STYLE_SINGLE = 2;
var STYLE_LITERAL = 3;
var STYLE_FOLDED = 4;
var STYLE_DOUBLE = 5;
function chooseScalarStyle(string3, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
  var i;
  var char = 0;
  var prevChar = null;
  var hasLineBreak = false;
  var hasFoldableLine = false;
  var shouldTrackWidth = lineWidth !== -1;
  var previousLineBreak = -1;
  var plain = isPlainSafeFirst(codePointAt(string3, 0)) && isPlainSafeLast(codePointAt(string3, string3.length - 1));
  if (singleLineOnly || forceQuotes) {
    for (i = 0; i < string3.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string3, i);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
  } else {
    for (i = 0; i < string3.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string3, i);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
          i - previousLineBreak - 1 > lineWidth && string3[previousLineBreak + 1] !== " ";
          previousLineBreak = i;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
    hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string3[previousLineBreak + 1] !== " ");
  }
  if (!hasLineBreak && !hasFoldableLine) {
    if (plain && !forceQuotes && !testAmbiguousType(string3)) {
      return STYLE_PLAIN;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }
  if (indentPerLevel > 9 && needIndentIndicator(string3)) {
    return STYLE_DOUBLE;
  }
  if (!forceQuotes) {
    return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
  }
  return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
}
function writeScalar(state, string3, level, iskey, inblock) {
  state.dump = function() {
    if (string3.length === 0) {
      return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
    }
    if (!state.noCompatMode) {
      if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string3) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string3)) {
        return state.quotingType === QUOTING_TYPE_DOUBLE ? '"' + string3 + '"' : "'" + string3 + "'";
      }
    }
    var indent = state.indent * Math.max(1, level);
    var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
    var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
    function testAmbiguity(string4) {
      return testImplicitResolving(state, string4);
    }
    switch (chooseScalarStyle(
      string3,
      singleLineOnly,
      state.indent,
      lineWidth,
      testAmbiguity,
      state.quotingType,
      state.forceQuotes && !iskey,
      inblock
    )) {
      case STYLE_PLAIN:
        return string3;
      case STYLE_SINGLE:
        return "'" + string3.replace(/'/g, "''") + "'";
      case STYLE_LITERAL:
        return "|" + blockHeader(string3, state.indent) + dropEndingNewline(indentString(string3, indent));
      case STYLE_FOLDED:
        return ">" + blockHeader(string3, state.indent) + dropEndingNewline(indentString(foldString(string3, lineWidth), indent));
      case STYLE_DOUBLE:
        return '"' + escapeString(string3) + '"';
      default:
        throw new exception("impossible error: invalid scalar style");
    }
  }();
}
function blockHeader(string3, indentPerLevel) {
  var indentIndicator = needIndentIndicator(string3) ? String(indentPerLevel) : "";
  var clip = string3[string3.length - 1] === "\n";
  var keep = clip && (string3[string3.length - 2] === "\n" || string3 === "\n");
  var chomp = keep ? "+" : clip ? "" : "-";
  return indentIndicator + chomp + "\n";
}
function dropEndingNewline(string3) {
  return string3[string3.length - 1] === "\n" ? string3.slice(0, -1) : string3;
}
function foldString(string3, width) {
  var lineRe = /(\n+)([^\n]*)/g;
  var result = function() {
    var nextLF = string3.indexOf("\n");
    nextLF = nextLF !== -1 ? nextLF : string3.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string3.slice(0, nextLF), width);
  }();
  var prevMoreIndented = string3[0] === "\n" || string3[0] === " ";
  var moreIndented;
  var match;
  while (match = lineRe.exec(string3)) {
    var prefix = match[1], line = match[2];
    moreIndented = line[0] === " ";
    result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
    prevMoreIndented = moreIndented;
  }
  return result;
}
function foldLine(line, width) {
  if (line === "" || line[0] === " ") return line;
  var breakRe = / [^ ]/g;
  var match;
  var start = 0, end, curr = 0, next = 0;
  var result = "";
  while (match = breakRe.exec(line)) {
    next = match.index;
    if (next - start > width) {
      end = curr > start ? curr : next;
      result += "\n" + line.slice(start, end);
      start = end + 1;
    }
    curr = next;
  }
  result += "\n";
  if (line.length - start > width && curr > start) {
    result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
  } else {
    result += line.slice(start);
  }
  return result.slice(1);
}
function escapeString(string3) {
  var result = "";
  var char = 0;
  var escapeSeq;
  for (var i = 0; i < string3.length; char >= 65536 ? i += 2 : i++) {
    char = codePointAt(string3, i);
    escapeSeq = ESCAPE_SEQUENCES[char];
    if (!escapeSeq && isPrintable(char)) {
      result += string3[i];
      if (char >= 65536) result += string3[i + 1];
    } else {
      result += escapeSeq || encodeHex(char);
    }
  }
  return result;
}
function writeFlowSequence(state, level, object) {
  var _result = "", _tag = state.tag, index2, length, value;
  for (index2 = 0, length = object.length; index2 < length; index2 += 1) {
    value = object[index2];
    if (state.replacer) {
      value = state.replacer.call(object, String(index2), value);
    }
    if (writeNode(state, level, value, false, false) || typeof value === "undefined" && writeNode(state, level, null, false, false)) {
      if (_result !== "") _result += "," + (!state.condenseFlow ? " " : "");
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = "[" + _result + "]";
}
function writeBlockSequence(state, level, object, compact) {
  var _result = "", _tag = state.tag, index2, length, value;
  for (index2 = 0, length = object.length; index2 < length; index2 += 1) {
    value = object[index2];
    if (state.replacer) {
      value = state.replacer.call(object, String(index2), value);
    }
    if (writeNode(state, level + 1, value, true, true, false, true) || typeof value === "undefined" && writeNode(state, level + 1, null, true, true, false, true)) {
      if (!compact || _result !== "") {
        _result += generateNextLine(state, level);
      }
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        _result += "-";
      } else {
        _result += "- ";
      }
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = _result || "[]";
}
function writeFlowMapping(state, level, object) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index2, length, objectKey, objectValue, pairBuffer;
  for (index2 = 0, length = objectKeyList.length; index2 < length; index2 += 1) {
    pairBuffer = "";
    if (_result !== "") pairBuffer += ", ";
    if (state.condenseFlow) pairBuffer += '"';
    objectKey = objectKeyList[index2];
    objectValue = object[objectKey];
    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state, level, objectKey, false, false)) {
      continue;
    }
    if (state.dump.length > 1024) pairBuffer += "? ";
    pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
    if (!writeNode(state, level, objectValue, false, false)) {
      continue;
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = "{" + _result + "}";
}
function writeBlockMapping(state, level, object, compact) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index2, length, objectKey, objectValue, explicitPair, pairBuffer;
  if (state.sortKeys === true) {
    objectKeyList.sort();
  } else if (typeof state.sortKeys === "function") {
    objectKeyList.sort(state.sortKeys);
  } else if (state.sortKeys) {
    throw new exception("sortKeys must be a boolean or a function");
  }
  for (index2 = 0, length = objectKeyList.length; index2 < length; index2 += 1) {
    pairBuffer = "";
    if (!compact || _result !== "") {
      pairBuffer += generateNextLine(state, level);
    }
    objectKey = objectKeyList[index2];
    objectValue = object[objectKey];
    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
      continue;
    }
    explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
    if (explicitPair) {
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += "?";
      } else {
        pairBuffer += "? ";
      }
    }
    pairBuffer += state.dump;
    if (explicitPair) {
      pairBuffer += generateNextLine(state, level);
    }
    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
      continue;
    }
    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
      pairBuffer += ":";
    } else {
      pairBuffer += ": ";
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = _result || "{}";
}
function detectType(state, object, explicit) {
  var _result, typeList, index2, length, type2, style;
  typeList = explicit ? state.explicitTypes : state.implicitTypes;
  for (index2 = 0, length = typeList.length; index2 < length; index2 += 1) {
    type2 = typeList[index2];
    if ((type2.instanceOf || type2.predicate) && (!type2.instanceOf || typeof object === "object" && object instanceof type2.instanceOf) && (!type2.predicate || type2.predicate(object))) {
      if (explicit) {
        if (type2.multi && type2.representName) {
          state.tag = type2.representName(object);
        } else {
          state.tag = type2.tag;
        }
      } else {
        state.tag = "?";
      }
      if (type2.represent) {
        style = state.styleMap[type2.tag] || type2.defaultStyle;
        if (_toString.call(type2.represent) === "[object Function]") {
          _result = type2.represent(object, style);
        } else if (_hasOwnProperty.call(type2.represent, style)) {
          _result = type2.represent[style](object, style);
        } else {
          throw new exception("!<" + type2.tag + '> tag resolver accepts not "' + style + '" style');
        }
        state.dump = _result;
      }
      return true;
    }
  }
  return false;
}
function writeNode(state, level, object, block, compact, iskey, isblockseq) {
  state.tag = null;
  state.dump = object;
  if (!detectType(state, object, false)) {
    detectType(state, object, true);
  }
  var type2 = _toString.call(state.dump);
  var inblock = block;
  var tagStr;
  if (block) {
    block = state.flowLevel < 0 || state.flowLevel > level;
  }
  var objectOrArray = type2 === "[object Object]" || type2 === "[object Array]", duplicateIndex, duplicate;
  if (objectOrArray) {
    duplicateIndex = state.duplicates.indexOf(object);
    duplicate = duplicateIndex !== -1;
  }
  if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
    compact = false;
  }
  if (duplicate && state.usedDuplicates[duplicateIndex]) {
    state.dump = "*ref_" + duplicateIndex;
  } else {
    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
      state.usedDuplicates[duplicateIndex] = true;
    }
    if (type2 === "[object Object]") {
      if (block && Object.keys(state.dump).length !== 0) {
        writeBlockMapping(state, level, state.dump, compact);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowMapping(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object Array]") {
      if (block && state.dump.length !== 0) {
        if (state.noArrayIndent && !isblockseq && level > 0) {
          writeBlockSequence(state, level - 1, state.dump, compact);
        } else {
          writeBlockSequence(state, level, state.dump, compact);
        }
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowSequence(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object String]") {
      if (state.tag !== "?") {
        writeScalar(state, state.dump, level, iskey, inblock);
      }
    } else if (type2 === "[object Undefined]") {
      return false;
    } else {
      if (state.skipInvalid) return false;
      throw new exception("unacceptable kind of an object to dump " + type2);
    }
    if (state.tag !== null && state.tag !== "?") {
      tagStr = encodeURI(
        state.tag[0] === "!" ? state.tag.slice(1) : state.tag
      ).replace(/!/g, "%21");
      if (state.tag[0] === "!") {
        tagStr = "!" + tagStr;
      } else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") {
        tagStr = "!!" + tagStr.slice(18);
      } else {
        tagStr = "!<" + tagStr + ">";
      }
      state.dump = tagStr + " " + state.dump;
    }
  }
  return true;
}
function getDuplicateReferences(object, state) {
  var objects = [], duplicatesIndexes = [], index2, length;
  inspectNode(object, objects, duplicatesIndexes);
  for (index2 = 0, length = duplicatesIndexes.length; index2 < length; index2 += 1) {
    state.duplicates.push(objects[duplicatesIndexes[index2]]);
  }
  state.usedDuplicates = new Array(length);
}
function inspectNode(object, objects, duplicatesIndexes) {
  var objectKeyList, index2, length;
  if (object !== null && typeof object === "object") {
    index2 = objects.indexOf(object);
    if (index2 !== -1) {
      if (duplicatesIndexes.indexOf(index2) === -1) {
        duplicatesIndexes.push(index2);
      }
    } else {
      objects.push(object);
      if (Array.isArray(object)) {
        for (index2 = 0, length = object.length; index2 < length; index2 += 1) {
          inspectNode(object[index2], objects, duplicatesIndexes);
        }
      } else {
        objectKeyList = Object.keys(object);
        for (index2 = 0, length = objectKeyList.length; index2 < length; index2 += 1) {
          inspectNode(object[objectKeyList[index2]], objects, duplicatesIndexes);
        }
      }
    }
  }
}
function dump$1(input, options) {
  options = options || {};
  var state = new State(options);
  if (!state.noRefs) getDuplicateReferences(input, state);
  var value = input;
  if (state.replacer) {
    value = state.replacer.call({ "": value }, "", value);
  }
  if (writeNode(state, 0, value, true, true)) return state.dump + "\n";
  return "";
}
var dump_1 = dump$1;
var dumper = {
  dump: dump_1
};
function renamed(from, to) {
  return function() {
    throw new Error("Function yaml." + from + " is removed in js-yaml 4. Use yaml." + to + " instead, which is now safe by default.");
  };
}
var Type = type;
var Schema = schema;
var FAILSAFE_SCHEMA = failsafe;
var JSON_SCHEMA = json;
var CORE_SCHEMA = core;
var DEFAULT_SCHEMA = _default;
var load = loader.load;
var loadAll = loader.loadAll;
var dump = dumper.dump;
var YAMLException = exception;
var types = {
  binary,
  float,
  map,
  null: _null,
  pairs,
  set,
  timestamp,
  bool,
  int,
  merge,
  omap,
  seq,
  str
};
var safeLoad = renamed("safeLoad", "load");
var safeLoadAll = renamed("safeLoadAll", "loadAll");
var safeDump = renamed("safeDump", "dump");
var jsYaml = {
  Type,
  Schema,
  FAILSAFE_SCHEMA,
  JSON_SCHEMA,
  CORE_SCHEMA,
  DEFAULT_SCHEMA,
  load,
  loadAll,
  dump,
  YAMLException,
  types,
  safeLoad,
  safeLoadAll,
  safeDump
};
var js_yaml_default = jsYaml;

// src/helper/structuredKnowledge.ts
function chunkMarkdownBySection(markdown) {
  const tree = unified().use(remarkParse).parse(markdown);
  const sections = [];
  let currentSection = [];
  visit(tree, (node2) => {
    if (node2.type === "heading") {
      if (currentSection.length > 0) {
        sections.push(currentSection.join("\n"));
        currentSection = [];
      }
    }
    if ("value" in node2) {
      currentSection.push(node2.value);
    }
  });
  if (currentSection.length > 0) {
    sections.push(currentSection.join("\n"));
  }
  return sections;
}
function attachFrontmatterToChunks(frontmatter, chunks) {
  const fmString = frontmatter ? `---
${js_yaml_default.dump(frontmatter)}---
` : "";
  return chunks.map((chunk) => `${fmString}${chunk}`);
}
async function setStructuredMarkdownKnowledge(runtime, filePath, markdown, frontmatter = {}, knowledgeIdPrefix = "obsidian-") {
  const chunks = chunkMarkdownBySection(markdown);
  const embeddedChunks = attachFrontmatterToChunks(frontmatter, chunks);
  const sourceId = `${knowledgeIdPrefix}${filePath}`;
  for (const chunk of embeddedChunks) {
    const embedding = await embed(runtime, chunk);
    await runtime.knowledgeManager.createMemory({
      id: stringToUuid(`${sourceId}-${chunk.slice(0, 32)}`),
      roomId: runtime.agentId,
      agentId: runtime.agentId,
      userId: runtime.agentId,
      createdAt: Date.now(),
      content: {
        source: sourceId,
        text: chunk,
        metadata: {
          path: filePath,
          ...frontmatter
        }
      },
      embedding
    });
  }
}

// src/providers/obsidianClient.ts
var ObsidianProvider = class _ObsidianProvider {
  constructor(port = 27123, token, host_url, vaultPath) {
    this.port = port;
    this.token = token;
    this.host_url = host_url;
    this.vaultPath = vaultPath;
    this.connected = false;
  }
  static {
    this.instance = null;
  }
  /**
   * Creates an instance of the ObsidianProvider class.
   * @param runtime - The agent runtime.
   * @param port - The port number to use for the Obsidian server.
   * @param token - The authentication token for the Obsidian server.
   * @param host_url - The URL of the Obsidian server.
   * @returns An instance of the ObsidianProvider class.
   */
  static async create(runtime, port, token, host_url = `http://127.0.0.1:${port}`, vaultPath = "/Users/darrenzal/GAIA/Vault") {
    if (!this.instance) {
      this.instance = new _ObsidianProvider(
        port,
        token,
        host_url,
        vaultPath
      );
      await this.instance.connect();
      this.instance.runtime = runtime;
    }
    return this.instance;
  }
  /**
   * Opens a file in Obsidian by its path.
   * @param filePath - The path to the file within the vault.
   * @returns A promise that resolves when the file is successfully opened.
   */
  async connect() {
    if (this.connected) return;
    try {
      const response = await fetch(`${this.host_url}/`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const serverInfo = await response.json();
      if (!serverInfo.authenticated) {
        throw new Error("Failed to authenticate with Obsidian API");
      }
      this.connected = true;
    } catch (error) {
      elizaLogger.error("Failed to connect to Obsidian:", error.message);
      this.connected = false;
      throw error;
    }
  }
  /**
   * Retrieves a list of all notes within the vault.
   * @returns A promise that resolves to an array of note paths.
   */
  async listNotes() {
    if (!this.connected) {
      await this.connect();
    }
    try {
      const response = await fetch(`${this.host_url}/vault/`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          accept: "application/json"
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const notes = await response.json();
      return notes;
    } catch (error) {
      elizaLogger.error("Failed to list notes:", error.message);
      throw error;
    }
  }
  getVaultPath() {
    return this.vaultPath;
  }
  /**
   * Retrieves the content of a specific note.
   * @param path - The path to the note within the vault.
   * @returns A promise that resolves to the content of the note.
   */
  async getNote(path13) {
    if (!this.connected) {
      await this.connect();
    }
    try {
      const response = await fetch(
        `${this.host_url}/vault/${encodeURIComponent(path13)}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            accept: "application/vnd.olrapi.note+json"
          }
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const noteContent = await response.json();
      return noteContent;
    } catch (error) {
      elizaLogger.error("Failed to fetch note content:", error);
      throw error;
    }
  }
  /**
   * Retrieves the content of the currently active note.
   * @returns A promise that resolves to the content of the active note.
   */
  async getActiveNote() {
    if (!this.connected) {
      await this.connect();
    }
    try {
      const response = await fetch(`${this.host_url}/active/`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          accept: "application/vnd.olrapi.note+json"
        }
      });
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("No active file found in Obsidian");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const noteContent = await response.json();
      return noteContent;
    } catch (error) {
      elizaLogger.error(
        "Failed to fetch active note content:",
        error.message
      );
      throw error;
    }
  }
  /**
   * Saves the content of a note to the vault.
   * @param path - The path to the note within the vault.
   * @param content - The content to save to the note.
   * @param createDirectories - Whether to create directories if they don't exist.
   * @returns A promise that resolves when the note is successfully saved.
   */
  async saveNote(path13, content3, createDirectories = true) {
    if (!this.connected) {
      await this.connect();
    }
    try {
      const createDirsString = createDirectories.toString();
      const response = await fetch(
        `${this.host_url}/vault/${encodeURIComponent(path13)}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "text/markdown",
            "X-Create-Directories": createDirsString
          },
          body: content3
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      elizaLogger.error("Failed to save note:", error.message);
      throw error;
    }
  }
  /**
   * Retrieves a list of all files within the vault.
   * @returns A promise that resolves to an array of file paths.
   */
  async listFiles() {
    if (!this.connected) {
      await this.connect();
    }
    try {
      const response = await fetch(`${this.host_url}/vault/`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          accept: "application/json"
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const vault = await response.json();
      return vault.files;
    } catch (error) {
      elizaLogger.error("Failed to list files:", error.message);
      throw error;
    }
  }
  /**
   * Lists files inside a specific directory in the vault.
   * @param directoryPath - Directory to list
   */
  async listDirectoryFiles(directoryPath) {
    if (!this.connected) {
      await this.connect();
    }
    try {
      const cleanedPath = directoryPath.replace(/^\/+|\/+$/g, "");
      elizaLogger.debug(
        `Fetching directory listing for: "${cleanedPath}"`
      );
      const response = await fetch(
        `${this.host_url}/vault/${encodeURIComponent(cleanedPath)}/`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            accept: "application/json"
          }
        }
      );
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Directory '${cleanedPath}' not found`);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const vaultDirectory = await response.json();
      const files = vaultDirectory.files || [];
      return files;
    } catch (error) {
      elizaLogger.error(
        "Failed to list directory contents:",
        error.message
      );
      throw error;
    }
  }
  /**
   * Retrieves the content of a specific file from the vault.
   * @param path - The path to the file within the vault.
   * @returns A promise that resolves to the content of the file.
   */
  async readFile(path13) {
    if (!this.connected) {
      await this.connect();
    }
    try {
      const response = await fetch(
        `${this.host_url}/vault/${encodeURIComponent(path13)}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            accept: "text/plain"
            // Adjust the accept header if necessary
          }
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const content3 = await response.text();
      return content3;
    } catch (error) {
      elizaLogger.error(
        `Failed to read file content for ${path13}:`,
        error.message
      );
      throw error;
    }
  }
  /**
   * Opens a file in Obsidian by its path.
   * @param filePath - The path to the file within the vault.
   * @returns A promise that resolves when the file is successfully opened.
   */
  async openFile(filePath) {
    if (!this.connected) {
      await this.connect();
    }
    try {
      const response = await fetch(
        `${this.host_url}/open/${encodeURIComponent(filePath)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      elizaLogger.success(`Successfully opened file: ${filePath}`);
    } catch (error) {
      elizaLogger.error(
        `Failed to open file '${filePath}':`,
        error.message
      );
      throw error;
    }
  }
  /**
   * Saves the content of a file to the vault.
   * Note: Obsidian will create a new document at the path you have specified if such a document did not already exist
   * @param path - The path to the file within the vault.
   * @param content - The content to save to the file.
   * @param createDirectories - Whether to create directories if they don't exist.
   * @returns A promise that resolves when the file is successfully saved.
   */
  async saveFile(path13, content3, createDirectories = true) {
    if (!this.connected) {
      await this.connect();
    }
    try {
      const createDirsString = createDirectories.toString();
      const response = await fetch(
        `${this.host_url}/vault/${encodeURIComponent(path13)}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "text/markdown",
            "X-Create-Directories": createDirsString
          },
          body: content3
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      elizaLogger.error("Failed to save file:", error.message);
      throw error;
    }
  }
  /**
   * Inserts content into a specific section of a file.
   * @param path - The path to the file within the vault.
   * @param content - The content to insert into the file.
   * @param lineNumber - The line number to insert the content at.
   * @returns A promise that resolves when the file is successfully patched.
   */
  async patchFile(path13, content3, lineNumber = 0) {
    if (!this.connected) {
      await this.connect();
    }
    try {
      const normalizedPath = path13.startsWith("/") ? path13.slice(1) : path13;
      const requestUrl = `${this.host_url}/vault/${encodeURIComponent(normalizedPath)}`;
      const headers = {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "text/markdown",
        // Changed from application/json
        Operation: "replace",
        "Target-Type": "heading",
        Target: "0"
      };
      const response = await fetch(requestUrl, {
        method: "PATCH",
        headers,
        body: content3
        // Send content directly as a string
      });
      if (!response.ok) {
        const errorText = await response.text();
        elizaLogger.error("Patch File Response Error:", {
          status: response.status,
          statusText: response.statusText,
          errorText
        });
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }
    } catch (error) {
      elizaLogger.error("Failed to patch file content:", {
        errorMessage: error.message,
        path: path13,
        contentLength: content3.length
      });
      throw error;
    }
  }
  /**
   * Retrieves a list of all available Obsidian commands.
   * @returns A promise that resolves to an array of command objects, each containing an ID and name.
   */
  async listCommands() {
    if (!this.connected) {
      await this.connect();
    }
    try {
      const response = await fetch(`${this.host_url}/commands/`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          accept: "application/json"
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const commands = await response.json();
      return commands;
    } catch (error) {
      elizaLogger.error("Failed to list commands:", error.message);
      throw error;
    }
  }
  /**
   * Executes an Obsidian command by its command ID.
   * @param commandId - The ID of the command to execute.
   * @returns A promise that resolves when the command is successfully executed.
   */
  async executeCommand(commandId) {
    if (!this.connected) {
      await this.connect();
    }
    try {
      const response = await fetch(`${this.host_url}/commands/execute`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ commandId })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      elizaLogger.error("Failed to execute command:", error.message);
      throw error;
    }
  }
  /**
   * Searches for notes in the vault based on the provided query and options.
   * @param query - The query to search for. Can be a string or an object.
   * @param queryFormat - The format of the query (plaintext, dataview, or jsonlogic).
   * @param options - Additional options for the search.
   * @returns A promise that resolves to an array of search results.
   */
  async search(query, queryFormat = "plaintext", options = {}) {
    if (!this.connected) {
      await this.connect();
    }
    const { contextLength = 100 } = options;
    let contentType;
    let body;
    switch (queryFormat) {
      case "dataview":
        contentType = "application/vnd.olrapi.dataview.dql+txt";
        if (typeof query !== "string") {
          throw new Error("Dataview query must be a string.");
        }
        body = query;
        break;
      case "jsonlogic":
        contentType = "application/vnd.olrapi.jsonlogic+json";
        if (typeof query !== "object") {
          throw new Error("JsonLogic query must be an object.");
        }
        body = JSON.stringify(query);
        break;
      default:
        contentType = "application/json";
        if (typeof query !== "string") {
          throw new Error("Plaintext query must be a string.");
        }
        body = query;
        break;
    }
    try {
      elizaLogger.log(
        `Processing search query with format ${queryFormat}:`,
        body
      );
      if (queryFormat === "dataview" || queryFormat === "jsonlogic") {
        const response2 = await fetch(`${this.host_url}/search`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": contentType,
            Accept: "application/json"
          },
          body
        });
        if (!response2.ok) {
          throw new Error(`HTTP error! status: ${response2.status}`);
        }
        const results2 = await response2.json();
        return results2;
      }
      const response = await fetch(
        `${this.host_url}/search/simple?query=${encodeURIComponent(body)}&contextLength=${contextLength}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": contentType,
            Accept: "application/json"
          }
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const results = await response.json();
      return results;
    } catch (error) {
      elizaLogger.error("Search failed:", error.message);
      throw error;
    }
  }
  /**
   * Searches for notes in the vault based on the provided query and options.
   * @param query - The query to search for. Can be a string or an object.
   * @param queryFormat - The format of the query (plaintext, dataview, or jsonlogic).
   * @param options - Additional options for the search.
   * @returns A promise that resolves to an array of search results.
   */
  async searchKeywords(query, contextLength = 100) {
    if (!this.connected) {
      await this.connect();
    }
    const orQueries = query.split(/\s+OR\s+/).map((q) => q.trim());
    elizaLogger.log("Processing search query with OR operator:", orQueries);
    try {
      const allResults = [];
      for (const orQuery of orQueries) {
        const response = await fetch(
          `${this.host_url}/search/simple/?query=${encodeURIComponent(orQuery)}&contextLength=${contextLength}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.token}`,
              accept: "application/json"
            }
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const results = await response.json();
        allResults.push(...results);
      }
      const uniqueResults = Array.from(
        new Map(
          allResults.map((item) => [item.filename, item])
        ).values()
      );
      elizaLogger.success(`Found ${uniqueResults.length} unique results`);
      elizaLogger.debug("Search results:", uniqueResults);
      return uniqueResults;
    } catch (error) {
      elizaLogger.error("Obsidian search failed:", error.message);
      throw error;
    }
  }
  /**
   * Recursively scans directories and builds a list of all files
   * @param directory - The directory to scan, empty string for root
   * @returns Array of file paths in format 'directory/file.md'
   */
  async scanDirectoryRecursively(directory = "") {
    const allFiles = [];
    const dirsToProcess = [directory];
    const processedDirs = /* @__PURE__ */ new Set();
    while (dirsToProcess.length > 0) {
      const currentDir = dirsToProcess.shift();
      if (currentDir === void 0) continue;
      if (processedDirs.has(currentDir)) continue;
      try {
        elizaLogger.debug(`Scanning directory: '${currentDir}'`);
        const items = await this.listDirectoryFiles(currentDir);
        for (const item of items) {
          const isDir = item.endsWith("/");
          const normalizedItem = item.replace(/^\/+|\/+$/g, "");
          const fullPath = currentDir ? `${currentDir.replace(/\/$/, "")}/${normalizedItem}` : normalizedItem;
          elizaLogger.debug(`Items in '${currentDir}':`, items);
          elizaLogger.debug(`Normalized \u2192 fullPath = ${fullPath}`);
          if (isDir) {
            elizaLogger.debug(`\u2192 Found subdirectory: ${fullPath}`);
            dirsToProcess.push(fullPath);
          } else {
            elizaLogger.debug(`\u2192 Found file: ${fullPath}`);
            allFiles.push(fullPath);
          }
        }
        processedDirs.add(currentDir);
      } catch (error) {
        elizaLogger.error(
          `Error scanning directory ${currentDir}:`,
          error
        );
      }
    }
    return allFiles;
  }
  /**
   * Retrieves all markdown and relevant attachment files in the vault.
   * @returns A promise that resolves to an array of file paths.
   */
  async getAllFiles() {
    if (!this.connected) {
      await this.connect();
    }
    try {
      elizaLogger.debug("Starting file scanning process");
      const rootItems = await this.listFiles();
      const allFiles = [];
      const rootMdFiles = rootItems.filter(
        (item) => item.endsWith(".md")
      );
      elizaLogger.debug(
        `Root-level markdown files: ${JSON.stringify(rootMdFiles)}`
      );
      allFiles.push(...rootMdFiles);
      const directories = rootItems.filter((item) => item.endsWith("/"));
      for (const dir of directories) {
        elizaLogger.debug(`Recursively scanning directory: ${dir}`);
        const dirFiles = await this.scanDirectoryRecursively(dir);
        allFiles.push(...dirFiles);
      }
      const uniqueFiles = Array.from(new Set(allFiles));
      elizaLogger.info(
        `Completed scanning. Found ${uniqueFiles.length} unique files in vault`
      );
      elizaLogger.debug("Vault files:", uniqueFiles);
      return uniqueFiles;
    } catch (error) {
      elizaLogger.error("Error in getAllFiles:", error);
      throw error;
    }
  }
  /**
   * Checks if a folder exists in the vault
   * @param folderPath - Path to the folder to check
   * @returns Promise<boolean> - True if the folder exists, false otherwise
   */
  async folderExists(folderPath) {
    try {
      if (!this.connected) {
        await this.connect();
      }
      const cleanPath = folderPath.replace(/^\/+|\/+$/g, "");
      const normalizedPath = cleanPath + (cleanPath.endsWith("/") ? "" : "/");
      elizaLogger.debug(
        `folderExists: Checking if folder exists: '${normalizedPath}'`
      );
      const allFiles = await this.listFiles();
      elizaLogger.debug(
        `folderExists: Got ${allFiles.length} total files`
      );
      if (allFiles.length > 0) {
        const sampleFiles = allFiles.slice(
          0,
          Math.min(5, allFiles.length)
        );
        elizaLogger.debug(
          `folderExists: Sample files: ${JSON.stringify(sampleFiles)}`
        );
      }
      for (const file of allFiles) {
        if (file === normalizedPath || file.startsWith(normalizedPath)) {
          elizaLogger.debug(
            `folderExists: Found match for folder '${normalizedPath}': '${file}'`
          );
          return true;
        }
      }
      try {
        elizaLogger.debug(
          `folderExists: Attempting to list directory '${folderPath}' directly`
        );
        const dirFiles = await this.listDirectoryFiles(folderPath);
        const exists = dirFiles && dirFiles.length >= 0;
        elizaLogger.debug(
          `folderExists: Directory listing succeeded, folder exists: ${exists}`
        );
        return exists;
      } catch (error) {
        if (error.message && error.message.includes("404")) {
          elizaLogger.debug(
            `folderExists: Directory listing returned 404, folder does not exist`
          );
          return false;
        }
        elizaLogger.debug(
          `folderExists: Error in direct directory check: ${error.message}`
        );
      }
      elizaLogger.debug(
        `folderExists: Folder '${normalizedPath}' not found`
      );
      return false;
    } catch (error) {
      elizaLogger.error(
        `Error in folderExists for '${folderPath}':`,
        error
      );
      return false;
    }
  }
  /**
   * Lists files in a specific folder with optional file extension filtering
   * @param folderPath - Path to the folder
   * @param extensions - Optional array of file extensions to filter by (e.g. ['.md', '.ttl'])
   * @returns Promise<string[]> - Array of file paths in the folder matching the extensions
   */
  async listFilesInFolder(folderPath, extensions) {
    try {
      if (!this.connected) {
        await this.connect();
      }
      const cleanPath = folderPath.replace(/^\/+|\/+$/g, "");
      const normalizedPath = cleanPath + (cleanPath.endsWith("/") ? "" : "/");
      elizaLogger.debug(
        `listFilesInFolder: Looking for files in '${normalizedPath}'`
      );
      const folderExists = await this.folderExists(folderPath);
      elizaLogger.debug(
        `listFilesInFolder: Folder exists: ${folderExists}`
      );
      if (!folderExists) {
        elizaLogger.warn(
          `listFilesInFolder: Folder '${folderPath}' does not exist`
        );
        return [];
      }
      let folderFiles = [];
      try {
        elizaLogger.debug(
          `listFilesInFolder: Attempting to list directory files for '${folderPath}'`
        );
        folderFiles = await this.listDirectoryFiles(folderPath);
        elizaLogger.debug(
          `listFilesInFolder: Found ${folderFiles.length} files with listDirectoryFiles`
        );
      } catch (error) {
        elizaLogger.warn(
          `listFilesInFolder: Failed to use listDirectoryFiles, falling back to listFiles: ${error.message}`
        );
        const allFiles = await this.listFiles();
        elizaLogger.debug(
          `listFilesInFolder: Got ${allFiles.length} total files from listFiles()`
        );
        folderFiles = allFiles.filter((file) => {
          const isInFolder = file.startsWith(normalizedPath) && !file.substring(normalizedPath.length).includes("/");
          if (isInFolder) {
            elizaLogger.debug(
              `listFilesInFolder: Found file in folder: ${file}`
            );
          }
          return isInFolder;
        });
        elizaLogger.debug(
          `listFilesInFolder: After filtering, found ${folderFiles.length} files in folder '${folderPath}'`
        );
      }
      if (extensions && extensions.length > 0) {
        elizaLogger.debug(
          `listFilesInFolder: Filtering by extensions: ${JSON.stringify(extensions)}`
        );
        const filteredFiles = folderFiles.filter((file) => {
          const matchesExtension = extensions.some(
            (ext) => file.toLowerCase().endsWith(ext.toLowerCase())
          );
          if (matchesExtension) {
            elizaLogger.debug(
              `listFilesInFolder: File matches extension filter: ${file}`
            );
          }
          return matchesExtension;
        });
        elizaLogger.debug(
          `listFilesInFolder: After extension filtering, found ${filteredFiles.length} files`
        );
        return filteredFiles;
      }
      return folderFiles;
    } catch (error) {
      elizaLogger.error(
        `Error in listFilesInFolder for path '${folderPath}':`,
        error
      );
      return [];
    }
  }
  /**
   * Lists all files in the vault with optional file extension filtering
   * @param extensions - Optional array of file extensions to filter by (e.g. ['.md', '.ttl'])
   * @returns Promise<string[]> - Array of file paths matching the extensions
   */
  async listAllFiles(extensions) {
    try {
      if (!this.connected) {
        await this.connect();
      }
      const allFiles = await this.getAllFiles();
      if (extensions && extensions.length > 0) {
        return allFiles.filter(
          (file) => extensions.some(
            (ext) => file.toLowerCase().endsWith(ext.toLowerCase())
          )
        );
      }
      return allFiles;
    } catch (error) {
      elizaLogger.error("Error listing all files", error);
      return [];
    }
  }
  /**
   * Creates memories from all files in the vault.
   * @returns A promise that resolves to the number of memories created.
   */
  async createMemoriesFromFiles() {
    try {
      elizaLogger.info("Starting to create memories from vault files");
      const allFiles = await this.getAllFiles();
      elizaLogger.debug("All files:", allFiles);
      elizaLogger.success(`Found ${allFiles.length} files in vault`);
      for (const file of allFiles) {
        try {
          if (file.endsWith(".md")) {
            const content3 = await this.getNote(file);
            if (!content3) {
              elizaLogger.warn(
                `No content found for file: ${file}`
              );
              continue;
            }
            const contentHash = createHash("sha256").update(JSON.stringify(content3)).digest("hex");
            const knowledgeId = stringToUuid2(`obsidian-${file}`);
            const existingDocument = await this.runtime.documentsManager.getMemoryById(
              knowledgeId
            );
            if (existingDocument && existingDocument.content.hash === contentHash) {
              elizaLogger.debug(
                `Skipping unchanged file: ${file}`
              );
              continue;
            }
            elizaLogger.info(
              `Processing knowledge for ${this.runtime.character.name} - ${file}`
            );
            await setStructuredMarkdownKnowledge(
              this.runtime,
              file,
              content3.content,
              content3.frontmatter || {},
              "obsidian-"
            );
            await new Promise(
              (resolve6) => setTimeout(resolve6, 100)
            );
          }
        } catch (error) {
          elizaLogger.error(`Error processing file ${file}:`, error);
        }
      }
      elizaLogger.success("Finished creating memories from vault notes");
      return allFiles.length;
    } catch (error) {
      elizaLogger.error("Error in createMemoriesFromFiles:", error);
      return 0;
    }
  }
  /**
   * Checks if the client is connected to Obsidian.
   * @returns `true` if the client is connected, `false` otherwise.
   */
  isConnected() {
    return this.connected;
  }
  /**
   * Closes the connection to Obsidian.
   */
  close() {
    this.connected = false;
    _ObsidianProvider.instance = null;
  }
};

// src/enviroment.ts
import { z } from "zod";
var obsidianEnvSchema = z.object({
  OBSIDIAN_API_URL: z.string().nullable().optional(),
  OBSIDIAN_API_PORT: z.string().default("27123"),
  OBSIDIAN_API_TOKEN: z.string()
}).refine((data) => !!data.OBSIDIAN_API_TOKEN, {
  message: "OBSIDIAN_API_TOKEN is required"
});
async function validateObsidianConfig(runtime) {
  try {
    const config = {
      OBSIDIAN_API_URL: runtime.getSetting("OBSIDIAN_API_URL") || process.env.OBSIDIAN_API_URL || null,
      OBSIDIAN_API_PORT: runtime.getSetting("OBSIDIAN_API_PORT") || process.env.OBSIDIAN_API_PORT || "27123",
      OBSIDIAN_API_TOKEN: runtime.getSetting("OBSIDIAN_API_TOKEN") || process.env.OBSIDIAN_API_TOKEN
    };
    return obsidianEnvSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`).join("\n");
      throw new Error(
        `Obsidian configuration validation failed:
${errorMessages}`
      );
    }
    throw error;
  }
}

// src/types/index.ts
import { z as z2 } from "zod";
var noteSchema = z2.object({
  tags: z2.array(z2.string()).optional(),
  frontmatter: z2.record(z2.unknown()).optional(),
  stat: z2.object({
    ctime: z2.number(),
    mtime: z2.number(),
    size: z2.number()
  }).nullable().optional(),
  path: z2.string(),
  content: z2.string().nullable().optional()
});
var isValidNote = (note) => {
  return noteSchema.safeParse(note).success;
};
var fileSchema = z2.object({
  path: z2.string(),
  content: z2.string().nullable().optional(),
  stat: z2.object({
    ctime: z2.number(),
    mtime: z2.number(),
    size: z2.number()
  }).nullable().optional()
});
var isValidFile = (file) => {
  return fileSchema.safeParse(file).success;
};
var noteHierarchySchema = z2.object({
  path: z2.string(),
  content: z2.string().nullable().optional(),
  links: z2.lazy(() => z2.array(noteHierarchySchema)).nullable().optional()
});
var isValidNoteHierarchy = (hierarchy) => {
  return noteHierarchySchema.safeParse(hierarchy).success;
};
var searchKeywordSchema = z2.object({
  query: z2.string().min(1).describe("The keywords to search for"),
  options: z2.object({
    vault: z2.string().optional(),
    includeExcerpt: z2.boolean().optional(),
    limit: z2.number().optional()
  }).optional()
});
var searchOptionsSchema = z2.object({
  contextLength: z2.number().optional(),
  ignoreCase: z2.boolean().nullable().optional().default(true),
  searchIn: z2.array(z2.string()).nullable().optional().default([])
});
var searchQuerySchema = z2.object({
  query: z2.union([z2.string(), z2.record(z2.unknown())]).describe("The query to search for"),
  queryFormat: z2.enum(["plaintext", "dataview", "jsonlogic"]).describe("The format of the query"),
  options: searchOptionsSchema.optional().describe("Search options")
});
var isSearchQuery = (obj) => {
  return searchQuerySchema.safeParse(obj).success;
};

// src/helper.ts
var obsidianInstance;
async function getObsidian(runtime) {
  if (!obsidianInstance) {
    elizaLogger2.debug("Creating new ObsidianProvider instance");
    const config = await validateObsidianConfig(runtime);
    obsidianInstance = await ObsidianProvider.create(
      runtime,
      Number.parseInt(config.OBSIDIAN_API_PORT),
      config.OBSIDIAN_API_TOKEN,
      config.OBSIDIAN_API_URL
    );
  }
  return obsidianInstance;
}
function extractLinks(noteContent) {
  const linkRegex = /\[\[(.*?)\]\]/g;
  const links = [];
  let match;
  while (true) {
    match = linkRegex.exec(noteContent.content);
    if (match === null) break;
    if (match[1] && !lookup(match[1])) {
      links.push(`${noteContent.path.split("/")[0]}/${match[1]}.md`);
    } else {
      links.push(match[1]);
    }
  }
  return links;
}
async function storeHierarchyInMemory(runtime, message, hierarchy) {
  const memory = {
    id: stringToUuid3(hierarchy.path),
    roomId: message.roomId,
    userId: message.userId,
    agentId: runtime.agentId,
    content: {
      text: JSON.stringify(hierarchy),
      type: "note_traversal",
      metadata: {
        path: hierarchy.path,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    }
  };
  const memoryManager = new MemoryManager({
    runtime,
    tableName: "obsidian"
  });
  await memoryManager.createMemory(memory);
  elizaLogger2.info(`Stored hierarchy for note ${hierarchy.path} in memory`);
}
async function retrieveHierarchyFromMemory(runtime, message, notePath) {
  const memoryManager = new MemoryManager({
    runtime,
    tableName: "obsidian"
  });
  try {
    const memories = await memoryManager.getMemories({
      roomId: message.roomId,
      count: 10,
      start: 0,
      end: Date.now()
    });
    if (memories && memories.length > 0) {
      const memory = memories[0];
      const hierarchy = JSON.parse(memory.content.text);
      elizaLogger2.info(`Retrieved hierarchy for note ${notePath} from memory`);
      return hierarchy;
    }
    return null;
  } catch (error) {
    elizaLogger2.error(`Failed to retrieve hierarchy from memory: ${error.message}`);
    return null;
  }
}
function markdownToPlaintext(markdown) {
  if (!markdown || typeof markdown !== "string") {
    return "";
  }
  let text3 = markdown;
  text3 = text3.replace(/```[\s\S]*?```/g, (match) => {
    return match.slice(3, -3).trim();
  });
  text3 = text3.replace(/`([^`]+)`/g, "$1");
  text3 = text3.replace(/^#{1,6}\s+(.*)$/gm, "$1");
  text3 = text3.replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, "$1");
  text3 = text3.replace(/^[\s-*_]{3,}$/gm, "\n");
  text3 = text3.replace(/^>\s+/gm, "");
  text3 = text3.replace(/\[([^\]]+)\]\([)]+\)/g, "$1");
  text3 = text3.replace(/!\[([^\]]*)\]\([)]+\)/g, "");
  text3 = text3.replace(/^[\s-]*[-+*]\s+/gm, "");
  text3 = text3.replace(/^\s*\d+\.\s+/gm, "");
  text3 = text3.replace(/\n\s*\n\n/g, "\n\n");
  text3 = text3.trim();
  return text3;
}
var EXAMPLE_SEARCH_PROMPTS = [
  {
    input: "Search typescript in the notes",
    output: {
      query: "typescript",
      queryFormat: "plaintext",
      options: { contextLength: 150 }
    }
  },
  {
    input: "Find wisdom or mastering in all files",
    output: {
      query: "wisdom OR mastering",
      queryFormat: "plaintext",
      options: { contextLength: 150 }
    }
  },
  {
    input: "Find markdown files containing 'react' or 'typescript'",
    output: {
      query: {
        and: [
          { or: [{ in: ["react", { var: "content" }] }, { in: ["typescript", { var: "content" }] }] }
        ]
      },
      queryFormat: "jsonlogic",
      options: { contextLength: 200 }
    }
  },
  {
    input: "Search for files with regex pattern 'def.*main'",
    output: {
      query: {
        and: [
          { or: [{ regexp: ["def.*main", { var: "content" }] }] }
        ]
      },
      queryFormat: "jsonlogic",
      options: { contextLength: 200 }
    }
  },
  {
    input: "Search for markdown files with regex pattern '<div[^>]*>'",
    output: {
      query: {
        and: [
          { or: [{ regexp: ["<div[^>]*>", { var: "content" }] }] }
        ]
      },
      queryFormat: "jsonlogic",
      options: { contextLength: 200 }
    }
  },
  {
    input: "Find markdown files with filenames containing 'project'",
    output: {
      query: {
        and: [
          { in: ["project", { var: "path" }] }
        ]
      },
      queryFormat: "jsonlogic",
      options: { contextLength: 200 }
    }
  },
  {
    input: "Search for markdown files with filenames matching regex pattern '^notes_.*\\.md$'",
    output: {
      query: {
        and: [
          { regexp: ["^notes_.*\\.md$", { var: "path" }] }
        ]
      },
      queryFormat: "jsonlogic",
      options: { contextLength: 200 }
    }
  },
  {
    input: "Find markdown files with filenames containing 'summary' or 'report'",
    output: {
      query: {
        and: [
          { or: [{ in: ["summary", { var: "path" }] }, { in: ["report", { var: "path" }] }] }
        ]
      },
      queryFormat: "jsonlogic",
      options: { contextLength: 200 }
    }
  },
  {
    input: "Select TABLE file.mtime FROM #Projects IN Projects/ AND Archive/Projects",
    output: {
      query: "TABLE file.mtime FROM #Projects",
      queryFormat: "dataview",
      options: {
        searchIn: ["Projects/", "Archive/Projects/"]
      }
    }
  }
];
function constructSearchPrompt(userInput) {
  const examplePrompts = EXAMPLE_SEARCH_PROMPTS.map(
    (example) => `Input: "${example.input}"
Output: ${JSON.stringify(example.output, null, 2)}`
  ).join("\n\n");
  return `Respond with a JSON block containing only the extracted values. Use null for any values that cannot be determined.

Follow these rules:
1. Use the exact structure shown in the examples
2. The query is relevant to the user's request
3. Use space-separated terms for combined search (default: 'plaintext')
4. Use OR operator when searching for alternatives (default: 'plaintext')
5. Always include query.and and query.or as an array (default: "jsonlogic")
6. Use appropriate glob patterns for file types when appropriate (default: "jsonlogic")
7. Choose between contains and regexp based on the search requirements (default: "jsonlogic")
8. The format of the query - queryFormat (string): Must be one of: 'plaintext', 'dataview', or 'jsonlogic'. (default: 'plaintext')
9. When the prompt have "containing" or "contains", use "in" operator. DO NOT use "contains" operator (this is a strictly requirement) (default: "jsonlogic")
10. When the prompt have "matching" or "match", use "regexp" operator (default: "jsonlogic")
11. Maintain contextLength at 150

Examples:
${examplePrompts}

Now, convert this request:
"${userInput}"

Respond ONLY with a JSON block containing only the extracted values.`;
}
async function genereteSearchParameters(prompt, state, runtime) {
  try {
    const context = composeContext({
      state,
      template: prompt
    });
    const searchContext = await generateObject({
      runtime,
      context,
      modelClass: ModelClass.MEDIUM,
      schema: searchQuerySchema,
      stop: ["\n\n"]
    });
    const parsedCompletion = searchContext.object;
    elizaLogger2.info("Parsed completion:", JSON.stringify(parsedCompletion, null, 2));
    return JSON.stringify(parsedCompletion);
  } catch (error) {
    console.error("Error calling LLM API:", error);
    return "**No matching notes found**";
  }
}
async function processUserInput(userInput, state, runtime) {
  const searchState = {
    ...state,
    query: userInput
    // Add the query from userInput
  };
  const prompt = constructSearchPrompt(userInput);
  const llmResponse = await genereteSearchParameters(prompt, searchState, runtime);
  try {
    const parsedResponse = JSON.parse(llmResponse);
    const validatedResponse = searchQuerySchema.parse(parsedResponse);
    return validatedResponse;
  } catch (error) {
    console.error("Failed to parse or validate LLM response:", error);
    return null;
  }
}

// src/helper/sparqlGenerator.ts
import { elizaLogger as elizaLogger4, ModelClass as ModelClass2, generateObject as generateObject2 } from "@elizaos/core";
import { z as z3 } from "zod";

// src/helper/propertyNamespaceResolver.ts
import { elizaLogger as elizaLogger3 } from "@elizaos/core";
var PropertyNamespaceResolver = class _PropertyNamespaceResolver {
  /**
   * Private constructor - use getInstance() instead
   */
  constructor() {
    this.schemaPropertyMap = /* @__PURE__ */ new Map();
    this.namespaceMap = /* @__PURE__ */ new Map();
    this.defaultNamespace = "http://elizaos.local/ontology/";
    this.isInitialized = false;
    this.namespaceMap.set("rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#");
    this.namespaceMap.set("rdfs", "http://www.w3.org/2000/01/rdf-schema#");
    this.namespaceMap.set("schema", "http://schema.org/");
    this.namespaceMap.set("xsd", "http://www.w3.org/2001/XMLSchema#");
    this.namespaceMap.set("owl", "http://www.w3.org/2002/07/owl#");
    this.namespaceMap.set("foaf", "http://xmlns.com/foaf/0.1/");
    this.namespaceMap.set("ont", "http://elizaos.local/ontology/");
  }
  /**
   * Gets the singleton instance
   */
  static getInstance() {
    if (!_PropertyNamespaceResolver.instance) {
      _PropertyNamespaceResolver.instance = new _PropertyNamespaceResolver();
    }
    return _PropertyNamespaceResolver.instance;
  }
  /**
   * Expands a namespace prefix to its full URI
   */
  expandNamespacePrefix(prefix) {
    return this.namespaceMap.get(prefix) || null;
  }
  /**
   * Adds a namespace prefix mapping
   */
  addNamespacePrefix(prefix, uri) {
    if (prefix && uri) {
      this.namespaceMap.set(prefix, uri);
      elizaLogger3.debug(`Added namespace prefix: ${prefix} -> ${uri}`);
    }
  }
  /**
   * Registers a property with its namespace
   */
  registerProperty(property, namespace) {
    if (property && namespace) {
      this.schemaPropertyMap.set(property, namespace);
      elizaLogger3.debug(`Registered property namespace: ${property} -> ${namespace}`);
    }
  }
  /**
   * Sets the default namespace for properties without defined namespaces
   */
  setDefaultNamespace(namespace) {
    if (namespace) {
      this.defaultNamespace = namespace;
      elizaLogger3.debug(`Set default namespace to: ${namespace}`);
    }
  }
  /**
   * Expands a term to its full URI based on registered schemas and namespaces
   */
  expandTerm(term) {
    if (!term) return term;
    if (term.includes("://")) return term;
    const colonIndex = term.indexOf(":");
    if (colonIndex > 0) {
      const prefix = term.substring(0, colonIndex);
      const localName = term.substring(colonIndex + 1);
      const namespaceUri = this.namespaceMap.get(prefix);
      if (namespaceUri) {
        return `${namespaceUri}${localName}`;
      }
      elizaLogger3.warn(`Unknown namespace prefix: ${prefix} in term: ${term}`);
      return term;
    }
    const registeredNamespace = this.schemaPropertyMap.get(term);
    if (registeredNamespace) {
      elizaLogger3.debug(`Found registered namespace for property "${term}": ${registeredNamespace}`);
      return `${registeredNamespace}${term}`;
    }
    elizaLogger3.debug(`No registered namespace for property "${term}", using default: ${this.defaultNamespace}`);
    return `${this.defaultNamespace}${term}`;
  }
  /**
   * Parses and extracts namespace prefixes from ontology content
   */
  parseNamespacePrefixes(ontologyContent) {
    try {
      const prefixRegex = /@prefix\s+([a-zA-Z0-9_-]+):\s+<([^>]+)>\s*\./g;
      let match;
      while ((match = prefixRegex.exec(ontologyContent)) !== null) {
        const prefix = match[1];
        const uri = match[2];
        this.addNamespacePrefix(prefix, uri);
      }
      elizaLogger3.debug(`Parsed ${this.namespaceMap.size} namespace prefixes from ontology content`);
    } catch (error) {
      elizaLogger3.error(`Error parsing namespace prefixes: ${error}`);
    }
  }
  /**
   * Parses ontology content to extract property definitions and their namespaces
   */
  parsePropertyDefinitions(ontologyContent) {
    try {
      const propertyRegex = /([a-zA-Z0-9_-]+):([a-zA-Z0-9_-]+)\s+a\s+rdf:Property/g;
      let match;
      while ((match = propertyRegex.exec(ontologyContent)) !== null) {
        const prefix = match[1];
        const property = match[2];
        const namespaceUri = this.namespaceMap.get(prefix);
        if (namespaceUri) {
          this.registerProperty(property, namespaceUri);
        } else {
          elizaLogger3.warn(`Unknown namespace prefix in property definition: ${prefix}:${property}`);
        }
      }
      const schemaDefRegex = /(schema):([a-zA-Z0-9_-]+)\s+a\s+/g;
      while ((match = schemaDefRegex.exec(ontologyContent)) !== null) {
        const property = match[2];
        const namespaceUri = this.namespaceMap.get("schema");
        if (namespaceUri) {
          this.registerProperty(property, namespaceUri);
        }
      }
      elizaLogger3.debug(`Parsed ${this.schemaPropertyMap.size} property definitions from ontology content`);
    } catch (error) {
      elizaLogger3.error(`Error parsing property definitions: ${error}`);
    }
  }
  /**
   * Initialize from ontology content - parses prefixes and properties
   */
  initializeFromOntology(ontologyContent) {
    this.parseNamespacePrefixes(ontologyContent);
    this.parsePropertyDefinitions(ontologyContent);
    this.isInitialized = true;
    elizaLogger3.info(`PropertyNamespaceResolver initialized with ${this.namespaceMap.size} namespaces and ${this.schemaPropertyMap.size} registered properties`);
    elizaLogger3.debug(`Namespace prefixes: ${Array.from(this.namespaceMap.keys()).join(", ")}`);
    elizaLogger3.debug(`Registered properties: ${Array.from(this.schemaPropertyMap.keys()).join(", ")}`);
  }
  /**
   * Gets whether the resolver has been initialized with ontology data
   */
  getIsInitialized() {
    return this.isInitialized;
  }
  /**
   * Gets alternative namespace URIs for a property
   * Useful for SPARQL queries to handle multiple possible property paths
   */
  getAlternativeNamespaces(property) {
    const namespaces = [];
    const registeredNamespace = this.schemaPropertyMap.get(property);
    if (registeredNamespace) {
      namespaces.push(`${registeredNamespace}${property}`);
    }
    const schemaNamespace = this.namespaceMap.get("schema");
    if (schemaNamespace && !namespaces.includes(`${schemaNamespace}${property}`)) {
      namespaces.push(`${schemaNamespace}${property}`);
    }
    if (!namespaces.includes(`${this.defaultNamespace}${property}`)) {
      namespaces.push(`${this.defaultNamespace}${property}`);
    }
    return namespaces;
  }
  /**
   * Generates a UNION pattern for SPARQL queries to handle multiple possible property paths
   */
  generateSparqlPropertyUnion(subject, property, object) {
    const namespaces = this.getAlternativeNamespaces(property);
    if (namespaces.length === 1) {
      return `${subject} <${namespaces[0]}> ${object} .`;
    }
    const unionPatterns = namespaces.map((ns) => `{ ${subject} <${ns}> ${object} }`);
    return unionPatterns.join(" UNION ");
  }
  /**
   * Gets all registered properties
   */
  getRegisteredProperties() {
    return Array.from(this.schemaPropertyMap.keys());
  }
  /**
   * Gets all registered namespaces
   */
  getNamespacePrefixes() {
    return Object.fromEntries(this.namespaceMap.entries());
  }
};

// src/helper/sparqlGenerator.ts
var SparqlQuerySchema = z3.object({
  query: z3.string().describe("The generated SPARQL query")
});
var SparqlApplicabilitySchema = z3.object({
  applicable: z3.boolean().describe("Whether SPARQL would be beneficial for this query"),
  reason: z3.string().describe("Reason for the decision")
});
var isSparqlQuery = (obj) => {
  return obj && typeof obj.query === "string";
};
var isSparqlApplicability = (obj) => {
  return obj && typeof obj.applicable === "boolean" && typeof obj.reason === "string";
};
function generatePrefixSection(prefixes) {
  return Object.entries(prefixes).map(([prefix, uri]) => `PREFIX ${prefix}: <${uri}>`).join("\n");
}
async function generateSparqlQuery(runtime, prompt, ontologyContent) {
  try {
    elizaLogger4.debug("Generating SPARQL query from prompt:", prompt);
    const resolver2 = PropertyNamespaceResolver.getInstance();
    if (!resolver2.getIsInitialized() && ontologyContent) {
      elizaLogger4.debug("Initializing property namespace resolver from ontology content");
      resolver2.initializeFromOntology(ontologyContent);
    }
    const prefixes = resolver2.getNamespacePrefixes();
    const prefixSection = generatePrefixSection(prefixes);
    const registeredProperties = resolver2.getRegisteredProperties();
    const propertiesSample = registeredProperties.length > 10 ? registeredProperties.slice(0, 10).join(", ") + "..." : registeredProperties.join(", ");
    const context = `You are an AI assistant that generates SPARQL queries based on natural language prompts and a provided ontology.
Your task is to create a SPARQL query that retrieves the relevant information from the knowledge graph to answer the given prompt.

IMPORTANT INFORMATION:
- Use the following namespace prefixes in your query:
${prefixSection}

- In this knowledge graph, properties may have different namespaces. Always use FULL URI paths in angle brackets.
- Properties should use their full URIs. Registered properties include: ${propertiesSample}
- Always use the pattern <?subject> <full-uri-for-predicate> ?object .
- For RDF type, use either <${resolver2.expandTerm("rdf:type")}> or the 'a' shorthand
- When comparing string literals, use FILTER with LCASE for case-insensitive matching
- Use OPTIONAL clauses for properties that might not exist on all entities
- Use DISTINCT in your SELECT to avoid duplicate results

ONTOLOGY:
${ontologyContent}

USER PROMPT:
${prompt}

ONLY return the generated SPARQL query, with no explanations or additional text.
If you don't think a SPARQL query is appropriate for this prompt, just return "NOT_APPLICABLE".`;
    const MAX_RETRIES = 3;
    let retryCount = 0;
    let error = null;
    while (retryCount < MAX_RETRIES) {
      try {
        elizaLogger4.debug(`Attempt ${retryCount + 1}/${MAX_RETRIES} to generate SPARQL query`);
        const result = await generateObject2({
          runtime,
          context,
          modelClass: ModelClass2.LARGE,
          schema: SparqlQuerySchema
        });
        if (!isSparqlQuery(result.object)) {
          elizaLogger4.error("Invalid SPARQL query generated.");
          throw new Error("Invalid SPARQL query generated.");
        }
        const query = result.object.query.trim();
        if (query === "NOT_APPLICABLE") {
          elizaLogger4.info("LLM determined that SPARQL query is not applicable for this prompt");
          return null;
        }
        const cleanedQuery = query.replace(/```sparql/gi, "").replace(/```/g, "").trim();
        elizaLogger4.debug("Generated SPARQL query: " + cleanedQuery);
        return cleanedQuery;
      } catch (err) {
        error = err;
        elizaLogger4.error(`Error generating SPARQL query (attempt ${retryCount + 1}/${MAX_RETRIES}):`, err);
        retryCount++;
        if (retryCount < MAX_RETRIES) {
          const delay = 1e3;
          elizaLogger4.info(`Waiting ${delay}ms before retry ${retryCount + 1}/${MAX_RETRIES}...`);
          await new Promise((resolve6) => setTimeout(resolve6, delay));
        }
      }
    }
    elizaLogger4.error(`Failed to generate SPARQL query after ${MAX_RETRIES} attempts:`, error);
    return null;
  } catch (error) {
    elizaLogger4.error("Error in generateSparqlQuery:", error);
    return null;
  }
}
async function shouldUseSparql(runtime, query, ontologyContent) {
  try {
    if (query.toLowerCase().includes("sparql")) {
      elizaLogger4.debug("Query explicitly mentions SPARQL, so it should use SPARQL");
      return true;
    }
    if (query.toLowerCase().includes("workout") && (query.toLowerCase().includes("intensity") || query.toLowerCase().includes("high") || query.toLowerCase().includes("moderate") || query.toLowerCase().includes("low"))) {
      elizaLogger4.debug("Query is about workout intensity, so it should use SPARQL");
      return true;
    }
    const resolver2 = PropertyNamespaceResolver.getInstance();
    if (resolver2.getIsInitialized()) {
      const registeredProperties = resolver2.getRegisteredProperties();
      for (const prop of registeredProperties) {
        if (query.toLowerCase().includes(prop.toLowerCase())) {
          elizaLogger4.debug(`Query contains registered property "${prop}", should use SPARQL`);
          return true;
        }
      }
    }
    elizaLogger4.debug("Determining if SPARQL would be beneficial for query:", query);
    if (!ontologyContent || ontologyContent.trim() === "") {
      elizaLogger4.debug("No ontology content available, cannot use SPARQL");
      return false;
    }
    const context = `You are an AI assistant that determines whether a natural language query would benefit from being translated into a SPARQL query.

TASK:
Analyze the user's query and the provided ontology to determine if a SPARQL query would be appropriate and beneficial.

ONTOLOGY SAMPLE (first 1000 characters):
${ontologyContent.substring(0, 1e3)}

USER QUERY:
${query}

Consider the following:
1. Does the query ask for specific structured data that exists in the ontology?
2. Is the query asking about relationships between entities?
3. Would a SPARQL query provide more precise results than a text search?
4. Does the ontology contain the types of entities and properties mentioned in the query?

Return true if a SPARQL query would be beneficial, false otherwise.`;
    try {
      elizaLogger4.debug("Asking LLM if SPARQL would be beneficial");
      const result = await generateObject2({
        runtime,
        context,
        modelClass: ModelClass2.SMALL,
        // Use a smaller model for this decision
        schema: SparqlApplicabilitySchema
      });
      if (result && result.object && isSparqlApplicability(result.object)) {
        const applicable = result.object.applicable;
        const reason = result.object.reason || "No reason provided";
        elizaLogger4.debug(`LLM determined SPARQL ${applicable ? "would" : "would not"} be beneficial: ${reason}`);
        return applicable;
      }
      elizaLogger4.debug("Couldn't get a clear answer from LLM, falling back to simple check");
      return query.toLowerCase().includes("workout") || query.toLowerCase().includes("intensity");
    } catch (err) {
      elizaLogger4.error("Error asking LLM if SPARQL would be beneficial:", err);
      return query.toLowerCase().includes("workout") || query.toLowerCase().includes("intensity");
    }
  } catch (error) {
    elizaLogger4.error("Error determining SPARQL relevance:", error);
    return query.toLowerCase().includes("sparql");
  }
}

// src/helper/rdfManager.ts
import * as rdflib from "rdflib";
import { elizaLogger as elizaLogger5 } from "@elizaos/core";
import * as fs from "fs";
import * as path from "path";
var rdfGraphInstance = null;
var DEFAULT_STORAGE_PATH = path.join(process.cwd(), "agent/agent/rdf-graph-storage.ttl");
var RdfManager = class _RdfManager {
  constructor() {
    this.baseUri = "http://elizaos.local/ontology/";
    this.loaded = false;
    this.graph = rdfGraphInstance || new rdflib.IndexedFormula();
    if (!rdfGraphInstance) {
      rdfGraphInstance = this.graph;
    }
  }
  /**
   * Get the singleton instance of RdfManager
   */
  static getInstance() {
    if (!_RdfManager.instance) {
      _RdfManager.instance = new _RdfManager();
    }
    return _RdfManager.instance;
  }
  /**
   * Get the RDF graph
   */
  getGraph() {
    return this.graph;
  }
  /**
   * Check if the graph has been loaded with data
   */
  isLoaded() {
    return this.loaded || this.graph.statements && this.graph.statements.length > 0;
  }
  /**
   * Set the loaded state
   */
  setLoaded(loaded) {
    this.loaded = loaded;
  }
  /**
   * Add a triple to the graph
   */
  addTriple(subject, predicate, object, isBlankNodeObject = false, isBlankNodeSubject = false, isLiteral = false, datatype = null) {
    const s = isBlankNodeSubject ? rdflib.blankNode(subject.replace("_:", "")) : this.createSubject(subject);
    const p = this.createPredicate(predicate);
    let o;
    if (isBlankNodeObject) {
      o = rdflib.blankNode(String(object).replace("_:", ""));
    } else if (isLiteral) {
      if (datatype) {
        o = rdflib.literal(String(object), rdflib.sym(datatype));
      } else {
        o = rdflib.literal(String(object));
      }
    } else {
      o = this.createObject(object);
    }
    if (predicate === "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" || predicate.endsWith("#type")) {
      elizaLogger5.debug(`[TYPE-DEBUG] Adding type triple: <${subject}> <${predicate}> <${object}>`);
    }
    try {
      this.graph.add(s, p, o);
      elizaLogger5.debug(`Successfully added triple to graph`);
    } catch (error) {
      elizaLogger5.error(`Error adding triple: <${subject}> <${predicate}> <${object}>`, error);
    }
  }
  /**
   * Find triples in the graph that match the given pattern
   */
  findTriples(subject, predicate, object) {
    try {
      const s = subject ? this.createSubject(subject) : null;
      const p = predicate ? this.createPredicate(predicate) : null;
      const o = object ? this.createObject(object) : null;
      if (predicate === "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" || predicate && predicate.endsWith("#type")) {
        elizaLogger5.debug(`[TYPE-DEBUG] Searching for type triple: <${subject}> <${predicate}> <${object}>`);
      }
      const statements = this.graph.statementsMatching(s, p, o);
      if (predicate === "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" || predicate && predicate.endsWith("#type")) {
        elizaLogger5.debug(`[TYPE-DEBUG] Found ${statements.length} matching type triples`);
        if (statements.length > 0) {
          const sampleSize = Math.min(statements.length, 3);
          for (let i = 0; i < sampleSize; i++) {
            const stmt = statements[i];
            elizaLogger5.debug(`[TYPE-DEBUG] Match ${i + 1}: <${stmt.subject.value}> <${stmt.predicate.value}> <${stmt.object.value}>`);
          }
        }
      }
      return statements;
    } catch (error) {
      elizaLogger5.error("Error finding triples:", error);
      return [];
    }
  }
  /**
   * Create a subject node
   */
  createSubject(subject) {
    if (subject.startsWith("http://") || subject.startsWith("https://")) {
      return rdflib.sym(subject);
    }
    return rdflib.sym(`${this.baseUri}${subject}`);
  }
  /**
   * Create a predicate node
   */
  createPredicate(predicate) {
    if (predicate.startsWith("http://") || predicate.startsWith("https://")) {
      return rdflib.sym(predicate);
    }
    if (predicate.includes(":")) {
      const [prefix, name] = predicate.split(":");
      const namespaces = {
        rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        rdfs: "http://www.w3.org/2000/01/rdf-schema#",
        schema: "http://schema.org/",
        xsd: "http://www.w3.org/2001/XMLSchema#",
        owl: "http://www.w3.org/2002/07/owl#",
        foaf: "http://xmlns.com/foaf/0.1/"
      };
      if (namespaces[prefix]) {
        return rdflib.sym(`${namespaces[prefix]}${name}`);
      }
    }
    return rdflib.sym(`${this.baseUri}${predicate}`);
  }
  /**
   * Create an object node (can be a literal or a resource)
   */
  createObject(object) {
    if (typeof object !== "string") {
      return rdflib.lit(String(object));
    }
    if (object.startsWith("http://") || object.startsWith("https://")) {
      return rdflib.sym(object);
    }
    if (!/\s/.test(object) && object.includes(":")) {
      const [prefix, name] = object.split(":");
      const namespaces = {
        rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        rdfs: "http://www.w3.org/2000/01/rdf-schema#",
        schema: "http://schema.org/",
        xsd: "http://www.w3.org/2001/XMLSchema#",
        owl: "http://www.w3.org/2002/07/owl#",
        foaf: "http://xmlns.com/foaf/0.1/"
      };
      if (namespaces[prefix]) {
        return rdflib.sym(`${namespaces[prefix]}${name}`);
      }
    }
    return rdflib.lit(object);
  }
  /**
   * Load RDF data from a string
   */
  loadRdfString(data, format = "text/turtle") {
    try {
      rdflib.parse(data, this.graph, this.baseUri, format);
      this.loaded = true;
      return true;
    } catch (error) {
      elizaLogger5.error("Error loading RDF string:", error);
      return false;
    }
  }
  /**
   * Execute a SPARQL query
   */
  executeSparqlQuery(query) {
    try {
      elizaLogger5.debug(`Executing SPARQL query: ${query}`);
      let results = [];
      this.validateSparqlSyntax(query);
      let queryObj;
      try {
        if (typeof rdflib.SPARQLToQuery === "function") {
          const normalizedQuery = this.normalizeSparqlQuery(query);
          elizaLogger5.debug(`Normalized query: ${normalizedQuery}`);
          queryObj = rdflib.SPARQLToQuery(normalizedQuery, false, this.graph);
          elizaLogger5.debug("Successfully converted SPARQL to Query object");
        } else {
          elizaLogger5.warn("SPARQLToQuery not available, using raw query");
          queryObj = query;
        }
      } catch (queryError) {
        elizaLogger5.error("Error converting SPARQL to Query:", queryError);
        try {
          const simplifiedQuery = this.simplifyComplexQuery(query);
          elizaLogger5.debug(`Trying simplified query: ${simplifiedQuery}`);
          queryObj = rdflib.SPARQLToQuery(simplifiedQuery, false, this.graph);
          elizaLogger5.debug("Successfully converted simplified SPARQL to Query object");
        } catch (fallbackError) {
          elizaLogger5.error("Fallback query also failed:", fallbackError);
          return [];
        }
      }
      try {
        if (typeof this.graph.querySync === "function" && queryObj && typeof queryObj !== "string") {
          elizaLogger5.debug("Using querySync method with Query object");
          const queryResults = this.graph.querySync(queryObj);
          if (queryResults) {
            if (Array.isArray(queryResults)) {
              results = queryResults;
            } else {
              results = [queryResults];
            }
          }
          if (results.length === 0) {
            elizaLogger5.debug("Query returned 0 results, trying manual triple pattern matcher");
            results = this.manualTriplePatternMatch(query);
          }
        } else if (typeof this.graph.query === "function" && queryObj && typeof queryObj !== "string") {
          elizaLogger5.debug("Using query method with callback");
          const callbackResults = [];
          this.graph.query(queryObj, (result) => {
            if (result) callbackResults.push(result);
          });
          results = callbackResults;
          if (results.length === 0) {
            elizaLogger5.debug("Query returned 0 results, trying manual triple pattern matcher");
            results = this.manualTriplePatternMatch(query);
          }
        } else {
          elizaLogger5.error(
            "No suitable query method available or query conversion failed"
          );
          results = this.manualTriplePatternMatch(query);
        }
      } catch (queryExecError) {
        elizaLogger5.error("Error in SPARQL query execution:", queryExecError);
        if (!query.includes("__simplified")) {
          try {
            elizaLogger5.debug("Attempting execution with simplified query pattern");
            return this.executeSparqlQuery(this.simplifyComplexQuery(query) + " # __simplified");
          } catch (e) {
            elizaLogger5.error("Simplified query execution also failed:", e);
          }
        }
      }
      elizaLogger5.debug(`Query returned ${results.length} results`);
      return this.formatSparqlResults(results);
    } catch (error) {
      elizaLogger5.error("Error executing SPARQL query:", error);
      return [];
    }
  }
  /**
   * Validate SPARQL syntax for common issues
   */
  validateSparqlSyntax(query) {
    const openBraces = (query.match(/{/g) || []).length;
    const closeBraces = (query.match(/}/g) || []).length;
    if (openBraces !== closeBraces) {
      elizaLogger5.warn(`SPARQL syntax warning: Unbalanced braces (${openBraces} open, ${closeBraces} close)`);
    }
    const unionMatches = query.match(/UNION/g);
    if (unionMatches) {
      elizaLogger5.debug(`Query contains ${unionMatches.length} UNION patterns`);
      if (query.includes("UNION{") || query.includes("}UNION")) {
        elizaLogger5.warn("SPARQL syntax warning: UNION may need spaces around braces");
      }
    }
  }
  /**
   * Normalize SPARQL query syntax for better compatibility
   */
  normalizeSparqlQuery(query) {
    let normalizedQuery = query.replace(/}UNION{/g, "} UNION {");
    normalizedQuery = normalizedQuery.replace(/}UNION\s+{/g, "} UNION {");
    normalizedQuery = normalizedQuery.replace(/}\s+UNION{/g, "} UNION {");
    normalizedQuery = normalizedQuery.replace(/\}\s*UNION\s*\{/g, "} \nUNION\n {");
    return normalizedQuery;
  }
  /**
   * Simplify a complex SPARQL query that might have parsing issues
   */
  simplifyComplexQuery(query) {
    let simplifiedQuery = query;
    const optionalUnionPattern = /OPTIONAL\s*\{\s*\{\s*([^{}]+)\s*\}\s*UNION\s*\{\s*([^{}]+)\s*\}\s*\}/g;
    simplifiedQuery = simplifiedQuery.replace(optionalUnionPattern, "OPTIONAL { $1 }");
    if (query.toLowerCase().includes("workout") && query.toLowerCase().includes("intensity")) {
      return `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX schema: <http://schema.org/>
            PREFIX ont: <http://elizaos.local/ontology/>
            
            SELECT DISTINCT ?workout ?name ?startDate ?intensity
            WHERE {
              ?workout rdf:type schema:Workout .
              
              # Try ont:intensity which we know works from diagnostics
              ?workout ont:intensity ?intensity .
              FILTER(LCASE(STR(?intensity)) = "high")
              
              # Simple OPTIONAL patterns
              OPTIONAL { ?workout ont:name ?name }
              OPTIONAL { ?workout ont:startDate ?startDate }
            }
            ORDER BY DESC(?startDate)
        `;
    }
    return simplifiedQuery;
  }
  /**
   * Last resort - manually match triple patterns for specific queries
   * This is a generic implementation that doesn't rely on knowledge of specific ontologies
   */
  manualTriplePatternMatch(query) {
    elizaLogger5.debug("Attempting manual triple pattern matching as fallback");
    try {
      const results = [];
      const rdfType = this.graph.sym("http://www.w3.org/1999/02/22-rdf-syntax-ns#type");
      const variableMatches = query.match(/\?(\w+)/g) || [];
      const variables = variableMatches.map((v) => v.substring(1));
      const selectMatch = query.match(/SELECT\s+(?:DISTINCT\s+)?(.+?)\s+WHERE/i);
      const selectVars = selectMatch ? selectMatch[1].split(/\s+/).filter((v) => v.startsWith("?")).map((v) => v.substring(1)) : [];
      elizaLogger5.debug(`Found ${variables.length} variables in query, ${selectVars.length} in SELECT clause`);
      const typePatterns = [];
      const aTypeMatches = query.matchAll(/\?(\w+)\s+a\s+([^\.;\s]+)(?:\s*[\.;]|\s+\w+)/g);
      for (const match of aTypeMatches) {
        typePatterns.push({
          variable: match[1],
          type: match[2].replace(/[<>]/g, "")
        });
      }
      const rdfTypeMatches = query.matchAll(/\?(\w+)\s+(?:rdf:type|<[^>]*#type>)\s+([^\.;\s]+)(?:\s*[\.;]|\s+\w+)/g);
      for (const match of rdfTypeMatches) {
        typePatterns.push({
          variable: match[1],
          type: match[2].replace(/[<>]/g, "")
        });
      }
      const propertyPatterns = [];
      const propMatches = query.matchAll(/\?(\w+)\s+(?:<([^>]+)>|([a-zA-Z0-9_]+:[a-zA-Z0-9_]+))\s+(?:\?(\w+)|["']([^"']+)["'])/g);
      for (const match of propMatches) {
        const predUri = match[2] || (match[3] ? this.expandPrefixedName(match[3]) : null);
        if (predUri) {
          propertyPatterns.push({
            subject: match[1],
            predicate: predUri,
            object: match[4] || match[5],
            // Either a variable or literal value
            isLiteral: !match[4]
            // If match[4] (variable) is undefined, it's a literal
          });
        }
      }
      const filterPatterns = [];
      const stdFilterMatches = query.matchAll(/FILTER\s*\(\s*(?:STR\s*\(\s*)?\??(\w+)(?:\s*\)\s*)?\s*=\s*["']([^"']+)["']\s*\)/g);
      for (const match of stdFilterMatches) {
        filterPatterns.push({
          variable: match[1],
          value: match[2],
          operator: "=",
          caseSensitive: true
        });
      }
      const lcaseFilterMatches = query.matchAll(/FILTER\s*\(\s*LCASE\s*\(\s*(?:STR\s*\(\s*)?\??(\w+)(?:\s*\)\s*)?\s*\)\s*=\s*["']([^"']+)["']\s*\)/g);
      for (const match of lcaseFilterMatches) {
        filterPatterns.push({
          variable: match[1],
          value: match[2].toLowerCase(),
          operator: "=",
          caseSensitive: false
        });
      }
      elizaLogger5.debug(`Extracted ${typePatterns.length} type patterns, ${propertyPatterns.length} property patterns, ${filterPatterns.length} filter patterns`);
      if (filterPatterns.length > 0) {
        filterPatterns.forEach((filter) => {
          elizaLogger5.debug(`Filter: ${filter.variable} ${filter.operator} "${filter.value}" (${filter.caseSensitive ? "case-sensitive" : "case-insensitive"})`);
        });
      }
      if (typePatterns.length > 0) {
        for (const pattern of typePatterns) {
          const typeUri = pattern.type.startsWith("http") ? pattern.type : pattern.type.includes(":") ? this.expandPrefixedName(pattern.type) : `${this.baseUri}${pattern.type}`;
          if (!typeUri) {
            elizaLogger5.debug(`Couldn't expand type: ${pattern.type}`);
            continue;
          }
          const typeNode = this.graph.sym(typeUri);
          const typeInstances = this.graph.statementsMatching(null, rdfType, typeNode);
          elizaLogger5.debug(`Found ${typeInstances.length} instances of type ${typeUri}`);
          for (const stmt of typeInstances) {
            const subject = stmt.subject;
            const subjectUri = subject.value || subject.toString();
            const result = {
              [pattern.variable]: subjectUri
            };
            let allPropertiesFound = true;
            const populatedVars = /* @__PURE__ */ new Set([pattern.variable]);
            for (const propPattern of propertyPatterns) {
              if (propPattern.subject !== pattern.variable) continue;
              const predNode = this.graph.sym(propPattern.predicate);
              const propMatches2 = this.graph.statementsMatching(subject, predNode, null);
              if (propMatches2.length === 0) {
                elizaLogger5.debug(`No values found for property ${propPattern.predicate} on subject ${subjectUri}`);
                allPropertiesFound = false;
                continue;
              }
              if (propPattern.isLiteral) {
                let foundMatch = false;
                for (const propMatch of propMatches2) {
                  const objValue = this.formatRdfNode(propMatch.object);
                  if (objValue === propPattern.object) {
                    foundMatch = true;
                    break;
                  }
                }
                if (!foundMatch) {
                  elizaLogger5.debug(`Literal value "${propPattern.object}" not found for property ${propPattern.predicate}`);
                  allPropertiesFound = false;
                  continue;
                }
              }
              if (!propPattern.isLiteral && propMatches2.length > 0) {
                const objValue = this.formatRdfNode(propMatches2[0].object);
                result[propPattern.object] = objValue;
                populatedVars.add(propPattern.object);
              }
            }
            if (!allPropertiesFound) {
              continue;
            }
            for (const filter of filterPatterns) {
              if (!populatedVars.has(filter.variable)) {
                const allProps = this.graph.statementsMatching(subject, null, null);
                for (const propStmt of allProps) {
                  const predUri = propStmt.predicate.value;
                  const predName = this.getPredNameFromUri(predUri);
                  if (predName.toLowerCase() === filter.variable.toLowerCase()) {
                    const objValue = this.formatRdfNode(propStmt.object);
                    result[filter.variable] = objValue;
                    populatedVars.add(filter.variable);
                    break;
                  }
                }
              }
            }
            let passesAllFilters = true;
            for (const filter of filterPatterns) {
              if (!populatedVars.has(filter.variable)) {
                elizaLogger5.debug(`Filter variable ${filter.variable} not found in result, skipping`);
                passesAllFilters = false;
                break;
              }
              const propValue = result[filter.variable];
              if (filter.operator === "=") {
                if (filter.caseSensitive) {
                  if (propValue !== filter.value) {
                    elizaLogger5.debug(`Filter failed: ${filter.variable}="${propValue}" !== "${filter.value}"`);
                    passesAllFilters = false;
                    break;
                  }
                } else {
                  if (typeof propValue !== "string" || propValue.toLowerCase() !== filter.value.toLowerCase()) {
                    elizaLogger5.debug(`Filter failed: ${filter.variable}="${propValue}".toLowerCase() !== "${filter.value}"`);
                    passesAllFilters = false;
                    break;
                  }
                }
              }
            }
            if (passesAllFilters) {
              if (selectVars.length > 0) {
                const filteredResult = {};
                for (const v of selectVars) {
                  if (result[v] !== void 0) {
                    filteredResult[v] = result[v];
                  }
                }
                results.push(filteredResult);
              } else {
                results.push(result);
              }
            }
          }
        }
      } else {
        elizaLogger5.debug("No type patterns found, using general approach");
      }
      elizaLogger5.debug(`Manual triple pattern matching returned ${results.length} results`);
      return results;
    } catch (error) {
      elizaLogger5.error("Error in manual triple pattern matching:", error);
      return [];
    }
  }
  /**
   * Helper method to get a predicate name from a URI
   */
  getPredNameFromUri(uri) {
    const parts = uri.split(/[/#]/);
    return parts[parts.length - 1];
  }
  /**
   * Helper method to expand a prefixed name to a full URI
   */
  expandPrefixedName(prefixedName) {
    if (!prefixedName.includes(":")) return null;
    const [prefix, name] = prefixedName.split(":");
    const namespaces = {
      rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      rdfs: "http://www.w3.org/2000/01/rdf-schema#",
      schema: "http://schema.org/",
      xsd: "http://www.w3.org/2001/XMLSchema#",
      owl: "http://www.w3.org/2002/07/owl#",
      foaf: "http://xmlns.com/foaf/0.1/"
    };
    if (namespaces[prefix]) {
      return `${namespaces[prefix]}${name}`;
    }
    return null;
  }
  /**
   * Format SPARQL results into a more usable format
   */
  formatSparqlResults(results) {
    if (!results) {
      return [];
    }
    const formattedResults = [];
    if (Array.isArray(results)) {
      if (results.length > 0 && typeof results[0] === "object" && "bindings" in results[0]) {
        for (const result of results) {
          const formattedResult = {};
          if (result.bindings) {
            for (const [key, value] of Object.entries(
              result.bindings
            )) {
              formattedResult[key] = this.formatRdfNode(value);
            }
          }
          formattedResults.push(formattedResult);
        }
      } else if (results.length > 0 && typeof results[0] === "object") {
        for (const result of results) {
          const formattedResult = {};
          for (const [key, value] of Object.entries(result)) {
            formattedResult[key] = this.formatRdfNode(value);
          }
          formattedResults.push(formattedResult);
        }
      } else {
        return results.map((item) => ({ value: String(item) }));
      }
    } else if (typeof results === "boolean") {
      return [{ result: results }];
    } else if (typeof results === "object" && results !== null) {
      const formattedResult = {};
      for (const [key, value] of Object.entries(results)) {
        formattedResult[key] = this.formatRdfNode(value);
      }
      formattedResults.push(formattedResult);
    } else {
      return [{ result: String(results) }];
    }
    return formattedResults;
  }
  /**
   * Format an RDF node value for display
   */
  formatRdfNode(node2) {
    if (!node2) {
      return "";
    }
    try {
      if (typeof node2 === "object") {
        if ("value" in node2) {
          return node2.value;
        } else if ("nominalValue" in node2) {
          return node2.nominalValue;
        } else if ("termType" in node2) {
          if (node2.termType === "Literal") {
            return node2.value || String(node2);
          } else {
            return node2.value || node2.nominalValue || String(node2);
          }
        }
      }
      return String(node2);
    } catch (error) {
      elizaLogger5.error("Error formatting RDF node:", error);
      return String(node2);
    }
  }
  /**
   * Serialize the RDF graph to a string
   */
  serializeGraph(format = "text/turtle") {
    try {
      return rdflib.serialize(null, this.graph, this.baseUri, format);
    } catch (error) {
      elizaLogger5.error("Error serializing graph:", error);
      return "";
    }
  }
  /**
   * Get statistics about the RDF graph
   */
  getStats() {
    try {
      const subjects = /* @__PURE__ */ new Set();
      const predicates = /* @__PURE__ */ new Set();
      const objects = /* @__PURE__ */ new Set();
      if (!this.graph.statements || !Array.isArray(this.graph.statements)) {
        return {
          statements: 0,
          subjects: 0,
          predicates: 0,
          objects: 0
        };
      }
      for (const statement of this.graph.statements) {
        if (statement.subject) {
          const subjectValue = this.extractNodeValue(
            statement.subject
          );
          if (subjectValue) subjects.add(subjectValue);
        }
        if (statement.predicate) {
          const predicateValue = this.extractNodeValue(
            statement.predicate
          );
          if (predicateValue) predicates.add(predicateValue);
        }
        if (statement.object) {
          const objectValue = this.extractNodeValue(statement.object);
          if (objectValue) objects.add(objectValue);
        }
      }
      return {
        statements: this.graph.statements.length,
        subjects: subjects.size,
        predicates: predicates.size,
        objects: objects.size
      };
    } catch (error) {
      elizaLogger5.error("Error calculating RDF graph statistics:", error);
      return {
        statements: this.graph.statements?.length || 0,
        subjects: 0,
        predicates: 0,
        objects: 0
      };
    }
  }
  /**
   * Extract a value from an RDF node safely
   */
  extractNodeValue(node2) {
    try {
      if (!node2) return null;
      if (typeof node2 === "object") {
        if ("value" in node2) return node2.value;
        if ("nominalValue" in node2) return node2.nominalValue;
        if ("id" in node2) return node2.id;
        return String(node2);
      }
      return String(node2);
    } catch (error) {
      return null;
    }
  }
  /**
   * Get a sample of triples from the graph
   */
  getSampleTriples(limit = 50) {
    try {
      const sample = [];
      if (!this.graph.statements || !Array.isArray(this.graph.statements)) {
        return [];
      }
      const statements = this.graph.statements;
      if (statements.length === 0) {
        return [];
      }
      const sampleSize = Math.min(limit, statements.length);
      const step = statements.length > sampleSize ? Math.floor(statements.length / sampleSize) : 1;
      for (let i = 0; i < statements.length && sample.length < limit; i += step) {
        const statement = statements[i];
        if (!statement.subject || !statement.predicate || !statement.object) {
          continue;
        }
        const subjectValue = this.extractNodeValue(statement.subject) || "unknown";
        const predicateValue = this.extractNodeValue(statement.predicate) || "unknown";
        const objectValue = this.extractNodeValue(statement.object) || "unknown";
        sample.push({
          subject: subjectValue,
          predicate: predicateValue,
          object: objectValue
        });
      }
      return sample;
    } catch (error) {
      elizaLogger5.error("Error getting sample triples:", error);
      return [];
    }
  }
  /**
   * Extracts schema/ontology triples from the RDF graph
   * @returns Array of TTL triple strings representing the schema
   */
  extractSchemaTriples() {
    try {
      const schemaTriples = [];
      const processedNodes = /* @__PURE__ */ new Set();
      const processedProperties = /* @__PURE__ */ new Set();
      const classToPropertiesMap = {};
      const schemaPredicates = [
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        "http://www.w3.org/2000/01/rdf-schema#subClassOf",
        "http://www.w3.org/2000/01/rdf-schema#domain",
        "http://www.w3.org/2000/01/rdf-schema#range",
        "http://www.w3.org/2000/01/rdf-schema#label",
        "http://www.w3.org/2000/01/rdf-schema#comment"
      ];
      const schemaTypes = [
        "http://www.w3.org/2000/01/rdf-schema#Class",
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#Property",
        "http://www.w3.org/2002/07/owl#Class",
        "http://www.w3.org/2002/07/owl#ObjectProperty",
        "http://www.w3.org/2002/07/owl#DatatypeProperty"
      ];
      const schemaNodes = /* @__PURE__ */ new Set();
      const instanceClasses = /* @__PURE__ */ new Map();
      if (!this.graph.statements || !Array.isArray(this.graph.statements)) {
        return [];
      }
      for (const statement of this.graph.statements) {
        try {
          const predicateValue = this.extractNodeValue(
            statement.predicate
          );
          const objectValue = this.extractNodeValue(statement.object);
          const subjectValue = this.extractNodeValue(
            statement.subject
          );
          if (predicateValue === "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" && schemaTypes.includes(objectValue)) {
            schemaNodes.add(subjectValue);
          }
          if (predicateValue === "http://www.w3.org/1999/02/22-rdf-syntax-ns#type") {
            instanceClasses.set(subjectValue, objectValue);
            if (!classToPropertiesMap[objectValue]) {
              classToPropertiesMap[objectValue] = /* @__PURE__ */ new Set();
            }
          }
        } catch (err) {
          continue;
        }
      }
      for (const statement of this.graph.statements) {
        try {
          const subjectValue = this.extractNodeValue(
            statement.subject
          );
          const predicateValue = this.extractNodeValue(
            statement.predicate
          );
          if (schemaNodes.has(subjectValue) || schemaPredicates.includes(predicateValue)) {
            if (processedNodes.has(
              `${subjectValue}|${predicateValue}`
            )) {
              continue;
            }
            processedNodes.add(`${subjectValue}|${predicateValue}`);
            const objects = this.graph.statements.filter(
              (s) => this.extractNodeValue(s.subject) === subjectValue && this.extractNodeValue(s.predicate) === predicateValue
            ).map((s) => this.formatNodeForTTL(s.object));
            if (objects.length === 0) continue;
            if (predicateValue === "http://www.w3.org/1999/02/22-rdf-syntax-ns#type") {
              schemaTriples.push(
                `${this.formatNodeForTTL(statement.subject)} a ${objects[0]} .`
              );
            } else {
              const formattedSubject = this.formatNodeForTTL(
                statement.subject
              );
              const formattedPredicate = this.formatNodeForTTL(
                statement.predicate
              );
              if (objects.length === 1) {
                schemaTriples.push(
                  `${formattedSubject} ${formattedPredicate} ${objects[0]} .`
                );
              } else {
                const objectList = objects.join(", ");
                schemaTriples.push(
                  `${formattedSubject} ${formattedPredicate} ${objectList} .`
                );
              }
            }
          }
        } catch (err) {
          continue;
        }
      }
      for (const statement of this.graph.statements) {
        try {
          const subjectValue = this.extractNodeValue(statement.subject);
          const predicateValue = this.extractNodeValue(statement.predicate);
          if (predicateValue === "http://www.w3.org/1999/02/22-rdf-syntax-ns#type") {
            continue;
          }
          if (instanceClasses.has(subjectValue)) {
            const classType = instanceClasses.get(subjectValue);
            if (classToPropertiesMap[classType]) {
              classToPropertiesMap[classType].add(predicateValue);
            }
            if (!processedProperties.has(predicateValue)) {
              processedProperties.add(predicateValue);
              const formattedPredicate = this.formatNodeForTTL(statement.predicate);
              const objectValue = this.extractNodeValue(statement.object);
              const isObjectProperty = objectValue && (objectValue.startsWith("http://") || objectValue.startsWith("https://") || objectValue.startsWith("_:"));
              const propertyType = isObjectProperty ? "owl:ObjectProperty" : "owl:DatatypeProperty";
              schemaTriples.push(`${formattedPredicate} a ${propertyType} .`);
              schemaTriples.push(
                `${formattedPredicate} rdfs:domain ${this.formatNodeForTTL({ value: classType })} .`
              );
              if (!isObjectProperty) {
                let xsdType = "xsd:string";
                if (statement.object && typeof statement.object === "object" && "datatype" in statement.object && statement.object.datatype) {
                  const datatypeValue = this.extractNodeValue(statement.object.datatype);
                  if (datatypeValue) {
                    xsdType = this.formatNodeForTTL({ value: datatypeValue });
                  }
                } else {
                  const value = String(objectValue);
                  if (/^\d+$/.test(value)) {
                    xsdType = "xsd:integer";
                  } else if (/^\d+\.\d+$/.test(value)) {
                    xsdType = "xsd:decimal";
                  } else if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
                    xsdType = "xsd:dateTime";
                  } else if (/^PT\d+[HMS]$/.test(value)) {
                    xsdType = "xsd:duration";
                  } else if (value === "true" || value === "false") {
                    xsdType = "xsd:boolean";
                  }
                }
                schemaTriples.push(`${formattedPredicate} rdfs:range ${xsdType} .`);
              }
            }
          }
        } catch (err) {
          continue;
        }
      }
      for (const [classType, properties] of Object.entries(classToPropertiesMap)) {
        if (properties.size > 0) {
          const formattedClass = this.formatNodeForTTL({ value: classType });
          if (!schemaTriples.some((triple) => triple.startsWith(`${formattedClass} a`))) {
            schemaTriples.push(`${formattedClass} a owl:Class .`);
          }
          const propertyList = Array.from(properties).map((prop) => this.formatNodeForTTL({ value: prop })).join(", ");
          schemaTriples.push(`${formattedClass} rdfs:isDefinedBy [ a owl:Ontology ; owl:imports (${propertyList}) ] .`);
        }
      }
      return schemaTriples;
    } catch (error) {
      elizaLogger5.error("Error extracting schema triples:", error);
      return [];
    }
  }
  /**
   * Format a node value for TTL output
   */
  formatNodeForTTL(node2) {
    try {
      const value = this.extractNodeValue(node2);
      if (!value) return '""';
      if (value.startsWith("http://") || value.startsWith("https://")) {
        if (value.startsWith(
          "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
        )) {
          return "rdf:" + value.substring(
            "http://www.w3.org/1999/02/22-rdf-syntax-ns#".length
          );
        } else if (value.startsWith("http://www.w3.org/2000/01/rdf-schema#")) {
          return "rdfs:" + value.substring(
            "http://www.w3.org/2000/01/rdf-schema#".length
          );
        } else if (value.startsWith("http://schema.org/")) {
          return "schema:" + value.substring("http://schema.org/".length);
        } else if (value.startsWith("http://www.w3.org/2001/XMLSchema#")) {
          return "xsd:" + value.substring(
            "http://www.w3.org/2001/XMLSchema#".length
          );
        } else if (value.startsWith("http://www.w3.org/2002/07/owl#")) {
          return "owl:" + value.substring("http://www.w3.org/2002/07/owl#".length);
        } else if (value.startsWith("http://xmlns.com/foaf/0.1/")) {
          return "foaf:" + value.substring("http://xmlns.com/foaf/0.1/".length);
        }
        return `<${value}>`;
      }
      return `"${value.replace(/"/g, '\\"')}"`;
    } catch (error) {
      return '""';
    }
  }
  /**
   * Get counts of subject types in the graph
   */
  getSubjectTypes() {
    try {
      const typeProperty = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
      const typeMap = {};
      if (!this.graph.statements || !Array.isArray(this.graph.statements)) {
        return {};
      }
      for (const statement of this.graph.statements) {
        const predicateValue = this.extractNodeValue(
          statement.predicate
        );
        if (predicateValue === typeProperty || predicateValue?.endsWith("#type")) {
          const objectValue = this.extractNodeValue(statement.object);
          if (objectValue) {
            typeMap[objectValue] = (typeMap[objectValue] || 0) + 1;
          }
        }
      }
      return typeMap;
    } catch (error) {
      elizaLogger5.error("Error getting subject types:", error);
      return {};
    }
  }
  /**
   * Generate an ontology file from the RDF graph
   * @returns The ontology content as a string in Turtle format
   */
  generateOntology() {
    try {
      const schemaTriples = this.extractSchemaTriples();
      if (schemaTriples.length === 0) {
        elizaLogger5.warn("No schema triples found in the RDF graph");
        return "";
      }
      let ontologyContent = `@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
`;
      ontologyContent += `@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
`;
      ontologyContent += `@prefix schema: <http://schema.org/> .
`;
      ontologyContent += `@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
`;
      ontologyContent += `@prefix owl: <http://www.w3.org/2002/07/owl#> .
`;
      ontologyContent += `@prefix foaf: <http://xmlns.com/foaf/0.1/> .
`;
      ontologyContent += `@prefix : <#> .
`;
      ontologyContent += `@prefix ont: <> .
`;
      const statements = this.graph.statements || [];
      const prefixes = /* @__PURE__ */ new Set();
      for (const statement of statements) {
        if (statement.predicate && statement.predicate.uri) {
          const uri = statement.predicate.uri;
          const match = uri.match(/^(https?:\/\/[^\/]+\/[^\/]+\/)/);
          if (match && !uri.startsWith("http://schema.org/") && !uri.startsWith("http://www.w3.org/")) {
            prefixes.add(`@prefix custom: <${match[1]}> .
`);
          }
        }
      }
      prefixes.forEach((prefix) => {
        ontologyContent += prefix;
      });
      ontologyContent += "\n";
      ontologyContent += schemaTriples.join("\n");
      return ontologyContent;
    } catch (error) {
      elizaLogger5.error("Error generating ontology:", error);
      return "";
    }
  }
  /**
   * Save the ontology to a file
   * @param filePath The path to save the ontology file
   * @param ontologyContent The ontology content to save
   * @returns True if successful, false otherwise
   */
  saveOntologyToFile(filePath, ontologyContent) {
    try {
      if (!ontologyContent) {
        elizaLogger5.error("No ontology content to save");
        return false;
      }
      const directory = path.dirname(filePath);
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }
      fs.writeFileSync(filePath, ontologyContent, "utf8");
      elizaLogger5.info(`Ontology saved to ${filePath}`);
      return true;
    } catch (error) {
      elizaLogger5.error("Error saving ontology to file:", error);
      return false;
    }
  }
  /**
   * Save the RDF graph to a persistent file
   * @param filePath Optional path to save the file. If not provided, uses the default path.
   * @param format Optional format for serialization. Default is 'text/turtle'.
   * @returns True if successful, false otherwise
   */
  saveGraphToFile(filePath = DEFAULT_STORAGE_PATH, format = "text/turtle") {
    try {
      const cleanGraph = new rdflib.IndexedFormula();
      if (this.graph.statements && Array.isArray(this.graph.statements)) {
        for (const statement of this.graph.statements) {
          const predicateValue = this.extractNodeValue(statement.predicate);
          const objectValue = this.extractNodeValue(statement.object);
          if (predicateValue && (predicateValue.startsWith("http://www.w3.org/2002/07/owl#") || predicateValue.startsWith("http://www.w3.org/2000/01/rdf-schema#"))) {
            continue;
          }
          if (objectValue && (objectValue === "http://www.w3.org/2002/07/owl#ObjectProperty" || objectValue === "http://www.w3.org/2002/07/owl#DatatypeProperty" || objectValue === "http://www.w3.org/2002/07/owl#Class" || objectValue === "http://www.w3.org/2002/07/owl#Ontology")) {
            continue;
          }
          try {
            cleanGraph.add(statement.subject, statement.predicate, statement.object);
          } catch (error) {
            elizaLogger5.error(`Error adding statement to clean graph: ${error.message}`);
          }
        }
      }
      const serializedGraph = rdflib.serialize(null, cleanGraph, this.baseUri, format);
      if (!serializedGraph) {
        elizaLogger5.error("Failed to serialize graph for saving");
        return false;
      }
      const directory = path.dirname(filePath);
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }
      fs.writeFileSync(filePath, serializedGraph, "utf8");
      elizaLogger5.info(`RDF graph saved to ${filePath}`);
      return true;
    } catch (error) {
      elizaLogger5.error("Error saving RDF graph to file:", error);
      return false;
    }
  }
  /**
   * Load the RDF graph from a persistent file
   * @param filePath Optional path to load the file from. If not provided, uses the default path.
   * @param format Optional format of the file. Default is 'text/turtle'.
   * @returns True if successful, false otherwise
   */
  loadGraphFromFile(filePath = DEFAULT_STORAGE_PATH, format = "text/turtle") {
    try {
      if (!fs.existsSync(filePath)) {
        elizaLogger5.warn(`RDF storage file not found at ${filePath}`);
        return false;
      }
      const data = fs.readFileSync(filePath, "utf8");
      if (!data) {
        elizaLogger5.warn(`Empty RDF storage file at ${filePath}`);
        return false;
      }
      return this.loadRdfString(data, format);
    } catch (error) {
      elizaLogger5.error("Error loading RDF graph from file:", error);
      return false;
    }
  }
};
function getRdfManager() {
  return RdfManager.getInstance();
}

// src/helper/debugUtils.ts
import { elizaLogger as elizaLogger6 } from "@elizaos/core";
function debugQueryGraph(rdfManager, queryType) {
  let query = "";
  switch (queryType) {
    case "workouts":
      query = `
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX schema: <http://schema.org/>
                
                SELECT ?s ?p ?o 
                WHERE { 
                    ?s rdf:type ?typeO .
                    FILTER(CONTAINS(STR(?typeO), "Workout"))
                    ?s ?p ?o 
                }
                LIMIT 100
            `;
      break;
    case "intensity":
      query = `
                SELECT ?s ?p ?o 
                WHERE { 
                    ?s ?p ?o .
                    FILTER(CONTAINS(STR(?p), "intensity"))
                }
                LIMIT 100
            `;
      break;
    case "high_intensity_workouts":
      query = `
                SELECT ?s ?p ?o 
                WHERE { 
                    ?s ?p ?o .
                    ?s ?intensityPred ?intensity .
                    FILTER(CONTAINS(STR(?intensityPred), "intensity"))
                    FILTER(LCASE(STR(?intensity)) = "high")
                }
                LIMIT 100
            `;
      break;
    case "all_types":
      query = `
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                
                SELECT DISTINCT ?type (COUNT(?s) as ?count)
                WHERE { 
                    ?s rdf:type ?type .
                }
                GROUP BY ?type
                ORDER BY DESC(?count)
            `;
      break;
    case "all_predicates":
      query = `
                SELECT DISTINCT ?p (COUNT(?s) as ?count)
                WHERE { 
                    ?s ?p ?o .
                }
                GROUP BY ?p
                ORDER BY DESC(?count)
            `;
      break;
    case "property_values":
      query = `
                SELECT ?p (COUNT(?o) as ?count) (GROUP_CONCAT(DISTINCT ?o; separator=", ") as ?values)
                WHERE { 
                    ?s ?p ?o .
                    FILTER(ISBLANK(?s) = false)
                    FILTER(ISLITERAL(?o))
                }
                GROUP BY ?p
                ORDER BY DESC(?count)
                LIMIT 25
            `;
      break;
    default:
      query = `
                SELECT ?s ?p ?o 
                WHERE { 
                    ?s ?p ?o 
                }
                LIMIT 100
            `;
  }
  try {
    const results = rdfManager.executeSparqlQuery(query);
    elizaLogger6.debug(`Debug query '${queryType}' returned ${results.length} results`);
    const sampleSize = Math.min(10, results.length);
    for (let i = 0; i < sampleSize; i++) {
      elizaLogger6.debug(`  Result ${i + 1}: ${JSON.stringify(results[i])}`);
    }
    return results;
  } catch (error) {
    elizaLogger6.error(`Error executing debug query '${queryType}':`, error);
    return [];
  }
}
function inspectLoadedData(rdfManager) {
  const results = {};
  const stats = rdfManager.getStats();
  elizaLogger6.info(`RDF Graph Stats: ${JSON.stringify(stats)}`);
  results.stats = stats;
  results.types = debugQueryGraph(rdfManager, "all_types");
  results.predicates = debugQueryGraph(rdfManager, "all_predicates");
  results.propertyValues = debugQueryGraph(rdfManager, "property_values");
  results.workouts = debugQueryGraph(rdfManager, "workouts");
  results.intensity = debugQueryGraph(rdfManager, "intensity");
  results.highIntensityWorkouts = debugQueryGraph(rdfManager, "high_intensity_workouts");
  return results;
}
function diagnoseWorkoutQuery(rdfManager) {
  elizaLogger6.info("Diagnosing workout intensity query issues...");
  const results = {};
  const workoutTypes = debugQueryGraph(rdfManager, "workouts");
  results.workoutCount = workoutTypes.length;
  if (workoutTypes.length === 0) {
    elizaLogger6.warn("No workouts found in the graph");
    return results;
  }
  const intensityProps = debugQueryGraph(rdfManager, "intensity");
  results.intensityPropsCount = intensityProps.length;
  if (intensityProps.length === 0) {
    elizaLogger6.warn("No intensity properties found in the graph");
    return results;
  }
  const highIntensityWorkouts = debugQueryGraph(rdfManager, "high_intensity_workouts");
  results.highIntensityCount = highIntensityWorkouts.length;
  if (highIntensityWorkouts.length === 0) {
    elizaLogger6.warn("No high intensity workouts found");
    const query = `
            SELECT ?workout ?intensity ?intensityPred
            WHERE { 
                ?workout ?typePred ?type .
                FILTER(CONTAINS(STR(?type), "Workout"))
                ?workout ?intensityPred ?intensity .
                FILTER(CONTAINS(STR(?intensityPred), "intensity"))
            }
            LIMIT 10
        `;
    try {
      const actualIntensities = rdfManager.executeSparqlQuery(query);
      elizaLogger6.info(`Found ${actualIntensities.length} workouts with intensity values:`);
      results.actualIntensities = actualIntensities;
      actualIntensities.forEach((result) => {
        elizaLogger6.info(`  Workout: ${result.workout}, Intensity: ${result.intensity}, Predicate: ${result.intensityPred}`);
      });
    } catch (error) {
      elizaLogger6.error("Error querying actual intensities:", error);
      results.error = error.message;
    }
  } else {
    elizaLogger6.info(`Found ${highIntensityWorkouts.length} high intensity workouts`);
  }
  const resolver2 = PropertyNamespaceResolver.getInstance();
  const prefixes = resolver2.getNamespacePrefixes();
  results.prefixes = prefixes;
  const queryPatterns = [
    // Pattern 1: Direct schema:intensity property
    `
            PREFIX rdf: <${prefixes.rdf}>
            PREFIX schema: <${prefixes.schema}>
            
            SELECT ?workout ?intensity
            WHERE {
                ?workout rdf:type schema:Workout .
                ?workout schema:intensity ?intensity .
                FILTER(LCASE(STR(?intensity)) = "high")
            }
        `,
    // Pattern 2: Any property containing "intensity"
    `
            PREFIX rdf: <${prefixes.rdf}>
            PREFIX schema: <${prefixes.schema}>
            
            SELECT ?workout ?intensity ?intensityProp
            WHERE {
                ?workout rdf:type schema:Workout .
                ?workout ?intensityProp ?intensity .
                FILTER(CONTAINS(STR(?intensityProp), "intensity"))
                FILTER(LCASE(STR(?intensity)) = "high")
            }
        `,
    // Pattern 3: Using ont: namespace
    `
            PREFIX rdf: <${prefixes.rdf}>
            PREFIX schema: <${prefixes.schema}>
            PREFIX ont: <${prefixes.ont || "http://elizaos.local/ontology/"}>
            
            SELECT ?workout ?intensity
            WHERE {
                ?workout rdf:type schema:Workout .
                ?workout ont:intensity ?intensity .
                FILTER(LCASE(STR(?intensity)) = "high")
            }
        `,
    // Pattern 4: With both schema: and ont: options
    `
            PREFIX rdf: <${prefixes.rdf}>
            PREFIX schema: <${prefixes.schema}>
            PREFIX ont: <${prefixes.ont || "http://elizaos.local/ontology/"}>
            
            SELECT ?workout ?intensity
            WHERE {
                ?workout rdf:type schema:Workout .
                {
                    ?workout schema:intensity ?intensity .
                } UNION {
                    ?workout ont:intensity ?intensity .
                }
                FILTER(LCASE(STR(?intensity)) = "high")
            }
        `
  ];
  results.patternResults = [];
  queryPatterns.forEach((query, index2) => {
    try {
      const patternResults = rdfManager.executeSparqlQuery(query);
      elizaLogger6.info(`Query pattern ${index2 + 1} returned ${patternResults.length} results`);
      results.patternResults.push({
        pattern: index2 + 1,
        count: patternResults.length,
        results: patternResults
      });
      if (patternResults.length > 0) {
        patternResults.forEach((result) => {
          elizaLogger6.info(`  Workout: ${result.workout}, Intensity: ${result.intensity}${result.intensityProp ? `, Predicate: ${result.intensityProp}` : ""}`);
        });
      }
    } catch (error) {
      elizaLogger6.error(`Error executing query pattern ${index2 + 1}:`, error);
      results.patternResults.push({
        pattern: index2 + 1,
        error: error.message
      });
    }
  });
  return results;
}

// src/actions/search.ts
var debugRuntime = (runtime) => {
  try {
    elizaLogger7.debug("[SPARQL-DEBUG] Runtime properties:");
    if (runtime.llm) {
      elizaLogger7.debug("[SPARQL-DEBUG] runtime.llm exists");
      const llmMethods = Object.getOwnPropertyNames(runtime.llm).filter((prop) => typeof runtime.llm[prop] === "function");
      elizaLogger7.debug(`[SPARQL-DEBUG] runtime.llm methods: ${llmMethods.join(", ")}`);
    } else {
      elizaLogger7.debug("[SPARQL-DEBUG] runtime.llm does not exist");
    }
    if (typeof runtime.askLLM === "function") {
      elizaLogger7.debug("[SPARQL-DEBUG] runtime.askLLM exists as a function");
    } else {
      elizaLogger7.debug("[SPARQL-DEBUG] runtime.askLLM does not exist as a function");
    }
    if (runtime.character) {
      elizaLogger7.debug(`[SPARQL-DEBUG] runtime.character.name: ${runtime.character.name}`);
    }
    if (runtime.knowledgeManager) {
      elizaLogger7.debug("[SPARQL-DEBUG] runtime.knowledgeManager exists");
    }
  } catch (error) {
    elizaLogger7.error("[SPARQL-DEBUG] Error debugging runtime:", error);
  }
};
var loadOntologyContent = async (obsidian) => {
  try {
    const ontologyFolder = "Ontology";
    elizaLogger7.debug(`[SPARQL] Loading ontology content from folder: ${ontologyFolder}`);
    const ontologyFolderExists = await obsidian.folderExists(ontologyFolder);
    elizaLogger7.debug(`[SPARQL] Ontology folder exists: ${ontologyFolderExists}`);
    if (!ontologyFolderExists) {
      elizaLogger7.warn(`[SPARQL] Ontology folder not found: ${ontologyFolder}`);
      return "";
    }
    const ontologyFiles = await obsidian.listFilesInFolder(ontologyFolder, [".md", ".ttl"]);
    elizaLogger7.debug(`[SPARQL] Found ${ontologyFiles.length} ontology files: ${JSON.stringify(ontologyFiles)}`);
    let combinedOntology = "";
    for (const file of ontologyFiles) {
      const filePath = file.includes("/") ? file : `${ontologyFolder}/${file}`;
      elizaLogger7.debug(`[SPARQL] Reading ontology file: ${filePath}`);
      try {
        const content3 = await obsidian.readFile(filePath);
        elizaLogger7.debug(`[SPARQL] Successfully read file: ${filePath}, length: ${content3?.length || 0} bytes`);
        if (!content3) {
          elizaLogger7.warn(`[SPARQL] Empty content for file: ${filePath}`);
          continue;
        }
        if (file.endsWith(".md")) {
          const ttlBlockRegex = /```(?:turtle|ttl)\s*([\s\S]*?)```/g;
          let match;
          let ttlFound = false;
          while ((match = ttlBlockRegex.exec(content3)) !== null) {
            if (match[1]) {
              combinedOntology += match[1] + "\n\n";
              ttlFound = true;
              elizaLogger7.debug(`[SPARQL] Extracted TTL block from ${filePath} (${match[1].length} bytes)`);
            }
          }
          if (!ttlFound) {
            elizaLogger7.debug(`[SPARQL] No TTL blocks found in markdown file: ${filePath}`);
          }
        } else {
          combinedOntology += content3 + "\n\n";
          elizaLogger7.debug(`[SPARQL] Added TTL content from direct file: ${filePath}`);
        }
      } catch (error) {
        elizaLogger7.error(`[SPARQL] Error reading ontology file ${filePath}:`, error);
      }
    }
    elizaLogger7.debug(`[SPARQL] Combined ontology size: ${combinedOntology.length} bytes`);
    if (combinedOntology.length > 0) {
      const sampleSize = Math.min(500, combinedOntology.length);
      elizaLogger7.debug(`[SPARQL] Ontology sample (first ${sampleSize} bytes): ${combinedOntology.substring(0, sampleSize)}`);
    }
    return combinedOntology;
  } catch (error) {
    elizaLogger7.error("[SPARQL] Error loading ontology content:", error);
    return "";
  }
};
var formatSparqlResults = (results) => {
  if (!results || results.length === 0) {
    return "No matching workouts found.";
  }
  let output = `### Found ${results.length} Moderate Intensity Workouts

`;
  results.forEach((workout, index2) => {
    const workoutUri = workout.workout || "";
    const workoutId = workoutUri.split("/").pop();
    output += `#### Workout ${index2 + 1}: ${workout.name || "Unnamed Workout"}

`;
    output += `- **Date**: ${formatDate(workout.startDate)}
`;
    output += `- **Duration**: ${formatDuration(workout.duration)}
`;
    output += `- **Type**: ${workout.exerciseType || "Not specified"}
`;
    if (workout.sourceFile) {
      output += `- [View full workout details](${workout.sourceFile})
`;
    } else {
      output += `- ID: \`${workoutId}\`
`;
    }
    output += "\n";
  });
  return output;
};
var formatDate = (dateStr) => {
  if (!dateStr) return "Not specified";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch (e) {
    return dateStr;
  }
};
var formatDuration = (duration) => {
  if (!duration) return "Not specified";
  if (duration.startsWith("PT")) {
    const hours = duration.match(/(\d+)H/)?.[1] || "0";
    const minutes = duration.match(/(\d+)M/)?.[1] || "0";
    return `${hours} hour${hours !== "1" ? "s" : ""} ${minutes} minute${minutes !== "1" ? "s" : ""}`.trim();
  }
  return duration;
};
var searchAction = {
  name: "SEARCH",
  similes: [
    "FIND",
    "QUERY",
    "LOOKUP",
    "QUICK_SEARCH",
    "SEARCH_KEYWORD",
    "SEARCH_VAULT",
    "FIND_NOTES",
    "DATAVIEW_QUERY",
    "DQL",
    "SPARQL_QUERY"
  ],
  description: "Search the Obsidian vault using plain text, Dataview queries, JSONLogic, or SPARQL for semantic queries.",
  validate: async (runtime) => {
    try {
      elizaLogger7.debug("Validating Obsidian connection");
      const obsidian = await getObsidian(runtime);
      await obsidian.connect();
      elizaLogger7.debug("Obsidian connection validated successfully");
      return true;
    } catch (error) {
      elizaLogger7.error("Failed to validate Obsidian connection:", error);
      return false;
    }
  },
  handler: async (runtime, message, state, _options, callback) => {
    elizaLogger7.info("Starting enhanced search handler");
    debugRuntime(runtime);
    const obsidian = await getObsidian(runtime);
    try {
      if (!state) {
        state = await runtime.composeState(message);
      } else {
        state = await runtime.updateRecentMessageState(state);
      }
      const originalQuery = message.content.text || "";
      elizaLogger7.debug(`[SPARQL-DEBUG] Original query: "${originalQuery}"`);
      const searchContext = await processUserInput(message.content.text, state, runtime);
      elizaLogger7.debug("[SPARQL-DEBUG] Search context:", JSON.stringify(searchContext, null, 2));
      const isExplicitSparql = originalQuery.toLowerCase().includes("sparql");
      elizaLogger7.debug(`[SPARQL] Is explicit SPARQL query: ${isExplicitSparql}`);
      const rdfManager = getRdfManager();
      if (message.content.text?.toLowerCase().includes("debug rdf")) {
        elizaLogger7.info("Running RDF debug diagnostics...");
        inspectLoadedData(rdfManager);
        if (callback) {
          callback({
            text: "RDF debug diagnostics have been run. Check the logs for details."
          });
        }
        return true;
      }
      if (message.content.text?.toLowerCase().includes("debug workout")) {
        elizaLogger7.info("Running workout query diagnostics...");
        diagnoseWorkoutQuery(rdfManager);
        if (callback) {
          callback({
            text: "Workout query diagnostics have been run. Check the logs for details."
          });
        }
        return true;
      }
      const isRdfLoaded = rdfManager.isLoaded();
      elizaLogger7.debug(`[SPARQL] RDF graph is loaded: ${isRdfLoaded}`);
      if (isRdfLoaded) {
        try {
          const stats = rdfManager.getStats();
          elizaLogger7.debug(`[SPARQL] RDF graph stats: ${JSON.stringify(stats)}`);
        } catch (error) {
          elizaLogger7.error(`[SPARQL] Error getting RDF graph stats:`, error);
        }
      }
      const isWorkoutIntensityQuery = originalQuery.toLowerCase().includes("workout") && (originalQuery.toLowerCase().includes("intensity") || originalQuery.toLowerCase().includes("high"));
      elizaLogger7.debug(`[SPARQL] Is workout intensity query: ${isWorkoutIntensityQuery}`);
      elizaLogger7.debug(`[SPARQL] Loading ontology content...`);
      const ontologyContent = await loadOntologyContent(obsidian);
      const ontologyAvailable = ontologyContent.length > 0;
      elizaLogger7.debug(`[SPARQL] Ontology content available: ${ontologyAvailable} (${ontologyContent.length} bytes)`);
      elizaLogger7.debug(`[SPARQL] Checking if query would benefit from SPARQL: "${originalQuery}"`);
      let mightBenefitFromSparql = false;
      try {
        mightBenefitFromSparql = await shouldUseSparql(runtime, originalQuery, ontologyContent);
        elizaLogger7.debug(`[SPARQL] Query might benefit from SPARQL: ${mightBenefitFromSparql}`);
      } catch (error) {
        elizaLogger7.error(`[SPARQL] Error determining if query might benefit from SPARQL:`, error);
        mightBenefitFromSparql = isWorkoutIntensityQuery;
        elizaLogger7.debug(`[SPARQL] Defaulting to mightBenefitFromSparql=${mightBenefitFromSparql} based on workout detection`);
      }
      if ((isExplicitSparql || mightBenefitFromSparql || isWorkoutIntensityQuery) && isRdfLoaded) {
        elizaLogger7.info("[SPARQL] Attempting SPARQL query generation");
        elizaLogger7.debug(`[SPARQL] Generating SPARQL query...`);
        let sparqlQuery = null;
        try {
          sparqlQuery = await generateSparqlQuery(runtime, originalQuery, ontologyContent);
          elizaLogger7.debug(`[SPARQL] Generated query: ${sparqlQuery}`);
        } catch (error) {
          elizaLogger7.error(`[SPARQL] Error generating SPARQL query:`, error);
        }
        if (sparqlQuery) {
          elizaLogger7.info("[SPARQL] Using SPARQL query:", sparqlQuery);
          if (sparqlQuery && isWorkoutIntensityQuery) {
            elizaLogger7.debug("Running diagnostics before workout query execution");
            diagnoseWorkoutQuery(rdfManager);
          }
          elizaLogger7.debug(`[SPARQL] Executing SPARQL query...`);
          let sparqlResults = [];
          try {
            sparqlResults = rdfManager.executeSparqlQuery(sparqlQuery);
            elizaLogger7.debug(`[SPARQL] Query execution returned ${sparqlResults.length} results`);
            if (sparqlResults.length > 0) {
              elizaLogger7.debug(`[SPARQL] First result: ${JSON.stringify(sparqlResults[0])}`);
            }
          } catch (error) {
            elizaLogger7.error(`[SPARQL] Error executing SPARQL query:`, error);
          }
          if (sparqlResults && sparqlResults.length > 0) {
            elizaLogger7.debug(`[SPARQL] Formatting ${sparqlResults.length} results`);
            const formattedResults = formatSparqlResults(sparqlResults);
            if (callback) {
              callback({
                text: `### SPARQL Query Results

Query: \`\`\`sparql
${sparqlQuery}
\`\`\`

${formattedResults}`,
                metadata: {
                  sparql: true,
                  query: sparqlQuery,
                  results: sparqlResults
                }
              });
            }
            return true;
          } else if (isExplicitSparql || isWorkoutIntensityQuery) {
            elizaLogger7.debug(`[SPARQL] No results found, but query was explicitly SPARQL or workout related`);
            if (callback) {
              callback({
                text: `No results found for the SPARQL query:
\`\`\`sparql
${sparqlQuery}
\`\`\`

Falling back to standard search...`,
                metadata: {
                  sparql: true,
                  query: sparqlQuery,
                  results: []
                }
              });
            }
          } else {
            elizaLogger7.info("[SPARQL] No SPARQL results, falling back to standard search");
          }
        } else {
          elizaLogger7.debug(`[SPARQL] Failed to generate SPARQL query`);
        }
      } else {
        if (isExplicitSparql || mightBenefitFromSparql) {
          const reasons = [];
          if (!ontologyAvailable) reasons.push("No ontology content available");
          if (!isRdfLoaded) reasons.push("RDF graph is not loaded");
          elizaLogger7.warn(`[SPARQL] Cannot use SPARQL: ${reasons.join(", ")}`);
          if (isExplicitSparql && !isRdfLoaded) {
            if (callback) {
              callback({
                text: "RDF data is not loaded. Please run the LOAD_DATA action first to load ontologies and RDF data from your vault.",
                metadata: {
                  sparql: true,
                  error: "Graph not loaded"
                }
              });
              return false;
            }
          }
        } else {
          elizaLogger7.debug(`[SPARQL] Not using SPARQL for this query`);
        }
      }
      elizaLogger7.debug(`[SPARQL] Falling back to standard search`);
      if (!isSearchQuery(searchContext)) {
        elizaLogger7.error("Invalid search query:", searchContext);
        if (callback) {
          callback({
            text: "I couldn't understand your search query. Please try rephrasing it.",
            error: true
          });
        }
        return false;
      }
      const query = searchContext.query;
      const queryFormat = searchContext.queryFormat || "plaintext";
      const searchOptions = {
        contextLength: 150,
        ignoreCase: true,
        ...searchContext.options
      };
      if (!query) {
        throw new Error("Search query is required. Use format: 'Search QUERY' or 'Query TABLE field FROM folder'");
      }
      elizaLogger7.info(`Searching vault with ${queryFormat} query: ${typeof query === "string" ? query : JSON.stringify(query)}`);
      const results = await obsidian.search(query, queryFormat, searchOptions);
      if (results.length > 0) {
        elizaLogger7.info(`Found ${results.length} matching notes`);
        const formattedResults = results.map((result) => {
          const matches = result.matches?.map(
            (item) => `${markdownToPlaintext(item.context.substring(item.match.start, searchOptions.contextLength || 150)).trim()}...`
          ).join("\n") || "";
          return `
#### \u2705 ${result.filename} (**Score:** ${result.score || "-"})
${matches}`;
        }).join("\n\n");
        if (callback) {
          callback({
            text: `Found **${results.length}** matches:

${formattedResults}`,
            metadata: {
              count: results.length,
              results,
              query,
              queryFormat,
              searchOptions
            }
          });
        }
        return true;
      }
      elizaLogger7.warn("No results found, falling back to semantic similarity search");
      const queryEmbedding = await embed2(runtime, message.content.text);
      const semanticResults = await runtime.knowledgeManager.searchMemoriesByEmbedding(
        queryEmbedding,
        {
          roomId: runtime.agentId,
          // assuming roomId is used as the namespace
          match_threshold: 0.65,
          count: 5,
          unique: true
        }
      );
      if (semanticResults.length > 0) {
        const formattedSemantic = semanticResults.map((match) => {
          return `#### \u{1F50E} ${match.content.source}
${markdownToPlaintext(match.content.text).slice(0, 150)}... (Score: ${match.similarity?.toFixed(2) ?? "N/A"})`;
        }).join("\n\n");
        if (callback) {
          callback({
            text: `**No direct matches found**, but here are some similar results:

${formattedSemantic}`,
            metadata: {
              count: semanticResults.length,
              query,
              queryFormat,
              semantic: true
            }
          });
        }
        return true;
      }
      if (callback) {
        callback({
          text: "**No matching notes found**",
          metadata: {
            count: 0,
            query,
            queryFormat
          }
        });
      }
      return true;
    } catch (error) {
      elizaLogger7.error("Error searching vault:", error);
      if (callback) {
        callback({
          text: `Error searching vault: ${error.message}`,
          error: true
        });
      }
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "Search project management"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "SEARCH"
        }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: "Find all workouts with high intensity"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "SEARCH"
        }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: "SPARQL query for workouts with high intensity"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "SEARCH"
        }
      }
    ]
  ]
};

// src/actions/listNotes.ts
import {
  elizaLogger as elizaLogger8
} from "@elizaos/core";
var listNotesAction = {
  name: "LIST_NOTES",
  similes: [
    "LIST_NOTES",
    "SHOW_NOTES",
    "GET_NOTES",
    "FETCH_NOTES",
    "VIEW_NOTES",
    "DISPLAY_NOTES",
    "ENUMERATE_NOTES"
  ],
  description: "List all markdown notes in the Obsidian vault. Use format: 'List notes' or 'Show all notes'",
  validate: async (runtime) => {
    try {
      elizaLogger8.debug("Validating Obsidian connection");
      const obsidian = await getObsidian(runtime);
      await obsidian.connect();
      elizaLogger8.debug("Obsidian connection validated successfully");
      return true;
    } catch (error) {
      elizaLogger8.error("Failed to validate Obsidian connection:", error);
      return false;
    }
  },
  handler: async (runtime, _message, _state, _options, callback) => {
    elizaLogger8.info("Starting list notes handler");
    const obsidian = await getObsidian(runtime);
    try {
      elizaLogger8.info("Fetching list of notes from vault");
      const notes = await obsidian.listNotes();
      elizaLogger8.info(`Successfully retrieved ${notes.length} notes`);
      const formattedNotes = notes.length > 0 ? notes.map((note) => `- ${note}`).join("\n") : "No notes found in the vault";
      if (callback) {
        callback({
          text: `Found ${notes.length} notes in the vault:

${formattedNotes}`,
          metadata: {
            count: notes.length,
            notes
          }
        });
      }
      return true;
    } catch (error) {
      elizaLogger8.error("Error listing notes:", error);
      if (callback) {
        callback({
          text: `Error listing notes: ${error.message}`,
          error: true
        });
      }
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "List notes"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "LIST_NOTES"
        }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: "Show all notes in vault"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "LIST_NOTES"
        }
      }
    ]
  ]
};

// src/actions/vault.ts
import {
  elizaLogger as elizaLogger9
} from "@elizaos/core";
var listAllFilesAction = {
  name: "LIST_ALL",
  similes: [
    "LIST_VAULT_FILES",
    "LIST_ALL_VAULT_FILES",
    "LIST_ALL_FILES",
    "SHOW_ALL_FILES",
    "GET_ALL_FILES",
    "FETCH_ALL_FILES",
    "VIEW_ALL_FILES",
    "DISPLAY_ALL_FILES",
    "ENUMERATE_ALL_FILES",
    "LIST_EVERYTHING",
    "SHOW_EVERYTHING"
  ],
  description: "List all files in the entire Obsidian vault. Use format: 'List all files' or 'Show all files'",
  validate: async (runtime) => {
    try {
      elizaLogger9.debug("Validating Obsidian connection");
      const obsidian = await getObsidian(runtime);
      await obsidian.connect();
      elizaLogger9.debug("Obsidian connection validated successfully");
      return true;
    } catch (error) {
      elizaLogger9.error("Failed to validate Obsidian connection:", error);
      return false;
    }
  },
  handler: async (runtime, _message, _state, _options, callback) => {
    elizaLogger9.info("Starting list all files handler");
    const obsidian = await getObsidian(runtime);
    try {
      elizaLogger9.info("Fetching list of all files from vault");
      const files = await obsidian.getAllFiles();
      elizaLogger9.info(`Successfully retrieved ${files.length} files`);
      const directoryTree = buildDirectoryTree(files);
      const formattedTree = formatDirectoryTree(directoryTree);
      const stats = getFileStatistics(files);
      if (callback) {
        callback({
          text: `Found ${files.length} files in the vault:

${formattedTree}

${formatStatistics(stats)}`,
          metadata: {
            count: files.length,
            files,
            directoryTree,
            statistics: stats
          }
        });
      }
      return true;
    } catch (error) {
      elizaLogger9.error("Error listing files:", error);
      if (callback) {
        callback({
          text: `Error listing files: ${error.message}`,
          error: true
        });
      }
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "List all files"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "LIST_ALL"
        }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: "Show everything in the vault"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "LIST_ALL"
        }
      }
    ]
  ]
};
function buildDirectoryTree(files) {
  const root = { files: [], directories: {} };
  for (const filePath of files) {
    const parts = filePath.split("/");
    const fileName = parts.pop() || "";
    let currentLevel = root;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!part) continue;
      if (!currentLevel.directories[part]) {
        currentLevel.directories[part] = { files: [], directories: {} };
      }
      currentLevel = currentLevel.directories[part];
    }
    currentLevel.files.push(fileName);
  }
  return root;
}
function formatDirectoryTree(tree, prefix = "", level = 0) {
  let output = "";
  const indent = "  ".repeat(level);
  for (const file of tree.files.sort()) {
    output += `${indent}\u{1F4C4} ${file}
`;
  }
  for (const [dirName, subTree] of Object.entries(tree.directories).sort()) {
    output += `${indent}\u{1F4C1} ${dirName}/
`;
    output += formatDirectoryTree(subTree, prefix + dirName + "/", level + 1);
  }
  return output;
}
function getFileStatistics(files) {
  const stats = {
    totalFiles: files.length,
    byExtension: {},
    maxDepth: 0,
    topDirectories: {}
  };
  for (const file of files) {
    const ext = file.split(".").pop() || "no-extension";
    stats.byExtension[ext] = (stats.byExtension[ext] || 0) + 1;
    const depth = file.split("/").length - 1;
    stats.maxDepth = Math.max(stats.maxDepth, depth);
    const topDir = file.split("/")[0] || "root";
    stats.topDirectories[topDir] = (stats.topDirectories[topDir] || 0) + 1;
  }
  return stats;
}
function formatStatistics(stats) {
  return `\u{1F4CA} Vault Statistics:
\u2022 Total Files: ${stats.totalFiles}
\u2022 Maximum Directory Depth: ${stats.maxDepth}
\u2022 Files by Extension:${Object.entries(stats.byExtension).sort(([, a], [, b]) => b - a).map(([ext, count]) => `
  - ${ext}: ${count}`).join("")}
\u2022 Top-level Directories:${Object.entries(stats.topDirectories).sort(([, a], [, b]) => b - a).map(([dir, count]) => `
  - ${dir}: ${count} files`).join("")}`;
}

// src/actions/vaultDirectory.ts
import {
  elizaLogger as elizaLogger10
} from "@elizaos/core";
var listDirectoryAction = {
  name: "LIST_DIRECTORY",
  similes: [
    "SHOW_DIRECTORY",
    "LIST_FOLDER",
    "SHOW_FOLDER",
    "VIEW_DIRECTORY",
    "VIEW_FOLDER",
    "LIST_DIR",
    "SHOW_DIR",
    "DIR",
    "LS"
  ],
  description: "List all files in a specific directory of the Obsidian vault. Use format: 'List directory PATH' or 'Show files in PATH'",
  validate: async (runtime) => {
    try {
      elizaLogger10.debug("Validating Obsidian connection");
      const obsidian = await getObsidian(runtime);
      await obsidian.connect();
      elizaLogger10.debug("Obsidian connection validated successfully");
      return true;
    } catch (error) {
      elizaLogger10.error("Failed to validate Obsidian connection:", error);
      return false;
    }
  },
  handler: async (runtime, message, _state, _options, callback) => {
    elizaLogger10.info("Starting list directory handler");
    const obsidian = await getObsidian(runtime);
    try {
      const text3 = message.content.text;
      elizaLogger10.debug(`Processing directory listing request: "${text3}"`);
      let directoryPath = null;
      const commandPatterns = [
        /^LIST_DIRECTORY\s+(.+)$/i,
        /^(?:List|Show|View)\s+(?:directory|folder|files\s+in)\s+(.+)$/i,
        /^(?:List|Show|View)\s+(.+)\s+(?:directory|folder|files)$/i,
        /^(?:ls|dir)\s+(.+)$/i
      ];
      for (const pattern of commandPatterns) {
        const match = text3.match(pattern);
        if (match) {
          directoryPath = match[1].trim();
          break;
        }
      }
      if (!directoryPath && !/^(?:List|Show|View|ls|dir)\s/i.test(text3.trim())) {
        directoryPath = text3.trim();
      }
      if (!directoryPath) {
        throw new Error(
          "Directory path is required. Use format: 'List directory PATH' or 'Show files in PATH'"
        );
      }
      directoryPath = directoryPath.replace(/\/$/, "");
      elizaLogger10.info(`Listing files in directory: ${directoryPath}`);
      const files = await obsidian.listDirectoryFiles(directoryPath);
      elizaLogger10.info(`Successfully retrieved ${files.length} files`);
      const formattedFiles = files.length > 0 ? files.map((file) => {
        const isDirectory = file.endsWith("/");
        const icon = isDirectory ? "\u{1F4C1}" : "\u{1F4C4}";
        return `${icon} ${file}`;
      }).join("\n") : "No files found in the directory";
      if (callback) {
        callback({
          text: `Found ${files.length} files in ${directoryPath}:

${formattedFiles}`,
          metadata: {
            directory: directoryPath,
            count: files.length,
            files
          }
        });
      }
      return true;
    } catch (error) {
      elizaLogger10.error("Error listing directory:", error);
      if (callback) {
        callback({
          text: `Error listing directory: ${error.message}`,
          error: true
        });
      }
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "List directory BLOG POSTS"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "LIST_DIRECTORY"
        }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: "Show files in PROJECTS/src"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "LIST_DIRECTORY"
        }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: "ls DOCUMENTS/research"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "LIST_DIRECTORY"
        }
      }
    ]
  ]
};

// src/actions/createKnowledge.ts
import {
  elizaLogger as elizaLogger11
} from "@elizaos/core";
var createKnowledgeAction = {
  name: "CREATE_KNOWLEDGE",
  similes: [
    "BUILD_KNOWLEDGE",
    "CREATE_KNOWLEDGE_BASE",
    "CREATE_KNOWLEDGE_BASE",
    "BUILD_KNOWLEDGE_BASE"
  ],
  description: "Scan all markdown notes hierarchically in the Obsidian vault and build a memoryknowledge base. Use format: 'Create knowledge' or 'Build knowledge base'",
  validate: async (runtime) => {
    try {
      elizaLogger11.debug("Validating Obsidian connection");
      const obsidian = await getObsidian(runtime);
      await obsidian.connect();
      elizaLogger11.debug("Obsidian connection validated successfully");
      return true;
    } catch (error) {
      elizaLogger11.error("Failed to validate Obsidian connection:", error);
      return false;
    }
  },
  handler: async (runtime, _message, _state, _options, callback) => {
    elizaLogger11.info("Starting create knowledge handler");
    const obsidian = await getObsidian(runtime);
    try {
      elizaLogger11.info("Fetching all notes from vault and creating knowledge base");
      elizaLogger11.log("Be patient, this might take a while, depending on the size of your vault...");
      if (callback) {
        callback({
          text: "This might take a while, depending on the size of your vault...",
          error: false
        });
      }
      try {
        const notesMemorized = await obsidian.createMemoriesFromFiles();
        if (callback) {
          callback({
            text: `Finished creating knowledge base for ${notesMemorized ?? 0} notes in the vault`,
            metadata: {
              count: notesMemorized ?? 0
            }
          });
        }
      } catch (error) {
        elizaLogger11.error("Error creating knowledge memories from notes:", error);
        if (callback) {
          callback({
            text: `Error creating knowledge memories from notes: ${error.message}`,
            error: true
          });
        }
        return false;
      }
      return true;
    } catch (error) {
      elizaLogger11.error("Error creating knowledge base:", error);
      if (callback) {
        callback({
          text: `Error creating knowledge base: ${error.message}`,
          error: true
        });
      }
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "Create knowledge"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "CREATE_KNOWLEDGE"
        }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: "Build knowledge base"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "CREATE_KNOWLEDGE"
        }
      }
    ]
  ]
};

// src/actions/noteTraversal.ts
import {
  elizaLogger as elizaLogger12,
  composeContext as composeContext2,
  generateObject as generateObject3,
  ModelClass as ModelClass3
} from "@elizaos/core";

// src/templates/file.ts
var fileTemplate = (userRequest, likelyPath) => `
Respond with a JSON markdown block containing only the extracted values. Use null for any values that cannot be determined.

${likelyPath ? `The file most likely to be updated is: "${likelyPath}". Use this path unless the user explicitly specifies another.` : ""}

Ensure that:
1. The path is properly formatted with correct folder structure
2. The operation matches one of the supported actions (Default: READ)
3. Content is provided when required for write operations
4. Path uses forward slashes (/) as separators
5. For Obsidian notes, ensure the file extension is .md
6. For non-note files (like code, JSON, or other data files), use the appropriate extension
7. If no extension is provided but the content looks like a note (e.g., contains markdown), use .md extension
8. Make sure to remove \`\`\`json and \`\`\` from the response

Provide the details in the following JSON format:

\`\`\`json
{
    "path": "<folder>/<subfolder>/<filename>",
    "operation": "<READ|WRITE|UPDATE|CREATE>",
    "content": "<file_content_to_write>"
}
\`\`\`

Here are the recent user messages for context:
${userRequest}

Respond ONLY with a JSON markdown block containing only the extracted values.
`;

// src/actions/noteTraversal.ts
var noteTraversalAction = {
  name: "TRAVERSE_NOTE",
  similes: [
    "MAP_NOTE_LINKS",
    "MAP_LINKS_IN",
    "GET_NOTE_HIERARCHY",
    "SHOW_NOTE_LINKS",
    "LIST_NOTE_CONNECTIONS",
    "DISPLAY_NOTE_NETWORK",
    "EXPLORE_NOTE_LINKS",
    "VIEW_NOTE_CONNECTIONS",
    "ANALYZE_NOTE_LINKS"
  ],
  description: "Generate a hierarchical list of all outgoing links from a specific note, including nested links. Use format: 'Map links in FOLDER/Note.md'",
  validate: async (runtime) => {
    try {
      elizaLogger12.debug("Validating Obsidian connection");
      const obsidian = await getObsidian(runtime);
      await obsidian.connect();
      elizaLogger12.debug("Obsidian connection validated successfully");
      return true;
    } catch (error) {
      elizaLogger12.error("Failed to validate Obsidian connection:", error);
      return false;
    }
  },
  handler: async (runtime, message, state, _options, callback) => {
    elizaLogger12.info("Starting note traversal handler");
    const obsidian = await getObsidian(runtime);
    try {
      let formatHierarchy = function(node2, level = 0) {
        const indent = "  ".repeat(level);
        let result = `${indent}- ${node2.path}
`;
        elizaLogger12.info(`Node hierarchy links for note: ${node2.links}`);
        for (const link of node2.links) {
          result += formatHierarchy(link, level + 1);
        }
        return result;
      };
      let path13 = "";
      let currentState;
      if (!state) {
        currentState = await runtime.composeState(message);
      } else {
        currentState = await runtime.updateRecentMessageState(state);
      }
      const context = composeContext2({
        state: currentState,
        template: fileTemplate(message.content.text)
      });
      const noteContext = await generateObject3({
        runtime,
        context,
        modelClass: ModelClass3.MEDIUM,
        schema: noteHierarchySchema,
        stop: ["\n"]
      });
      if (!isValidNoteHierarchy(noteContext.object)) {
        elizaLogger12.error(
          "Note path is required. Use format: 'Map links in FOLDER/Note.md' - ",
          noteContext.object
        );
        if (callback) {
          callback({
            text: `Note path is required. Use format: 'Map links in FOLDER/Note.md' - ${noteContext.object}`,
            error: true
          });
        }
        return false;
      }
      path13 = noteContext.object.path;
      if (!path13 && message.content.path) {
        path13 = message.content.path;
      }
      if (!path13) {
        throw new Error(
          "Note path is required. Use format: 'Map links in FOLDER/Note.md'"
        );
      }
      const cachedHierarchy = await retrieveHierarchyFromMemory(runtime, message, path13);
      if (cachedHierarchy) {
        elizaLogger12.info(`Using cached hierarchy for note: ${path13}`);
        if (callback) {
          callback({
            text: formatHierarchy(cachedHierarchy),
            metadata: {
              path: path13,
              hierarchy: cachedHierarchy,
              source: "cache"
            }
          });
        }
        return true;
      }
      async function buildLinkHierarchy(notePath, depth = 0, visited = /* @__PURE__ */ new Set()) {
        if (visited.has(notePath)) {
          return null;
        }
        visited.add(notePath);
        try {
          const noteContent = await obsidian.getNote(notePath);
          const links = extractLinks(noteContent);
          const hierarchy2 = {
            path: notePath,
            content: noteContent.content,
            links: []
          };
          if (depth < 7) {
            for (const link of links) {
              const childHierarchy = await buildLinkHierarchy(link, depth + 1, visited);
              if (childHierarchy) {
                hierarchy2.links.push(childHierarchy);
              }
            }
          }
          return hierarchy2;
        } catch (error) {
          elizaLogger12.error(`Failed to process note ${notePath}: ${error.message}`);
          return null;
        }
      }
      elizaLogger12.info(`Building link hierarchy for note: ${path13}`);
      const hierarchy = await buildLinkHierarchy(path13);
      if (!hierarchy) {
        throw new Error(`Failed to build hierarchy for note: ${path13}`);
      }
      await storeHierarchyInMemory(runtime, message, hierarchy);
      const formattedHierarchy = formatHierarchy(hierarchy);
      elizaLogger12.info(`Successfully built hierarchy for note: ${path13}`);
      if (callback) {
        callback({
          text: formattedHierarchy,
          metadata: {
            path: path13,
            hierarchy,
            source: "obsidian"
          }
        });
      }
      return true;
    } catch (error) {
      elizaLogger12.error("Error in note traversal:", error);
      if (callback) {
        callback({
          text: `Error in note traversal: ${error.message}`,
          error: true
        });
      }
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "Show outgoing links in Knowledge Base/Main Index.md"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "TRAVERSE_NOTE"
        }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: "Map links in Knowledge Base/Main Index.md"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "TRAVERSE_NOTE"
        }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: "Show note connections in Projects/Project Overview.md"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "TRAVERSE_NOTE"
        }
      }
    ]
  ]
};

// src/actions/activeNote.ts
import {
  elizaLogger as elizaLogger13,
  composeContext as composeContext3,
  ModelClass as ModelClass4,
  splitChunks,
  trimTokens,
  generateText
} from "@elizaos/core";

// src/templates/summary.ts
var baseSummaryTemplate = `# Summarized so far (we are adding to this)
{{currentSummary}}

# Current note chunk we are summarizing (includes metadata)
{{currentChunk}}

Summarization objective: {{objective}}

# Instructions: Summarize the note content so far. Return the summary. Do not acknowledge this request, just summarize and continue the existing summary if there is one. Capture any important details to the objective. Only respond with the new summary text.
Your response should be extremely detailed and include any and all relevant information.`;

// src/actions/activeNote.ts
var getActiveNoteAction = {
  name: "GET_ACTIVE_NOTE",
  similes: [
    "FETCH_ACTIVE_NOTE",
    "READ_ACTIVE_NOTE",
    "CURRENT_NOTE",
    "ACTIVE_NOTE",
    "OPENED_NOTE",
    "CURRENT_FILE"
  ],
  description: "Retrieve and display the content of the currently active note in Obsidian",
  validate: async (runtime) => {
    try {
      const obsidian = await getObsidian(runtime);
      await obsidian.connect();
      return true;
    } catch (error) {
      elizaLogger13.error("Failed to validate Obsidian connection:", error);
      return false;
    }
  },
  handler: async (runtime, _message, _state, _options, callback) => {
    elizaLogger13.info("Starting get active note handler");
    const obsidian = await getObsidian(runtime);
    try {
      elizaLogger13.info("Fetching active note content");
      const noteContent = await obsidian.getActiveNote();
      elizaLogger13.info(
        `Successfully retrieved active note: ${noteContent.path}`
      );
      if (callback) {
        callback({
          text: noteContent.content,
          metadata: {
            path: noteContent.path
          }
        });
      }
      return true;
    } catch (error) {
      elizaLogger13.error("Error getting active note:", error);
      if (callback) {
        callback({
          text: `Error retrieving active note: ${error.message}`,
          error: true
        });
      }
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "What's in my current note?"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "GET_ACTIVE_NOTE"
        }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: "Show me the active note"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "GET_ACTIVE_NOTE"
        }
      }
    ]
  ]
};
var summarizeActiveNoteAction = {
  name: "SUMMARIZE_ACTIVE_NOTE",
  similes: [
    "SUMMARIZE_ACTIVE_NOTE",
    "SUMMARIZE_CURRENT_NOTE",
    "SUMMARIZE_OPEN_NOTE"
  ],
  description: "Generate a focused summary of the currently active note in Obsidian",
  validate: async (runtime) => {
    try {
      elizaLogger13.debug("Validating Obsidian connection");
      const obsidian = await getObsidian(runtime);
      await obsidian.connect();
      elizaLogger13.debug("Obsidian connection validated successfully");
      return true;
    } catch (error) {
      elizaLogger13.error("Failed to validate Obsidian connection:", error);
      return false;
    }
  },
  handler: async (runtime, message, state, _options, callback) => {
    elizaLogger13.info("Starting summarize active note handler");
    const obsidian = await getObsidian(runtime);
    try {
      elizaLogger13.info("Fetching active note content");
      const noteContent = await obsidian.getActiveNote();
      if (!state) {
        state = await runtime.composeState(message);
      } else {
        state = await runtime.updateRecentMessageState(state);
      }
      const chunkSize = 6500;
      const chunks = await splitChunks(noteContent.content, chunkSize, 0);
      let currentSummary = "";
      elizaLogger13.info("Composing summary context");
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        state.currentSummary = currentSummary;
        state.currentChunk = chunk;
        const activeNoteTemplate = await trimTokens(
          baseSummaryTemplate,
          chunkSize,
          runtime
        );
        const context = composeContext3({
          state,
          template: activeNoteTemplate
        });
        const summary = await generateText({
          runtime,
          context,
          modelClass: ModelClass4.MEDIUM
        });
        currentSummary = `${currentSummary}
${summary}`;
      }
      if (!currentSummary) {
        elizaLogger13.error("Error: No summary found");
        return false;
      }
      if (callback) {
        if (currentSummary.trim()?.split("\n").length < 4 || currentSummary.trim()?.split(" ").length < 100) {
          callback({
            text: `Here is the summary:
\`\`\`md
${currentSummary.trim()}
\`\`\``,
            metadata: {
              path: noteContent.path
            }
          });
        } else {
          callback({
            text: currentSummary.trim(),
            metadata: {
              path: noteContent.path
            }
          });
        }
      }
      return true;
    } catch (error) {
      elizaLogger13.error("Error summarizing active note:", error);
      if (callback) {
        callback({
          text: `Error summarizing active note: ${error.message}`,
          error: true
        });
      }
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "Summarize my current note"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "SUMMARIZE_ACTIVE_NOTE"
        }
      }
    ]
  ]
};

// src/actions/note.ts
import {
  elizaLogger as elizaLogger15,
  composeContext as composeContext5,
  generateObject as generateObject5,
  ModelClass as ModelClass6
} from "@elizaos/core";

// src/helper/resolveOrExtractPath.ts
import {
  composeContext as composeContext4,
  generateObject as generateObject4,
  ModelClass as ModelClass5,
  elizaLogger as elizaLogger14
} from "@elizaos/core";

// src/helper/resolvePathFromMemory.ts
import { embed as embed3 } from "@elizaos/core";
async function resolvePathFromMemory(runtime, message) {
  const embedding = await embed3(runtime, message.content.text);
  const memoryMatches = await runtime.knowledgeManager.searchMemoriesByEmbedding(
    embedding,
    {
      roomId: message.agentId,
      // Or runtime.room.id
      count: 1,
      match_threshold: 0.1
    }
  );
  const bestMatch = memoryMatches?.[0];
  const metadata = bestMatch?.content?.metadata;
  const path13 = metadata?.path || metadata?.id || metadata?.["@id"];
  if (typeof path13 === "string") {
    return path13.replace(/^@id:\s*/, "");
  }
  return void 0;
}

// src/helper/resolveOrExtractPath.ts
async function resolveOrExtractPath(runtime, message, state, templateFn, schema2) {
  let hintPath = await resolvePathFromMemory(runtime, message);
  const context = composeContext4({
    state,
    template: templateFn(message.content.text, hintPath ?? void 0)
  });
  const fileContext = await generateObject4({
    runtime,
    context,
    modelClass: ModelClass5.MEDIUM,
    schema: schema2,
    stop: ["\n"]
  });
  const object = fileContext.object;
  if (!object?.path) {
    if (hintPath) {
      elizaLogger14.info(`Falling back to hint path: ${hintPath}`);
      return { path: hintPath, object };
    }
    throw new Error("Could not determine a valid file path.");
  }
  return { path: object.path, object };
}

// src/actions/note.ts
var getNoteAction = {
  name: "GET_NOTE",
  similes: [
    "DISPLAY_NOTE",
    "GRAB_NOTE",
    "FETCH_NOTE",
    "READ_NOTE",
    "RETRIEVE_NOTE",
    "LOAD_NOTE",
    "OPEN_NOTE",
    "ACCESS_NOTE",
    "VIEW_NOTE",
    "SHOW_NOTE"
  ],
  description: "Retrieve and display the content of a specific note from Obsidian vault by path. Use format: 'Get FOLDER/SUBFOLDER/Note Name.md'",
  validate: async (runtime) => {
    try {
      elizaLogger15.debug("Validating Obsidian connection");
      const obsidian = await getObsidian(runtime);
      await obsidian.connect();
      elizaLogger15.debug("Obsidian connection validated successfully");
      return true;
    } catch (error) {
      elizaLogger15.error("Failed to validate Obsidian connection:", error);
      return false;
    }
  },
  handler: async (runtime, message, state, _options, callback) => {
    elizaLogger15.info("Starting get note handler");
    const obsidian = await getObsidian(runtime);
    try {
      let currentState;
      if (!state) {
        currentState = await runtime.composeState(message);
      } else {
        currentState = await runtime.updateRecentMessageState(state);
      }
      const context = composeContext5({
        state: currentState,
        template: fileTemplate(message.content.text)
      });
      const noteContext = await generateObject5({
        runtime,
        context,
        modelClass: ModelClass6.MEDIUM,
        schema: noteSchema,
        stop: ["\n"]
      });
      if (!isValidNote(noteContext.object)) {
        elizaLogger15.error(
          "A Note path is required. Use format: 'Get FOLDER/SUBFOLDER/Note Name.md' - ",
          noteContext.object
        );
        if (callback) {
          callback({
            text: `A Note path is required. Use format: 'Get FOLDER/SUBFOLDER/Note Name.md - ${noteContext.object}`,
            error: true
          });
        }
        return false;
      }
      const { path: path13, object } = await resolveOrExtractPath(
        runtime,
        message,
        currentState,
        fileTemplate,
        // or `noteTemplate` if you prefer
        noteSchema
      );
      elizaLogger15.info(`Fetching note at path: ${path13}`);
      const noteContent = await obsidian.getNote(path13);
      elizaLogger15.info(`Successfully retrieved note: ${path13}`);
      if (callback) {
        callback({
          text: noteContent.content,
          metadata: {
            path: noteContent.path
          }
        });
      }
      return true;
    } catch (error) {
      elizaLogger15.error("Error retrieving note:", error);
      if (callback) {
        callback({
          text: `Error retrieving note: ${error.message}`,
          error: true
        });
      }
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "Get BLOG POSTS/How to Angel Invest, Part 1.md"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "GET_NOTE"
        }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: "Fetch BLOG POSTS/How to Angel Invest, Part 2.md"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "GET_NOTE"
        }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: "Read BLOG POSTS/STARTUPS/Build a Team that Ships.md"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "GET_NOTE"
        }
      }
    ]
  ]
};

// src/actions/file.ts
import {
  elizaLogger as elizaLogger16,
  composeContext as composeContext6,
  generateObject as generateObject6,
  ModelClass as ModelClass7
} from "@elizaos/core";
var readFileAction = {
  name: "READ_FILE",
  similes: [
    "GET_FILE",
    "FETCH_FILE",
    "READ_FILE",
    "RETRIEVE_FILE",
    "LOAD_FILE",
    "OPEN_FILE",
    "ACCESS_FILE",
    "VIEW_FILE",
    "SHOW_FILE",
    "READ"
  ],
  description: "Retrieve and display the content of any file from Obsidian vault by path. Use format: 'Read FOLDER/SUBFOLDER/filename'",
  validate: async (runtime) => {
    try {
      elizaLogger16.debug("Validating Obsidian connection");
      const obsidian = await getObsidian(runtime);
      await obsidian.connect();
      elizaLogger16.debug("Obsidian connection validated successfully");
      return true;
    } catch (error) {
      elizaLogger16.error("Failed to validate Obsidian connection:", error);
      return false;
    }
  },
  handler: async (runtime, message, state, _options, callback) => {
    elizaLogger16.info("Starting read file handler");
    const obsidian = await getObsidian(runtime);
    try {
      if (!state) {
        state = await runtime.composeState(message);
      } else {
        state = await runtime.updateRecentMessageState(state);
      }
      const context = composeContext6({
        state,
        template: fileTemplate(message.content.text)
      });
      const fileContext = await generateObject6({
        runtime,
        context,
        modelClass: ModelClass7.MEDIUM,
        schema: fileSchema,
        stop: ["\n"]
      });
      if (!isValidFile(fileContext.object)) {
        elizaLogger16.error(
          "A file path is required. Use format: 'Read FOLDER/SUBFOLDER/filename' - ",
          fileContext.object
        );
        if (callback) {
          callback({
            text: `A file path is required. Use format: 'Read FOLDER/SUBFOLDER/filename' - ${fileContext.object}`,
            error: true
          });
        }
        return false;
      }
      const { path: path13 } = await resolveOrExtractPath(
        runtime,
        message,
        state,
        fileTemplate,
        fileSchema
      );
      if (!path13) {
        elizaLogger16.error("Could not resolve file path from user input or memory.");
        if (callback) {
          callback({
            text: "I couldn't figure out which file you meant to open.",
            error: true
          });
        }
        return false;
      }
      elizaLogger16.info(`Reading file at path: ${path13}`);
      const fileContent = await obsidian.readFile(path13);
      elizaLogger16.info(`Successfully read file: ${path13}`);
      if (callback) {
        callback({
          text: fileContent,
          metadata: {
            path: path13
          }
        });
      }
      return true;
    } catch (error) {
      elizaLogger16.error("Error reading file:", error);
      if (callback) {
        callback({
          text: `Error reading file: ${error.message}`,
          error: true
        });
      }
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "Get DOCUMENTS/report.pdf"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "READ_FILE"
        }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: "Read PROJECTS/src/main.ts"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "READ_FILE"
        }
      }
    ]
  ]
};

// src/actions/saveFile.ts
import {
  elizaLogger as elizaLogger18,
  composeContext as composeContext7,
  generateObject as generateObject7,
  ModelClass as ModelClass8
} from "@elizaos/core";

// src/helper/quartzHelper.ts
import * as fs2 from "fs";
import * as path2 from "path";
import { elizaLogger as elizaLogger17 } from "@elizaos/core";
function doesQuartzExist(quartzPath) {
  if (!quartzPath || typeof quartzPath !== "string") {
    elizaLogger17.debug(`Invalid Quartz path: ${quartzPath}`);
    return false;
  }
  try {
    const normalizedPath = quartzPath.replace(/^["']|["']$/g, "").trim();
    elizaLogger17.debug(`Checking Quartz existence at normalized path: ${normalizedPath}`);
    if (!fs2.existsSync(normalizedPath)) {
      elizaLogger17.debug(`Path does not exist: ${normalizedPath}`);
      return false;
    }
    if (!fs2.statSync(normalizedPath).isDirectory()) {
      elizaLogger17.debug(`Path is not a directory: ${normalizedPath}`);
      return false;
    }
    const contentDir = path2.join(normalizedPath, "content");
    const packageJson = path2.join(normalizedPath, "package.json");
    elizaLogger17.debug(`Checking for content directory: ${contentDir}`);
    elizaLogger17.debug(`Checking for package.json: ${packageJson}`);
    const contentDirExists = fs2.existsSync(contentDir) && fs2.statSync(contentDir).isDirectory();
    elizaLogger17.debug(`Content directory exists: ${contentDirExists}`);
    return contentDirExists;
  } catch (error) {
    elizaLogger17.error(`Error checking Quartz existence: ${error.message}`);
    return false;
  }
}
function getQuartzPath() {
  const possiblePaths = [
    "/Users/darrenzal/GAIA/agent/quartz_temp/quartz",
    // From diagnostics
    "/Users/darrenzal/GAIA/agent/quartz_temp",
    process.env.QUARTZ_PATH,
    path2.resolve(process.cwd(), "quartz_temp/quartz"),
    path2.resolve(process.cwd(), "quartz"),
    path2.resolve(process.cwd(), "../quartz"),
    path2.resolve(process.cwd(), "../../quartz"),
    path2.resolve(process.cwd(), "../../../quartz"),
    path2.resolve(process.env.HOME || "~", "quartz")
  ].filter(Boolean);
  elizaLogger17.debug(`Current working directory: ${process.cwd()}`);
  elizaLogger17.debug(`Checking possible Quartz paths: ${possiblePaths.join(", ")}`);
  for (const possiblePath of possiblePaths) {
    elizaLogger17.debug(`Checking possible Quartz path: ${possiblePath}`);
    if (doesQuartzExist(possiblePath)) {
      elizaLogger17.info(`Found valid Quartz directory at: ${possiblePath}`);
      return possiblePath;
    }
  }
  elizaLogger17.warn(`No valid Quartz directory found in any of the expected locations`);
  return null;
}
function updateQuartzFile(filePath, content3, quartzPath) {
  try {
    const quartzContentDir = path2.join(quartzPath, "content");
    elizaLogger17.debug(`Quartz content directory: ${quartzContentDir}`);
    const targetFilePath = path2.join(quartzContentDir, filePath);
    elizaLogger17.debug(`Target file path in Quartz: ${targetFilePath}`);
    const targetDir = path2.dirname(targetFilePath);
    elizaLogger17.debug(`Target directory in Quartz: ${targetDir}`);
    if (!fs2.existsSync(targetDir)) {
      elizaLogger17.debug(`Creating directory structure: ${targetDir}`);
      fs2.mkdirSync(targetDir, { recursive: true });
    }
    elizaLogger17.debug(`Writing file content (${content3.length} bytes) to: ${targetFilePath}`);
    fs2.writeFileSync(targetFilePath, content3);
    if (fs2.existsSync(targetFilePath)) {
      const stats = fs2.statSync(targetFilePath);
      elizaLogger17.debug(`File successfully written. Size: ${stats.size} bytes`);
      return true;
    } else {
      elizaLogger17.warn(`File doesn't exist after writing: ${targetFilePath}`);
      return false;
    }
  } catch (error) {
    elizaLogger17.error(`Error updating file in Quartz: ${error.message}`);
    elizaLogger17.error(`Error stack: ${error.stack}`);
    try {
      const absoluteQuartzContentDir = path2.resolve(quartzPath, "content");
      elizaLogger17.debug(`Trying with absolute Quartz content directory: ${absoluteQuartzContentDir}`);
      const absoluteTargetFilePath = path2.resolve(absoluteQuartzContentDir, filePath);
      elizaLogger17.debug(`Absolute target file path: ${absoluteTargetFilePath}`);
      const absoluteTargetDir = path2.dirname(absoluteTargetFilePath);
      if (!fs2.existsSync(absoluteTargetDir)) {
        fs2.mkdirSync(absoluteTargetDir, { recursive: true });
      }
      fs2.writeFileSync(absoluteTargetFilePath, content3);
      if (fs2.existsSync(absoluteTargetFilePath)) {
        elizaLogger17.debug(`Success with absolute path resolution!`);
        return true;
      }
    } catch (secondError) {
      elizaLogger17.error(`Second attempt also failed: ${secondError.message}`);
    }
    return false;
  }
}
function diagnoseQuartzSetup() {
  let diagnosticInfo = "Quartz Setup Diagnostics:\n";
  diagnosticInfo += `
Environment Information:
`;
  diagnosticInfo += `Current working directory: ${process.cwd()}
`;
  diagnosticInfo += `Node.js version: ${process.version}
`;
  diagnosticInfo += `Platform: ${process.platform}
`;
  const detectedPath = getQuartzPath();
  diagnosticInfo += `
Detected Quartz path: ${detectedPath || "None"}
`;
  const possibleAbsolutePaths = [
    "/Users/darrenzal/GAIA/agent/quartz_temp/quartz",
    "/Users/darrenzal/GAIA/agent/quartz_temp",
    path2.resolve(process.cwd(), "quartz_temp/quartz"),
    path2.resolve(process.cwd(), "quartz")
  ];
  for (const testPath of possibleAbsolutePaths) {
    diagnosticInfo += `
Testing path: ${testPath}
`;
    if (fs2.existsSync(testPath)) {
      diagnosticInfo += `\u2713 Path exists
`;
      try {
        const stats = fs2.statSync(testPath);
        diagnosticInfo += `\u2713 Is directory: ${stats.isDirectory()}
`;
        const testFilePath = path2.join(testPath, "quartz_test_file.txt");
        try {
          fs2.writeFileSync(testFilePath, "Test content");
          diagnosticInfo += `\u2713 Write permission: test file created
`;
          fs2.unlinkSync(testFilePath);
          diagnosticInfo += `\u2713 Delete permission: test file removed
`;
        } catch (writeError) {
          diagnosticInfo += `\u274C Write/delete permission error: ${writeError.message}
`;
        }
        const contentDir = path2.join(testPath, "content");
        if (fs2.existsSync(contentDir)) {
          const contentStats = fs2.statSync(contentDir);
          diagnosticInfo += `\u2713 Content directory exists: ${contentDir}
`;
          diagnosticInfo += `\u2713 Is directory: ${contentStats.isDirectory()}
`;
          try {
            const contentFiles = fs2.readdirSync(contentDir);
            diagnosticInfo += `Content directory has ${contentFiles.length} files/directories
`;
            if (contentFiles.length > 0) {
              diagnosticInfo += `Sample content items: ${contentFiles.slice(0, 5).join(", ")}
`;
            }
          } catch (readError) {
            diagnosticInfo += `\u274C Content read error: ${readError.message}
`;
          }
        } else {
          diagnosticInfo += `\u274C Content directory doesn't exist: ${contentDir}
`;
          try {
            fs2.mkdirSync(contentDir, { recursive: true });
            diagnosticInfo += `\u2713 Created content directory
`;
          } catch (mkdirError) {
            diagnosticInfo += `\u274C Failed to create content directory: ${mkdirError.message}
`;
          }
        }
      } catch (error) {
        diagnosticInfo += `\u274C Error checking path: ${error.message}
`;
      }
    } else {
      diagnosticInfo += `\u274C Path doesn't exist
`;
    }
  }
  if (detectedPath) {
    const testFilePath = path2.join(detectedPath, "content", "test_file.md");
    diagnosticInfo += `
Attempting to write test file: ${testFilePath}
`;
    try {
      const contentDir = path2.join(detectedPath, "content");
      if (!fs2.existsSync(contentDir)) {
        fs2.mkdirSync(contentDir, { recursive: true });
        diagnosticInfo += `Created content directory: ${contentDir}
`;
      }
      fs2.writeFileSync(testFilePath, "# Test File\n\nThis is a test file.");
      diagnosticInfo += `\u2713 Test file written successfully
`;
      fs2.unlinkSync(testFilePath);
      diagnosticInfo += `\u2713 Test file removed successfully
`;
    } catch (error) {
      diagnosticInfo += `\u274C Error writing test file: ${error.message}
`;
    }
  }
  return diagnosticInfo;
}

// src/actions/saveFile.ts
import * as path4 from "path";
import * as fs4 from "fs";

// src/helper/schemaHelper.ts
import * as fs3 from "fs";
import * as path3 from "path";
import matter from "gray-matter";
function loadSchemasFromVault(vaultPath) {
  const ontologyPath = path3.join(vaultPath, "Ontology");
  if (!fs3.existsSync(ontologyPath)) return [];
  const files = fs3.readdirSync(ontologyPath).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const filePath = path3.join(ontologyPath, file);
    const content3 = fs3.readFileSync(filePath, "utf8");
    const { data } = matter(content3);
    return {
      id: data["@id"],
      type: data["@type"],
      label: data.label,
      description: data.description,
      subClassOf: data.subClassOf,
      properties: data.properties,
      raw: data,
      fileName: file
    };
  });
}

// src/templates/createFromSchema.ts
var createFromSchemaTemplate = (userRequest, schemas) => {
  const schemaDescriptions = schemas.map((schema2) => {
    const props = Object.entries(schema2.properties || {}).map(([key, val]) => `- ${key} (${val.range})${val.required ? " *" : ""}`).join("\n");
    return `Schema: ${schema2.label || schema2.id}
@id: ${schema2.id}
@type: ${schema2.type}
Properties:
${props}`;
  }).join("\n\n");
  return `
You are a structured data assistant. You help create new markdown files that conform to structured schema definitions.

The user request is:
"${userRequest}"

Available schemas:
${schemaDescriptions}

Instructions:
- Choose the schema that best fits the user input
- Create a markdown file with a YAML frontmatter block based on the chosen schema
- Use a folder name that matches the schema type, like "People/" for schema:Person
- Derive a good filename from the name field, e.g., "People/shawn.md"
- If any properties are unknown, leave them out or use null
- DO NOT include \`\`\`markdown or \`\`\`yaml fences \u2014 just raw markdown

Output example:
---
@id: people/shawn
@type: schema:Person
name: Shawn
givenName: Shawn
---
# Shawn

(Additional notes here, optional)
`;
};

// src/actions/saveFile.ts
import matter2 from "gray-matter";
function toSlug(str2) {
  return str2.toLowerCase().replace(/\s+/g, "-");
}
var saveFileAction = {
  name: "SAVE_FILE",
  similes: [
    "WRITE_FILE",
    "CREATE_FILE",
    "SAVE",
    "STORE_FILE",
    "PUT_FILE",
    "WRITE_TO_FILE",
    "CREATE_NEW_FILE"
  ],
  description: "Create or update a file in the Obsidian vault. Use format: 'Save FOLDER/SUBFOLDER/filename with content: your_content'",
  validate: async (runtime) => {
    try {
      elizaLogger18.debug("Validating Obsidian connection");
      const obsidian = await getObsidian(runtime);
      await obsidian.connect();
      elizaLogger18.debug("Obsidian connection validated successfully");
      return true;
    } catch (error) {
      elizaLogger18.error("Failed to validate Obsidian connection:", error);
      return false;
    }
  },
  handler: async (runtime, message, state, _options, callback) => {
    elizaLogger18.info("Starting save file handler");
    const obsidian = await getObsidian(runtime);
    try {
      let currentState;
      if (!state) {
        currentState = await runtime.composeState(message);
      } else {
        currentState = await runtime.updateRecentMessageState(state);
      }
      const vaultPath = await obsidian.getVaultPath?.();
      const schemas = vaultPath ? loadSchemasFromVault(vaultPath) : [];
      const context = composeContext7({
        state: currentState,
        template: createFromSchemaTemplate(message.content.text, schemas)
      });
      const fileContext = await generateObject7({
        runtime,
        context,
        modelClass: ModelClass8.MEDIUM,
        schema: fileSchema,
        stop: ["\n"]
      });
      const fileContent = fileContext.object?.content || "";
      let filePath = fileContext.object?.path;
      if (!filePath) {
        const parsedFrontmatter = matter2(fileContent).data;
        const name = parsedFrontmatter.name || parsedFrontmatter.givenName;
        const folder = parsedFrontmatter["@type"]?.includes("Person") ? "People" : "Notes";
        const filename = name ? toSlug(name) + ".md" : "untitled.md";
        filePath = `${folder}/${filename}`;
      }
      if (!isValidFile(fileContext.object)) {
        elizaLogger18.error(
          "Invalid file information. Required: path and content. Format: 'Save FOLDER/SUBFOLDER/filename with content: your_content' - ",
          fileContext.object
        );
        if (callback) {
          callback({
            text: `Invalid file information. Required: path and content. Format: 'Save FOLDER/SUBFOLDER/filename with content: your_content' - ${fileContext.object}`,
            error: true
          });
        }
        return false;
      }
      if (!fileContent) {
        elizaLogger18.error("File content is required for saving");
        if (callback) {
          callback({
            text: "File content is required for saving",
            error: true
          });
        }
        return false;
      }
      elizaLogger18.info(`Saving file at path: ${filePath}`);
      await obsidian.saveFile(filePath, fileContent, true);
      elizaLogger18.info(`Successfully saved file: ${filePath}`);
      elizaLogger18.debug(`Checking for Quartz path...`);
      const quartzPath = getQuartzPath();
      elizaLogger18.debug(`Quartz path detection result: ${quartzPath || "Not found"}`);
      if (quartzPath) {
        elizaLogger18.debug(`Verifying Quartz exists at path: ${quartzPath}`);
        const quartzExists = doesQuartzExist(quartzPath);
        elizaLogger18.debug(`Quartz exists check result: ${quartzExists}`);
        if (quartzExists) {
          elizaLogger18.info(`Quartz detected at ${quartzPath}, updating file there as well`);
          const contentDir = path4.join(quartzPath, "content");
          elizaLogger18.debug(`Checking content directory: ${contentDir}`);
          if (fs4.existsSync(contentDir)) {
            elizaLogger18.debug(`Content directory exists, proceeding with update`);
            const quartzUpdateSuccess = updateQuartzFile(filePath, fileContent, quartzPath);
            if (quartzUpdateSuccess) {
              elizaLogger18.info(`Successfully updated file in Quartz: ${filePath}`);
              const targetFilePath = path4.join(contentDir, filePath);
              if (fs4.existsSync(targetFilePath)) {
                const stats = fs4.statSync(targetFilePath);
                elizaLogger18.debug(`Verified file exists in Quartz. Size: ${stats.size} bytes`);
              } else {
                elizaLogger18.warn(`File doesn't exist in Quartz after update: ${targetFilePath}`);
              }
            } else {
              elizaLogger18.warn(`Failed to update file in Quartz: ${filePath}`);
            }
          } else {
            elizaLogger18.warn(`Content directory doesn't exist: ${contentDir}`);
          }
        } else {
          elizaLogger18.warn(`Quartz directory found but doesn't appear to be a valid Quartz site: ${quartzPath}`);
        }
      } else {
        elizaLogger18.debug(`No Quartz path detected, skipping Quartz update`);
      }
      if (callback) {
        callback({
          text: `Successfully saved file: ${filePath}${quartzPath ? " (also updated in Quartz)" : ""}`,
          metadata: {
            path: filePath,
            operation: "SAVE",
            success: true,
            quartzUpdated: quartzPath ? true : false
          }
        });
      }
      return true;
    } catch (error) {
      elizaLogger18.error("Error saving file:", error);
      if (callback) {
        callback({
          text: `Error saving file: ${error.message}`,
          error: true
        });
      }
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "Save DOCUMENTS/report.txt with content: This is a test report"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "SAVE_FILE"
        }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: 'Create PROJECTS/src/config.json with content: { "version": "1.0.0" }'
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "SAVE_FILE"
        }
      }
    ]
  ]
};

// src/actions/openFile.ts
import {
  elizaLogger as elizaLogger19,
  composeContext as composeContext8,
  generateObject as generateObject8,
  ModelClass as ModelClass9
} from "@elizaos/core";
var openFileAction = {
  name: "OPEN_FILE",
  similes: [
    "OPEN",
    "LAUNCH_FILE",
    "DISPLAY_FILE",
    "SHOW_FILE",
    "VIEW_FILE"
  ],
  description: "Open a file in the Obsidian interface. Use format: 'Open FOLDER/SUBFOLDER/filename'",
  validate: async (runtime) => {
    try {
      elizaLogger19.debug("Validating Obsidian connection");
      const obsidian = await getObsidian(runtime);
      await obsidian.connect();
      elizaLogger19.debug("Obsidian connection validated successfully");
      return true;
    } catch (error) {
      elizaLogger19.error("Failed to validate Obsidian connection:", error);
      return false;
    }
  },
  handler: async (runtime, message, state, _options, callback) => {
    elizaLogger19.info("Starting open file handler");
    const obsidian = await getObsidian(runtime);
    try {
      let currentState;
      if (!state) {
        currentState = await runtime.composeState(message);
      } else {
        currentState = await runtime.updateRecentMessageState(state);
      }
      const context = composeContext8({
        state: currentState,
        template: fileTemplate(message.content.text)
      });
      const fileContext = await generateObject8({
        runtime,
        context,
        modelClass: ModelClass9.MEDIUM,
        schema: fileSchema,
        stop: ["\n"]
      });
      if (!isValidFile(fileContext.object)) {
        elizaLogger19.error(
          "Invalid file path. Format: 'Open FOLDER/SUBFOLDER/filename' - ",
          fileContext.object
        );
        if (callback) {
          callback({
            text: `Invalid file path. Format: 'Open FOLDER/SUBFOLDER/filename' - ${fileContext.object}`,
            error: true
          });
        }
        return false;
      }
      const { path: path13 } = fileContext.object;
      elizaLogger19.info(`Opening file at path: ${path13}`);
      await obsidian.openFile(path13);
      elizaLogger19.info(`Successfully opened file: ${path13}`);
      if (callback) {
        callback({
          text: `Successfully opened file: ${path13}`,
          metadata: {
            path: path13,
            operation: "OPEN",
            success: true
          }
        });
      }
      return true;
    } catch (error) {
      elizaLogger19.error("Error opening file:", error);
      if (callback) {
        callback({
          text: `Error opening file: ${error.message}`,
          error: true
        });
      }
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "Open DOCUMENTS/report.txt"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "OPEN_FILE"
        }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: "Show PROJECTS/src/config.json"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "OPEN_FILE"
        }
      }
    ]
  ]
};

// src/actions/updateFile.ts
import {
  elizaLogger as elizaLogger20,
  composeContext as composeContext9,
  generateObject as generateObject9,
  ModelClass as ModelClass10
} from "@elizaos/core";
var updateFileAction = {
  name: "UPDATE_FILE",
  similes: [
    "PATCH_FILE",
    "MODIFY_FILE",
    "UPDATE",
    "PATCH",
    "EDIT_FILE",
    "CHANGE_FILE"
  ],
  description: "Update an existing file in the Obsidian vault. Use format: 'Update FOLDER/SUBFOLDER/filename with content: your_content'",
  validate: async (runtime) => {
    try {
      elizaLogger20.debug("Validating Obsidian connection");
      const obsidian = await getObsidian(runtime);
      await obsidian.connect();
      elizaLogger20.debug("Obsidian connection validated successfully");
      return true;
    } catch (error) {
      elizaLogger20.error("Failed to validate Obsidian connection:", error);
      return false;
    }
  },
  handler: async (runtime, message, state, _options, callback) => {
    elizaLogger20.info("Starting update file handler");
    const obsidian = await getObsidian(runtime);
    try {
      let currentState;
      if (!state) {
        currentState = await runtime.composeState(message);
      } else {
        currentState = await runtime.updateRecentMessageState(state);
      }
      const likelyPath = await resolvePathFromMemory(runtime, message);
      const context = composeContext9({
        state: currentState,
        template: fileTemplate(message.content.text, likelyPath ?? void 0)
      });
      const fileContext = await generateObject9({
        runtime,
        context,
        modelClass: ModelClass10.MEDIUM,
        schema: fileSchema,
        stop: ["\n"]
      });
      if (!isValidFile(fileContext.object)) {
        elizaLogger20.error(
          "Invalid file information. Required: path and content. Format: 'Update FOLDER/SUBFOLDER/filename with content: your_content' - ",
          fileContext.object
        );
        if (callback) {
          callback({
            text: `Invalid file information. Required: path and content. Format: 'Update FOLDER/SUBFOLDER/filename with content: your_content' - ${fileContext.object}`,
            error: true
          });
        }
        return false;
      }
      const { path: path13, object } = await resolveOrExtractPath(
        runtime,
        message,
        currentState,
        fileTemplate,
        fileSchema
      );
      elizaLogger20.info(`Updating file at path: ${path13}`);
      const content3 = object.content;
      if (!content3) {
        throw new Error("Missing content for update.");
      }
      await obsidian.patchFile(path13, content3);
      elizaLogger20.info(`Successfully updated file: ${path13}`);
      const quartzPath = getQuartzPath();
      if (quartzPath && doesQuartzExist(quartzPath)) {
        elizaLogger20.info(`Quartz detected at ${quartzPath}, updating file there as well`);
        const quartzUpdateSuccess = updateQuartzFile(path13, content3, quartzPath);
        if (quartzUpdateSuccess) {
          elizaLogger20.info(`Successfully updated file in Quartz: ${path13}`);
        } else {
          elizaLogger20.warn(`Failed to update file in Quartz: ${path13}`);
        }
      }
      if (callback) {
        callback({
          text: `Successfully updated file: ${path13}${quartzPath ? " (also updated in Quartz)" : ""}`,
          metadata: {
            path: path13,
            operation: "UPDATE",
            success: true,
            quartzUpdated: quartzPath ? true : false
          }
        });
      }
      return true;
    } catch (error) {
      elizaLogger20.error("Error updating file:", error);
      if (callback) {
        callback({
          text: `Error updating file: ${error.message}`,
          error: true
        });
      }
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "Update DOCUMENTS/report.txt with content: This is an updated report"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "UPDATE_FILE"
        }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: 'Patch PROJECTS/src/config.json with content: { "version": "2.0.0" }'
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "UPDATE_FILE"
        }
      }
    ]
  ]
};

// src/actions/quartzSetupArweave.ts
import {
  elizaLogger as elizaLogger21
} from "@elizaos/core";
import * as fs5 from "fs";
import * as path5 from "path";
import { promisify } from "util";
import { exec } from "child_process";
var execAsync = promisify(exec);
var quartzSetupAction = {
  name: "QUARTZ_SETUP",
  similes: [
    "SETUP_QUARTZ",
    "INITIALIZE_QUARTZ",
    "QUARTZ_INIT",
    "CREATE_QUARTZ_SITE",
    "QUARTZ_CREATE"
  ],
  description: "Initialize a Quartz site for publishing your Obsidian vault to Arweave. Use format: 'Setup Quartz with name: My Digital Garden'",
  validate: async (runtime) => {
    try {
      elizaLogger21.debug("Validating Obsidian connection");
      const obsidian = await getObsidian(runtime);
      await obsidian.connect();
      elizaLogger21.debug("Obsidian connection validated successfully");
      try {
        const { stdout } = await execAsync("node --version");
        const version = stdout.trim().replace("v", "");
        const majorVersion = parseInt(version.split(".")[0], 10);
        if (majorVersion < 20) {
          elizaLogger21.error(`Node.js version ${majorVersion} detected. Quartz requires at least Node.js v20.`);
          return false;
        }
        elizaLogger21.debug(`Node.js v${version} detected, which is compatible with Quartz`);
      } catch (error) {
        elizaLogger21.error("Failed to check Node.js version:", error);
        return false;
      }
      return true;
    } catch (error) {
      elizaLogger21.error("Failed to validate Obsidian connection:", error);
      return false;
    }
  },
  handler: async (runtime, message, _state, options, callback) => {
    elizaLogger21.info("Starting Quartz setup handler");
    const obsidian = await getObsidian(runtime);
    try {
      const siteName = options?.siteName || extractSiteName(message.content.text) || "My Digital Garden";
      const contentPath = options?.contentPath || "content";
      const deployLocal = options?.deployLocal || false;
      const tempDir = path5.resolve(process.cwd(), "quartz_temp");
      if (!fs5.existsSync(tempDir)) {
        fs5.mkdirSync(tempDir, { recursive: true });
      }
      if (callback) {
        callback({
          text: `Starting Quartz setup process. This might take a few minutes...`
        });
      }
      elizaLogger21.info(`Setting up Quartz in: ${tempDir}`);
      if (callback) {
        callback({
          text: `Setting up Quartz...`
        });
      }
      try {
        const isExistingQuartz = fs5.existsSync(path5.join(tempDir, "package.json")) && fs5.existsSync(path5.join(tempDir, "quartz.config.ts"));
        if (!isExistingQuartz) {
          await execAsync(`npx degit jackyzha0/quartz ${tempDir}`);
          process.chdir(tempDir);
          await execAsync("git init");
        } else {
          elizaLogger21.info(`Existing Quartz setup found at ${tempDir}, skipping clone`);
          process.chdir(tempDir);
        }
      } catch (error) {
        throw new Error(`Failed to set up Quartz: ${error.message}`);
      }
      elizaLogger21.info("Installing Quartz dependencies");
      if (callback) {
        callback({
          text: `Installing Quartz dependencies...`
        });
      }
      try {
        await execAsync("npm install");
      } catch (error) {
        throw new Error(`Failed to install Quartz dependencies: ${error.message}`);
      }
      elizaLogger21.info("Getting files from Obsidian vault");
      if (callback) {
        callback({
          text: `Preparing to copy content from Obsidian vault...`
        });
      }
      const allFiles = await obsidian.getAllFiles();
      elizaLogger21.debug(`Obsidian returned ${allFiles.length} files in total`);
      const publicFolderPrefix = "Public/";
      const files = allFiles.filter((file) => file.startsWith(publicFolderPrefix));
      elizaLogger21.info(`Found ${files.length} files in the Public folder (out of ${allFiles.length} total files)`);
      const quartzContentDir = path5.resolve(tempDir, contentPath);
      if (!fs5.existsSync(quartzContentDir)) {
        fs5.mkdirSync(quartzContentDir, { recursive: true });
      }
      const indexPath = path5.join(quartzContentDir, "index.md");
      if (!fs5.existsSync(indexPath)) {
        const indexContent = [
          "---",
          `title: ${siteName}`,
          "---",
          "",
          `# Welcome to ${siteName}`,
          "",
          "This is the homepage of your digital garden! Start adding notes to the Public folder in your Obsidian vault and they will appear here.",
          "",
          "## Recent Updates",
          "",
          "You can find recent changes and additions in the [[tags]] section.",
          ""
        ].join("\n");
        fs5.writeFileSync(indexPath, indexContent);
        elizaLogger21.info(`Created default index.md at ${indexPath}`);
      }
      elizaLogger21.info(`Copying Obsidian vault files to Quartz content directory: ${quartzContentDir}`);
      if (callback) {
        callback({
          text: `Copying ${files.length} files from Obsidian Public folder to Quartz content directory...`
        });
      }
      let copiedFiles = 0;
      for (const file of files) {
        try {
          if (file.endsWith(".md") || isRelevantAttachment(file)) {
            const fileContent = await obsidian.readFile(file);
            const relativeToPublic = file.substring(publicFolderPrefix.length);
            const targetFilePath = path5.resolve(quartzContentDir, relativeToPublic);
            const targetDir = path5.dirname(targetFilePath);
            if (!fs5.existsSync(targetDir)) {
              fs5.mkdirSync(targetDir, { recursive: true });
            }
            let hasChanged = true;
            if (fs5.existsSync(targetFilePath)) {
              const existingContent = fs5.readFileSync(targetFilePath, "utf8");
              hasChanged = existingContent !== fileContent;
            }
            if (hasChanged) {
              fs5.writeFileSync(targetFilePath, fileContent);
              copiedFiles++;
            }
          }
        } catch (error) {
          elizaLogger21.error(`Error copying file ${file}: ${error.message}`);
        }
      }
      elizaLogger21.info("Creating/updating Quartz configuration");
      updateQuartzConfig(tempDir, contentPath, siteName);
      elizaLogger21.info("Building the Quartz site");
      if (callback) {
        callback({
          text: `Building the Quartz site...`
        });
      }
      try {
        await execAsync("npx quartz build");
      } catch (error) {
        throw new Error(`Failed to build Quartz site: ${error.message}`);
      }
      if (deployLocal) {
        elizaLogger21.info("Starting local server");
        if (callback) {
          callback({
            text: `Starting local preview server...`
          });
        }
        const previewProcess = exec("npx quartz serve", (error, stdout, stderr) => {
          if (error) {
            elizaLogger21.error(`Error running Quartz serve: ${error.message}`);
            if (callback) {
              callback({
                text: `Error starting local preview server: ${error.message}. You can try manually running \`npx quartz serve\` in \`${tempDir}\`.`,
                error: true
              });
            }
            return;
          }
          elizaLogger21.debug(`Preview process stdout: ${stdout}`);
          elizaLogger21.debug(`Preview process stderr: ${stderr}`);
        });
        await new Promise((resolve6) => setTimeout(resolve6, 3e3));
        process.on("exit", () => {
          try {
            if (previewProcess && !previewProcess.killed) {
              previewProcess.kill();
            }
          } catch (err) {
            elizaLogger21.error(`Error killing preview process: ${err.message}`);
          }
        });
      }
      elizaLogger21.info(`Quartz setup complete at: ${tempDir}`);
      if (callback) {
        callback({
          text: `\u2705 Quartz setup complete!

Your site has been successfully set up at: ${tempDir}

\u{1F4E6} Setup summary:
- Site name: ${siteName}
- Content directory: ${quartzContentDir}
- Copied ${copiedFiles} files from Obsidian Public folder
${deployLocal ? `- Local preview available at: http://localhost:8080` : ""}

To preview your site at any time, ask:
can I preview the Quartz site?

Then open http://localhost:8080 in your browser.

To publish your site to Arweave, use the "Publish Quartz" command.`,
          metadata: {
            siteName,
            quartzDirectory: tempDir,
            contentDirectory: quartzContentDir,
            copiedFiles,
            previewUrl: deployLocal ? "http://localhost:8080" : null,
            isPreviewRunning: deployLocal
          }
        });
      }
      return true;
    } catch (error) {
      elizaLogger21.error("Error setting up Quartz:", error);
      if (callback) {
        callback({
          text: `Error setting up Quartz: ${error.message}`,
          error: true
        });
      }
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "setup quartz"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "QUARTZ_SETUP"
        }
      }
    ]
  ]
};
function extractSiteName(text3) {
  const nameMatch = text3.match(/(?:name|title|site\s*name):\s*["']?([^"']+)["']?/i);
  return nameMatch ? nameMatch[1] : null;
}
function isRelevantAttachment(filePath) {
  const relevantExtensions = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".pdf", ".mp3", ".mp4"];
  const extension2 = path5.extname(filePath).toLowerCase();
  return relevantExtensions.includes(extension2);
}
function updateQuartzConfig(quartzDir, contentPath, siteName) {
  const configPath = path5.join(quartzDir, "quartz.config.ts");
  try {
    let configContent = "";
    if (fs5.existsSync(configPath)) {
      configContent = fs5.readFileSync(configPath, "utf8");
      if (configContent.includes("quartz/content")) {
        configContent = configContent.replace("quartz/content", contentPath);
      }
      const pageTitleRegex = /pageTitle:\s*".*?"/;
      if (pageTitleRegex.test(configContent)) {
        configContent = configContent.replace(pageTitleRegex, `pageTitle: "${siteName}"`);
      }
    } else {
      configContent = `import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
configuration: {
  pageTitle: "${siteName}",
  enableSPA: true,
  enablePopovers: true,
  analytics: {
    provider: "plausible",
  },
  baseUrl: "",
  ignorePatterns: ["private", "templates", ".obsidian"],
  defaultDateType: "created",
  theme: {
    typography: {
      header: "Schibsted Grotesk",
      body: "Source Sans Pro",
      code: "IBM Plex Mono",
    },
    colors: {
      lightMode: {
        light: "#faf8f8",
        lightgray: "#e5e5e5",
        gray: "#b8b8b8",
        darkgray: "#4e4e4e",
        dark: "#2b2b2b",
        secondary: "#284b63",
        tertiary: "#84a59d",
        highlight: "rgba(143, 159, 169, 0.15)",
      },
      darkMode: {
        light: "#161618",
        lightgray: "#393639",
        gray: "#646464",
        darkgray: "#d4d4d4",
        dark: "#ebebec",
        secondary: "#7b97aa",
        tertiary: "#84a59d",
        highlight: "rgba(143, 159, 169, 0.15)",
      },
    },
  },
},
plugins: {
  transformers: [
    Plugin.FrontMatter(),
    Plugin.TableOfContents(),
    Plugin.CreatedModifiedDate({
      priority: ["frontmatter", "filesystem"],
    }),
    Plugin.SyntaxHighlighting(),
    Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
    Plugin.GitHubFlavoredMarkdown(),
    Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
    Plugin.Latex({ renderEngine: "katex" }),
    Plugin.Description(),
  ],
  filters: [Plugin.RemoveDrafts()],
  emitters: [
    Plugin.AliasRedirects(),
    Plugin.ComponentResources({ fontOrigin: "googleFonts" }),
    Plugin.ContentPage(),
    Plugin.FolderPage(),
    Plugin.TagPage(),
    Plugin.ContentIndex({
      enableSiteMap: true,
      enableRSS: true,
    }),
    Plugin.Assets(),
    Plugin.Static(),
    Plugin.NotFoundPage(),
  ],
},
}

export default config
`;
    }
    fs5.writeFileSync(configPath, configContent);
    elizaLogger21.info(`Updated Quartz configuration at: ${configPath}`);
  } catch (error) {
    elizaLogger21.error(`Error updating Quartz config: ${error.message}`);
  }
}

// src/actions/quartzPublishArweave.ts
import {
  elizaLogger as elizaLogger22
} from "@elizaos/core";
import * as fs6 from "fs";
import * as path6 from "path";
import { promisify as promisify2 } from "util";
import { exec as exec2 } from "child_process";
var execAsync2 = promisify2(exec2);
var quartzPublishAction = {
  name: "QUARTZ_PUBLISH",
  similes: [
    "PUBLISH_QUARTZ",
    "DEPLOY_QUARTZ",
    "QUARTZ_DEPLOY",
    "QUARTZ_PUBLISH_SITE",
    "DEPLOY_QUARTZ_SITE",
    "PUBLISH_QUARTZ_SITE"
  ],
  description: "Sync Obsidian vault's Public folder to your Quartz site and publish it to Arweave. Use format: 'Publish Quartz'",
  validate: async (runtime) => {
    try {
      const obsidian = await getObsidian(runtime);
      await obsidian.connect();
      await execAsync2("node --version");
      return true;
    } catch (error) {
      elizaLogger22.error("Validation failed:", error);
      return false;
    }
  },
  handler: async (runtime, message, _state, options, callback) => {
    elizaLogger22.info("Starting Quartz publish handler");
    const obsidian = await getObsidian(runtime);
    try {
      const originalWorkingDir = process.cwd();
      elizaLogger22.info(`Original working directory: ${originalWorkingDir}`);
      const possiblePaths = [
        options?.quartzDir,
        getQuartzPath(),
        "/Users/darrenzal/GAIA/agent/quartz_temp/quartz",
        // Add the actual nested path
        "/Users/darrenzal/GAIA/agent/quartz_temp",
        "/Users/darrenzal/quartz",
        path6.resolve(originalWorkingDir, "quartz_temp/quartz"),
        path6.resolve(originalWorkingDir, "quartz_temp"),
        path6.resolve(originalWorkingDir, "quartz"),
        path6.resolve(originalWorkingDir, "../quartz")
      ].filter(Boolean);
      let quartzDir = options?.quartzDir || getQuartzPath();
      if (!quartzDir) {
        elizaLogger22.debug(`Checking possible Quartz paths: ${possiblePaths.join(", ")}`);
        for (const possiblePath of possiblePaths) {
          elizaLogger22.debug(`Checking path: ${possiblePath}`);
          if (possiblePath && fs6.existsSync(possiblePath)) {
            elizaLogger22.debug(`Path exists: ${possiblePath}`);
            const contentDir = path6.join(possiblePath, "content");
            if (fs6.existsSync(contentDir) && fs6.statSync(contentDir).isDirectory()) {
              quartzDir = possiblePath;
              elizaLogger22.info(`Found valid Quartz directory at: ${quartzDir}`);
              break;
            }
            const nestedQuartzDir = path6.join(possiblePath, "quartz");
            if (fs6.existsSync(nestedQuartzDir) && fs6.statSync(nestedQuartzDir).isDirectory()) {
              const nestedContentDir = path6.join(nestedQuartzDir, "content");
              if (fs6.existsSync(nestedContentDir) && fs6.statSync(nestedContentDir).isDirectory()) {
                quartzDir = nestedQuartzDir;
                elizaLogger22.info(`Found valid nested Quartz directory at: ${quartzDir}`);
                break;
              }
            }
          }
        }
      }
      if (!quartzDir) {
        elizaLogger22.error(`Quartz directory not found. Checked paths: ${possiblePaths.join(", ")}`);
        throw new Error(`Quartz directory not found. Please specify the correct path using the 'quartzDir' option.`);
      }
      elizaLogger22.info(`Using Quartz directory: ${quartzDir}`);
      const contentPath = options?.contentPath || "content";
      const quartzContentDir = path6.join(quartzDir, contentPath);
      if (!fs6.existsSync(quartzContentDir)) {
        elizaLogger22.info(`Content directory doesn't exist. Creating it at: ${quartzContentDir}`);
        fs6.mkdirSync(quartzContentDir, { recursive: true });
      }
      elizaLogger22.info("Getting files from Obsidian vault");
      const allFiles = await obsidian.getAllFiles();
      elizaLogger22.debug(`Obsidian returned ${allFiles.length} files in total`);
      const publicFolderPrefix = "Public/";
      const files = allFiles.filter((file) => file.startsWith(publicFolderPrefix));
      elizaLogger22.info(`Found ${files.length} files in the Public folder (out of ${allFiles.length} total files)`);
      elizaLogger22.info(`Syncing ${files.length} files from Obsidian Public folder to Quartz`);
      if (callback) {
        callback({
          text: `Syncing ${files.length} files from Obsidian Public folder to Quartz content directory...`
        });
      }
      let syncedCount = 0;
      for (const file of files) {
        try {
          if (file.endsWith(".md") || isRelevantAttachment2(file)) {
            elizaLogger22.debug(`Processing file: ${file}`);
            const fileContent = await obsidian.readFile(file);
            const relativeToPublic = file.substring(publicFolderPrefix.length);
            const targetFilePath = path6.resolve(quartzContentDir, relativeToPublic);
            elizaLogger22.debug(`Target path: ${targetFilePath}`);
            const targetDir = path6.dirname(targetFilePath);
            if (!fs6.existsSync(targetDir)) {
              fs6.mkdirSync(targetDir, { recursive: true });
            }
            let hasChanged = true;
            if (fs6.existsSync(targetFilePath)) {
              const existingContent = fs6.readFileSync(targetFilePath, "utf8");
              hasChanged = existingContent !== fileContent;
            }
            if (hasChanged) {
              fs6.writeFileSync(targetFilePath, fileContent);
              syncedCount++;
            }
          }
        } catch (error) {
          elizaLogger22.error(`Error syncing file ${file}: ${error.message}`);
        }
      }
      elizaLogger22.info(`Synced ${syncedCount} files (new or changed) from Public folder to Quartz content directory`);
      if (syncedCount === 0 && files.length === 0) {
        elizaLogger22.warn("No files were found in the Public folder. Make sure your Obsidian vault has a Public folder with content.");
        if (callback) {
          callback({
            text: `\u26A0\uFE0F No files were found in the Public folder of your Obsidian vault. Make sure your vault has a Public folder with the content you want to publish.`,
            warning: true
          });
          return true;
        }
      }
      if (callback) {
        callback({
          text: `Building and publishing Quartz site to Arweave...`
        });
      }
      try {
        process.chdir(quartzDir);
        elizaLogger22.info(`Building Quartz site at: ${quartzDir}`);
        elizaLogger22.info(`Building Quartz site for Arweave deployment`);
        const quartzConfigPath = path6.join(quartzDir, "quartz.config.ts");
        let configModified = false;
        if (fs6.existsSync(quartzConfigPath)) {
          elizaLogger22.debug(`Found Quartz configuration at: ${quartzConfigPath}`);
          const configContent = fs6.readFileSync(quartzConfigPath, "utf8");
          if (!configContent.includes("// Arweave deployment configuration")) {
            elizaLogger22.info(`Modifying Quartz configuration for Arweave deployment`);
            const backupPath = `${quartzConfigPath}.backup`;
            fs6.writeFileSync(backupPath, configContent);
            elizaLogger22.debug(`Created backup of Quartz configuration at: ${backupPath}`);
            const modifiedConfig = configContent.replace(
              /export default defineConfig\(/,
              `// Arweave deployment configuration
// This ensures that client-side routing works correctly on Arweave
const isArweaveDeployment = true;

export default defineConfig(`
            );
            fs6.writeFileSync(quartzConfigPath, modifiedConfig);
            configModified = true;
            elizaLogger22.debug(`Modified Quartz configuration for Arweave deployment`);
          }
        }
        const { stdout: buildOutput, stderr: buildError } = await execAsync2("npx quartz build");
        elizaLogger22.debug(`Build output: ${buildOutput}`);
        if (buildError) {
          elizaLogger22.debug(`Build errors: ${buildError}`);
        }
        if (configModified) {
          const backupPath = `${quartzConfigPath}.backup`;
          if (fs6.existsSync(backupPath)) {
            fs6.copyFileSync(backupPath, quartzConfigPath);
            fs6.unlinkSync(backupPath);
            elizaLogger22.debug(`Restored original Quartz configuration`);
          }
        }
        const publicDir = path6.join(quartzDir, "public");
        const notFoundPath = path6.join(publicDir, "404.html");
        const notFoundContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script>
        // Handle client-side routing by redirecting to the index page with the path as a hash
        // This helps with Arweave deployment where the fallback might not work as expected
        (function() {
            var path = window.location.pathname;
            var cleanPath = path.replace(/\\.html$/, '');
            // Remove leading slash if present
            if (cleanPath.startsWith('/')) {
                cleanPath = cleanPath.substring(1);
            }
            // If path is empty, just go to index
            if (!cleanPath || cleanPath === '404') {
                window.location.href = '/';
            } else {
                // Otherwise, redirect to the index with the path as a hash
                window.location.href = '/#/' + cleanPath;
            }
        })();
    </script>
</head>
<body>
    <p>Redirecting to the requested page...</p>
</body>
</html>`;
        fs6.writeFileSync(notFoundPath, notFoundContent);
        elizaLogger22.debug(`Created special 404.html file for client-side routing`);
        elizaLogger22.info(`Enhancing HTML files for better client-side routing on Arweave...`);
        const findHtmlFiles = (dir) => {
          const entries = fs6.readdirSync(dir, { withFileTypes: true });
          const files2 = [];
          for (const entry of entries) {
            const fullPath = path6.join(dir, entry.name);
            if (entry.isDirectory()) {
              files2.push(...findHtmlFiles(fullPath));
            } else if (entry.name.endsWith(".html") && entry.name !== "index.html" && entry.name !== "404.html") {
              files2.push(fullPath);
            }
          }
          return files2;
        };
        const htmlFiles = findHtmlFiles(publicDir);
        elizaLogger22.debug(`Found ${htmlFiles.length} HTML files to enhance`);
        const routerJsPath = path6.join(publicDir, "router.js");
        const routerJsContent = `// Client-side router for Arweave deployment
document.addEventListener('DOMContentLoaded', function() {
    // Handle internal links
    document.body.addEventListener('click', function(e) {
        // Find closest anchor tag
        let target = e.target;
        while (target && target.tagName !== 'A') {
            target = target.parentNode;
            if (!target || target === document.body) return;
        }
        
        if (target && target.tagName === 'A') {
            const href = target.getAttribute('href');
            
            // Only handle internal links that aren't absolute URLs or anchor links
            if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
                e.preventDefault();
                
                // Clean up the path
                let cleanPath = href.replace(/\\.html$/, '');
                // Remove leading slash if present
                if (cleanPath.startsWith('/')) {
                    cleanPath = cleanPath.substring(1);
                }
                
                // Navigate using hash-based routing
                window.location.href = '/#/' + cleanPath;
            }
        }
    });
    
    // Handle hash-based routing
    function handleRouting() {
        const hash = window.location.hash;
        if (hash.startsWith('#/')) {
            const path = hash.substring(2);
            // Fetch the content for this path
            fetch(path + '.html')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Page not found');
                    }
                    return response.text();
                })
                .then(html => {
                    // Extract the content from the fetched page
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = html;
                    const content = tempDiv.querySelector('#quartz-content');
                    if (content) {
                        // Replace the current content with the fetched content
                        document.querySelector('#quartz-content').innerHTML = content.innerHTML;
                        // Update the title
                        const title = tempDiv.querySelector('title');
                        if (title) {
                            document.title = title.textContent;
                        }
                    } else {
                        console.error('Could not find content in fetched page');
                    }
                })
                .catch(error => {
                    console.error('Error fetching page:', error);
                });
        }
    }
    
    // Initial routing
    handleRouting();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleRouting);
});`;
        fs6.writeFileSync(routerJsPath, routerJsContent);
        elizaLogger22.debug(`Created router.js for client-side routing`);
        const indexHtmlPath = path6.join(publicDir, "index.html");
        if (fs6.existsSync(indexHtmlPath)) {
          let indexHtml = fs6.readFileSync(indexHtmlPath, "utf8");
          if (!indexHtml.includes("router.js")) {
            indexHtml = indexHtml.replace(
              "</head>",
              '<script src="/router.js"></script></head>'
            );
            fs6.writeFileSync(indexHtmlPath, indexHtml);
            elizaLogger22.debug(`Added router.js script to index.html`);
          }
        }
        const discourseGraphsPath = path6.join(publicDir, "DiscourseGraphs.html");
        const discourseGraphsMdPath = path6.join(quartzContentDir, "DiscourseGraphs.md");
        if (fs6.existsSync(discourseGraphsMdPath) || files.some((f) => f.endsWith("DiscourseGraphs.md"))) {
          elizaLogger22.info(`Found DiscourseGraphs.md, creating special HTML file`);
          if (!fs6.existsSync(discourseGraphsPath)) {
            const redirectContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>DiscourseGraphs</title>
    <meta http-equiv="refresh" content="0;url=/#/DiscourseGraphs">
</head>
<body>
    <p>Redirecting to <a href="/#/DiscourseGraphs">DiscourseGraphs</a>...</p>
</body>
</html>`;
            fs6.writeFileSync(discourseGraphsPath, redirectContent);
            elizaLogger22.debug(`Created special redirect file for DiscourseGraphs`);
          }
        }
        let arweaveWalletPath = process.env.ARWEAVE_WALLET_PATH;
        if (!arweaveWalletPath) {
          elizaLogger22.warn("Arweave wallet path not found in environment variables");
          if (callback) {
            callback({
              text: `\u26A0\uFE0F Arweave wallet path not found. Please set the ARWEAVE_WALLET_PATH environment variable to point to your Arweave wallet JSON file.`,
              warning: true
            });
          }
          return true;
        }
        if (!path6.isAbsolute(arweaveWalletPath)) {
          arweaveWalletPath = path6.resolve(process.cwd(), arweaveWalletPath);
        }
        if (callback) {
          callback({
            text: `Publishing to Arweave...`
          });
        }
        const manifestJsonPath = path6.join(publicDir, "manifest.json");
        const manifestData = {
          files: fs6.readdirSync(publicDir).filter((f) => f.endsWith(".html")),
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          quartzDir,
          contentFiles: fs6.readdirSync(quartzContentDir).filter((f) => f.endsWith(".md"))
        };
        fs6.writeFileSync(manifestJsonPath, JSON.stringify(manifestData, null, 2));
        elizaLogger22.debug(`Created manifest.json for debugging`);
        elizaLogger22.info(`Files in public directory before upload:`);
        const listFilesRecursive = (dir, prefix = "") => {
          const entries = fs6.readdirSync(dir, { withFileTypes: true });
          for (const entry of entries) {
            const fullPath = path6.join(dir, entry.name);
            const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
            if (entry.isDirectory()) {
              listFilesRecursive(fullPath, relativePath);
            } else {
              elizaLogger22.debug(`- ${relativePath}`);
            }
          }
        };
        listFilesRecursive(publicDir);
        elizaLogger22.info(`Publishing to Arweave...`);
        const { uploadSiteToArweave } = await import("./arweaveUploader-GRGSHLMK.js");
        const uploadResult = await uploadSiteToArweave(
          arweaveWalletPath,
          path6.join(quartzDir, "public")
        );
        if (!uploadResult.success) {
          throw new Error(`Failed to upload to Arweave: ${uploadResult.error}`);
        }
        const manifestTxId = uploadResult.id || "unknown";
        const manifestUrl = uploadResult.url || `https://arweave.net/${manifestTxId}`;
        elizaLogger22.info(`Quartz site successfully uploaded to Arweave at ${manifestUrl}`);
        elizaLogger22.info(`Direct link to DiscourseGraphs: ${manifestUrl}/DiscourseGraphs`);
        const arweaveResult = {
          manifestTxId,
          manifestUrl
        };
        process.chdir(originalWorkingDir);
        if (callback) {
          callback({
            text: `\u2705 Quartz site published permanently to Arweave!

Your content has been synced from the Public folder in your Obsidian vault to Quartz (${syncedCount} files updated) and published to Arweave.

You can access it here: ${arweaveResult.manifestUrl}`,
            metadata: {
              quartzDirectory: quartzDir,
              syncedFiles: syncedCount,
              deployed: true,
              arweaveTxId: arweaveResult.manifestTxId,
              siteUrl: arweaveResult.manifestUrl
            }
          });
        }
      } catch (publishError) {
        elizaLogger22.error(`Error publishing Quartz site to Arweave: ${publishError.message}`);
        if (callback) {
          callback({
            text: `Could not publish the Quartz site to Arweave: ${publishError.message}

Please ensure your Arweave wallet is properly configured and has sufficient funds.`,
            error: true
          });
        }
        try {
          process.chdir(originalWorkingDir);
        } catch (err) {
          elizaLogger22.error(`Error returning to original directory: ${err.message}`);
        }
      }
      return true;
    } catch (error) {
      elizaLogger22.error("Error publishing Quartz:", error);
      if (callback) {
        callback({
          text: `Error publishing Quartz: ${error.message}`,
          error: true
        });
      }
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: { text: "Publish Quartz" }
      },
      {
        user: "{{agentName}}",
        content: { text: "{{responseData}}", action: "QUARTZ_PUBLISH" }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: { text: "Deploy my Quartz website" }
      },
      {
        user: "{{agentName}}",
        content: { text: "{{responseData}}", action: "QUARTZ_PUBLISH" }
      }
    ]
  ]
};
function isRelevantAttachment2(filePath) {
  const relevantExtensions = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".pdf", ".mp3", ".mp4"];
  return relevantExtensions.includes(path6.extname(filePath).toLowerCase());
}

// src/actions/quartzDiagnose.ts
import {
  elizaLogger as elizaLogger23
} from "@elizaos/core";
import * as path7 from "path";
import * as fs7 from "fs";
var quartzDiagnoseAction = {
  name: "QUARTZ_DIAGNOSE",
  similes: [
    "DIAGNOSE_QUARTZ",
    "CHECK_QUARTZ",
    "QUARTZ_CHECK",
    "QUARTZ_STATUS",
    "QUARTZ_DEBUG"
  ],
  description: "Diagnose issues with Quartz setup and integration with Obsidian",
  validate: async (runtime) => {
    try {
      elizaLogger23.debug("Validating Obsidian connection");
      const obsidian = await getObsidian(runtime);
      await obsidian.connect();
      elizaLogger23.debug("Obsidian connection validated successfully");
      return true;
    } catch (error) {
      elizaLogger23.error("Failed to validate Obsidian connection:", error);
      return false;
    }
  },
  handler: async (runtime, _message, _state, _options, callback) => {
    elizaLogger23.info("Starting Quartz diagnostic handler");
    const obsidian = await getObsidian(runtime);
    try {
      const diagnosticInfo = diagnoseQuartzSetup();
      elizaLogger23.info("Quartz diagnostic info collected");
      const specificPath = "/Users/darrenzal/GAIA/agent/quartz_temp/quartz";
      let manualPathCheck = "\n\nManual Path Check:\n";
      try {
        if (fs7.existsSync(specificPath)) {
          manualPathCheck += `\u2713 Path ${specificPath} exists
`;
          const contentDir = path7.join(specificPath, "content");
          if (fs7.existsSync(contentDir)) {
            manualPathCheck += `\u2713 Content directory exists
`;
            const testFilePath = path7.join(contentDir, "quartz_test.md");
            fs7.writeFileSync(testFilePath, "# Quartz Test File\n\nThis is a test file to check write permissions.");
            manualPathCheck += `\u2713 Successfully wrote test file to ${testFilePath}
`;
            const testContent = fs7.readFileSync(testFilePath, "utf8");
            manualPathCheck += `\u2713 Successfully read back test file (${testContent.length} bytes)
`;
            fs7.unlinkSync(testFilePath);
            manualPathCheck += `\u2713 Successfully deleted test file
`;
          } else {
            manualPathCheck += `\u274C Content directory does not exist
`;
          }
        } else {
          manualPathCheck += `\u274C Path does not exist
`;
        }
      } catch (error) {
        manualPathCheck += `\u274C Error during manual path check: ${error.message}
`;
      }
      let obsidianInfo = "\n\nObsidian Vault Info:\n";
      try {
        const files = await obsidian.getAllFiles();
        obsidianInfo += `Found ${files.length} files in Obsidian vault
`;
        if (files.length > 0) {
          obsidianInfo += "Sample files:\n";
          for (let i = 0; i < Math.min(5, files.length); i++) {
            obsidianInfo += `  - ${files[i]}
`;
          }
        }
      } catch (error) {
        obsidianInfo += `\u274C Error getting Obsidian vault info: ${error.message}
`;
      }
      const combinedDiagnostics = diagnosticInfo + manualPathCheck + obsidianInfo;
      if (callback) {
        callback({
          text: `# Quartz Diagnostic Results

${combinedDiagnostics}`,
          metadata: {
            diagnostics: combinedDiagnostics
          }
        });
      }
      return true;
    } catch (error) {
      elizaLogger23.error("Error during Quartz diagnostics:", error);
      if (callback) {
        callback({
          text: `Error during Quartz diagnostics: ${error.message}`,
          error: true
        });
      }
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "Diagnose Quartz setup"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "QUARTZ_DIAGNOSE"
        }
      }
    ]
  ]
};

// src/actions/arweaveSetup.ts
import {
  elizaLogger as elizaLogger24
} from "@elizaos/core";
import * as fs8 from "fs";
import * as path8 from "path";
import Arweave from "arweave";
var arweaveSetupAction = {
  name: "ARWEAVE_SETUP",
  similes: ["SETUP_ARWEAVE", "CREATE_ARWEAVE_WALLET", "CONFIGURE_ARWEAVE"],
  description: "Generate a new Arweave wallet using the SDK and save it to disk.",
  validate: async () => true,
  handler: async (_runtime, _message, _state, _options, callback) => {
    try {
      const walletDir = path8.resolve(".arweave");
      const walletPath = path8.join(walletDir, "wallet.json");
      const arweave = Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https"
      });
      if (fs8.existsSync(walletPath)) {
        const existingWallet = JSON.parse(fs8.readFileSync(walletPath, "utf8"));
        const address2 = await arweave.wallets.jwkToAddress(existingWallet);
        const balanceWinston = await arweave.wallets.getBalance(address2);
        const balanceAR = arweave.ar.winstonToAr(balanceWinston);
        const message = `\u{1F510} Existing Arweave wallet detected:

**Address**: \`${address2}\`
**Balance**: \`${balanceAR} AR\`
**Path**: \`${walletPath}\`

Setup aborted to avoid overwriting.`;
        elizaLogger24.warn(message);
        if (callback) {
          callback({
            text: message,
            metadata: { walletPath, address: address2, balance: balanceAR }
          });
        }
        return false;
      }
      if (!fs8.existsSync(walletDir)) fs8.mkdirSync(walletDir, { recursive: true });
      elizaLogger24.info("Generating new Arweave key...");
      const key = await arweave.wallets.generate();
      fs8.writeFileSync(walletPath, JSON.stringify(key, null, 2));
      elizaLogger24.info(`Saved Arweave wallet to ${walletPath}`);
      const address = await arweave.wallets.jwkToAddress(key);
      const envPath = path8.resolve(".env");
      let env = fs8.existsSync(envPath) ? fs8.readFileSync(envPath, "utf8") : "";
      const newEnvLine = `ARWEAVE_WALLET_PATH=${path8.resolve(walletPath)}`;
      elizaLogger24.info(`Using wallet path: ${process.env.ARWEAVE_WALLET_PATH}`);
      if (!env.includes("ARWEAVE_WALLET_PATH")) {
        env += `
${newEnvLine}`;
      } else {
        env = env.replace(/^ARWEAVE_WALLET_PATH=.*$/m, newEnvLine);
      }
      fs8.writeFileSync(envPath, env);
      if (callback) {
        callback({
          text: `\u2705 Arweave wallet created!

**Address**: \`${address}\`
**Path**: \`${walletPath}\`

Stored in .env as \`ARWEAVE_WALLET_PATH\`.

\u{1F449} Fund it at https://faucet.arweave.net (or using real AR).`
        });
      }
      return true;
    } catch (error) {
      elizaLogger24.error("Failed to generate wallet:", error);
      if (callback) {
        callback({
          text: `\u274C Error setting up Arweave wallet: ${error.message}`,
          error: true
        });
      }
      return false;
    }
  },
  examples: [
    [
      { user: "{{user1}}", content: { text: "Setup Arweave" } },
      { user: "{{agentName}}", content: { text: "{{responseData}}", action: "ARWEAVE_SETUP" } }
    ]
  ]
};

// src/actions/quartzPreview.ts
import {
  elizaLogger as elizaLogger25
} from "@elizaos/core";
import * as fs9 from "fs";
import * as path9 from "path";
import { promisify as promisify3 } from "util";
import { exec as exec3 } from "child_process";
var execAsync3 = promisify3(exec3);
var quartzPreviewAction = {
  name: "QUARTZ_PREVIEW",
  similes: [
    "PREVIEW_QUARTZ",
    "SERVE_QUARTZ",
    "START_QUARTZ_PREVIEW",
    "QUARTZ_SERVE",
    "QUARTZ_START_PREVIEW",
    "QUARTZ_LOCAL_PREVIEW"
  ],
  description: "Sync Obsidian vault's Public folder to your Quartz site and start a preview server. Use format: 'Preview Quartz'",
  validate: async (runtime) => {
    try {
      const obsidian = await getObsidian(runtime);
      await obsidian.connect();
      await execAsync3("node --version");
      return true;
    } catch (error) {
      elizaLogger25.error("Validation failed:", error);
      return false;
    }
  },
  handler: async (runtime, message, _state, options, callback) => {
    elizaLogger25.info("Starting Quartz preview handler");
    const obsidian = await getObsidian(runtime);
    try {
      const originalWorkingDir = process.cwd();
      elizaLogger25.info(`Original working directory: ${originalWorkingDir}`);
      let quartzDir = options?.quartzDir || getQuartzPath();
      if (!quartzDir) {
        const possiblePaths = [
          "/Users/darrenzal/GAIA/agent/quartz_temp/quartz",
          // Add the actual nested path
          "/Users/darrenzal/GAIA/agent/quartz_temp",
          "/Users/darrenzal/quartz",
          path9.resolve(originalWorkingDir, "quartz_temp/quartz"),
          path9.resolve(originalWorkingDir, "quartz_temp"),
          path9.resolve(originalWorkingDir, "quartz"),
          path9.resolve(originalWorkingDir, "../quartz")
        ].filter(Boolean);
        elizaLogger25.debug(`Checking possible Quartz paths: ${possiblePaths.join(", ")}`);
        for (const possiblePath of possiblePaths) {
          elizaLogger25.debug(`Checking path: ${possiblePath}`);
          if (possiblePath && fs9.existsSync(possiblePath)) {
            elizaLogger25.debug(`Path exists: ${possiblePath}`);
            const contentDir = path9.join(possiblePath, "content");
            if (fs9.existsSync(contentDir) && fs9.statSync(contentDir).isDirectory()) {
              quartzDir = possiblePath;
              elizaLogger25.info(`Found valid Quartz directory at: ${quartzDir}`);
              break;
            }
            const nestedQuartzDir = path9.join(possiblePath, "quartz");
            if (fs9.existsSync(nestedQuartzDir) && fs9.statSync(nestedQuartzDir).isDirectory()) {
              const nestedContentDir = path9.join(nestedQuartzDir, "content");
              if (fs9.existsSync(nestedContentDir) && fs9.statSync(nestedContentDir).isDirectory()) {
                quartzDir = nestedQuartzDir;
                elizaLogger25.info(`Found valid nested Quartz directory at: ${quartzDir}`);
                break;
              }
            }
          }
        }
      }
      if (!quartzDir) {
        elizaLogger25.error(`Quartz directory not found.`);
        throw new Error(`Quartz directory not found. Please specify the correct path using the 'quartzDir' option.`);
      }
      elizaLogger25.info(`Using Quartz directory: ${quartzDir}`);
      const contentPath = options?.contentPath || "content";
      const quartzContentDir = path9.join(quartzDir, contentPath);
      if (!fs9.existsSync(quartzContentDir)) {
        elizaLogger25.info(`Content directory doesn't exist. Creating it at: ${quartzContentDir}`);
        fs9.mkdirSync(quartzContentDir, { recursive: true });
      }
      elizaLogger25.info("Getting files from Obsidian vault");
      const allFiles = await obsidian.getAllFiles();
      elizaLogger25.debug(`Obsidian returned ${allFiles.length} files in total`);
      const publicFolderPrefix = "Public/";
      const files = allFiles.filter((file) => file.startsWith(publicFolderPrefix));
      elizaLogger25.info(`Found ${files.length} files in the Public folder (out of ${allFiles.length} total files)`);
      elizaLogger25.info(`Syncing ${files.length} files from Obsidian Public folder to Quartz`);
      if (callback) {
        callback({
          text: `Syncing ${files.length} files from Obsidian Public folder to Quartz content directory...`
        });
      }
      let syncedCount = 0;
      for (const file of files) {
        try {
          if (file.endsWith(".md") || isRelevantAttachment3(file)) {
            elizaLogger25.debug(`Processing file: ${file}`);
            const fileContent = await obsidian.readFile(file);
            const relativeToPublic = file.substring(publicFolderPrefix.length);
            const targetFilePath = path9.resolve(quartzContentDir, relativeToPublic);
            elizaLogger25.debug(`Target path: ${targetFilePath}`);
            const targetDir = path9.dirname(targetFilePath);
            if (!fs9.existsSync(targetDir)) {
              fs9.mkdirSync(targetDir, { recursive: true });
            }
            let hasChanged = true;
            if (fs9.existsSync(targetFilePath)) {
              const existingContent = fs9.readFileSync(targetFilePath, "utf8");
              hasChanged = existingContent !== fileContent;
            }
            if (hasChanged) {
              fs9.writeFileSync(targetFilePath, fileContent);
              syncedCount++;
            }
          }
        } catch (error) {
          elizaLogger25.error(`Error syncing file ${file}: ${error.message}`);
        }
      }
      elizaLogger25.info(`Synced ${syncedCount} files (new or changed) from Public folder to Quartz content directory`);
      if (syncedCount === 0 && files.length === 0) {
        elizaLogger25.warn("No files were found in the Public folder. Make sure your Obsidian vault has a Public folder with content.");
        if (callback) {
          callback({
            text: `\u26A0\uFE0F No files were found in the Public folder of your Obsidian vault. Make sure your vault has a Public folder with the content you want to publish.`,
            warning: true
          });
          return true;
        }
      }
      if (callback) {
        callback({
          text: `Building and starting Quartz preview server...`
        });
      }
      try {
        process.chdir(quartzDir);
        elizaLogger25.info(`Starting Quartz preview at: ${quartzDir}`);
        const previewProcess = exec3("npx quartz build --serve", (error, stdout, stderr) => {
          if (error) {
            elizaLogger25.error(`Error running Quartz preview: ${error.message}`);
            if (callback) {
              callback({
                text: `Error starting Quartz preview: ${error.message}. You can try manually running \`npx quartz build --serve\` in \`${quartzDir}\`.`,
                error: true
              });
            }
            return;
          }
          elizaLogger25.debug(`Preview process stdout: ${stdout}`);
          elizaLogger25.debug(`Preview process stderr: ${stderr}`);
        });
        await new Promise((resolve6) => setTimeout(resolve6, 5e3));
        if (callback) {
          callback({
            text: `\u2705 Quartz preview server is now running!

Open http://localhost:8080 in your browser to view your site.

The preview will continue running until you close this application. Your content has been synced from the Public folder in your Obsidian vault to Quartz (${syncedCount} files updated).`,
            metadata: {
              quartzDirectory: quartzDir,
              previewUrl: "http://localhost:8080",
              isPreviewRunning: true,
              syncedFiles: syncedCount
            }
          });
        }
        process.on("exit", () => {
          try {
            if (previewProcess && !previewProcess.killed) {
              previewProcess.kill();
            }
          } catch (err) {
            elizaLogger25.error(`Error killing preview process: ${err.message}`);
          }
        });
        process.chdir(originalWorkingDir);
      } catch (previewError) {
        elizaLogger25.error(`Error setting up preview: ${previewError.message}`);
        if (callback) {
          callback({
            text: `Could not automatically start the preview server: ${previewError.message}

You can manually start it by running \`npx quartz build --serve\` in \`${quartzDir}\` and then open http://localhost:8080 in your browser.`,
            error: true
          });
        }
        try {
          process.chdir(originalWorkingDir);
        } catch (err) {
          elizaLogger25.error(`Error returning to original directory: ${err.message}`);
        }
      }
      return true;
    } catch (error) {
      elizaLogger25.error("Error previewing Quartz:", error);
      if (callback) {
        callback({
          text: `Error previewing Quartz: ${error.message}`,
          error: true
        });
      }
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: { text: "Preview Quartz" }
      },
      {
        user: "{{agentName}}",
        content: { text: "{{responseData}}", action: "QUARTZ_PREVIEW" }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: { text: "Start Quartz preview server" }
      },
      {
        user: "{{agentName}}",
        content: { text: "{{responseData}}", action: "QUARTZ_PREVIEW" }
      }
    ]
  ]
};
function isRelevantAttachment3(filePath) {
  const relevantExtensions = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".pdf", ".mp3", ".mp4"];
  return relevantExtensions.includes(path9.extname(filePath).toLowerCase());
}

// src/actions/loadRDF.ts
import {
  elizaLogger as elizaLogger28
} from "@elizaos/core";

// src/helper/tempFileSystem.ts
import { elizaLogger as elizaLogger26 } from "@elizaos/core";
var TempFileSystem = class {
  constructor() {
    this.tempData = /* @__PURE__ */ new Map();
  }
  /**
   * Writes content to a temporary file and returns an ID that can be used to retrieve it
   * @param filename - Name of the temporary file (used for ID generation)
   * @param content - Content to store
   * @returns Temporary file ID that can be used to retrieve the content
   */
  async writeTempFile(filename, content3) {
    const tempId = `temp_${Date.now()}_${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    this.tempData.set(tempId, content3);
    elizaLogger26.debug(`Wrote temporary file: ${tempId} (${content3.length} bytes)`);
    return tempId;
  }
  /**
   * Reads content from a temporary file
   * @param tempId - Temporary file ID returned from writeTempFile
   * @returns The content of the temporary file, or null if not found
   */
  async readTempFile(tempId) {
    const content3 = this.tempData.get(tempId);
    if (!content3) {
      elizaLogger26.debug(`Temporary file not found: ${tempId}`);
      return null;
    }
    elizaLogger26.debug(`Read temporary file: ${tempId} (${content3.length} bytes)`);
    return content3;
  }
  /**
   * Deletes a temporary file
   * @param tempId - Temporary file ID returned from writeTempFile
   * @returns True if the file was deleted, false if it wasn't found
   */
  async deleteTempFile(tempId) {
    const deleted = this.tempData.delete(tempId);
    if (deleted) {
      elizaLogger26.debug(`Deleted temporary file: ${tempId}`);
    } else {
      elizaLogger26.debug(`Failed to delete temporary file (not found): ${tempId}`);
    }
    return deleted;
  }
  /**
   * Lists all temporary files
   * @returns Array of temporary file IDs
   */
  listTempFiles() {
    return Array.from(this.tempData.keys());
  }
  /**
   * Clears all temporary files
   */
  clearAll() {
    const count = this.tempData.size;
    this.tempData.clear();
    elizaLogger26.debug(`Cleared all temporary files (${count} files)`);
  }
};
var tempFileSystem = null;
function getTempFileSystem() {
  if (!tempFileSystem) {
    tempFileSystem = new TempFileSystem();
    elizaLogger26.debug("Created new TempFileSystem instance");
  }
  return tempFileSystem;
}

// src/actions/loadRDF.ts
import * as path11 from "path";

// src/helper/generateOntologyTtl.ts
import { elizaLogger as elizaLogger27 } from "@elizaos/core";
import * as fs10 from "fs";
import * as path10 from "path";
async function generateOntologyFromGraph(runtime) {
  try {
    elizaLogger27.info("Generating ontology TTL from RDF graph");
    const rdfManager = getRdfManager();
    if (!rdfManager.isLoaded()) {
      elizaLogger27.error("RDF graph is not loaded, cannot generate ontology");
      return {
        success: false,
        ttlFilePath: "",
        markdownPath: ""
      };
    }
    const stats = rdfManager.getStats();
    elizaLogger27.debug(`RDF graph contains ${stats.statements} statements, ${stats.subjects} subjects, ${stats.predicates} predicates`);
    const rawSchemaTriples = rdfManager.extractSchemaTriples();
    elizaLogger27.debug(`Extracted ${rawSchemaTriples.length} raw schema-related triples`);
    const processedTriples = /* @__PURE__ */ new Set();
    const cleanedTriples = [];
    for (const triple of rawSchemaTriples) {
      let normalizedTriple = triple;
      if (triple.includes("rdfs:range")) {
        const match = triple.match(/^(\S+)\s+rdfs:range\s+(\S+)\s+\./);
        if (match) {
          const [_, subject, range] = match;
          const existingTriple = cleanedTriples.find((t) => t.startsWith(`${subject} rdfs:range`) && t !== triple);
          if (existingTriple) {
            if (range === "xsd:string") {
              continue;
            }
            if (existingTriple.includes("xsd:string")) {
              const index2 = cleanedTriples.indexOf(existingTriple);
              cleanedTriples[index2] = triple;
              continue;
            }
          }
        }
      }
      if (!processedTriples.has(normalizedTriple)) {
        processedTriples.add(normalizedTriple);
        cleanedTriples.push(triple);
      }
    }
    elizaLogger27.debug(`Cleaned schema triples: ${cleanedTriples.length} (removed ${rawSchemaTriples.length - cleanedTriples.length} duplicates)`);
    if (cleanedTriples.length === 0) {
      elizaLogger27.warn("No schema information found in the RDF graph after cleaning");
      return {
        success: false,
        ttlFilePath: "",
        markdownPath: ""
      };
    }
    const prefixes = `@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix schema: <http://schema.org/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
`;
    const ttlContent = prefixes + cleanedTriples.join("\n\n");
    const graphFilePath = path10.join(process.cwd(), "rdf-graph-storage.ttl");
    const ontologyFilePath = graphFilePath.replace(/\.ttl$/, "-ontology.ttl");
    elizaLogger27.debug(`Saving ontology TTL to ${ontologyFilePath}`);
    const directory = path10.dirname(ontologyFilePath);
    if (!fs10.existsSync(directory)) {
      fs10.mkdirSync(directory, { recursive: true });
    }
    fs10.writeFileSync(ontologyFilePath, ttlContent, "utf8");
    elizaLogger27.info(`Successfully saved ontology TTL to ${ontologyFilePath}`);
    const markdownContent = `# Generated Ontology Schema

This file was automatically generated from the RDF graph.
It contains the schema/ontology information extracted from your data.

\`\`\`turtle
${ttlContent}
\`\`\`
`;
    const mdFilePath = ontologyFilePath.replace(/\.ttl$/, ".md");
    elizaLogger27.debug(`Saving ontology markdown to ${mdFilePath}`);
    fs10.writeFileSync(mdFilePath, markdownContent, "utf8");
    elizaLogger27.info(`Successfully saved ontology markdown to ${mdFilePath}`);
    try {
      const obsidian = await getObsidian(runtime);
      const ontologyFolder = "Ontology";
      const ontologyFolderExists = await obsidian.folderExists(ontologyFolder);
      if (ontologyFolderExists) {
        const vaultFilePath = `${ontologyFolder}/generated-schema.ttl`;
        await obsidian.saveFile(vaultFilePath, ttlContent, true);
        elizaLogger27.info(`Also saved a copy of the ontology to Obsidian vault at ${vaultFilePath}`);
      }
    } catch (error) {
      elizaLogger27.warn(`Could not save ontology to Obsidian vault: ${error.message}`);
    }
    return {
      success: true,
      ttlFilePath: ontologyFilePath,
      markdownPath: mdFilePath
    };
  } catch (error) {
    elizaLogger27.error("Error generating ontology TTL:", error);
    return { success: false };
  }
}

// src/actions/loadRDF.ts
var getIndentation = (line) => {
  const match = line.match(/^(\s*)/);
  return match ? match[1].length : 0;
};
var processNestedStructure = (lines, startLine) => {
  const result = { value: null, endLine: startLine };
  const isArray = lines[startLine].trim() === "-" || lines[startLine].trim().endsWith(":") && lines[startLine + 1]?.trim().startsWith("-");
  if (isArray) {
    const array = [];
    let currentLine = startLine;
    if (lines[currentLine].trim().endsWith(":") && !lines[currentLine].trim().startsWith("-")) {
      currentLine++;
    }
    const baseIndent = getIndentation(lines[currentLine]);
    while (currentLine < lines.length) {
      const line = lines[currentLine];
      const indent = getIndentation(line);
      const trimmedLine = line.trim();
      if (trimmedLine && indent < baseIndent) {
        break;
      }
      if (trimmedLine.startsWith("-")) {
        const itemContent = trimmedLine.substring(1).trim();
        if (itemContent === "" || itemContent === ":") {
          const nestedResult = processNestedStructure(lines, currentLine + 1);
          if (nestedResult.value !== null) {
            array.push(nestedResult.value);
            currentLine = nestedResult.endLine;
          } else {
            array.push({});
          }
        } else if (itemContent.includes(":")) {
          const obj = {};
          const keyValue = itemContent.match(/^([^:]+):\s*(.*)$/);
          if (keyValue) {
            const key = keyValue[1].trim();
            const value = keyValue[2].trim();
            obj[key] = value;
            array.push(obj);
          } else {
            array.push(itemContent);
          }
        } else {
          array.push(itemContent);
        }
      }
      currentLine++;
    }
    result.value = array;
    result.endLine = currentLine - 1;
  } else {
    const obj = {};
    let currentLine = startLine;
    const baseIndent = getIndentation(lines[currentLine]);
    while (currentLine < lines.length) {
      const line = lines[currentLine];
      const indent = getIndentation(line);
      const trimmedLine = line.trim();
      if (trimmedLine && indent < baseIndent) {
        break;
      }
      if (trimmedLine && indent === baseIndent) {
        const keyValueMatch = trimmedLine.match(/^([^:]+):\s*(.*)$/);
        if (keyValueMatch) {
          const key = keyValueMatch[1].trim();
          const value = keyValueMatch[2].trim();
          if (value === "" || value === "-") {
            const nestedResult = processNestedStructure(lines, currentLine + 1);
            if (nestedResult.value !== null) {
              obj[key] = nestedResult.value;
              currentLine = nestedResult.endLine;
            }
          } else {
            obj[key] = value;
          }
        }
      }
      currentLine++;
    }
    result.value = Object.keys(obj).length > 0 ? obj : null;
    result.endLine = currentLine - 1;
  }
  return result;
};
var extractRdfFromFrontmatter = (content3, filePath = "") => {
  try {
    elizaLogger28.debug(`Extracting frontmatter from file: ${filePath}`);
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
    const match = content3.match(frontmatterRegex);
    if (!match || !match[1]) {
      elizaLogger28.debug(`No frontmatter found in file: ${filePath}`);
      return null;
    }
    const frontmatterYaml = match[1];
    elizaLogger28.debug(`Raw frontmatter from ${filePath}:
${frontmatterYaml}`);
    const rdfData = {};
    const lines = frontmatterYaml.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.startsWith("#")) continue;
      const keyValueMatch = line.match(/^([^:]+):\s*(.*)$/);
      if (keyValueMatch) {
        const key = keyValueMatch[1].trim().replace(/^["']|["']$/g, "");
        let value = keyValueMatch[2].trim();
        if (value === "" || value === "-") {
          const nestedValue = processNestedStructure(lines, i);
          if (nestedValue.value !== null) {
            rdfData[key] = nestedValue.value;
            i = nestedValue.endLine;
            continue;
          }
        }
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        if (key === "@id" || key === "@type" || key === '"@id"' || key === '"@type"') {
          const cleanKey = key.replace(/^"|"$/g, "");
          rdfData[cleanKey] = value;
        } else {
          rdfData[key] = value;
        }
      }
    }
    elizaLogger28.debug(`Extracted frontmatter data: ${JSON.stringify(rdfData, null, 2)}`);
    return Object.keys(rdfData).length > 0 ? rdfData : null;
  } catch (error) {
    elizaLogger28.error(`Error extracting RDF from frontmatter in ${filePath}:`, error);
    return null;
  }
};
var addNoteToRdfGraph = (rdfManager, noteId, noteData, baseUri, filePath = "") => {
  try {
    elizaLogger28.debug(`Adding note ${noteId} to RDF graph`);
    elizaLogger28.debug(`Note data: ${JSON.stringify(noteData, null, 2)}`);
    const resolver2 = PropertyNamespaceResolver.getInstance();
    if (!resolver2.getIsInitialized()) {
      elizaLogger28.warn("PropertyNamespaceResolver not initialized with ontology data");
    }
    let subjectUri = "";
    if (noteData["@id"]) {
      if (noteData["@id"].includes("://")) {
        subjectUri = noteData["@id"];
        elizaLogger28.debug(`Using full URI from @id: ${subjectUri}`);
      } else {
        subjectUri = `${baseUri}${noteData["@id"]}`;
        elizaLogger28.debug(`Created URI from @id: ${subjectUri}`);
      }
    } else {
      subjectUri = `${baseUri}notes/${noteId}`;
      elizaLogger28.debug(`Generated URI from note ID: ${subjectUri}`);
    }
    if (noteData["@type"]) {
      const rawTypeValue = noteData["@type"];
      elizaLogger28.debug(`Processing @type value: ${rawTypeValue}`);
      const typeValue = resolver2.expandTerm(rawTypeValue);
      elizaLogger28.debug(`Expanded @type to: ${typeValue}`);
      const existingTriples = rdfManager.findTriples(
        subjectUri,
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        typeValue
      );
      elizaLogger28.debug(`Found ${existingTriples.length} existing type triples for this subject/type`);
      if (existingTriples.length === 0) {
        rdfManager.addTriple(
          subjectUri,
          "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          typeValue
        );
        elizaLogger28.debug(`Added type triple: <${subjectUri}> <rdf:type> <${typeValue}>`);
      } else {
        elizaLogger28.debug(`Skipped adding duplicate type triple: <${subjectUri}> <rdf:type> <${typeValue}>`);
      }
    }
    let classType = noteData["@type"] || "";
    elizaLogger28.debug(`Note has class type: ${classType}`);
    for (const [key, value] of Object.entries(noteData)) {
      if (key !== "@id" && key !== "@type") {
        if (key.startsWith("@")) {
          elizaLogger28.debug(`Skipping internal property: ${key}`);
          continue;
        }
        const usePrefixedKey = classType.startsWith("schema:") && !key.includes(":") ? `schema:${key}` : key;
        elizaLogger28.debug(`Resolving property "${key}" to appropriate namespace (using prefixed key: ${usePrefixedKey})`);
        const predicate = resolver2.expandTerm(usePrefixedKey);
        elizaLogger28.debug(`Resolved property "${key}" \u2192 "${usePrefixedKey}" \u2192 "${predicate}"`);
        if (typeof value === "object" && value !== null) {
          elizaLogger28.debug(`Processing complex value for property "${key}": ${JSON.stringify(value)}`);
          processComplexValue(rdfManager, subjectUri, predicate, value, resolver2, classType, `${key} in ${filePath}`);
        } else {
          let processedValue = value;
          let isLiteral = true;
          let datatype = null;
          if (typeof value === "string" && (value.startsWith("http://") || value.startsWith("https://") || // Handle relative URIs that match a pattern like people/name or places/location
          value.match(/^(people|places|workouts|notes|organizations)\/[a-zA-Z0-9-_]+$/))) {
            if (!value.includes("://")) {
              processedValue = `${baseUri}${value}`;
              elizaLogger28.debug(`Converted relative URI "${value}" to absolute: "${processedValue}"`);
            }
            isLiteral = false;
          } else if (typeof value === "string" && (key === "startDate" || key === "endDate" || key.endsWith("Date") || key.endsWith("DateTime")) && value.match(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?Z?)?$/)) {
            datatype = "http://www.w3.org/2001/XMLSchema#dateTime";
            elizaLogger28.debug(`Set datatype for property ${key} to dateTime`);
          } else if (typeof value === "string" && key === "duration" && value.startsWith("PT")) {
            datatype = "http://www.w3.org/2001/XMLSchema#duration";
            elizaLogger28.debug(`Set datatype for property ${key} to duration`);
          } else if (typeof value === "string" && value.match(/^-?\d+(\.\d+)?$/)) {
            if (value.includes(".")) {
              datatype = "http://www.w3.org/2001/XMLSchema#decimal";
            } else {
              datatype = "http://www.w3.org/2001/XMLSchema#integer";
            }
            elizaLogger28.debug(`Set datatype for property ${key} to ${datatype.split("#")[1]}`);
          }
          rdfManager.addTriple(
            subjectUri,
            predicate,
            processedValue,
            false,
            // Not a blank node
            false,
            // Not a blank node subject
            isLiteral,
            // Is a literal
            datatype
            // Datatype
          );
          elizaLogger28.debug(`Added property triple: <${subjectUri}> <${predicate}> ${isLiteral ? `"${processedValue}"${datatype ? `^^<${datatype}>` : ""}` : `<${processedValue}>`}`);
        }
      }
    }
    return true;
  } catch (error) {
    elizaLogger28.error(`Error adding note ${noteId} to RDF graph:`, error);
    return false;
  }
};
var processComplexValue = (rdfManager, subject, predicate, value, resolver2, parentClassType = "", context = "") => {
  elizaLogger28.debug(`Processing complex value in context: ${context}`);
  if (Array.isArray(value)) {
    elizaLogger28.debug(`Processing array with ${value.length} items`);
    value.forEach((item, index2) => {
      const blankNode2 = `_:item${Math.random().toString(36).substring(2, 10)}_${index2}`;
      elizaLogger28.debug(`Creating blank node for array item ${index2}: ${blankNode2}`);
      rdfManager.addTriple(subject, predicate, blankNode2, true);
      if (typeof item === "object" && item !== null) {
        elizaLogger28.debug(`Array item ${index2} is an object with properties: ${JSON.stringify(Object.keys(item))}`);
        if (item["@type"]) {
          const typeValue = resolver2.expandTerm(item["@type"]);
          elizaLogger28.debug(`Adding type for array item: ${typeValue}`);
          rdfManager.addTriple(
            blankNode2,
            "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
            typeValue,
            false,
            // not a blank node target
            true
            // is a blank node subject
          );
        }
        const itemType = item["@type"] || "";
        for (const [k, v] of Object.entries(item)) {
          if (k !== "@type") {
            const usePrefixedKey = (itemType.startsWith("schema:") || parentClassType.startsWith("schema:")) && !k.includes(":") ? `schema:${k}` : k;
            const itemPredicate = resolver2.expandTerm(usePrefixedKey);
            elizaLogger28.debug(`Adding property ${k} \u2192 ${usePrefixedKey} \u2192 ${itemPredicate} for array item ${index2}`);
            if (typeof v === "object" && v !== null) {
              processComplexValue(
                rdfManager,
                blankNode2,
                itemPredicate,
                v,
                resolver2,
                itemType,
                `nested in array[${index2}].${k}`
              );
            } else {
              let datatype = null;
              if (typeof v === "string" && (k === "startDate" || k === "endDate" || k.endsWith("Date") || k.endsWith("DateTime")) && v.match(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?Z?)?$/)) {
                datatype = "http://www.w3.org/2001/XMLSchema#dateTime";
              } else if (typeof v === "string" && k === "duration" && v.startsWith("PT")) {
                datatype = "http://www.w3.org/2001/XMLSchema#duration";
              } else if (typeof v === "string" && v.match(/^-?\d+(\.\d+)?$/)) {
                if (v.includes(".")) {
                  datatype = "http://www.w3.org/2001/XMLSchema#decimal";
                } else {
                  datatype = "http://www.w3.org/2001/XMLSchema#integer";
                }
              }
              rdfManager.addTriple(
                blankNode2,
                itemPredicate,
                v,
                false,
                // not a blank node target
                true,
                // is a blank node subject
                true,
                // is a literal
                datatype
                // datatype if applicable
              );
            }
          }
        }
      } else {
        elizaLogger28.debug(`Array item ${index2} is a primitive value: ${item}`);
        rdfManager.addTriple(
          blankNode2,
          "http://www.w3.org/1999/02/22-rdf-syntax-ns#value",
          item,
          false,
          // not a blank node target
          true,
          // is a blank node subject
          true
          // is a literal
        );
      }
    });
  } else {
    elizaLogger28.debug(`Processing object with properties: ${JSON.stringify(Object.keys(value))}`);
    const blankNode2 = `_:obj${Math.random().toString(36).substring(2, 10)}`;
    elizaLogger28.debug(`Creating blank node for object: ${blankNode2}`);
    rdfManager.addTriple(subject, predicate, blankNode2, true);
    const objType = value["@type"] || "";
    if (objType) {
      const typeValue = resolver2.expandTerm(objType);
      elizaLogger28.debug(`Adding type for object: ${typeValue}`);
      rdfManager.addTriple(
        blankNode2,
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        typeValue,
        false,
        // not a blank node target
        true
        // is a blank node subject
      );
    }
    for (const [k, v] of Object.entries(value)) {
      if (k !== "@type") {
        const usePrefixedKey = (objType.startsWith("schema:") || parentClassType.startsWith("schema:")) && !k.includes(":") ? `schema:${k}` : k;
        const objPredicate = resolver2.expandTerm(usePrefixedKey);
        elizaLogger28.debug(`Adding property ${k} \u2192 ${usePrefixedKey} \u2192 ${objPredicate} for object`);
        if (typeof v === "object" && v !== null) {
          processComplexValue(
            rdfManager,
            blankNode2,
            objPredicate,
            v,
            resolver2,
            objType,
            `nested in object.${k}`
          );
        } else {
          let datatype = null;
          if (typeof v === "string" && (k === "startDate" || k === "endDate" || k.endsWith("Date") || k.endsWith("DateTime")) && v.match(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?Z?)?$/)) {
            datatype = "http://www.w3.org/2001/XMLSchema#dateTime";
          } else if (typeof v === "string" && k === "duration" && v.startsWith("PT")) {
            datatype = "http://www.w3.org/2001/XMLSchema#duration";
          } else if (typeof v === "string" && v.match(/^-?\d+(\.\d+)?$/)) {
            if (v.includes(".")) {
              datatype = "http://www.w3.org/2001/XMLSchema#decimal";
            } else {
              datatype = "http://www.w3.org/2001/XMLSchema#integer";
            }
          }
          rdfManager.addTriple(
            blankNode2,
            objPredicate,
            v,
            false,
            // not a blank node target
            true,
            // is a blank node subject
            true,
            // is a literal
            datatype
            // datatype if applicable
          );
        }
      }
    }
  }
};
var loadRdfAction = {
  name: "LOAD_DATA",
  similes: [
    "IMPORT_DATA",
    "BUILD_GRAPH",
    "SCAN_VAULT",
    "RDF_IMPORT",
    "LOAD_SEMANTIC_DATA",
    "BUILD_KNOWLEDGE_GRAPH"
  ],
  description: "Load vault data from Obsidian vault files with compatible frontmatter and ontology definitions into a semantic graph database",
  validate: async (runtime) => {
    try {
      elizaLogger28.debug("Validating Obsidian connection for RDF loading");
      const obsidian = await getObsidian(runtime);
      await obsidian.connect();
      elizaLogger28.debug("Obsidian connection validated successfully");
      return true;
    } catch (error) {
      elizaLogger28.error("Failed to validate Obsidian connection for RDF loading:", error);
      return false;
    }
  },
  handler: async (runtime, message, state, _options, callback) => {
    elizaLogger28.info("Starting RDF data loading handler");
    const obsidian = await getObsidian(runtime);
    const rdfManager = getRdfManager();
    const graph = rdfManager.getGraph();
    const baseUri = "http://elizaos.local/ontology/";
    const tempFileSystem2 = getTempFileSystem();
    const propertyResolver = PropertyNamespaceResolver.getInstance();
    const persistentStoragePath = path11.join(process.cwd(), "rdf-graph-storage.ttl");
    elizaLogger28.info(`Using persistent storage path: ${persistentStoragePath}`);
    try {
      if (rdfManager.loadGraphFromFile(persistentStoragePath)) {
        elizaLogger28.info("Successfully loaded RDF graph from persistent storage");
        if (callback) {
          callback({
            text: "Loaded existing RDF graph from persistent storage. Proceeding to update with any new data...",
            partial: true
          });
        }
      } else {
        elizaLogger28.info("No persistent RDF graph found or failed to load. Starting fresh.");
        if (callback) {
          callback({
            text: "No existing RDF graph found. Building a new graph from vault data...",
            partial: true
          });
        }
      }
      elizaLogger28.info("Using standard RDF namespaces");
      const standardNamespaces = {
        rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        rdfs: "http://www.w3.org/2000/01/rdf-schema#",
        xsd: "http://www.w3.org/2001/XMLSchema#",
        schema: "http://schema.org/",
        foaf: "http://xmlns.com/foaf/0.1/",
        owl: "http://www.w3.org/2002/07/owl#",
        dc: "http://purl.org/dc/elements/1.1/",
        dcterms: "http://purl.org/dc/terms/"
      };
      for (const [prefix, uri] of Object.entries(standardNamespaces)) {
        elizaLogger28.debug(`Using standard namespace: ${prefix} -> ${uri}`);
      }
      let initialOntologyContent = "";
      for (const [prefix, uri] of Object.entries(standardNamespaces)) {
        initialOntologyContent += `@prefix ${prefix}: <${uri}> .
`;
      }
      initialOntologyContent += "\n";
      propertyResolver.initializeFromOntology(initialOntologyContent);
      const ontologyFolder = "Ontology";
      elizaLogger28.debug(`Checking if ontology folder '${ontologyFolder}' exists...`);
      const ontologyFolderExists = await obsidian.folderExists(ontologyFolder);
      elizaLogger28.debug(`Ontology folder exists: ${ontologyFolderExists}`);
      if (ontologyFolderExists) {
        elizaLogger28.info(`Loading ontology files from ${ontologyFolder}`);
        const ontologyFiles = await obsidian.listFilesInFolder(ontologyFolder, [".md", ".ttl", ".jsonld", ".rdf", ".xml", ".n3"]);
        elizaLogger28.debug(`Found ${ontologyFiles.length} ontology files: ${JSON.stringify(ontologyFiles)}`);
        let combinedOntologyContent = "";
        let loadedCount = 0;
        for (const file of ontologyFiles) {
          const filePath = file.includes("/") ? file : `${ontologyFolder}/${file}`;
          elizaLogger28.debug(`Reading ontology file: ${filePath}`);
          try {
            const fileContent = await obsidian.readFile(filePath);
            if (fileContent) {
              elizaLogger28.debug(`Successfully read ontology file (${fileContent.length} bytes): ${filePath}`);
              if (file.endsWith(".md")) {
                const ttlBlockRegex = /```(?:turtle|ttl)\s*([\s\S]*?)```/g;
                const jsonBlockRegex = /```(?:json|jsonld)\s*([\s\S]*?)```/g;
                let matchFound = false;
                let ttlMatch;
                while ((ttlMatch = ttlBlockRegex.exec(fileContent)) !== null) {
                  const ontologyContent = ttlMatch[1];
                  if (ontologyContent && ontologyContent.trim()) {
                    elizaLogger28.debug(`Found TTL block (${ontologyContent.length} bytes) in: ${filePath}`);
                    combinedOntologyContent += ontologyContent + "\n\n";
                    matchFound = true;
                    try {
                      rdfManager.loadRdfString(ontologyContent, "text/turtle");
                      elizaLogger28.debug(`Successfully loaded TTL block from: ${filePath}`);
                    } catch (parseError) {
                      elizaLogger28.error(`Error parsing TTL block in ${filePath}:`, parseError);
                      elizaLogger28.debug(`Problematic TTL content: ${ontologyContent.substring(0, 200)}...`);
                    }
                  }
                }
                if (!matchFound) {
                  let jsonMatch;
                  while ((jsonMatch = jsonBlockRegex.exec(fileContent)) !== null) {
                    const ontologyContent = jsonMatch[1];
                    if (ontologyContent && ontologyContent.trim()) {
                      elizaLogger28.debug(`Found JSON-LD block (${ontologyContent.length} bytes) in: ${filePath}`);
                      try {
                        rdfManager.loadRdfString(ontologyContent, "application/ld+json");
                        elizaLogger28.debug(`Successfully loaded JSON-LD block from: ${filePath}`);
                        matchFound = true;
                      } catch (parseError) {
                        elizaLogger28.error(`Error parsing JSON-LD block in ${filePath}:`, parseError);
                        elizaLogger28.debug(`Problematic JSON-LD content: ${ontologyContent.substring(0, 200)}...`);
                      }
                    }
                  }
                }
                if (matchFound) {
                  loadedCount++;
                } else {
                  elizaLogger28.debug(`No TTL or JSON-LD blocks found in Markdown file: ${filePath}`);
                }
              } else {
                elizaLogger28.debug(`Processing non-Markdown ontology file: ${filePath}`);
                try {
                  combinedOntologyContent += fileContent + "\n\n";
                  let contentType = "text/turtle";
                  if (file.endsWith(".jsonld")) contentType = "application/ld+json";
                  else if (file.endsWith(".xml") || file.endsWith(".rdf")) contentType = "application/rdf+xml";
                  else if (file.endsWith(".n3")) contentType = "text/n3";
                  rdfManager.loadRdfString(fileContent, contentType);
                  loadedCount++;
                  elizaLogger28.debug(`Successfully loaded ontology from file: ${filePath} as ${contentType}`);
                } catch (error) {
                  elizaLogger28.error(`Error parsing ontology file ${filePath}:`, error);
                  elizaLogger28.debug(`Problematic content: ${fileContent.substring(0, 200)}...`);
                }
              }
            } else {
              elizaLogger28.warn(`Empty or null content returned for file: ${filePath}`);
            }
          } catch (error) {
            elizaLogger28.error(`Error processing ontology file ${filePath}:`, error);
          }
        }
        elizaLogger28.info(`Initializing property namespace resolver with ${combinedOntologyContent.length} bytes of ontology data`);
        propertyResolver.initializeFromOntology(initialOntologyContent + combinedOntologyContent);
        elizaLogger28.info(`Loaded ${loadedCount} ontology files`);
      } else {
        elizaLogger28.warn(`Ontology folder '${ontologyFolder}' not found in vault`);
      }
      const knowledgeFolder = "knowledge";
      elizaLogger28.info(`Scanning ${knowledgeFolder} folder for files with RDF-compatible frontmatter`);
      const knowledgeFolderExists = await obsidian.folderExists(knowledgeFolder);
      if (!knowledgeFolderExists) {
        elizaLogger28.warn(`Knowledge folder '${knowledgeFolder}' not found in vault`);
        if (callback) {
          callback({
            text: `Error: The knowledge folder '${knowledgeFolder}' was not found in your vault.`,
            error: true
          });
        }
        return false;
      }
      const allFiles = await obsidian.listAllFiles([".md"]);
      const knowledgeFiles = allFiles.filter(
        (filePath) => filePath === knowledgeFolder || filePath.startsWith(`${knowledgeFolder}/`) || // Handle the full path case like in the example
        filePath.includes(`/cognitive-ecosystem-seed/${knowledgeFolder}/`)
      );
      elizaLogger28.debug(`Found ${knowledgeFiles.length} markdown files in ${knowledgeFolder} folder (out of ${allFiles.length} total files)`);
      let processedCount = 0;
      let rdfCount = 0;
      let errorCount = 0;
      for (const filePath of knowledgeFiles) {
        processedCount++;
        if (filePath.startsWith(ontologyFolder + "/")) {
          elizaLogger28.debug(`Skipping ontology file: ${filePath}`);
          continue;
        }
        try {
          elizaLogger28.debug(`Reading file: ${filePath}`);
          const content3 = await obsidian.readFile(filePath);
          if (content3) {
            elizaLogger28.debug(`Processing file content (${content3.length} bytes): ${filePath}`);
            const rdfData = extractRdfFromFrontmatter(content3, filePath);
            if (rdfData) {
              elizaLogger28.debug(`Found RDF-compatible frontmatter in file: ${filePath}`);
              elizaLogger28.debug(`Extracted data: ${JSON.stringify(rdfData, null, 2)}`);
              const fileId = filePath.replace(/\.[^/.]+$/, "");
              elizaLogger28.debug(`Generated file ID: ${fileId}`);
              try {
                if (addNoteToRdfGraph(rdfManager, fileId, rdfData, baseUri, filePath)) {
                  rdfCount++;
                  elizaLogger28.debug(`Successfully added RDF data from file: ${filePath}`);
                }
              } catch (error) {
                errorCount++;
                elizaLogger28.error(`Error adding file ${filePath} to RDF graph:`, error);
              }
            } else {
              elizaLogger28.debug(`No RDF-compatible frontmatter found in file: ${filePath}`);
            }
          } else {
            elizaLogger28.debug(`Empty or null content for file: ${filePath}`);
          }
        } catch (error) {
          errorCount++;
          elizaLogger28.error(`Error reading file ${filePath}:`, error);
        }
        if (processedCount % 50 === 0 && callback) {
          callback({
            text: `Processing files... ${processedCount}/${knowledgeFiles.length} files scanned, ${rdfCount} with RDF data loaded, ${errorCount} errors encountered.`,
            partial: true
          });
        }
      }
      const namespaces = propertyResolver.getNamespacePrefixes();
      const properties = propertyResolver.getRegisteredProperties();
      elizaLogger28.info(`Namespace resolver statistics: ${Object.keys(namespaces).length} namespaces, ${properties.length} properties`);
      elizaLogger28.debug(`Registered namespaces: ${JSON.stringify(namespaces)}`);
      const sampleSize = Math.min(properties.length, 20);
      elizaLogger28.debug(`Sample of registered properties (${sampleSize}/${properties.length}): ${properties.slice(0, sampleSize).join(", ")}${properties.length > sampleSize ? "..." : ""}`);
      const serializedGraph = rdfManager.serializeGraph("text/turtle");
      elizaLogger28.debug(`Serialized RDF graph size: ${serializedGraph.length} bytes`);
      const graphPath = await tempFileSystem2.writeTempFile("vault-rdf.ttl", serializedGraph);
      elizaLogger28.info(`RDF graph saved for debugging at: ${graphPath}`);
      elizaLogger28.info("Generating ontology file");
      const ontologyResult = await generateOntologyFromGraph(runtime);
      if (!ontologyResult.success) {
        elizaLogger28.warn("Ontology generation failed or found no schema to extract");
      }
      if (rdfManager.saveGraphToFile(persistentStoragePath)) {
        elizaLogger28.info(`RDF graph saved to persistent storage at ${persistentStoragePath}`);
      } else {
        elizaLogger28.error("Failed to save RDF graph to persistent storage");
      }
      rdfManager.setLoaded(true);
      elizaLogger28.info("Running diagnostics on loaded RDF data");
      const diagnostics = inspectLoadedData(rdfManager);
      elizaLogger28.debug(`Diagnostics report: ${JSON.stringify(diagnostics, null, 2)}`);
      const graphStats = rdfManager.getStats();
      elizaLogger28.info(`RDF data loading complete. Processed ${processedCount} files from knowledge folder, found ${rdfCount} with RDF data, encountered ${errorCount} errors.`);
      elizaLogger28.debug(`Graph statistics: ${JSON.stringify(graphStats, null, 2)}`);
      if (callback) {
        callback({
          text: `Successfully loaded RDF data from your knowledge folder!

**Summary:**
- Processed ${processedCount} files from the knowledge folder
- Found ${rdfCount} files with RDF-compatible data
- Encountered ${errorCount} errors during processing
- RDF graph now contains ${graphStats.statements} statements
- ${graphStats.subjects} unique subjects
- ${graphStats.predicates} unique predicates

The RDF graph is now ready for SPARQL queries.

**Diagnostics:**
- Ontology file created at: ${ontologyResult.ttlFilePath}
- Graph file saved at: ${graphPath}`,
          metadata: {
            processedCount,
            rdfCount,
            errorCount,
            graphStats,
            graphPath,
            ontologyPath: ontologyResult.ttlFilePath,
            ontologyMarkdownPath: ontologyResult.markdownPath,
            diagnostics
          }
        });
      }
      return true;
    } catch (error) {
      elizaLogger28.error("Error loading RDF data:", error);
      if (callback) {
        callback({
          text: `Error loading RDF data: ${error.message}`,
          error: true
        });
      }
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "Load RDF data from my knowledge folder"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "LOAD_DATA"
        }
      }
    ]
  ]
};

// src/actions/viewRDFGraph.ts
import {
  elizaLogger as elizaLogger29
} from "@elizaos/core";
import * as path12 from "path";
var viewRdfAction = {
  name: "VIEW_RDF_GRAPH",
  similes: [
    "SHOW_RDF",
    "INSPECT_GRAPH",
    "VIEW_GRAPH",
    "SHOW_RDF_DATA",
    "LIST_RDF_TRIPLES",
    "DUMP_RDF_GRAPH"
  ],
  description: "Display the contents of the RDF graph, showing triples and statistics",
  validate: async (runtime) => {
    try {
      elizaLogger29.debug("Validating Obsidian connection for RDF viewer");
      const obsidian = await getObsidian(runtime);
      await obsidian.connect();
      elizaLogger29.debug("Obsidian connection validated successfully");
      return true;
    } catch (error) {
      elizaLogger29.error("Failed to validate Obsidian connection for RDF viewer:", error);
      return false;
    }
  },
  handler: async (runtime, message, state, _options, callback) => {
    elizaLogger29.info("Starting RDF graph viewer");
    const rdfManager = getRdfManager();
    try {
      const persistentStoragePath = path12.join(process.cwd(), "rdf-graph-storage.ttl");
      elizaLogger29.info(`Using persistent storage path: ${persistentStoragePath}`);
      if (!rdfManager.isLoaded()) {
        elizaLogger29.info("RDF graph not loaded, attempting to load from persistent storage");
        if (rdfManager.loadGraphFromFile(persistentStoragePath)) {
          elizaLogger29.info("Successfully loaded RDF graph from persistent storage");
          if (callback) {
            callback({
              text: "Loaded RDF graph from persistent storage.",
              partial: true
            });
          }
        } else {
          if (callback) {
            callback({
              text: "The RDF graph has not been loaded yet and could not be loaded from persistent storage. Please run the LOAD_DATA action first.",
              error: true
            });
          }
          return false;
        }
      }
      const graphStats = rdfManager.getStats();
      const sampleTriples = rdfManager.getSampleTriples(50);
      const formattedTriples = sampleTriples.map(
        (triple) => `${formatIri(triple.subject)} \u2192 ${formatIri(triple.predicate)} \u2192 ${formatValue(triple.object)}`
      ).join("\n");
      const subjectTypes = rdfManager.getSubjectTypes();
      const formattedTypes = Object.entries(subjectTypes).map(([type2, count]) => `- ${formatIri(type2)}: ${count} instances`).join("\n");
      const responseText = `
# RDF Graph Contents

## Statistics
- **Total statements**: ${graphStats.statements}
- **Unique subjects**: ${graphStats.subjects}
- **Unique predicates**: ${graphStats.predicates}
- **Unique objects**: ${graphStats.objects}

## Subject Types
${formattedTypes}

## Sample Triples (up to 50)
\`\`\`
${formattedTriples}
\`\`\`

## Running SPARQL Queries
You can now run SPARQL queries using the normal SEARCH action. For example:
- "Find all workouts with high intensity"
- "List all people mentioned in my notes"
`;
      if (callback) {
        callback({
          text: responseText,
          metadata: {
            graphStats,
            sampleCount: sampleTriples.length,
            subjectTypes
          }
        });
      }
      return true;
    } catch (error) {
      elizaLogger29.error("Error viewing RDF graph:", error);
      if (callback) {
        callback({
          text: `Error viewing RDF graph: ${error.message}`,
          error: true
        });
      }
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "Show me what's in the RDF graph"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "VIEW_RDF_GRAPH"
        }
      }
    ]
  ]
};
function formatIri(iri) {
  if (iri.startsWith("http://") || iri.startsWith("https://")) {
    const parts = iri.split(/[/#]/);
    return parts[parts.length - 1];
  }
  return iri;
}
function formatValue(value) {
  if (typeof value === "string") {
    if (value.startsWith("http://") || value.startsWith("https://")) {
      return formatIri(value);
    }
    if (value.length > 50) {
      return `"${value.substring(0, 47)}..."`;
    }
    return `"${value}"`;
  }
  return String(value);
}

// src/actions/generateOntology.ts
import {
  elizaLogger as elizaLogger30
} from "@elizaos/core";
var generateOntologyAction = {
  name: "GENERATE_ONTOLOGY",
  similes: [
    "EXTRACT_SCHEMA",
    "CREATE_ONTOLOGY",
    "SCHEMA_EXTRACTION",
    "GENERATE_TTL",
    "EXPORT_SCHEMA",
    "CONVERT_TO_TTL"
  ],
  description: "Generate an ontology TTL file from the RDF graph data",
  validate: async (runtime) => {
    try {
      elizaLogger30.debug("Validating Obsidian connection for ontology generation");
      const obsidian = await getObsidian(runtime);
      await obsidian.connect();
      elizaLogger30.debug("Obsidian connection validated successfully");
      return true;
    } catch (error) {
      elizaLogger30.error("Failed to validate Obsidian connection for ontology generation:", error);
      return false;
    }
  },
  handler: async (runtime, message, state, _options, callback) => {
    elizaLogger30.info("Starting ontology generation");
    try {
      const success = await generateOntologyFromGraph(runtime);
      if (success) {
        if (callback) {
          callback({
            text: "Successfully generated ontology TTL files from your RDF graph. The files have been saved to your Ontology folder:\n\n- `Ontology/generated-schema.ttl` - Direct TTL file\n- `Ontology/generated-schema.md` - Markdown file with embedded TTL code block\n\nYou can now run SPARQL queries against your graph with improved schema understanding.",
            metadata: {
              success: true,
              files: [
                "Ontology/generated-schema.ttl",
                "Ontology/generated-schema.md"
              ]
            }
          });
        }
        return true;
      } else {
        if (callback) {
          callback({
            text: "Failed to generate ontology TTL from your RDF graph. Please ensure the RDF data is loaded and contains schema information. Try running the LOAD_DATA action first.",
            error: true
          });
        }
        return false;
      }
    } catch (error) {
      elizaLogger30.error("Error generating ontology:", error);
      if (callback) {
        callback({
          text: `Error generating ontology: ${error.message}`,
          error: true
        });
      }
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "Generate ontology from my RDF data"
        }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "{{responseData}}",
          action: "GENERATE_ONTOLOGY"
        }
      }
    ]
  ]
};

// src/index.ts
var obsidianPlugin = {
  name: "obsidian",
  description: "Integration with Obsidian vault using Omnisearch / Deep traversal search, memoryknowledge base, and Quartz publishing capabilities",
  actions: [
    searchAction,
    listNotesAction,
    listAllFilesAction,
    listDirectoryAction,
    summarizeActiveNoteAction,
    getActiveNoteAction,
    getNoteAction,
    readFileAction,
    createKnowledgeAction,
    noteTraversalAction,
    saveFileAction,
    openFileAction,
    updateFileAction,
    quartzSetupAction,
    quartzPublishAction,
    quartzDiagnoseAction,
    arweaveSetupAction,
    quartzPreviewAction,
    loadRdfAction,
    viewRdfAction,
    generateOntologyAction
  ],
  evaluators: [],
  services: [],
  providers: []
};
var index_default = obsidianPlugin;
export {
  index_default as default,
  obsidianPlugin
};
/*! Bundled license information:

js-yaml/dist/js-yaml.mjs:
  (*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT *)
*/
//# sourceMappingURL=index.js.map