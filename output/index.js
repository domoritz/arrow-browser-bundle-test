'use strict';

var stream = require('stream');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

/// @file
/// @addtogroup flatbuffers_javascript_api
/// @{
/// @cond FLATBUFFERS_INTERNAL

/**
 * @fileoverview
 *
 * Need to suppress 'global this' error so the Node.js export line doesn't cause
 * closure compile to error out.
 * @suppress {globalThis}
 */

/**
 * @const
 * @namespace
 */
var flatbuffers = {};

/**
 * @type {number}
 * @const
 */
flatbuffers.SIZEOF_SHORT = 2;

/**
 * @type {number}
 * @const
 */
flatbuffers.SIZEOF_INT = 4;

/**
 * @type {number}
 * @const
 */
flatbuffers.FILE_IDENTIFIER_LENGTH = 4;

/**
 * @type {number}
 * @const
 */
flatbuffers.SIZE_PREFIX_LENGTH = 4;

/**
 * @enum {number}
 */
flatbuffers.Encoding = {
  UTF8_BYTES: 1,
  UTF16_STRING: 2
};

/**
 * @type {Int32Array}
 * @const
 */
flatbuffers.int32 = new Int32Array(2);

/**
 * @type {Float32Array}
 * @const
 */
flatbuffers.float32 = new Float32Array(flatbuffers.int32.buffer);

/**
 * @type {Float64Array}
 * @const
 */
flatbuffers.float64 = new Float64Array(flatbuffers.int32.buffer);

/**
 * @type {boolean}
 * @const
 */
flatbuffers.isLittleEndian = new Uint16Array(new Uint8Array([1, 0]).buffer)[0] === 1;

////////////////////////////////////////////////////////////////////////////////

/**
 * @constructor
 * @param {number} low
 * @param {number} high
 */
flatbuffers.Long = function(low, high) {
  /**
   * @type {number}
   * @const
   */
  this.low = low | 0;

  /**
   * @type {number}
   * @const
   */
  this.high = high | 0;
};

/**
 * @param {number} low
 * @param {number} high
 * @returns {!flatbuffers.Long}
 */
flatbuffers.Long.create = function(low, high) {
  // Special-case zero to avoid GC overhead for default values
  return low == 0 && high == 0 ? flatbuffers.Long.ZERO : new flatbuffers.Long(low, high);
};

/**
 * @returns {number}
 */
flatbuffers.Long.prototype.toFloat64 = function() {
  return (this.low >>> 0) + this.high * 0x100000000;
};

/**
 * @param {flatbuffers.Long} other
 * @returns {boolean}
 */
flatbuffers.Long.prototype.equals = function(other) {
  return this.low == other.low && this.high == other.high;
};

/**
 * @type {!flatbuffers.Long}
 * @const
 */
flatbuffers.Long.ZERO = new flatbuffers.Long(0, 0);

/// @endcond
////////////////////////////////////////////////////////////////////////////////
/**
 * Create a FlatBufferBuilder.
 *
 * @constructor
 * @param {number=} opt_initial_size
 */
flatbuffers.Builder = function(opt_initial_size) {
  if (!opt_initial_size) {
    var initial_size = 1024;
  } else {
    var initial_size = opt_initial_size;
  }

  /**
   * @type {flatbuffers.ByteBuffer}
   * @private
   */
  this.bb = flatbuffers.ByteBuffer.allocate(initial_size);

  /**
   * Remaining space in the ByteBuffer.
   *
   * @type {number}
   * @private
   */
  this.space = initial_size;

  /**
   * Minimum alignment encountered so far.
   *
   * @type {number}
   * @private
   */
  this.minalign = 1;

  /**
   * The vtable for the current table.
   *
   * @type {Array.<number>}
   * @private
   */
  this.vtable = null;

  /**
   * The amount of fields we're actually using.
   *
   * @type {number}
   * @private
   */
  this.vtable_in_use = 0;

  /**
   * Whether we are currently serializing a table.
   *
   * @type {boolean}
   * @private
   */
  this.isNested = false;

  /**
   * Starting offset of the current struct/table.
   *
   * @type {number}
   * @private
   */
  this.object_start = 0;

  /**
   * List of offsets of all vtables.
   *
   * @type {Array.<number>}
   * @private
   */
  this.vtables = [];

  /**
   * For the current vector being built.
   *
   * @type {number}
   * @private
   */
  this.vector_num_elems = 0;

  /**
   * False omits default values from the serialized data
   *
   * @type {boolean}
   * @private
   */
  this.force_defaults = false;
};

flatbuffers.Builder.prototype.clear = function() {
  this.bb.clear();
  this.space = this.bb.capacity();
  this.minalign = 1;
  this.vtable = null;
  this.vtable_in_use = 0;
  this.isNested = false;
  this.object_start = 0;
  this.vtables = [];
  this.vector_num_elems = 0;
  this.force_defaults = false;
};

/**
 * In order to save space, fields that are set to their default value
 * don't get serialized into the buffer. Forcing defaults provides a
 * way to manually disable this optimization.
 *
 * @param {boolean} forceDefaults true always serializes default values
 */
flatbuffers.Builder.prototype.forceDefaults = function(forceDefaults) {
  this.force_defaults = forceDefaults;
};

/**
 * Get the ByteBuffer representing the FlatBuffer. Only call this after you've
 * called finish(). The actual data starts at the ByteBuffer's current position,
 * not necessarily at 0.
 *
 * @returns {flatbuffers.ByteBuffer}
 */
flatbuffers.Builder.prototype.dataBuffer = function() {
  return this.bb;
};

/**
 * Get the bytes representing the FlatBuffer. Only call this after you've
 * called finish().
 *
 * @returns {!Uint8Array}
 */
flatbuffers.Builder.prototype.asUint8Array = function() {
  return this.bb.bytes().subarray(this.bb.position(), this.bb.position() + this.offset());
};

/// @cond FLATBUFFERS_INTERNAL
/**
 * Prepare to write an element of `size` after `additional_bytes` have been
 * written, e.g. if you write a string, you need to align such the int length
 * field is aligned to 4 bytes, and the string data follows it directly. If all
 * you need to do is alignment, `additional_bytes` will be 0.
 *
 * @param {number} size This is the of the new element to write
 * @param {number} additional_bytes The padding size
 */
flatbuffers.Builder.prototype.prep = function(size, additional_bytes) {
  // Track the biggest thing we've ever aligned to.
  if (size > this.minalign) {
    this.minalign = size;
  }

  // Find the amount of alignment needed such that `size` is properly
  // aligned after `additional_bytes`
  var align_size = ((~(this.bb.capacity() - this.space + additional_bytes)) + 1) & (size - 1);

  // Reallocate the buffer if needed.
  while (this.space < align_size + size + additional_bytes) {
    var old_buf_size = this.bb.capacity();
    this.bb = flatbuffers.Builder.growByteBuffer(this.bb);
    this.space += this.bb.capacity() - old_buf_size;
  }

  this.pad(align_size);
};

/**
 * @param {number} byte_size
 */
flatbuffers.Builder.prototype.pad = function(byte_size) {
  for (var i = 0; i < byte_size; i++) {
    this.bb.writeInt8(--this.space, 0);
  }
};

/**
 * @param {number} value
 */
flatbuffers.Builder.prototype.writeInt8 = function(value) {
  this.bb.writeInt8(this.space -= 1, value);
};

/**
 * @param {number} value
 */
flatbuffers.Builder.prototype.writeInt16 = function(value) {
  this.bb.writeInt16(this.space -= 2, value);
};

/**
 * @param {number} value
 */
flatbuffers.Builder.prototype.writeInt32 = function(value) {
  this.bb.writeInt32(this.space -= 4, value);
};

/**
 * @param {flatbuffers.Long} value
 */
flatbuffers.Builder.prototype.writeInt64 = function(value) {
  this.bb.writeInt64(this.space -= 8, value);
};

/**
 * @param {number} value
 */
flatbuffers.Builder.prototype.writeFloat32 = function(value) {
  this.bb.writeFloat32(this.space -= 4, value);
};

/**
 * @param {number} value
 */
flatbuffers.Builder.prototype.writeFloat64 = function(value) {
  this.bb.writeFloat64(this.space -= 8, value);
};
/// @endcond

/**
 * Add an `int8` to the buffer, properly aligned, and grows the buffer (if necessary).
 * @param {number} value The `int8` to add the the buffer.
 */
flatbuffers.Builder.prototype.addInt8 = function(value) {
  this.prep(1, 0);
  this.writeInt8(value);
};

/**
 * Add an `int16` to the buffer, properly aligned, and grows the buffer (if necessary).
 * @param {number} value The `int16` to add the the buffer.
 */
flatbuffers.Builder.prototype.addInt16 = function(value) {
  this.prep(2, 0);
  this.writeInt16(value);
};

/**
 * Add an `int32` to the buffer, properly aligned, and grows the buffer (if necessary).
 * @param {number} value The `int32` to add the the buffer.
 */
flatbuffers.Builder.prototype.addInt32 = function(value) {
  this.prep(4, 0);
  this.writeInt32(value);
};

/**
 * Add an `int64` to the buffer, properly aligned, and grows the buffer (if necessary).
 * @param {flatbuffers.Long} value The `int64` to add the the buffer.
 */
flatbuffers.Builder.prototype.addInt64 = function(value) {
  this.prep(8, 0);
  this.writeInt64(value);
};

/**
 * Add a `float32` to the buffer, properly aligned, and grows the buffer (if necessary).
 * @param {number} value The `float32` to add the the buffer.
 */
flatbuffers.Builder.prototype.addFloat32 = function(value) {
  this.prep(4, 0);
  this.writeFloat32(value);
};

/**
 * Add a `float64` to the buffer, properly aligned, and grows the buffer (if necessary).
 * @param {number} value The `float64` to add the the buffer.
 */
flatbuffers.Builder.prototype.addFloat64 = function(value) {
  this.prep(8, 0);
  this.writeFloat64(value);
};

/// @cond FLATBUFFERS_INTERNAL
/**
 * @param {number} voffset
 * @param {number} value
 * @param {number} defaultValue
 */
flatbuffers.Builder.prototype.addFieldInt8 = function(voffset, value, defaultValue) {
  if (this.force_defaults || value != defaultValue) {
    this.addInt8(value);
    this.slot(voffset);
  }
};

/**
 * @param {number} voffset
 * @param {number} value
 * @param {number} defaultValue
 */
flatbuffers.Builder.prototype.addFieldInt16 = function(voffset, value, defaultValue) {
  if (this.force_defaults || value != defaultValue) {
    this.addInt16(value);
    this.slot(voffset);
  }
};

/**
 * @param {number} voffset
 * @param {number} value
 * @param {number} defaultValue
 */
flatbuffers.Builder.prototype.addFieldInt32 = function(voffset, value, defaultValue) {
  if (this.force_defaults || value != defaultValue) {
    this.addInt32(value);
    this.slot(voffset);
  }
};

/**
 * @param {number} voffset
 * @param {flatbuffers.Long} value
 * @param {flatbuffers.Long} defaultValue
 */
flatbuffers.Builder.prototype.addFieldInt64 = function(voffset, value, defaultValue) {
  if (this.force_defaults || !value.equals(defaultValue)) {
    this.addInt64(value);
    this.slot(voffset);
  }
};

/**
 * @param {number} voffset
 * @param {number} value
 * @param {number} defaultValue
 */
flatbuffers.Builder.prototype.addFieldFloat32 = function(voffset, value, defaultValue) {
  if (this.force_defaults || value != defaultValue) {
    this.addFloat32(value);
    this.slot(voffset);
  }
};

/**
 * @param {number} voffset
 * @param {number} value
 * @param {number} defaultValue
 */
flatbuffers.Builder.prototype.addFieldFloat64 = function(voffset, value, defaultValue) {
  if (this.force_defaults || value != defaultValue) {
    this.addFloat64(value);
    this.slot(voffset);
  }
};

/**
 * @param {number} voffset
 * @param {flatbuffers.Offset} value
 * @param {flatbuffers.Offset} defaultValue
 */
flatbuffers.Builder.prototype.addFieldOffset = function(voffset, value, defaultValue) {
  if (this.force_defaults || value != defaultValue) {
    this.addOffset(value);
    this.slot(voffset);
  }
};

/**
 * Structs are stored inline, so nothing additional is being added. `d` is always 0.
 *
 * @param {number} voffset
 * @param {flatbuffers.Offset} value
 * @param {flatbuffers.Offset} defaultValue
 */
flatbuffers.Builder.prototype.addFieldStruct = function(voffset, value, defaultValue) {
  if (value != defaultValue) {
    this.nested(value);
    this.slot(voffset);
  }
};

/**
 * Structures are always stored inline, they need to be created right
 * where they're used.  You'll get this assertion failure if you
 * created it elsewhere.
 *
 * @param {flatbuffers.Offset} obj The offset of the created object
 */
flatbuffers.Builder.prototype.nested = function(obj) {
  if (obj != this.offset()) {
    throw new Error('FlatBuffers: struct must be serialized inline.');
  }
};

/**
 * Should not be creating any other object, string or vector
 * while an object is being constructed
 */
flatbuffers.Builder.prototype.notNested = function() {
  if (this.isNested) {
    throw new Error('FlatBuffers: object serialization must not be nested.');
  }
};

/**
 * Set the current vtable at `voffset` to the current location in the buffer.
 *
 * @param {number} voffset
 */
flatbuffers.Builder.prototype.slot = function(voffset) {
  this.vtable[voffset] = this.offset();
};

/**
 * @returns {flatbuffers.Offset} Offset relative to the end of the buffer.
 */
flatbuffers.Builder.prototype.offset = function() {
  return this.bb.capacity() - this.space;
};

/**
 * Doubles the size of the backing ByteBuffer and copies the old data towards
 * the end of the new buffer (since we build the buffer backwards).
 *
 * @param {flatbuffers.ByteBuffer} bb The current buffer with the existing data
 * @returns {!flatbuffers.ByteBuffer} A new byte buffer with the old data copied
 * to it. The data is located at the end of the buffer.
 *
 * uint8Array.set() formally takes {Array<number>|ArrayBufferView}, so to pass
 * it a uint8Array we need to suppress the type check:
 * @suppress {checkTypes}
 */
flatbuffers.Builder.growByteBuffer = function(bb) {
  var old_buf_size = bb.capacity();

  // Ensure we don't grow beyond what fits in an int.
  if (old_buf_size & 0xC0000000) {
    throw new Error('FlatBuffers: cannot grow buffer beyond 2 gigabytes.');
  }

  var new_buf_size = old_buf_size << 1;
  var nbb = flatbuffers.ByteBuffer.allocate(new_buf_size);
  nbb.setPosition(new_buf_size - old_buf_size);
  nbb.bytes().set(bb.bytes(), new_buf_size - old_buf_size);
  return nbb;
};
/// @endcond

/**
 * Adds on offset, relative to where it will be written.
 *
 * @param {flatbuffers.Offset} offset The offset to add.
 */
flatbuffers.Builder.prototype.addOffset = function(offset) {
  this.prep(flatbuffers.SIZEOF_INT, 0); // Ensure alignment is already done.
  this.writeInt32(this.offset() - offset + flatbuffers.SIZEOF_INT);
};

/// @cond FLATBUFFERS_INTERNAL
/**
 * Start encoding a new object in the buffer.  Users will not usually need to
 * call this directly. The FlatBuffers compiler will generate helper methods
 * that call this method internally.
 *
 * @param {number} numfields
 */
flatbuffers.Builder.prototype.startObject = function(numfields) {
  this.notNested();
  if (this.vtable == null) {
    this.vtable = [];
  }
  this.vtable_in_use = numfields;
  for (var i = 0; i < numfields; i++) {
    this.vtable[i] = 0; // This will push additional elements as needed
  }
  this.isNested = true;
  this.object_start = this.offset();
};

/**
 * Finish off writing the object that is under construction.
 *
 * @returns {flatbuffers.Offset} The offset to the object inside `dataBuffer`
 */
flatbuffers.Builder.prototype.endObject = function() {
  if (this.vtable == null || !this.isNested) {
    throw new Error('FlatBuffers: endObject called without startObject');
  }

  this.addInt32(0);
  var vtableloc = this.offset();

  // Trim trailing zeroes.
  var i = this.vtable_in_use - 1;
  for (; i >= 0 && this.vtable[i] == 0; i--) {}
  var trimmed_size = i + 1;

  // Write out the current vtable.
  for (; i >= 0; i--) {
    // Offset relative to the start of the table.
    this.addInt16(this.vtable[i] != 0 ? vtableloc - this.vtable[i] : 0);
  }

  var standard_fields = 2; // The fields below:
  this.addInt16(vtableloc - this.object_start);
  var len = (trimmed_size + standard_fields) * flatbuffers.SIZEOF_SHORT;
  this.addInt16(len);

  // Search for an existing vtable that matches the current one.
  var existing_vtable = 0;
  var vt1 = this.space;
outer_loop:
  for (i = 0; i < this.vtables.length; i++) {
    var vt2 = this.bb.capacity() - this.vtables[i];
    if (len == this.bb.readInt16(vt2)) {
      for (var j = flatbuffers.SIZEOF_SHORT; j < len; j += flatbuffers.SIZEOF_SHORT) {
        if (this.bb.readInt16(vt1 + j) != this.bb.readInt16(vt2 + j)) {
          continue outer_loop;
        }
      }
      existing_vtable = this.vtables[i];
      break;
    }
  }

  if (existing_vtable) {
    // Found a match:
    // Remove the current vtable.
    this.space = this.bb.capacity() - vtableloc;

    // Point table to existing vtable.
    this.bb.writeInt32(this.space, existing_vtable - vtableloc);
  } else {
    // No match:
    // Add the location of the current vtable to the list of vtables.
    this.vtables.push(this.offset());

    // Point table to current vtable.
    this.bb.writeInt32(this.bb.capacity() - vtableloc, this.offset() - vtableloc);
  }

  this.isNested = false;
  return vtableloc;
};
/// @endcond

/**
 * Finalize a buffer, poiting to the given `root_table`.
 *
 * @param {flatbuffers.Offset} root_table
 * @param {string=} opt_file_identifier
 * @param {boolean=} opt_size_prefix
 */
flatbuffers.Builder.prototype.finish = function(root_table, opt_file_identifier, opt_size_prefix) {
  var size_prefix = opt_size_prefix ? flatbuffers.SIZE_PREFIX_LENGTH : 0;
  if (opt_file_identifier) {
    var file_identifier = opt_file_identifier;
    this.prep(this.minalign, flatbuffers.SIZEOF_INT +
      flatbuffers.FILE_IDENTIFIER_LENGTH + size_prefix);
    if (file_identifier.length != flatbuffers.FILE_IDENTIFIER_LENGTH) {
      throw new Error('FlatBuffers: file identifier must be length ' +
        flatbuffers.FILE_IDENTIFIER_LENGTH);
    }
    for (var i = flatbuffers.FILE_IDENTIFIER_LENGTH - 1; i >= 0; i--) {
      this.writeInt8(file_identifier.charCodeAt(i));
    }
  }
  this.prep(this.minalign, flatbuffers.SIZEOF_INT + size_prefix);
  this.addOffset(root_table);
  if (size_prefix) {
    this.addInt32(this.bb.capacity() - this.space);
  }
  this.bb.setPosition(this.space);
};

/**
 * Finalize a size prefixed buffer, pointing to the given `root_table`.
 *
 * @param {flatbuffers.Offset} root_table
 * @param {string=} opt_file_identifier
 */
flatbuffers.Builder.prototype.finishSizePrefixed = function (root_table, opt_file_identifier) {
  this.finish(root_table, opt_file_identifier, true);
};

/// @cond FLATBUFFERS_INTERNAL
/**
 * This checks a required field has been set in a given table that has
 * just been constructed.
 *
 * @param {flatbuffers.Offset} table
 * @param {number} field
 */
flatbuffers.Builder.prototype.requiredField = function(table, field) {
  var table_start = this.bb.capacity() - table;
  var vtable_start = table_start - this.bb.readInt32(table_start);
  var ok = this.bb.readInt16(vtable_start + field) != 0;

  // If this fails, the caller will show what field needs to be set.
  if (!ok) {
    throw new Error('FlatBuffers: field ' + field + ' must be set');
  }
};

/**
 * Start a new array/vector of objects.  Users usually will not call
 * this directly. The FlatBuffers compiler will create a start/end
 * method for vector types in generated code.
 *
 * @param {number} elem_size The size of each element in the array
 * @param {number} num_elems The number of elements in the array
 * @param {number} alignment The alignment of the array
 */
flatbuffers.Builder.prototype.startVector = function(elem_size, num_elems, alignment) {
  this.notNested();
  this.vector_num_elems = num_elems;
  this.prep(flatbuffers.SIZEOF_INT, elem_size * num_elems);
  this.prep(alignment, elem_size * num_elems); // Just in case alignment > int.
};

/**
 * Finish off the creation of an array and all its elements. The array must be
 * created with `startVector`.
 *
 * @returns {flatbuffers.Offset} The offset at which the newly created array
 * starts.
 */
flatbuffers.Builder.prototype.endVector = function() {
  this.writeInt32(this.vector_num_elems);
  return this.offset();
};
/// @endcond

/**
 * Encode the string `s` in the buffer using UTF-8. If a Uint8Array is passed
 * instead of a string, it is assumed to contain valid UTF-8 encoded data.
 *
 * @param {string|Uint8Array} s The string to encode
 * @return {flatbuffers.Offset} The offset in the buffer where the encoded string starts
 */
flatbuffers.Builder.prototype.createString = function(s) {
  if (s instanceof Uint8Array) {
    var utf8 = s;
  } else {
    var utf8 = [];
    var i = 0;

    while (i < s.length) {
      var codePoint;

      // Decode UTF-16
      var a = s.charCodeAt(i++);
      if (a < 0xD800 || a >= 0xDC00) {
        codePoint = a;
      } else {
        var b = s.charCodeAt(i++);
        codePoint = (a << 10) + b + (0x10000 - (0xD800 << 10) - 0xDC00);
      }

      // Encode UTF-8
      if (codePoint < 0x80) {
        utf8.push(codePoint);
      } else {
        if (codePoint < 0x800) {
          utf8.push(((codePoint >> 6) & 0x1F) | 0xC0);
        } else {
          if (codePoint < 0x10000) {
            utf8.push(((codePoint >> 12) & 0x0F) | 0xE0);
          } else {
            utf8.push(
              ((codePoint >> 18) & 0x07) | 0xF0,
              ((codePoint >> 12) & 0x3F) | 0x80);
          }
          utf8.push(((codePoint >> 6) & 0x3F) | 0x80);
        }
        utf8.push((codePoint & 0x3F) | 0x80);
      }
    }
  }

  this.addInt8(0);
  this.startVector(1, utf8.length, 1);
  this.bb.setPosition(this.space -= utf8.length);
  for (var i = 0, offset = this.space, bytes = this.bb.bytes(); i < utf8.length; i++) {
    bytes[offset++] = utf8[i];
  }
  return this.endVector();
};

/**
 * A helper function to avoid generated code depending on this file directly.
 *
 * @param {number} low
 * @param {number} high
 * @returns {!flatbuffers.Long}
 */
flatbuffers.Builder.prototype.createLong = function(low, high) {
  return flatbuffers.Long.create(low, high);
};
////////////////////////////////////////////////////////////////////////////////
/// @cond FLATBUFFERS_INTERNAL
/**
 * Create a new ByteBuffer with a given array of bytes (`Uint8Array`).
 *
 * @constructor
 * @param {Uint8Array} bytes
 */
flatbuffers.ByteBuffer = function(bytes) {
  /**
   * @type {Uint8Array}
   * @private
   */
  this.bytes_ = bytes;

  /**
   * @type {number}
   * @private
   */
  this.position_ = 0;
};

/**
 * Create and allocate a new ByteBuffer with a given size.
 *
 * @param {number} byte_size
 * @returns {!flatbuffers.ByteBuffer}
 */
flatbuffers.ByteBuffer.allocate = function(byte_size) {
  return new flatbuffers.ByteBuffer(new Uint8Array(byte_size));
};

flatbuffers.ByteBuffer.prototype.clear = function() {
  this.position_ = 0;
};

/**
 * Get the underlying `Uint8Array`.
 *
 * @returns {Uint8Array}
 */
flatbuffers.ByteBuffer.prototype.bytes = function() {
  return this.bytes_;
};

/**
 * Get the buffer's position.
 *
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.position = function() {
  return this.position_;
};

/**
 * Set the buffer's position.
 *
 * @param {number} position
 */
flatbuffers.ByteBuffer.prototype.setPosition = function(position) {
  this.position_ = position;
};

/**
 * Get the buffer's capacity.
 *
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.capacity = function() {
  return this.bytes_.length;
};

/**
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.readInt8 = function(offset) {
  return this.readUint8(offset) << 24 >> 24;
};

/**
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.readUint8 = function(offset) {
  return this.bytes_[offset];
};

/**
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.readInt16 = function(offset) {
  return this.readUint16(offset) << 16 >> 16;
};

/**
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.readUint16 = function(offset) {
  return this.bytes_[offset] | this.bytes_[offset + 1] << 8;
};

/**
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.readInt32 = function(offset) {
  return this.bytes_[offset] | this.bytes_[offset + 1] << 8 | this.bytes_[offset + 2] << 16 | this.bytes_[offset + 3] << 24;
};

/**
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.readUint32 = function(offset) {
  return this.readInt32(offset) >>> 0;
};

/**
 * @param {number} offset
 * @returns {!flatbuffers.Long}
 */
flatbuffers.ByteBuffer.prototype.readInt64 = function(offset) {
  return new flatbuffers.Long(this.readInt32(offset), this.readInt32(offset + 4));
};

/**
 * @param {number} offset
 * @returns {!flatbuffers.Long}
 */
flatbuffers.ByteBuffer.prototype.readUint64 = function(offset) {
  return new flatbuffers.Long(this.readUint32(offset), this.readUint32(offset + 4));
};

/**
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.readFloat32 = function(offset) {
  flatbuffers.int32[0] = this.readInt32(offset);
  return flatbuffers.float32[0];
};

/**
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.readFloat64 = function(offset) {
  flatbuffers.int32[flatbuffers.isLittleEndian ? 0 : 1] = this.readInt32(offset);
  flatbuffers.int32[flatbuffers.isLittleEndian ? 1 : 0] = this.readInt32(offset + 4);
  return flatbuffers.float64[0];
};

/**
 * @param {number} offset
 * @param {number|boolean} value
 */
flatbuffers.ByteBuffer.prototype.writeInt8 = function(offset, value) {
  this.bytes_[offset] = /** @type {number} */(value);
};

/**
 * @param {number} offset
 * @param {number} value
 */
flatbuffers.ByteBuffer.prototype.writeUint8 = function(offset, value) {
  this.bytes_[offset] = value;
};

/**
 * @param {number} offset
 * @param {number} value
 */
flatbuffers.ByteBuffer.prototype.writeInt16 = function(offset, value) {
  this.bytes_[offset] = value;
  this.bytes_[offset + 1] = value >> 8;
};

/**
 * @param {number} offset
 * @param {number} value
 */
flatbuffers.ByteBuffer.prototype.writeUint16 = function(offset, value) {
    this.bytes_[offset] = value;
    this.bytes_[offset + 1] = value >> 8;
};

/**
 * @param {number} offset
 * @param {number} value
 */
flatbuffers.ByteBuffer.prototype.writeInt32 = function(offset, value) {
  this.bytes_[offset] = value;
  this.bytes_[offset + 1] = value >> 8;
  this.bytes_[offset + 2] = value >> 16;
  this.bytes_[offset + 3] = value >> 24;
};

/**
 * @param {number} offset
 * @param {number} value
 */
flatbuffers.ByteBuffer.prototype.writeUint32 = function(offset, value) {
    this.bytes_[offset] = value;
    this.bytes_[offset + 1] = value >> 8;
    this.bytes_[offset + 2] = value >> 16;
    this.bytes_[offset + 3] = value >> 24;
};

/**
 * @param {number} offset
 * @param {flatbuffers.Long} value
 */
flatbuffers.ByteBuffer.prototype.writeInt64 = function(offset, value) {
  this.writeInt32(offset, value.low);
  this.writeInt32(offset + 4, value.high);
};

/**
 * @param {number} offset
 * @param {flatbuffers.Long} value
 */
flatbuffers.ByteBuffer.prototype.writeUint64 = function(offset, value) {
    this.writeUint32(offset, value.low);
    this.writeUint32(offset + 4, value.high);
};

/**
 * @param {number} offset
 * @param {number} value
 */
flatbuffers.ByteBuffer.prototype.writeFloat32 = function(offset, value) {
  flatbuffers.float32[0] = value;
  this.writeInt32(offset, flatbuffers.int32[0]);
};

/**
 * @param {number} offset
 * @param {number} value
 */
flatbuffers.ByteBuffer.prototype.writeFloat64 = function(offset, value) {
  flatbuffers.float64[0] = value;
  this.writeInt32(offset, flatbuffers.int32[flatbuffers.isLittleEndian ? 0 : 1]);
  this.writeInt32(offset + 4, flatbuffers.int32[flatbuffers.isLittleEndian ? 1 : 0]);
};

/**
 * Return the file identifier.   Behavior is undefined for FlatBuffers whose
 * schema does not include a file_identifier (likely points at padding or the
 * start of a the root vtable).
 * @returns {string}
 */
flatbuffers.ByteBuffer.prototype.getBufferIdentifier = function() {
  if (this.bytes_.length < this.position_ + flatbuffers.SIZEOF_INT +
      flatbuffers.FILE_IDENTIFIER_LENGTH) {
    throw new Error(
        'FlatBuffers: ByteBuffer is too short to contain an identifier.');
  }
  var result = "";
  for (var i = 0; i < flatbuffers.FILE_IDENTIFIER_LENGTH; i++) {
    result += String.fromCharCode(
        this.readInt8(this.position_ + flatbuffers.SIZEOF_INT + i));
  }
  return result;
};

/**
 * Look up a field in the vtable, return an offset into the object, or 0 if the
 * field is not present.
 *
 * @param {number} bb_pos
 * @param {number} vtable_offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.__offset = function(bb_pos, vtable_offset) {
  var vtable = bb_pos - this.readInt32(bb_pos);
  return vtable_offset < this.readInt16(vtable) ? this.readInt16(vtable + vtable_offset) : 0;
};

/**
 * Initialize any Table-derived type to point to the union at the given offset.
 *
 * @param {flatbuffers.Table} t
 * @param {number} offset
 * @returns {flatbuffers.Table}
 */
flatbuffers.ByteBuffer.prototype.__union = function(t, offset) {
  t.bb_pos = offset + this.readInt32(offset);
  t.bb = this;
  return t;
};

/**
 * Create a JavaScript string from UTF-8 data stored inside the FlatBuffer.
 * This allocates a new string and converts to wide chars upon each access.
 *
 * To avoid the conversion to UTF-16, pass flatbuffers.Encoding.UTF8_BYTES as
 * the "optionalEncoding" argument. This is useful for avoiding conversion to
 * and from UTF-16 when the data will just be packaged back up in another
 * FlatBuffer later on.
 *
 * @param {number} offset
 * @param {flatbuffers.Encoding=} opt_encoding Defaults to UTF16_STRING
 * @returns {string|!Uint8Array}
 */
flatbuffers.ByteBuffer.prototype.__string = function(offset, opt_encoding) {
  offset += this.readInt32(offset);

  var length = this.readInt32(offset);
  var result = '';
  var i = 0;

  offset += flatbuffers.SIZEOF_INT;

  if (opt_encoding === flatbuffers.Encoding.UTF8_BYTES) {
    return this.bytes_.subarray(offset, offset + length);
  }

  while (i < length) {
    var codePoint;

    // Decode UTF-8
    var a = this.readUint8(offset + i++);
    if (a < 0xC0) {
      codePoint = a;
    } else {
      var b = this.readUint8(offset + i++);
      if (a < 0xE0) {
        codePoint =
          ((a & 0x1F) << 6) |
          (b & 0x3F);
      } else {
        var c = this.readUint8(offset + i++);
        if (a < 0xF0) {
          codePoint =
            ((a & 0x0F) << 12) |
            ((b & 0x3F) << 6) |
            (c & 0x3F);
        } else {
          var d = this.readUint8(offset + i++);
          codePoint =
            ((a & 0x07) << 18) |
            ((b & 0x3F) << 12) |
            ((c & 0x3F) << 6) |
            (d & 0x3F);
        }
      }
    }

    // Encode UTF-16
    if (codePoint < 0x10000) {
      result += String.fromCharCode(codePoint);
    } else {
      codePoint -= 0x10000;
      result += String.fromCharCode(
        (codePoint >> 10) + 0xD800,
        (codePoint & ((1 << 10) - 1)) + 0xDC00);
    }
  }

  return result;
};

/**
 * Retrieve the relative offset stored at "offset"
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.__indirect = function(offset) {
  return offset + this.readInt32(offset);
};

/**
 * Get the start of data of a vector whose offset is stored at "offset" in this object.
 *
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.__vector = function(offset) {
  return offset + this.readInt32(offset) + flatbuffers.SIZEOF_INT; // data starts after the length
};

/**
 * Get the length of a vector whose offset is stored at "offset" in this object.
 *
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.__vector_len = function(offset) {
  return this.readInt32(offset + this.readInt32(offset));
};

/**
 * @param {string} ident
 * @returns {boolean}
 */
flatbuffers.ByteBuffer.prototype.__has_identifier = function(ident) {
  if (ident.length != flatbuffers.FILE_IDENTIFIER_LENGTH) {
    throw new Error('FlatBuffers: file identifier must be length ' +
                    flatbuffers.FILE_IDENTIFIER_LENGTH);
  }
  for (var i = 0; i < flatbuffers.FILE_IDENTIFIER_LENGTH; i++) {
    if (ident.charCodeAt(i) != this.readInt8(this.position_ + flatbuffers.SIZEOF_INT + i)) {
      return false;
    }
  }
  return true;
};

/**
 * A helper function to avoid generated code depending on this file directly.
 *
 * @param {number} low
 * @param {number} high
 * @returns {!flatbuffers.Long}
 */
flatbuffers.ByteBuffer.prototype.createLong = function(low, high) {
  return flatbuffers.Long.create(low, high);
};

/// @endcond
/// @}

// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
const decoder = new TextDecoder('utf-8');
/** @ignore */
const decodeUtf8 = (buffer) => decoder.decode(buffer);
const encoder = new TextEncoder();
/** @ignore */
const encodeUtf8 = (value) => encoder.encode(value);

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
const ITERATOR_DONE = Object.freeze({ done: true, value: void (0) });
/** @ignore */
class ArrowJSON {
    constructor(_json) {
        this._json = _json;
    }
    get schema() { return this._json['schema']; }
    get batches() { return (this._json['batches'] || []); }
    get dictionaries() { return (this._json['dictionaries'] || []); }
}
/** @ignore */
class ReadableInterop {
    tee() {
        return this._getDOMStream().tee();
    }
    pipe(writable, options) {
        return this._getNodeStream().pipe(writable, options);
    }
    pipeTo(writable, options) { return this._getDOMStream().pipeTo(writable, options); }
    pipeThrough(duplex, options) {
        return this._getDOMStream().pipeThrough(duplex, options);
    }
    _getDOMStream() {
        return this._DOMStream || (this._DOMStream = this.toDOMStream());
    }
    _getNodeStream() {
        return this._nodeStream || (this._nodeStream = this.toNodeStream());
    }
}
/** @ignore */
class AsyncQueue extends ReadableInterop {
    constructor() {
        super();
        this._values = [];
        this.resolvers = [];
        this._closedPromise = new Promise((r) => this._closedPromiseResolve = r);
    }
    get closed() { return this._closedPromise; }
    cancel(reason) {
        return __awaiter(this, void 0, void 0, function* () { yield this.return(reason); });
    }
    write(value) {
        if (this._ensureOpen()) {
            this.resolvers.length <= 0
                ? (this._values.push(value))
                : (this.resolvers.shift().resolve({ done: false, value }));
        }
    }
    abort(value) {
        if (this._closedPromiseResolve) {
            this.resolvers.length <= 0
                ? (this._error = { error: value })
                : (this.resolvers.shift().reject({ done: true, value }));
        }
    }
    close() {
        if (this._closedPromiseResolve) {
            const { resolvers } = this;
            while (resolvers.length > 0) {
                resolvers.shift().resolve(ITERATOR_DONE);
            }
            this._closedPromiseResolve();
            this._closedPromiseResolve = undefined;
        }
    }
    [Symbol.asyncIterator]() { return this; }
    toDOMStream(options) {
        return streamAdapters.toDOMStream((this._closedPromiseResolve || this._error)
            ? this
            : this._values, options);
    }
    toNodeStream(options) {
        return streamAdapters.toNodeStream((this._closedPromiseResolve || this._error)
            ? this
            : this._values, options);
    }
    throw(_) {
        return __awaiter(this, void 0, void 0, function* () { yield this.abort(_); return ITERATOR_DONE; });
    }
    return(_) {
        return __awaiter(this, void 0, void 0, function* () { yield this.close(); return ITERATOR_DONE; });
    }
    read(size) {
        return __awaiter(this, void 0, void 0, function* () { return (yield this.next(size, 'read')).value; });
    }
    peek(size) {
        return __awaiter(this, void 0, void 0, function* () { return (yield this.next(size, 'peek')).value; });
    }
    next(..._args) {
        if (this._values.length > 0) {
            return Promise.resolve({ done: false, value: this._values.shift() });
        }
        else if (this._error) {
            return Promise.reject({ done: true, value: this._error.error });
        }
        else if (!this._closedPromiseResolve) {
            return Promise.resolve(ITERATOR_DONE);
        }
        else {
            return new Promise((resolve, reject) => {
                this.resolvers.push({ resolve, reject });
            });
        }
    }
    _ensureOpen() {
        if (this._closedPromiseResolve) {
            return true;
        }
        throw new Error(`AsyncQueue is closed`);
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
const [BigIntCtor, BigIntAvailable] = (() => {
    const BigIntUnavailableError = () => { throw new Error('BigInt is not available in this environment'); };
    function BigIntUnavailable() { throw BigIntUnavailableError(); }
    BigIntUnavailable.asIntN = () => { throw BigIntUnavailableError(); };
    BigIntUnavailable.asUintN = () => { throw BigIntUnavailableError(); };
    return typeof BigInt !== 'undefined' ? [BigInt, true] : [BigIntUnavailable, false];
})();
/** @ignore */
const [BigInt64ArrayCtor, BigInt64ArrayAvailable] = (() => {
    const BigInt64ArrayUnavailableError = () => { throw new Error('BigInt64Array is not available in this environment'); };
    class BigInt64ArrayUnavailable {
        static get BYTES_PER_ELEMENT() { return 8; }
        static of() { throw BigInt64ArrayUnavailableError(); }
        static from() { throw BigInt64ArrayUnavailableError(); }
        constructor() { throw BigInt64ArrayUnavailableError(); }
    }
    return typeof BigInt64Array !== 'undefined' ? [BigInt64Array, true] : [BigInt64ArrayUnavailable, false];
})();
/** @ignore */
const [BigUint64ArrayCtor, BigUint64ArrayAvailable] = (() => {
    const BigUint64ArrayUnavailableError = () => { throw new Error('BigUint64Array is not available in this environment'); };
    class BigUint64ArrayUnavailable {
        static get BYTES_PER_ELEMENT() { return 8; }
        static of() { throw BigUint64ArrayUnavailableError(); }
        static from() { throw BigUint64ArrayUnavailableError(); }
        constructor() { throw BigUint64ArrayUnavailableError(); }
    }
    return typeof BigUint64Array !== 'undefined' ? [BigUint64Array, true] : [BigUint64ArrayUnavailable, false];
})();
/** @ignore */ const isNumber = (x) => typeof x === 'number';
/** @ignore */ const isBoolean = (x) => typeof x === 'boolean';
/** @ignore */ const isFunction = (x) => typeof x === 'function';
/** @ignore */
// eslint-disable-next-line @typescript-eslint/ban-types
const isObject = (x) => x != null && Object(x) === x;
/** @ignore */
const isPromise = (x) => {
    return isObject(x) && isFunction(x.then);
};
/** @ignore */
const isIterable = (x) => {
    return isObject(x) && isFunction(x[Symbol.iterator]);
};
/** @ignore */
const isAsyncIterable = (x) => {
    return isObject(x) && isFunction(x[Symbol.asyncIterator]);
};
/** @ignore */
const isArrowJSON = (x) => {
    return isObject(x) && isObject(x['schema']);
};
/** @ignore */
const isIteratorResult = (x) => {
    return isObject(x) && ('done' in x) && ('value' in x);
};
/** @ignore */
const isFileHandle = (x) => {
    return isObject(x) && isFunction(x['stat']) && isNumber(x['fd']);
};
/** @ignore */
const isFetchResponse = (x) => {
    return isObject(x) && isReadableDOMStream(x['body']);
};
/** @ignore */
const isWritableDOMStream = (x) => {
    return isObject(x) &&
        isFunction(x['abort']) &&
        isFunction(x['getWriter']) &&
        !(x instanceof ReadableInterop);
};
/** @ignore */
const isReadableDOMStream = (x) => {
    return isObject(x) &&
        isFunction(x['cancel']) &&
        isFunction(x['getReader']) &&
        !(x instanceof ReadableInterop);
};
/** @ignore */
const isWritableNodeStream = (x) => {
    return isObject(x) &&
        isFunction(x['end']) &&
        isFunction(x['write']) &&
        isBoolean(x['writable']) &&
        !(x instanceof ReadableInterop);
};
/** @ignore */
const isReadableNodeStream = (x) => {
    return isObject(x) &&
        isFunction(x['read']) &&
        isFunction(x['pipe']) &&
        isBoolean(x['readable']) &&
        !(x instanceof ReadableInterop);
};

// Licensed to the Apache Software Foundation (ASF) under one
var ByteBuffer$3 = flatbuffers.ByteBuffer;
/** @ignore */
const SharedArrayBuf = (typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : ArrayBuffer);
/** @ignore */
function collapseContiguousByteRanges(chunks) {
    const result = chunks[0] ? [chunks[0]] : [];
    let xOffset, yOffset, xLen, yLen;
    for (let x, y, i = 0, j = 0, n = chunks.length; ++i < n;) {
        x = result[j];
        y = chunks[i];
        // continue if x and y don't share the same underlying ArrayBuffer, or if x isn't before y
        if (!x || !y || x.buffer !== y.buffer || y.byteOffset < x.byteOffset) {
            y && (result[++j] = y);
            continue;
        }
        ({ byteOffset: xOffset, byteLength: xLen } = x);
        ({ byteOffset: yOffset, byteLength: yLen } = y);
        // continue if the byte ranges of x and y aren't contiguous
        if ((xOffset + xLen) < yOffset || (yOffset + yLen) < xOffset) {
            y && (result[++j] = y);
            continue;
        }
        result[j] = new Uint8Array(x.buffer, xOffset, yOffset - xOffset + yLen);
    }
    return result;
}
/** @ignore */
function memcpy(target, source, targetByteOffset = 0, sourceByteLength = source.byteLength) {
    const targetByteLength = target.byteLength;
    const dst = new Uint8Array(target.buffer, target.byteOffset, targetByteLength);
    const src = new Uint8Array(source.buffer, source.byteOffset, Math.min(sourceByteLength, targetByteLength));
    dst.set(src, targetByteOffset);
    return target;
}
/** @ignore */
function joinUint8Arrays(chunks, size) {
    // collapse chunks that share the same underlying ArrayBuffer and whose byte ranges overlap,
    // to avoid unnecessarily copying the bytes to do this buffer join. This is a common case during
    // streaming, where we may be reading partial byte ranges out of the same underlying ArrayBuffer
    const result = collapseContiguousByteRanges(chunks);
    const byteLength = result.reduce((x, b) => x + b.byteLength, 0);
    let source, sliced, buffer;
    let offset = 0, index = -1;
    const length = Math.min(size || Infinity, byteLength);
    for (let n = result.length; ++index < n;) {
        source = result[index];
        sliced = source.subarray(0, Math.min(source.length, length - offset));
        if (length <= (offset + sliced.length)) {
            if (sliced.length < source.length) {
                result[index] = source.subarray(sliced.length);
            }
            else if (sliced.length === source.length) {
                index++;
            }
            buffer ? memcpy(buffer, sliced, offset) : (buffer = sliced);
            break;
        }
        memcpy(buffer || (buffer = new Uint8Array(length)), sliced, offset);
        offset += sliced.length;
    }
    return [buffer || new Uint8Array(0), result.slice(index), byteLength - (buffer ? buffer.byteLength : 0)];
}
function toArrayBufferView(ArrayBufferViewCtor, input) {
    let value = isIteratorResult(input) ? input.value : input;
    if (value instanceof ArrayBufferViewCtor) {
        if (ArrayBufferViewCtor === Uint8Array) {
            // Node's `Buffer` class passes the `instanceof Uint8Array` check, but we need
            // a real Uint8Array, since Buffer#slice isn't the same as Uint8Array#slice :/
            return new ArrayBufferViewCtor(value.buffer, value.byteOffset, value.byteLength);
        }
        return value;
    }
    if (!value) {
        return new ArrayBufferViewCtor(0);
    }
    if (typeof value === 'string') {
        value = encodeUtf8(value);
    }
    if (value instanceof ArrayBuffer) {
        return new ArrayBufferViewCtor(value);
    }
    if (value instanceof SharedArrayBuf) {
        return new ArrayBufferViewCtor(value);
    }
    if (value instanceof ByteBuffer$3) {
        return toArrayBufferView(ArrayBufferViewCtor, value.bytes());
    }
    return !ArrayBuffer.isView(value) ? ArrayBufferViewCtor.from(value) : value.byteLength <= 0 ? new ArrayBufferViewCtor(0)
        : new ArrayBufferViewCtor(value.buffer, value.byteOffset, value.byteLength / ArrayBufferViewCtor.BYTES_PER_ELEMENT);
}
/** @ignore */ const toInt8Array = (input) => toArrayBufferView(Int8Array, input);
/** @ignore */ const toInt16Array = (input) => toArrayBufferView(Int16Array, input);
/** @ignore */ const toInt32Array = (input) => toArrayBufferView(Int32Array, input);
/** @ignore */ const toBigInt64Array = (input) => toArrayBufferView(BigInt64ArrayCtor, input);
/** @ignore */ const toUint8Array = (input) => toArrayBufferView(Uint8Array, input);
/** @ignore */ const toUint16Array = (input) => toArrayBufferView(Uint16Array, input);
/** @ignore */ const toUint32Array = (input) => toArrayBufferView(Uint32Array, input);
/** @ignore */ const toBigUint64Array = (input) => toArrayBufferView(BigUint64ArrayCtor, input);
/** @ignore */ const toFloat32Array = (input) => toArrayBufferView(Float32Array, input);
/** @ignore */ const toFloat64Array = (input) => toArrayBufferView(Float64Array, input);
/** @ignore */ const toUint8ClampedArray = (input) => toArrayBufferView(Uint8ClampedArray, input);
/** @ignore */
const pump$1 = (iterator) => { iterator.next(); return iterator; };
/** @ignore */
function* toArrayBufferViewIterator(ArrayCtor, source) {
    const wrap = function* (x) { yield x; };
    const buffers = (typeof source === 'string') ? wrap(source)
        : (ArrayBuffer.isView(source)) ? wrap(source)
            : (source instanceof ArrayBuffer) ? wrap(source)
                : (source instanceof SharedArrayBuf) ? wrap(source)
                    : !isIterable(source) ? wrap(source) : source;
    yield* pump$1((function* (it) {
        let r = null;
        do {
            r = it.next(yield toArrayBufferView(ArrayCtor, r));
        } while (!r.done);
    })(buffers[Symbol.iterator]()));
    return new ArrayCtor();
}
/** @ignore */ const toInt8ArrayIterator = (input) => toArrayBufferViewIterator(Int8Array, input);
/** @ignore */ const toInt16ArrayIterator = (input) => toArrayBufferViewIterator(Int16Array, input);
/** @ignore */ const toInt32ArrayIterator = (input) => toArrayBufferViewIterator(Int32Array, input);
/** @ignore */ const toUint8ArrayIterator = (input) => toArrayBufferViewIterator(Uint8Array, input);
/** @ignore */ const toUint16ArrayIterator = (input) => toArrayBufferViewIterator(Uint16Array, input);
/** @ignore */ const toUint32ArrayIterator = (input) => toArrayBufferViewIterator(Uint32Array, input);
/** @ignore */ const toFloat32ArrayIterator = (input) => toArrayBufferViewIterator(Float32Array, input);
/** @ignore */ const toFloat64ArrayIterator = (input) => toArrayBufferViewIterator(Float64Array, input);
/** @ignore */ const toUint8ClampedArrayIterator = (input) => toArrayBufferViewIterator(Uint8ClampedArray, input);
/** @ignore */
function toArrayBufferViewAsyncIterator(ArrayCtor, source) {
    return __asyncGenerator(this, arguments, function* toArrayBufferViewAsyncIterator_1() {
        // if a Promise, unwrap the Promise and iterate the resolved value
        if (isPromise(source)) {
            return yield __await(yield __await(yield* __asyncDelegator(__asyncValues(toArrayBufferViewAsyncIterator(ArrayCtor, yield __await(source))))));
        }
        const wrap = function (x) { return __asyncGenerator(this, arguments, function* () { yield yield __await(yield __await(x)); }); };
        const emit = function (source) {
            return __asyncGenerator(this, arguments, function* () {
                yield __await(yield* __asyncDelegator(__asyncValues(pump$1((function* (it) {
                    let r = null;
                    do {
                        r = it.next(yield r === null || r === void 0 ? void 0 : r.value);
                    } while (!r.done);
                })(source[Symbol.iterator]())))));
            });
        };
        const buffers = (typeof source === 'string') ? wrap(source) // if string, wrap in an AsyncIterableIterator
            : (ArrayBuffer.isView(source)) ? wrap(source) // if TypedArray, wrap in an AsyncIterableIterator
                : (source instanceof ArrayBuffer) ? wrap(source) // if ArrayBuffer, wrap in an AsyncIterableIterator
                    : (source instanceof SharedArrayBuf) ? wrap(source) // if SharedArrayBuffer, wrap in an AsyncIterableIterator
                        : isIterable(source) ? emit(source) // If Iterable, wrap in an AsyncIterableIterator and compose the `next` values
                            : !isAsyncIterable(source) ? wrap(source) // If not an AsyncIterable, treat as a sentinel and wrap in an AsyncIterableIterator
                                : source; // otherwise if AsyncIterable, use it
        yield __await(// otherwise if AsyncIterable, use it
        yield* __asyncDelegator(__asyncValues(pump$1((function (it) {
            return __asyncGenerator(this, arguments, function* () {
                let r = null;
                do {
                    r = yield __await(it.next(yield yield __await(toArrayBufferView(ArrayCtor, r))));
                } while (!r.done);
            });
        })(buffers[Symbol.asyncIterator]())))));
        return yield __await(new ArrayCtor());
    });
}
/** @ignore */ const toInt8ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Int8Array, input);
/** @ignore */ const toInt16ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Int16Array, input);
/** @ignore */ const toInt32ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Int32Array, input);
/** @ignore */ const toUint8ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Uint8Array, input);
/** @ignore */ const toUint16ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Uint16Array, input);
/** @ignore */ const toUint32ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Uint32Array, input);
/** @ignore */ const toFloat32ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Float32Array, input);
/** @ignore */ const toFloat64ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Float64Array, input);
/** @ignore */ const toUint8ClampedArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Uint8ClampedArray, input);
/** @ignore */
function rebaseValueOffsets(offset, length, valueOffsets) {
    // If we have a non-zero offset, create a new offsets array with the values
    // shifted by the start offset, such that the new start offset is 0
    if (offset !== 0) {
        valueOffsets = valueOffsets.slice(0, length + 1);
        for (let i = -1; ++i <= length;) {
            valueOffsets[i] += offset;
        }
    }
    return valueOffsets;
}
/** @ignore */
function compareArrayLike(a, b) {
    let i = 0;
    const n = a.length;
    if (n !== b.length) {
        return false;
    }
    if (n > 0) {
        do {
            if (a[i] !== b[i]) {
                return false;
            }
        } while (++i < n);
    }
    return true;
}

var util_buffer_ = /*#__PURE__*/Object.freeze({
    __proto__: null,
    memcpy: memcpy,
    joinUint8Arrays: joinUint8Arrays,
    toArrayBufferView: toArrayBufferView,
    toInt8Array: toInt8Array,
    toInt16Array: toInt16Array,
    toInt32Array: toInt32Array,
    toBigInt64Array: toBigInt64Array,
    toUint8Array: toUint8Array,
    toUint16Array: toUint16Array,
    toUint32Array: toUint32Array,
    toBigUint64Array: toBigUint64Array,
    toFloat32Array: toFloat32Array,
    toFloat64Array: toFloat64Array,
    toUint8ClampedArray: toUint8ClampedArray,
    toArrayBufferViewIterator: toArrayBufferViewIterator,
    toInt8ArrayIterator: toInt8ArrayIterator,
    toInt16ArrayIterator: toInt16ArrayIterator,
    toInt32ArrayIterator: toInt32ArrayIterator,
    toUint8ArrayIterator: toUint8ArrayIterator,
    toUint16ArrayIterator: toUint16ArrayIterator,
    toUint32ArrayIterator: toUint32ArrayIterator,
    toFloat32ArrayIterator: toFloat32ArrayIterator,
    toFloat64ArrayIterator: toFloat64ArrayIterator,
    toUint8ClampedArrayIterator: toUint8ClampedArrayIterator,
    toArrayBufferViewAsyncIterator: toArrayBufferViewAsyncIterator,
    toInt8ArrayAsyncIterator: toInt8ArrayAsyncIterator,
    toInt16ArrayAsyncIterator: toInt16ArrayAsyncIterator,
    toInt32ArrayAsyncIterator: toInt32ArrayAsyncIterator,
    toUint8ArrayAsyncIterator: toUint8ArrayAsyncIterator,
    toUint16ArrayAsyncIterator: toUint16ArrayAsyncIterator,
    toUint32ArrayAsyncIterator: toUint32ArrayAsyncIterator,
    toFloat32ArrayAsyncIterator: toFloat32ArrayAsyncIterator,
    toFloat64ArrayAsyncIterator: toFloat64ArrayAsyncIterator,
    toUint8ClampedArrayAsyncIterator: toUint8ClampedArrayAsyncIterator,
    rebaseValueOffsets: rebaseValueOffsets,
    compareArrayLike: compareArrayLike
});

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
var streamAdapters = {
    fromIterable(source) {
        return pump(fromIterable(source));
    },
    fromAsyncIterable(source) {
        return pump(fromAsyncIterable(source));
    },
    fromDOMStream(source) {
        return pump(fromDOMStream(source));
    },
    fromNodeStream(stream) {
        return pump(fromNodeStream(stream));
    },
    // @ts-ignore
    toDOMStream(source, options) {
        throw new Error(`"toDOMStream" not available in this environment`);
    },
    // @ts-ignore
    toNodeStream(source, options) {
        throw new Error(`"toNodeStream" not available in this environment`);
    },
};
/** @ignore */
const pump = (iterator) => { iterator.next(); return iterator; };
/** @ignore */
function* fromIterable(source) {
    let done, threw = false;
    let buffers = [], buffer;
    let cmd, size, bufferLength = 0;
    function byteRange() {
        if (cmd === 'peek') {
            return joinUint8Arrays(buffers, size)[0];
        }
        [buffer, buffers, bufferLength] = joinUint8Arrays(buffers, size);
        return buffer;
    }
    // Yield so the caller can inject the read command before creating the source Iterator
    ({ cmd, size } = yield null);
    // initialize the iterator
    const it = toUint8ArrayIterator(source)[Symbol.iterator]();
    try {
        do {
            // read the next value
            ({ done, value: buffer } = isNaN(size - bufferLength) ?
                it.next(undefined) : it.next(size - bufferLength));
            // if chunk is not null or empty, push it onto the queue
            if (!done && buffer.byteLength > 0) {
                buffers.push(buffer);
                bufferLength += buffer.byteLength;
            }
            // If we have enough bytes in our buffer, yield chunks until we don't
            if (done || size <= bufferLength) {
                do {
                    ({ cmd, size } = yield byteRange());
                } while (size < bufferLength);
            }
        } while (!done);
    }
    catch (e) {
        (threw = true) && (typeof it.throw === 'function') && (it.throw(e));
    }
    finally {
        (threw === false) && (typeof it.return === 'function') && (it.return(null));
    }
    return null;
}
/** @ignore */
function fromAsyncIterable(source) {
    return __asyncGenerator(this, arguments, function* fromAsyncIterable_1() {
        let done, threw = false;
        let buffers = [], buffer;
        let cmd, size, bufferLength = 0;
        function byteRange() {
            if (cmd === 'peek') {
                return joinUint8Arrays(buffers, size)[0];
            }
            [buffer, buffers, bufferLength] = joinUint8Arrays(buffers, size);
            return buffer;
        }
        // Yield so the caller can inject the read command before creating the source AsyncIterator
        ({ cmd, size } = (yield yield __await(null)));
        // initialize the iterator
        const it = toUint8ArrayAsyncIterator(source)[Symbol.asyncIterator]();
        try {
            do {
                // read the next value
                ({ done, value: buffer } = isNaN(size - bufferLength)
                    ? yield __await(it.next(undefined))
                    : yield __await(it.next(size - bufferLength)));
                // if chunk is not null or empty, push it onto the queue
                if (!done && buffer.byteLength > 0) {
                    buffers.push(buffer);
                    bufferLength += buffer.byteLength;
                }
                // If we have enough bytes in our buffer, yield chunks until we don't
                if (done || size <= bufferLength) {
                    do {
                        ({ cmd, size } = yield yield __await(byteRange()));
                    } while (size < bufferLength);
                }
            } while (!done);
        }
        catch (e) {
            (threw = true) && (typeof it.throw === 'function') && (yield __await(it.throw(e)));
        }
        finally {
            (threw === false) && (typeof it.return === 'function') && (yield __await(it.return(new Uint8Array(0))));
        }
        return yield __await(null);
    });
}
// All this manual Uint8Array chunk management can be avoided if/when engines
// add support for ArrayBuffer.transfer() or ArrayBuffer.prototype.realloc():
// https://github.com/domenic/proposal-arraybuffer-transfer
/** @ignore */
function fromDOMStream(source) {
    return __asyncGenerator(this, arguments, function* fromDOMStream_1() {
        let done = false, threw = false;
        let buffers = [], buffer;
        let cmd, size, bufferLength = 0;
        function byteRange() {
            if (cmd === 'peek') {
                return joinUint8Arrays(buffers, size)[0];
            }
            [buffer, buffers, bufferLength] = joinUint8Arrays(buffers, size);
            return buffer;
        }
        // Yield so the caller can inject the read command before we establish the ReadableStream lock
        ({ cmd, size } = yield yield __await(null));
        // initialize the reader and lock the stream
        const it = new AdaptiveByteReader(source);
        try {
            do {
                // read the next value
                ({ done, value: buffer } = isNaN(size - bufferLength)
                    ? yield __await(it['read'](undefined))
                    : yield __await(it['read'](size - bufferLength)));
                // if chunk is not null or empty, push it onto the queue
                if (!done && buffer.byteLength > 0) {
                    buffers.push(toUint8Array(buffer));
                    bufferLength += buffer.byteLength;
                }
                // If we have enough bytes in our buffer, yield chunks until we don't
                if (done || size <= bufferLength) {
                    do {
                        ({ cmd, size } = yield yield __await(byteRange()));
                    } while (size < bufferLength);
                }
            } while (!done);
        }
        catch (e) {
            (threw = true) && (yield __await(it['cancel'](e)));
        }
        finally {
            (threw === false) ? (yield __await(it['cancel']()))
                : source['locked'] && it.releaseLock();
        }
        return yield __await(null);
    });
}
/** @ignore */
class AdaptiveByteReader {
    constructor(source) {
        this.source = source;
        this.byobReader = null;
        this.defaultReader = null;
        try {
            this.supportsBYOB = !!(this.reader = this.getBYOBReader());
        }
        catch (e) {
            this.supportsBYOB = !(this.reader = this.getDefaultReader());
        }
    }
    get closed() {
        return this.reader ? this.reader['closed'].catch(() => { }) : Promise.resolve();
    }
    releaseLock() {
        if (this.reader) {
            this.reader.releaseLock();
        }
        this.reader = this.byobReader = this.defaultReader = null;
    }
    cancel(reason) {
        return __awaiter(this, void 0, void 0, function* () {
            const { reader, source } = this;
            reader && (yield reader['cancel'](reason).catch(() => { }));
            source && (source['locked'] && this.releaseLock());
        });
    }
    read(size) {
        return __awaiter(this, void 0, void 0, function* () {
            if (size === 0) {
                return { done: this.reader == null, value: new Uint8Array(0) };
            }
            const result = !this.supportsBYOB || typeof size !== 'number'
                ? yield this.getDefaultReader().read()
                : yield this.readFromBYOBReader(size);
            !result.done && (result.value = toUint8Array(result));
            return result;
        });
    }
    getDefaultReader() {
        if (this.byobReader) {
            this.releaseLock();
        }
        if (!this.defaultReader) {
            this.defaultReader = this.source['getReader']();
            // We have to catch and swallow errors here to avoid uncaught promise rejection exceptions
            // that seem to be raised when we call `releaseLock()` on this reader. I'm still mystified
            // about why these errors are raised, but I'm sure there's some important spec reason that
            // I haven't considered. I hate to employ such an anti-pattern here, but it seems like the
            // only solution in this case :/
            this.defaultReader['closed'].catch(() => { });
        }
        return (this.reader = this.defaultReader);
    }
    getBYOBReader() {
        if (this.defaultReader) {
            this.releaseLock();
        }
        if (!this.byobReader) {
            this.byobReader = this.source['getReader']({ mode: 'byob' });
            // We have to catch and swallow errors here to avoid uncaught promise rejection exceptions
            // that seem to be raised when we call `releaseLock()` on this reader. I'm still mystified
            // about why these errors are raised, but I'm sure there's some important spec reason that
            // I haven't considered. I hate to employ such an anti-pattern here, but it seems like the
            // only solution in this case :/
            this.byobReader['closed'].catch(() => { });
        }
        return (this.reader = this.byobReader);
    }
    // This strategy plucked from the example in the streams spec:
    // https://streams.spec.whatwg.org/#example-manual-read-bytes
    readFromBYOBReader(size) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield readInto(this.getBYOBReader(), new ArrayBuffer(size), 0, size);
        });
    }
}
/** @ignore */
function readInto(reader, buffer, offset, size) {
    return __awaiter(this, void 0, void 0, function* () {
        if (offset >= size) {
            return { done: false, value: new Uint8Array(buffer, 0, size) };
        }
        const { done, value } = yield reader.read(new Uint8Array(buffer, offset, size - offset));
        if (((offset += value.byteLength) < size) && !done) {
            return yield readInto(reader, value.buffer, offset, size);
        }
        return { done, value: new Uint8Array(value.buffer, 0, offset) };
    });
}
/** @ignore */
const onEvent = (stream, event) => {
    const handler = (_) => resolve([event, _]);
    let resolve;
    return [event, handler, new Promise((r) => (resolve = r) && stream['once'](event, handler))];
};
/** @ignore */
function fromNodeStream(stream) {
    return __asyncGenerator(this, arguments, function* fromNodeStream_1() {
        const events = [];
        let event = 'error';
        let done = false, err = null;
        let cmd, size, bufferLength = 0;
        let buffers = [], buffer;
        function byteRange() {
            if (cmd === 'peek') {
                return joinUint8Arrays(buffers, size)[0];
            }
            [buffer, buffers, bufferLength] = joinUint8Arrays(buffers, size);
            return buffer;
        }
        // Yield so the caller can inject the read command before we
        // add the listener for the source stream's 'readable' event.
        ({ cmd, size } = yield yield __await(null));
        // ignore stdin if it's a TTY
        if (stream['isTTY']) {
            yield yield __await(new Uint8Array(0));
            return yield __await(null);
        }
        try {
            // initialize the stream event handlers
            events[0] = onEvent(stream, 'end');
            events[1] = onEvent(stream, 'error');
            do {
                events[2] = onEvent(stream, 'readable');
                // wait on the first message event from the stream
                [event, err] = yield __await(Promise.race(events.map((x) => x[2])));
                // if the stream emitted an Error, rethrow it
                if (event === 'error') {
                    break;
                }
                if (!(done = event === 'end')) {
                    // If the size is NaN, request to read everything in the stream's internal buffer
                    if (!isFinite(size - bufferLength)) {
                        buffer = toUint8Array(stream['read'](undefined));
                    }
                    else {
                        buffer = toUint8Array(stream['read'](size - bufferLength));
                        // If the byteLength is 0, then the requested amount is more than the stream has
                        // in its internal buffer. In this case the stream needs a "kick" to tell it to
                        // continue emitting readable events, so request to read everything the stream
                        // has in its internal buffer right now.
                        if (buffer.byteLength < (size - bufferLength)) {
                            buffer = toUint8Array(stream['read'](undefined));
                        }
                    }
                    // if chunk is not null or empty, push it onto the queue
                    if (buffer.byteLength > 0) {
                        buffers.push(buffer);
                        bufferLength += buffer.byteLength;
                    }
                }
                // If we have enough bytes in our buffer, yield chunks until we don't
                if (done || size <= bufferLength) {
                    do {
                        ({ cmd, size } = yield yield __await(byteRange()));
                    } while (size < bufferLength);
                }
            } while (!done);
        }
        finally {
            yield __await(cleanup(events, event === 'error' ? err : null));
        }
        return yield __await(null);
        function cleanup(events, err) {
            buffer = buffers = null;
            return new Promise((resolve, reject) => {
                for (const [evt, fn] of events) {
                    stream['off'](evt, fn);
                }
                try {
                    // Some stream implementations don't call the destroy callback,
                    // because it's really a node-internal API. Just calling `destroy`
                    // here should be enough to conform to the ReadableStream contract
                    const destroy = stream['destroy'];
                    destroy && destroy.call(stream, err);
                    err = undefined;
                }
                catch (e) {
                    err = e || err;
                }
                finally {
                    err != null ? reject(err) : resolve();
                }
            });
        }
    });
}

// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
class AbstractVector {
}
AbstractVector.prototype.data = null;

// automatically generated by the FlatBuffers compiler, do not modify
/**
 * Logical types, vector layouts, and schemas
 *
 * @enum {number}
 */
var MetadataVersion;
(function (MetadataVersion) {
    /**
     * 0.1.0 (October 2016).
     */
    MetadataVersion[MetadataVersion["V1"] = 0] = "V1";
    /**
     * 0.2.0 (February 2017). Non-backwards compatible with V1.
     */
    MetadataVersion[MetadataVersion["V2"] = 1] = "V2";
    /**
     * 0.3.0 -> 0.7.1 (May - December 2017). Non-backwards compatible with V2.
     */
    MetadataVersion[MetadataVersion["V3"] = 2] = "V3";
    /**
     * >= 0.8.0 (December 2017). Non-backwards compatible with V3.
     */
    MetadataVersion[MetadataVersion["V4"] = 3] = "V4";
    /**
     * >= 1.0.0 (July 2020. Backwards compatible with V4 (V5 readers can read V4
     * metadata and IPC messages). Implementations are recommended to provide a
     * V4 compatibility mode with V5 format changes disabled.
     *
     * Incompatible changes between V4 and V5:
     * - Union buffer layout has changed. In V5, Unions don't have a validity
     *   bitmap buffer.
     */
    MetadataVersion[MetadataVersion["V5"] = 4] = "V5";
})(MetadataVersion || (MetadataVersion = {}));
/**
 * Represents Arrow Features that might not have full support
 * within implementations. This is intended to be used in
 * two scenarios:
 *  1.  A mechanism for readers of Arrow Streams
 *      and files to understand that the stream or file makes
 *      use of a feature that isn't supported or unknown to
 *      the implementation (and therefore can meet the Arrow
 *      forward compatibility guarantees).
 *  2.  A means of negotiating between a client and server
 *      what features a stream is allowed to use. The enums
 *      values here are intented to represent higher level
 *      features, additional details maybe negotiated
 *      with key-value pairs specific to the protocol.
 *
 * Enums added to this list should be assigned power-of-two values
 * to facilitate exchanging and comparing bitmaps for supported
 * features.
 *
 * @enum {number}
 */
var Feature;
(function (Feature) {
    /**
     * Needed to make flatbuffers happy.
     */
    Feature[Feature["UNUSED"] = 0] = "UNUSED";
    /**
     * The stream makes use of multiple full dictionaries with the
     * same ID and assumes clients implement dictionary replacement
     * correctly.
     */
    Feature[Feature["DICTIONARY_REPLACEMENT"] = 1] = "DICTIONARY_REPLACEMENT";
    /**
     * The stream makes use of compressed bodies as described
     * in Message.fbs.
     */
    Feature[Feature["COMPRESSED_BODY"] = 2] = "COMPRESSED_BODY";
})(Feature || (Feature = {}));
/**
 * @enum {number}
 */
var UnionMode;
(function (UnionMode) {
    UnionMode[UnionMode["Sparse"] = 0] = "Sparse";
    UnionMode[UnionMode["Dense"] = 1] = "Dense";
})(UnionMode || (UnionMode = {}));
/**
 * @enum {number}
 */
var Precision;
(function (Precision) {
    Precision[Precision["HALF"] = 0] = "HALF";
    Precision[Precision["SINGLE"] = 1] = "SINGLE";
    Precision[Precision["DOUBLE"] = 2] = "DOUBLE";
})(Precision || (Precision = {}));
/**
 * @enum {number}
 */
var DateUnit;
(function (DateUnit) {
    DateUnit[DateUnit["DAY"] = 0] = "DAY";
    DateUnit[DateUnit["MILLISECOND"] = 1] = "MILLISECOND";
})(DateUnit || (DateUnit = {}));
/**
 * @enum {number}
 */
var TimeUnit;
(function (TimeUnit) {
    TimeUnit[TimeUnit["SECOND"] = 0] = "SECOND";
    TimeUnit[TimeUnit["MILLISECOND"] = 1] = "MILLISECOND";
    TimeUnit[TimeUnit["MICROSECOND"] = 2] = "MICROSECOND";
    TimeUnit[TimeUnit["NANOSECOND"] = 3] = "NANOSECOND";
})(TimeUnit || (TimeUnit = {}));
/**
 * @enum {number}
 */
var IntervalUnit;
(function (IntervalUnit) {
    IntervalUnit[IntervalUnit["YEAR_MONTH"] = 0] = "YEAR_MONTH";
    IntervalUnit[IntervalUnit["DAY_TIME"] = 1] = "DAY_TIME";
})(IntervalUnit || (IntervalUnit = {}));
/**
 * ----------------------------------------------------------------------
 * Top-level Type value, enabling extensible type-specific metadata. We can
 * add new logical types to Type without breaking backwards compatibility
 *
 * @enum {number}
 */
var Type$1;
(function (Type) {
    Type[Type["NONE"] = 0] = "NONE";
    Type[Type["Null"] = 1] = "Null";
    Type[Type["Int"] = 2] = "Int";
    Type[Type["FloatingPoint"] = 3] = "FloatingPoint";
    Type[Type["Binary"] = 4] = "Binary";
    Type[Type["Utf8"] = 5] = "Utf8";
    Type[Type["Bool"] = 6] = "Bool";
    Type[Type["Decimal"] = 7] = "Decimal";
    Type[Type["Date"] = 8] = "Date";
    Type[Type["Time"] = 9] = "Time";
    Type[Type["Timestamp"] = 10] = "Timestamp";
    Type[Type["Interval"] = 11] = "Interval";
    Type[Type["List"] = 12] = "List";
    Type[Type["Struct_"] = 13] = "Struct_";
    Type[Type["Union"] = 14] = "Union";
    Type[Type["FixedSizeBinary"] = 15] = "FixedSizeBinary";
    Type[Type["FixedSizeList"] = 16] = "FixedSizeList";
    Type[Type["Map"] = 17] = "Map";
    Type[Type["Duration"] = 18] = "Duration";
    Type[Type["LargeBinary"] = 19] = "LargeBinary";
    Type[Type["LargeUtf8"] = 20] = "LargeUtf8";
    Type[Type["LargeList"] = 21] = "LargeList";
})(Type$1 || (Type$1 = {}));
/**
 * ----------------------------------------------------------------------
 * Dictionary encoding metadata
 * Maintained for forwards compatibility, in the future
 * Dictionaries might be explicit maps between integers and values
 * allowing for non-contiguous index values
 *
 * @enum {number}
 */
var DictionaryKind;
(function (DictionaryKind) {
    DictionaryKind[DictionaryKind["DenseArray"] = 0] = "DenseArray";
})(DictionaryKind || (DictionaryKind = {}));
/**
 * ----------------------------------------------------------------------
 * Endianness of the platform producing the data
 *
 * @enum {number}
 */
var Endianness;
(function (Endianness) {
    Endianness[Endianness["Little"] = 0] = "Little";
    Endianness[Endianness["Big"] = 1] = "Big";
})(Endianness || (Endianness = {}));
/**
 * These are stored in the flatbuffer in the Type union below
 *
 * @constructor
 */
class Null$1 {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns Null
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Null= obj
     * @returns Null
     */
    static getRootAsNull(bb, obj) {
        return (obj || new Null$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Null= obj
     * @returns Null
     */
    static getSizePrefixedRootAsNull(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Null$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startNull(builder) {
        builder.startObject(0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endNull(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createNull(builder) {
        Null$1.startNull(builder);
        return Null$1.endNull(builder);
    }
}
/**
 * A Struct_ in the flatbuffer metadata is the same as an Arrow Struct
 * (according to the physical memory layout). We used Struct_ here as
 * Struct is a reserved word in Flatbuffers
 *
 * @constructor
 */
class Struct_ {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns Struct_
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Struct_= obj
     * @returns Struct_
     */
    static getRootAsStruct_(bb, obj) {
        return (obj || new Struct_()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Struct_= obj
     * @returns Struct_
     */
    static getSizePrefixedRootAsStruct_(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Struct_()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startStruct_(builder) {
        builder.startObject(0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endStruct_(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createStruct_(builder) {
        Struct_.startStruct_(builder);
        return Struct_.endStruct_(builder);
    }
}
/**
 * @constructor
 */
class List$1 {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns List
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param List= obj
     * @returns List
     */
    static getRootAsList(bb, obj) {
        return (obj || new List$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param List= obj
     * @returns List
     */
    static getSizePrefixedRootAsList(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new List$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startList(builder) {
        builder.startObject(0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endList(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createList(builder) {
        List$1.startList(builder);
        return List$1.endList(builder);
    }
}
/**
 * @constructor
 */
class FixedSizeList$1 {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns FixedSizeList
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param FixedSizeList= obj
     * @returns FixedSizeList
     */
    static getRootAsFixedSizeList(bb, obj) {
        return (obj || new FixedSizeList$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param FixedSizeList= obj
     * @returns FixedSizeList
     */
    static getSizePrefixedRootAsFixedSizeList(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new FixedSizeList$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * Number of list items per value
     *
     * @returns number
     */
    listSize() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startFixedSizeList(builder) {
        builder.startObject(1);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param number listSize
     */
    static addListSize(builder, listSize) {
        builder.addFieldInt32(0, listSize, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endFixedSizeList(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createFixedSizeList(builder, listSize) {
        FixedSizeList$1.startFixedSizeList(builder);
        FixedSizeList$1.addListSize(builder, listSize);
        return FixedSizeList$1.endFixedSizeList(builder);
    }
}
/**
 * A Map is a logical nested type that is represented as
 *
 * List<entries: Struct<key: K, value: V>>
 *
 * In this layout, the keys and values are each respectively contiguous. We do
 * not constrain the key and value types, so the application is responsible
 * for ensuring that the keys are hashable and unique. Whether the keys are sorted
 * may be set in the metadata for this field.
 *
 * In a field with Map type, the field has a child Struct field, which then
 * has two children: key type and the second the value type. The names of the
 * child fields may be respectively "entries", "key", and "value", but this is
 * not enforced.
 *
 * Map
 *   - child[0] entries: Struct
 *     - child[0] key: K
 *     - child[1] value: V
 *
 * Neither the "entries" field nor the "key" field may be nullable.
 *
 * The metadata is structured so that Arrow systems without special handling
 * for Map can make Map an alias for List. The "layout" attribute for the Map
 * field must have the same contents as a List.
 *
 * @constructor
 */
class Map$1 {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns Map
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Map= obj
     * @returns Map
     */
    static getRootAsMap(bb, obj) {
        return (obj || new Map$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Map= obj
     * @returns Map
     */
    static getSizePrefixedRootAsMap(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Map$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * Set to true if the keys within each value are sorted
     *
     * @returns boolean
     */
    keysSorted() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startMap(builder) {
        builder.startObject(1);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param boolean keysSorted
     */
    static addKeysSorted(builder, keysSorted) {
        builder.addFieldInt8(0, +keysSorted, +false);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endMap(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createMap(builder, keysSorted) {
        Map$1.startMap(builder);
        Map$1.addKeysSorted(builder, keysSorted);
        return Map$1.endMap(builder);
    }
}
/**
 * A union is a complex type with children in Field
 * By default ids in the type vector refer to the offsets in the children
 * optionally typeIds provides an indirection between the child offset and the type id
 * for each child typeIds[offset] is the id used in the type vector
 *
 * @constructor
 */
class Union {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns Union
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Union= obj
     * @returns Union
     */
    static getRootAsUnion(bb, obj) {
        return (obj || new Union()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Union= obj
     * @returns Union
     */
    static getSizePrefixedRootAsUnion(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Union()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @returns UnionMode
     */
    mode() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? /**  */ (this.bb.readInt16(this.bb_pos + offset)) : UnionMode.Sparse;
    }
    /**
     * @param number index
     * @returns number
     */
    typeIds(index) {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.readInt32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
    }
    /**
     * @returns number
     */
    typeIdsLength() {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    /**
     * @returns Int32Array
     */
    typeIdsArray() {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startUnion(builder) {
        builder.startObject(2);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param UnionMode mode
     */
    static addMode(builder, mode) {
        builder.addFieldInt16(0, mode, UnionMode.Sparse);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset typeIdsOffset
     */
    static addTypeIds(builder, typeIdsOffset) {
        builder.addFieldOffset(1, typeIdsOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param Array.<number> data
     * @returns flatbuffers.Offset
     */
    static createTypeIdsVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addInt32(data[i]);
        }
        return builder.endVector();
    }
    /**
     * @param flatbuffers.Builder builder
     * @param number numElems
     */
    static startTypeIdsVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endUnion(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createUnion(builder, mode, typeIdsOffset) {
        Union.startUnion(builder);
        Union.addMode(builder, mode);
        Union.addTypeIds(builder, typeIdsOffset);
        return Union.endUnion(builder);
    }
}
/**
 * @constructor
 */
class Int {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns Int
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Int= obj
     * @returns Int
     */
    static getRootAsInt(bb, obj) {
        return (obj || new Int()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Int= obj
     * @returns Int
     */
    static getSizePrefixedRootAsInt(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Int()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @returns number
     */
    bitWidth() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    }
    /**
     * @returns boolean
     */
    isSigned() {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startInt(builder) {
        builder.startObject(2);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param number bitWidth
     */
    static addBitWidth(builder, bitWidth) {
        builder.addFieldInt32(0, bitWidth, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param boolean isSigned
     */
    static addIsSigned(builder, isSigned) {
        builder.addFieldInt8(1, +isSigned, +false);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endInt(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createInt(builder, bitWidth, isSigned) {
        Int.startInt(builder);
        Int.addBitWidth(builder, bitWidth);
        Int.addIsSigned(builder, isSigned);
        return Int.endInt(builder);
    }
}
/**
 * @constructor
 */
class FloatingPoint {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns FloatingPoint
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param FloatingPoint= obj
     * @returns FloatingPoint
     */
    static getRootAsFloatingPoint(bb, obj) {
        return (obj || new FloatingPoint()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param FloatingPoint= obj
     * @returns FloatingPoint
     */
    static getSizePrefixedRootAsFloatingPoint(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new FloatingPoint()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @returns Precision
     */
    precision() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? /**  */ (this.bb.readInt16(this.bb_pos + offset)) : Precision.HALF;
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startFloatingPoint(builder) {
        builder.startObject(1);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param Precision precision
     */
    static addPrecision(builder, precision) {
        builder.addFieldInt16(0, precision, Precision.HALF);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endFloatingPoint(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createFloatingPoint(builder, precision) {
        FloatingPoint.startFloatingPoint(builder);
        FloatingPoint.addPrecision(builder, precision);
        return FloatingPoint.endFloatingPoint(builder);
    }
}
/**
 * Unicode with UTF-8 encoding
 *
 * @constructor
 */
class Utf8$1 {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns Utf8
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Utf8= obj
     * @returns Utf8
     */
    static getRootAsUtf8(bb, obj) {
        return (obj || new Utf8$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Utf8= obj
     * @returns Utf8
     */
    static getSizePrefixedRootAsUtf8(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Utf8$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startUtf8(builder) {
        builder.startObject(0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endUtf8(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createUtf8(builder) {
        Utf8$1.startUtf8(builder);
        return Utf8$1.endUtf8(builder);
    }
}
/**
 * Opaque binary data
 *
 * @constructor
 */
class Binary$1 {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns Binary
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Binary= obj
     * @returns Binary
     */
    static getRootAsBinary(bb, obj) {
        return (obj || new Binary$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Binary= obj
     * @returns Binary
     */
    static getSizePrefixedRootAsBinary(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Binary$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startBinary(builder) {
        builder.startObject(0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endBinary(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createBinary(builder) {
        Binary$1.startBinary(builder);
        return Binary$1.endBinary(builder);
    }
}
/**
 * @constructor
 */
class FixedSizeBinary$1 {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns FixedSizeBinary
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param FixedSizeBinary= obj
     * @returns FixedSizeBinary
     */
    static getRootAsFixedSizeBinary(bb, obj) {
        return (obj || new FixedSizeBinary$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param FixedSizeBinary= obj
     * @returns FixedSizeBinary
     */
    static getSizePrefixedRootAsFixedSizeBinary(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new FixedSizeBinary$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * Number of bytes per value
     *
     * @returns number
     */
    byteWidth() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startFixedSizeBinary(builder) {
        builder.startObject(1);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param number byteWidth
     */
    static addByteWidth(builder, byteWidth) {
        builder.addFieldInt32(0, byteWidth, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endFixedSizeBinary(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createFixedSizeBinary(builder, byteWidth) {
        FixedSizeBinary$1.startFixedSizeBinary(builder);
        FixedSizeBinary$1.addByteWidth(builder, byteWidth);
        return FixedSizeBinary$1.endFixedSizeBinary(builder);
    }
}
/**
 * @constructor
 */
class Bool$1 {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns Bool
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Bool= obj
     * @returns Bool
     */
    static getRootAsBool(bb, obj) {
        return (obj || new Bool$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Bool= obj
     * @returns Bool
     */
    static getSizePrefixedRootAsBool(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Bool$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startBool(builder) {
        builder.startObject(0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endBool(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createBool(builder) {
        Bool$1.startBool(builder);
        return Bool$1.endBool(builder);
    }
}
/**
 * Exact decimal value represented as an integer value in two's
 * complement. Currently only 128-bit (16-byte) and 256-bit (32-byte) integers
 * are used. The representation uses the endianness indicated
 * in the Schema.
 *
 * @constructor
 */
class Decimal$1 {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns Decimal
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Decimal= obj
     * @returns Decimal
     */
    static getRootAsDecimal(bb, obj) {
        return (obj || new Decimal$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Decimal= obj
     * @returns Decimal
     */
    static getSizePrefixedRootAsDecimal(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Decimal$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * Total number of decimal digits
     *
     * @returns number
     */
    precision() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    }
    /**
     * Number of digits after the decimal point "."
     *
     * @returns number
     */
    scale() {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    }
    /**
     * Number of bits per value. The only accepted widths are 128 and 256.
     * We use bitWidth for consistency with Int::bitWidth.
     *
     * @returns number
     */
    bitWidth() {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 128;
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startDecimal(builder) {
        builder.startObject(3);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param number precision
     */
    static addPrecision(builder, precision) {
        builder.addFieldInt32(0, precision, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param number scale
     */
    static addScale(builder, scale) {
        builder.addFieldInt32(1, scale, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param number bitWidth
     */
    static addBitWidth(builder, bitWidth) {
        builder.addFieldInt32(2, bitWidth, 128);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endDecimal(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createDecimal(builder, precision, scale, bitWidth) {
        Decimal$1.startDecimal(builder);
        Decimal$1.addPrecision(builder, precision);
        Decimal$1.addScale(builder, scale);
        Decimal$1.addBitWidth(builder, bitWidth);
        return Decimal$1.endDecimal(builder);
    }
}
/**
 * Date is either a 32-bit or 64-bit type representing elapsed time since UNIX
 * epoch (1970-01-01), stored in either of two units:
 *
 * * Milliseconds (64 bits) indicating UNIX time elapsed since the epoch (no
 *   leap seconds), where the values are evenly divisible by 86400000
 * * Days (32 bits) since the UNIX epoch
 *
 * @constructor
 */
class Date$1 {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns Date
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Date= obj
     * @returns Date
     */
    static getRootAsDate(bb, obj) {
        return (obj || new Date$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Date= obj
     * @returns Date
     */
    static getSizePrefixedRootAsDate(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Date$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @returns DateUnit
     */
    unit() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? /**  */ (this.bb.readInt16(this.bb_pos + offset)) : DateUnit.MILLISECOND;
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startDate(builder) {
        builder.startObject(1);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param DateUnit unit
     */
    static addUnit(builder, unit) {
        builder.addFieldInt16(0, unit, DateUnit.MILLISECOND);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endDate(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createDate(builder, unit) {
        Date$1.startDate(builder);
        Date$1.addUnit(builder, unit);
        return Date$1.endDate(builder);
    }
}
/**
 * Time type. The physical storage type depends on the unit
 * - SECOND and MILLISECOND: 32 bits
 * - MICROSECOND and NANOSECOND: 64 bits
 *
 * @constructor
 */
class Time {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns Time
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Time= obj
     * @returns Time
     */
    static getRootAsTime(bb, obj) {
        return (obj || new Time()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Time= obj
     * @returns Time
     */
    static getSizePrefixedRootAsTime(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Time()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @returns TimeUnit
     */
    unit() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? /**  */ (this.bb.readInt16(this.bb_pos + offset)) : TimeUnit.MILLISECOND;
    }
    /**
     * @returns number
     */
    bitWidth() {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 32;
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startTime(builder) {
        builder.startObject(2);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param TimeUnit unit
     */
    static addUnit(builder, unit) {
        builder.addFieldInt16(0, unit, TimeUnit.MILLISECOND);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param number bitWidth
     */
    static addBitWidth(builder, bitWidth) {
        builder.addFieldInt32(1, bitWidth, 32);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endTime(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createTime(builder, unit, bitWidth) {
        Time.startTime(builder);
        Time.addUnit(builder, unit);
        Time.addBitWidth(builder, bitWidth);
        return Time.endTime(builder);
    }
}
/**
 * Time elapsed from the Unix epoch, 00:00:00.000 on 1 January 1970, excluding
 * leap seconds, as a 64-bit integer. Note that UNIX time does not include
 * leap seconds.
 *
 * The Timestamp metadata supports both "time zone naive" and "time zone
 * aware" timestamps. Read about the timezone attribute for more detail
 *
 * @constructor
 */
class Timestamp {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns Timestamp
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Timestamp= obj
     * @returns Timestamp
     */
    static getRootAsTimestamp(bb, obj) {
        return (obj || new Timestamp()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Timestamp= obj
     * @returns Timestamp
     */
    static getSizePrefixedRootAsTimestamp(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Timestamp()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @returns TimeUnit
     */
    unit() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? /**  */ (this.bb.readInt16(this.bb_pos + offset)) : TimeUnit.SECOND;
    }
    timezone(optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startTimestamp(builder) {
        builder.startObject(2);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param TimeUnit unit
     */
    static addUnit(builder, unit) {
        builder.addFieldInt16(0, unit, TimeUnit.SECOND);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset timezoneOffset
     */
    static addTimezone(builder, timezoneOffset) {
        builder.addFieldOffset(1, timezoneOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endTimestamp(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createTimestamp(builder, unit, timezoneOffset) {
        Timestamp.startTimestamp(builder);
        Timestamp.addUnit(builder, unit);
        Timestamp.addTimezone(builder, timezoneOffset);
        return Timestamp.endTimestamp(builder);
    }
}
/**
 * @constructor
 */
class Interval {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns Interval
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Interval= obj
     * @returns Interval
     */
    static getRootAsInterval(bb, obj) {
        return (obj || new Interval()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Interval= obj
     * @returns Interval
     */
    static getSizePrefixedRootAsInterval(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Interval()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @returns IntervalUnit
     */
    unit() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? /**  */ (this.bb.readInt16(this.bb_pos + offset)) : IntervalUnit.YEAR_MONTH;
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startInterval(builder) {
        builder.startObject(1);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param IntervalUnit unit
     */
    static addUnit(builder, unit) {
        builder.addFieldInt16(0, unit, IntervalUnit.YEAR_MONTH);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endInterval(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createInterval(builder, unit) {
        Interval.startInterval(builder);
        Interval.addUnit(builder, unit);
        return Interval.endInterval(builder);
    }
}
/**
 * ----------------------------------------------------------------------
 * user defined key value pairs to add custom metadata to arrow
 * key namespacing is the responsibility of the user
 *
 * @constructor
 */
class KeyValue {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns KeyValue
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param KeyValue= obj
     * @returns KeyValue
     */
    static getRootAsKeyValue(bb, obj) {
        return (obj || new KeyValue()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param KeyValue= obj
     * @returns KeyValue
     */
    static getSizePrefixedRootAsKeyValue(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new KeyValue()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    key(optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
    }
    value(optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startKeyValue(builder) {
        builder.startObject(2);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset keyOffset
     */
    static addKey(builder, keyOffset) {
        builder.addFieldOffset(0, keyOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset valueOffset
     */
    static addValue(builder, valueOffset) {
        builder.addFieldOffset(1, valueOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endKeyValue(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createKeyValue(builder, keyOffset, valueOffset) {
        KeyValue.startKeyValue(builder);
        KeyValue.addKey(builder, keyOffset);
        KeyValue.addValue(builder, valueOffset);
        return KeyValue.endKeyValue(builder);
    }
}
/**
 * @constructor
 */
class DictionaryEncoding {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns DictionaryEncoding
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param DictionaryEncoding= obj
     * @returns DictionaryEncoding
     */
    static getRootAsDictionaryEncoding(bb, obj) {
        return (obj || new DictionaryEncoding()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param DictionaryEncoding= obj
     * @returns DictionaryEncoding
     */
    static getSizePrefixedRootAsDictionaryEncoding(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new DictionaryEncoding()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * The known dictionary id in the application where this data is used. In
     * the file or streaming formats, the dictionary ids are found in the
     * DictionaryBatch messages
     *
     * @returns flatbuffers.Long
     */
    id() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
    }
    /**
     * The dictionary indices are constrained to be non-negative integers. If
     * this field is null, the indices must be signed int32. To maximize
     * cross-language compatibility and performance, implementations are
     * recommended to prefer signed integer types over unsigned integer types
     * and to avoid uint64 indices unless they are required by an application.
     *
     * @param Int= obj
     * @returns Int|null
     */
    indexType(obj) {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? (obj || new Int()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    /**
     * By default, dictionaries are not ordered, or the order does not have
     * semantic meaning. In some statistical, applications, dictionary-encoding
     * is used to represent ordered categorical data, and we provide a way to
     * preserve that metadata here
     *
     * @returns boolean
     */
    isOrdered() {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
    }
    /**
     * @returns DictionaryKind
     */
    dictionaryKind() {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? /**  */ (this.bb.readInt16(this.bb_pos + offset)) : DictionaryKind.DenseArray;
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startDictionaryEncoding(builder) {
        builder.startObject(4);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Long id
     */
    static addId(builder, id) {
        builder.addFieldInt64(0, id, builder.createLong(0, 0));
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset indexTypeOffset
     */
    static addIndexType(builder, indexTypeOffset) {
        builder.addFieldOffset(1, indexTypeOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param boolean isOrdered
     */
    static addIsOrdered(builder, isOrdered) {
        builder.addFieldInt8(2, +isOrdered, +false);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param DictionaryKind dictionaryKind
     */
    static addDictionaryKind(builder, dictionaryKind) {
        builder.addFieldInt16(3, dictionaryKind, DictionaryKind.DenseArray);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endDictionaryEncoding(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createDictionaryEncoding(builder, id, indexTypeOffset, isOrdered, dictionaryKind) {
        DictionaryEncoding.startDictionaryEncoding(builder);
        DictionaryEncoding.addId(builder, id);
        DictionaryEncoding.addIndexType(builder, indexTypeOffset);
        DictionaryEncoding.addIsOrdered(builder, isOrdered);
        DictionaryEncoding.addDictionaryKind(builder, dictionaryKind);
        return DictionaryEncoding.endDictionaryEncoding(builder);
    }
}
/**
 * ----------------------------------------------------------------------
 * A field represents a named column in a record / row batch or child of a
 * nested type.
 *
 * @constructor
 */
class Field$1 {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns Field
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Field= obj
     * @returns Field
     */
    static getRootAsField(bb, obj) {
        return (obj || new Field$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Field= obj
     * @returns Field
     */
    static getSizePrefixedRootAsField(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Field$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    name(optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
    }
    /**
     * Whether or not this field can contain nulls. Should be true in general.
     *
     * @returns boolean
     */
    nullable() {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
    }
    /**
     * @returns Type
     */
    typeType() {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? /**  */ (this.bb.readUint8(this.bb_pos + offset)) : Type$1.NONE;
    }
    /**
     * This is the type of the decoded value if the field is dictionary encoded.
     *
     * @param flatbuffers.Table obj
     * @returns ?flatbuffers.Table
     */
    type(obj) {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? this.bb.__union(obj, this.bb_pos + offset) : null;
    }
    /**
     * Present only if the field is dictionary encoded.
     *
     * @param DictionaryEncoding= obj
     * @returns DictionaryEncoding|null
     */
    dictionary(obj) {
        const offset = this.bb.__offset(this.bb_pos, 12);
        return offset ? (obj || new DictionaryEncoding()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    /**
     * children apply only to nested data types like Struct, List and Union. For
     * primitive types children will have length 0.
     *
     * @param number index
     * @param Field= obj
     * @returns Field
     */
    children(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 14);
        return offset ? (obj || new Field$1()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
    }
    /**
     * @returns number
     */
    childrenLength() {
        const offset = this.bb.__offset(this.bb_pos, 14);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    /**
     * User-defined metadata
     *
     * @param number index
     * @param KeyValue= obj
     * @returns KeyValue
     */
    customMetadata(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 16);
        return offset ? (obj || new KeyValue()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
    }
    /**
     * @returns number
     */
    customMetadataLength() {
        const offset = this.bb.__offset(this.bb_pos, 16);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startField(builder) {
        builder.startObject(7);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset nameOffset
     */
    static addName(builder, nameOffset) {
        builder.addFieldOffset(0, nameOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param boolean nullable
     */
    static addNullable(builder, nullable) {
        builder.addFieldInt8(1, +nullable, +false);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param Type typeType
     */
    static addTypeType(builder, typeType) {
        builder.addFieldInt8(2, typeType, Type$1.NONE);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset typeOffset
     */
    static addType(builder, typeOffset) {
        builder.addFieldOffset(3, typeOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset dictionaryOffset
     */
    static addDictionary(builder, dictionaryOffset) {
        builder.addFieldOffset(4, dictionaryOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset childrenOffset
     */
    static addChildren(builder, childrenOffset) {
        builder.addFieldOffset(5, childrenOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param Array.<flatbuffers.Offset> data
     * @returns flatbuffers.Offset
     */
    static createChildrenVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    /**
     * @param flatbuffers.Builder builder
     * @param number numElems
     */
    static startChildrenVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset customMetadataOffset
     */
    static addCustomMetadata(builder, customMetadataOffset) {
        builder.addFieldOffset(6, customMetadataOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param Array.<flatbuffers.Offset> data
     * @returns flatbuffers.Offset
     */
    static createCustomMetadataVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    /**
     * @param flatbuffers.Builder builder
     * @param number numElems
     */
    static startCustomMetadataVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endField(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createField(builder, nameOffset, nullable, typeType, typeOffset, dictionaryOffset, childrenOffset, customMetadataOffset) {
        Field$1.startField(builder);
        Field$1.addName(builder, nameOffset);
        Field$1.addNullable(builder, nullable);
        Field$1.addTypeType(builder, typeType);
        Field$1.addType(builder, typeOffset);
        Field$1.addDictionary(builder, dictionaryOffset);
        Field$1.addChildren(builder, childrenOffset);
        Field$1.addCustomMetadata(builder, customMetadataOffset);
        return Field$1.endField(builder);
    }
}
/**
 * ----------------------------------------------------------------------
 * A Buffer represents a single contiguous memory segment
 *
 * @constructor
 */
class Buffer {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns Buffer
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * The relative offset into the shared memory page where the bytes for this
     * buffer starts
     *
     * @returns flatbuffers.Long
     */
    offset() {
        return this.bb.readInt64(this.bb_pos);
    }
    /**
     * The absolute length (in bytes) of the memory buffer. The memory is found
     * from offset (inclusive) to offset + length (non-inclusive). When building
     * messages using the encapsulated IPC message, padding bytes may be written
     * after a buffer, but such padding bytes do not need to be accounted for in
     * the size here.
     *
     * @returns flatbuffers.Long
     */
    length() {
        return this.bb.readInt64(this.bb_pos + 8);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Long offset
     * @param flatbuffers.Long length
     * @returns flatbuffers.Offset
     */
    static createBuffer(builder, offset, length) {
        builder.prep(8, 16);
        builder.writeInt64(length);
        builder.writeInt64(offset);
        return builder.offset();
    }
}
/**
 * ----------------------------------------------------------------------
 * A Schema describes the columns in a row batch
 *
 * @constructor
 */
class Schema$1 {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns Schema
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Schema= obj
     * @returns Schema
     */
    static getRootAsSchema(bb, obj) {
        return (obj || new Schema$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Schema= obj
     * @returns Schema
     */
    static getSizePrefixedRootAsSchema(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Schema$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * endianness of the buffer
     * it is Little Endian by default
     * if endianness doesn't match the underlying system then the vectors need to be converted
     *
     * @returns Endianness
     */
    endianness() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? /**  */ (this.bb.readInt16(this.bb_pos + offset)) : Endianness.Little;
    }
    /**
     * @param number index
     * @param Field= obj
     * @returns Field
     */
    fields(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? (obj || new Field$1()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
    }
    /**
     * @returns number
     */
    fieldsLength() {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    /**
     * @param number index
     * @param KeyValue= obj
     * @returns KeyValue
     */
    customMetadata(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? (obj || new KeyValue()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
    }
    /**
     * @returns number
     */
    customMetadataLength() {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    /**
     * Features used in the stream/file.
     *
     * @param number index
     * @returns flatbuffers.Long
     */
    features(index) {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? /**  */ (this.bb.readInt64(this.bb.__vector(this.bb_pos + offset) + index * 8)) : this.bb.createLong(0, 0);
    }
    /**
     * @returns number
     */
    featuresLength() {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startSchema(builder) {
        builder.startObject(4);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param Endianness endianness
     */
    static addEndianness(builder, endianness) {
        builder.addFieldInt16(0, endianness, Endianness.Little);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset fieldsOffset
     */
    static addFields(builder, fieldsOffset) {
        builder.addFieldOffset(1, fieldsOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param Array.<flatbuffers.Offset> data
     * @returns flatbuffers.Offset
     */
    static createFieldsVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    /**
     * @param flatbuffers.Builder builder
     * @param number numElems
     */
    static startFieldsVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset customMetadataOffset
     */
    static addCustomMetadata(builder, customMetadataOffset) {
        builder.addFieldOffset(2, customMetadataOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param Array.<flatbuffers.Offset> data
     * @returns flatbuffers.Offset
     */
    static createCustomMetadataVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    /**
     * @param flatbuffers.Builder builder
     * @param number numElems
     */
    static startCustomMetadataVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset featuresOffset
     */
    static addFeatures(builder, featuresOffset) {
        builder.addFieldOffset(3, featuresOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param Array.<flatbuffers.Long> data
     * @returns flatbuffers.Offset
     */
    static createFeaturesVector(builder, data) {
        builder.startVector(8, data.length, 8);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addInt64(data[i]);
        }
        return builder.endVector();
    }
    /**
     * @param flatbuffers.Builder builder
     * @param number numElems
     */
    static startFeaturesVector(builder, numElems) {
        builder.startVector(8, numElems, 8);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endSchema(builder) {
        const offset = builder.endObject();
        return offset;
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset offset
     */
    static finishSchemaBuffer(builder, offset) {
        builder.finish(offset);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset offset
     */
    static finishSizePrefixedSchemaBuffer(builder, offset) {
        builder.finish(offset, undefined, true);
    }
    static createSchema(builder, endianness, fieldsOffset, customMetadataOffset, featuresOffset) {
        Schema$1.startSchema(builder);
        Schema$1.addEndianness(builder, endianness);
        Schema$1.addFields(builder, fieldsOffset);
        Schema$1.addCustomMetadata(builder, customMetadataOffset);
        Schema$1.addFeatures(builder, featuresOffset);
        return Schema$1.endSchema(builder);
    }
}

// automatically generated by the FlatBuffers compiler, do not modify
/**
 * @enum {number}
 */
var CompressionType;
(function (CompressionType) {
    CompressionType[CompressionType["LZ4_FRAME"] = 0] = "LZ4_FRAME";
    CompressionType[CompressionType["ZSTD"] = 1] = "ZSTD";
})(CompressionType || (CompressionType = {}));
/**
 * Provided for forward compatibility in case we need to support different
 * strategies for compressing the IPC message body (like whole-body
 * compression rather than buffer-level) in the future
 *
 * @enum {number}
 */
var BodyCompressionMethod;
(function (BodyCompressionMethod) {
    /**
     * Each constituent buffer is first compressed with the indicated
     * compressor, and then written with the uncompressed length in the first 8
     * bytes as a 64-bit little-endian signed integer followed by the compressed
     * buffer bytes (and then padding as required by the protocol). The
     * uncompressed length may be set to -1 to indicate that the data that
     * follows is not compressed, which can be useful for cases where
     * compression does not yield appreciable savings.
     */
    BodyCompressionMethod[BodyCompressionMethod["BUFFER"] = 0] = "BUFFER";
})(BodyCompressionMethod || (BodyCompressionMethod = {}));
/**
 * ----------------------------------------------------------------------
 * The root Message type
 * This union enables us to easily send different message types without
 * redundant storage, and in the future we can easily add new message types.
 *
 * Arrow implementations do not need to implement all of the message types,
 * which may include experimental metadata types. For maximum compatibility,
 * it is best to send data using RecordBatch
 *
 * @enum {number}
 */
var MessageHeader;
(function (MessageHeader) {
    MessageHeader[MessageHeader["NONE"] = 0] = "NONE";
    MessageHeader[MessageHeader["Schema"] = 1] = "Schema";
    MessageHeader[MessageHeader["DictionaryBatch"] = 2] = "DictionaryBatch";
    MessageHeader[MessageHeader["RecordBatch"] = 3] = "RecordBatch";
    MessageHeader[MessageHeader["Tensor"] = 4] = "Tensor";
    MessageHeader[MessageHeader["SparseTensor"] = 5] = "SparseTensor";
})(MessageHeader || (MessageHeader = {}));
/**
 * ----------------------------------------------------------------------
 * Data structures for describing a table row batch (a collection of
 * equal-length Arrow arrays)
 * Metadata about a field at some level of a nested type tree (but not
 * its children).
 *
 * For example, a List<Int16> with values [[1, 2, 3], null, [4], [5, 6], null]
 * would have {length: 5, null_count: 2} for its List node, and {length: 6,
 * null_count: 0} for its Int16 node, as separate FieldNode structs
 *
 * @constructor
 */
class FieldNode$1 {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns FieldNode
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * The number of value slots in the Arrow array at this level of a nested
     * tree
     *
     * @returns flatbuffers.Long
     */
    length() {
        return this.bb.readInt64(this.bb_pos);
    }
    /**
     * The number of observed nulls. Fields with null_count == 0 may choose not
     * to write their physical validity bitmap out as a materialized buffer,
     * instead setting the length of the bitmap buffer to 0.
     *
     * @returns flatbuffers.Long
     */
    nullCount() {
        return this.bb.readInt64(this.bb_pos + 8);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Long length
     * @param flatbuffers.Long null_count
     * @returns flatbuffers.Offset
     */
    static createFieldNode(builder, length, null_count) {
        builder.prep(8, 16);
        builder.writeInt64(null_count);
        builder.writeInt64(length);
        return builder.offset();
    }
}
/**
 * Optional compression for the memory buffers constituting IPC message
 * bodies. Intended for use with RecordBatch but could be used for other
 * message types
 *
 * @constructor
 */
class BodyCompression {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns BodyCompression
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param BodyCompression= obj
     * @returns BodyCompression
     */
    static getRootAsBodyCompression(bb, obj) {
        return (obj || new BodyCompression()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param BodyCompression= obj
     * @returns BodyCompression
     */
    static getSizePrefixedRootAsBodyCompression(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new BodyCompression()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * Compressor library
     *
     * @returns CompressionType
     */
    codec() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? /**  */ (this.bb.readInt8(this.bb_pos + offset)) : CompressionType.LZ4_FRAME;
    }
    /**
     * Indicates the way the record batch body was compressed
     *
     * @returns BodyCompressionMethod
     */
    method() {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? /**  */ (this.bb.readInt8(this.bb_pos + offset)) : BodyCompressionMethod.BUFFER;
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startBodyCompression(builder) {
        builder.startObject(2);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param CompressionType codec
     */
    static addCodec(builder, codec) {
        builder.addFieldInt8(0, codec, CompressionType.LZ4_FRAME);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param BodyCompressionMethod method
     */
    static addMethod(builder, method) {
        builder.addFieldInt8(1, method, BodyCompressionMethod.BUFFER);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endBodyCompression(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createBodyCompression(builder, codec, method) {
        BodyCompression.startBodyCompression(builder);
        BodyCompression.addCodec(builder, codec);
        BodyCompression.addMethod(builder, method);
        return BodyCompression.endBodyCompression(builder);
    }
}
/**
 * A data header describing the shared memory layout of a "record" or "row"
 * batch. Some systems call this a "row batch" internally and others a "record
 * batch".
 *
 * @constructor
 */
class RecordBatch$2 {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns RecordBatch
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param RecordBatch= obj
     * @returns RecordBatch
     */
    static getRootAsRecordBatch(bb, obj) {
        return (obj || new RecordBatch$2()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param RecordBatch= obj
     * @returns RecordBatch
     */
    static getSizePrefixedRootAsRecordBatch(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new RecordBatch$2()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * number of records / rows. The arrays in the batch should all have this
     * length
     *
     * @returns flatbuffers.Long
     */
    length() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
    }
    /**
     * Nodes correspond to the pre-ordered flattened logical schema
     *
     * @param number index
     * @param FieldNode= obj
     * @returns FieldNode
     */
    nodes(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? (obj || new FieldNode$1()).__init(this.bb.__vector(this.bb_pos + offset) + index * 16, this.bb) : null;
    }
    /**
     * @returns number
     */
    nodesLength() {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    /**
     * Buffers correspond to the pre-ordered flattened buffer tree
     *
     * The number of buffers appended to this list depends on the schema. For
     * example, most primitive arrays will have 2 buffers, 1 for the validity
     * bitmap and 1 for the values. For struct arrays, there will only be a
     * single buffer for the validity (nulls) bitmap
     *
     * @param number index
     * @param Buffer= obj
     * @returns Buffer
     */
    buffers(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? (obj || new Buffer()).__init(this.bb.__vector(this.bb_pos + offset) + index * 16, this.bb) : null;
    }
    /**
     * @returns number
     */
    buffersLength() {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    /**
     * Optional compression of the message body
     *
     * @param BodyCompression= obj
     * @returns BodyCompression|null
     */
    compression(obj) {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? (obj || new BodyCompression()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startRecordBatch(builder) {
        builder.startObject(4);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Long length
     */
    static addLength(builder, length) {
        builder.addFieldInt64(0, length, builder.createLong(0, 0));
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset nodesOffset
     */
    static addNodes(builder, nodesOffset) {
        builder.addFieldOffset(1, nodesOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param number numElems
     */
    static startNodesVector(builder, numElems) {
        builder.startVector(16, numElems, 8);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset buffersOffset
     */
    static addBuffers(builder, buffersOffset) {
        builder.addFieldOffset(2, buffersOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param number numElems
     */
    static startBuffersVector(builder, numElems) {
        builder.startVector(16, numElems, 8);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset compressionOffset
     */
    static addCompression(builder, compressionOffset) {
        builder.addFieldOffset(3, compressionOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endRecordBatch(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createRecordBatch(builder, length, nodesOffset, buffersOffset, compressionOffset) {
        RecordBatch$2.startRecordBatch(builder);
        RecordBatch$2.addLength(builder, length);
        RecordBatch$2.addNodes(builder, nodesOffset);
        RecordBatch$2.addBuffers(builder, buffersOffset);
        RecordBatch$2.addCompression(builder, compressionOffset);
        return RecordBatch$2.endRecordBatch(builder);
    }
}
/**
 * For sending dictionary encoding information. Any Field can be
 * dictionary-encoded, but in this case none of its children may be
 * dictionary-encoded.
 * There is one vector / column per dictionary, but that vector / column
 * may be spread across multiple dictionary batches by using the isDelta
 * flag
 *
 * @constructor
 */
class DictionaryBatch$1 {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns DictionaryBatch
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param DictionaryBatch= obj
     * @returns DictionaryBatch
     */
    static getRootAsDictionaryBatch(bb, obj) {
        return (obj || new DictionaryBatch$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param DictionaryBatch= obj
     * @returns DictionaryBatch
     */
    static getSizePrefixedRootAsDictionaryBatch(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new DictionaryBatch$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @returns flatbuffers.Long
     */
    id() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
    }
    /**
     * @param RecordBatch= obj
     * @returns RecordBatch|null
     */
    data(obj) {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? (obj || new RecordBatch$2()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    /**
     * If isDelta is true the values in the dictionary are to be appended to a
     * dictionary with the indicated id. If isDelta is false this dictionary
     * should replace the existing dictionary.
     *
     * @returns boolean
     */
    isDelta() {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startDictionaryBatch(builder) {
        builder.startObject(3);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Long id
     */
    static addId(builder, id) {
        builder.addFieldInt64(0, id, builder.createLong(0, 0));
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset dataOffset
     */
    static addData(builder, dataOffset) {
        builder.addFieldOffset(1, dataOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param boolean isDelta
     */
    static addIsDelta(builder, isDelta) {
        builder.addFieldInt8(2, +isDelta, +false);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endDictionaryBatch(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createDictionaryBatch(builder, id, dataOffset, isDelta) {
        DictionaryBatch$1.startDictionaryBatch(builder);
        DictionaryBatch$1.addId(builder, id);
        DictionaryBatch$1.addData(builder, dataOffset);
        DictionaryBatch$1.addIsDelta(builder, isDelta);
        return DictionaryBatch$1.endDictionaryBatch(builder);
    }
}
/**
 * @constructor
 */
class Message$1 {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns Message
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Message= obj
     * @returns Message
     */
    static getRootAsMessage(bb, obj) {
        return (obj || new Message$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Message= obj
     * @returns Message
     */
    static getSizePrefixedRootAsMessage(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Message$1()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @returns MetadataVersion
     */
    version() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? /**  */ (this.bb.readInt16(this.bb_pos + offset)) : MetadataVersion.V1;
    }
    /**
     * @returns MessageHeader
     */
    headerType() {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? /**  */ (this.bb.readUint8(this.bb_pos + offset)) : MessageHeader.NONE;
    }
    /**
     * @param flatbuffers.Table obj
     * @returns ?flatbuffers.Table
     */
    header(obj) {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.__union(obj, this.bb_pos + offset) : null;
    }
    /**
     * @returns flatbuffers.Long
     */
    bodyLength() {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
    }
    /**
     * @param number index
     * @param KeyValue= obj
     * @returns KeyValue
     */
    customMetadata(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 12);
        return offset ? (obj || new KeyValue()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
    }
    /**
     * @returns number
     */
    customMetadataLength() {
        const offset = this.bb.__offset(this.bb_pos, 12);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startMessage(builder) {
        builder.startObject(5);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param MetadataVersion version
     */
    static addVersion(builder, version) {
        builder.addFieldInt16(0, version, MetadataVersion.V1);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param MessageHeader headerType
     */
    static addHeaderType(builder, headerType) {
        builder.addFieldInt8(1, headerType, MessageHeader.NONE);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset headerOffset
     */
    static addHeader(builder, headerOffset) {
        builder.addFieldOffset(2, headerOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Long bodyLength
     */
    static addBodyLength(builder, bodyLength) {
        builder.addFieldInt64(3, bodyLength, builder.createLong(0, 0));
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset customMetadataOffset
     */
    static addCustomMetadata(builder, customMetadataOffset) {
        builder.addFieldOffset(4, customMetadataOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param Array.<flatbuffers.Offset> data
     * @returns flatbuffers.Offset
     */
    static createCustomMetadataVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    /**
     * @param flatbuffers.Builder builder
     * @param number numElems
     */
    static startCustomMetadataVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endMessage(builder) {
        const offset = builder.endObject();
        return offset;
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset offset
     */
    static finishMessageBuffer(builder, offset) {
        builder.finish(offset);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset offset
     */
    static finishSizePrefixedMessageBuffer(builder, offset) {
        builder.finish(offset, undefined, true);
    }
    static createMessage(builder, version, headerType, headerOffset, bodyLength, customMetadataOffset) {
        Message$1.startMessage(builder);
        Message$1.addVersion(builder, version);
        Message$1.addHeaderType(builder, headerType);
        Message$1.addHeader(builder, headerOffset);
        Message$1.addBodyLength(builder, bodyLength);
        Message$1.addCustomMetadata(builder, customMetadataOffset);
        return Message$1.endMessage(builder);
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/**
 * Main data type enumeration.
 *
 * Data types in this library are all *logical*. They can be expressed as
 * either a primitive physical type (bytes or bits of some fixed size), a
 * nested type consisting of other data types, or another data type (e.g. a
 * timestamp encoded as an int64).
 *
 * **Note**: Only enum values 0-17 (NONE through Map) are written to an Arrow
 * IPC payload.
 *
 * The rest of the values are specified here so TypeScript can narrow the type
 * signatures further beyond the base Arrow Types. The Arrow DataTypes include
 * metadata like `bitWidth` that impact the type signatures of the values we
 * accept and return.
 *
 * For example, the `Int8Vector` reads 1-byte numbers from an `Int8Array`, an
 * `Int32Vector` reads a 4-byte number from an `Int32Array`, and an `Int64Vector`
 * reads a pair of 4-byte lo, hi 32-bit integers as a zero-copy slice from the
 * underlying `Int32Array`.
 *
 * Library consumers benefit by knowing the narrowest type, since we can ensure
 * the types across all public methods are propagated, and never bail to `any`.
 * These values are _never_ used at runtime, and they will _never_ be written
 * to the flatbuffers metadata of serialized Arrow IPC payloads.
 */
var Type;
(function (Type) {
    /** The default placeholder type */
    Type[Type["NONE"] = 0] = "NONE";
    /** A NULL type having no physical storage */
    Type[Type["Null"] = 1] = "Null";
    /** Signed or unsigned 8, 16, 32, or 64-bit little-endian integer */
    Type[Type["Int"] = 2] = "Int";
    /** 2, 4, or 8-byte floating point value */
    Type[Type["Float"] = 3] = "Float";
    /** Variable-length bytes (no guarantee of UTF8-ness) */
    Type[Type["Binary"] = 4] = "Binary";
    /** UTF8 variable-length string as List<Char> */
    Type[Type["Utf8"] = 5] = "Utf8";
    /** Boolean as 1 bit, LSB bit-packed ordering */
    Type[Type["Bool"] = 6] = "Bool";
    /** Precision-and-scale-based decimal type. Storage type depends on the parameters. */
    Type[Type["Decimal"] = 7] = "Decimal";
    /** int32_t days or int64_t milliseconds since the UNIX epoch */
    Type[Type["Date"] = 8] = "Date";
    /** Time as signed 32 or 64-bit integer, representing either seconds, milliseconds, microseconds, or nanoseconds since midnight since midnight */
    Type[Type["Time"] = 9] = "Time";
    /** Exact timestamp encoded with int64 since UNIX epoch (Default unit millisecond) */
    Type[Type["Timestamp"] = 10] = "Timestamp";
    /** YEAR_MONTH or DAY_TIME interval in SQL style */
    Type[Type["Interval"] = 11] = "Interval";
    /** A list of some logical data type */
    Type[Type["List"] = 12] = "List";
    /** Struct of logical types */
    Type[Type["Struct"] = 13] = "Struct";
    /** Union of logical types */
    Type[Type["Union"] = 14] = "Union";
    /** Fixed-size binary. Each value occupies the same number of bytes */
    Type[Type["FixedSizeBinary"] = 15] = "FixedSizeBinary";
    /** Fixed-size list. Each value occupies the same number of bytes */
    Type[Type["FixedSizeList"] = 16] = "FixedSizeList";
    /** Map of named logical types */
    Type[Type["Map"] = 17] = "Map";
    /** Dictionary aka Category type */
    Type[Type["Dictionary"] = -1] = "Dictionary";
    Type[Type["Int8"] = -2] = "Int8";
    Type[Type["Int16"] = -3] = "Int16";
    Type[Type["Int32"] = -4] = "Int32";
    Type[Type["Int64"] = -5] = "Int64";
    Type[Type["Uint8"] = -6] = "Uint8";
    Type[Type["Uint16"] = -7] = "Uint16";
    Type[Type["Uint32"] = -8] = "Uint32";
    Type[Type["Uint64"] = -9] = "Uint64";
    Type[Type["Float16"] = -10] = "Float16";
    Type[Type["Float32"] = -11] = "Float32";
    Type[Type["Float64"] = -12] = "Float64";
    Type[Type["DateDay"] = -13] = "DateDay";
    Type[Type["DateMillisecond"] = -14] = "DateMillisecond";
    Type[Type["TimestampSecond"] = -15] = "TimestampSecond";
    Type[Type["TimestampMillisecond"] = -16] = "TimestampMillisecond";
    Type[Type["TimestampMicrosecond"] = -17] = "TimestampMicrosecond";
    Type[Type["TimestampNanosecond"] = -18] = "TimestampNanosecond";
    Type[Type["TimeSecond"] = -19] = "TimeSecond";
    Type[Type["TimeMillisecond"] = -20] = "TimeMillisecond";
    Type[Type["TimeMicrosecond"] = -21] = "TimeMicrosecond";
    Type[Type["TimeNanosecond"] = -22] = "TimeNanosecond";
    Type[Type["DenseUnion"] = -23] = "DenseUnion";
    Type[Type["SparseUnion"] = -24] = "SparseUnion";
    Type[Type["IntervalDayTime"] = -25] = "IntervalDayTime";
    Type[Type["IntervalYearMonth"] = -26] = "IntervalYearMonth";
})(Type || (Type = {}));
var BufferType;
(function (BufferType) {
    /**
     * used in List type, Dense Union and variable length primitive types (String, Binary)
     */
    BufferType[BufferType["OFFSET"] = 0] = "OFFSET";
    /**
     * actual data, either wixed width primitive types in slots or variable width delimited by an OFFSET vector
     */
    BufferType[BufferType["DATA"] = 1] = "DATA";
    /**
     * Bit vector indicating if each value is null
     */
    BufferType[BufferType["VALIDITY"] = 2] = "VALIDITY";
    /**
     * Type vector used in Union type
     */
    BufferType[BufferType["TYPE"] = 3] = "TYPE";
})(BufferType || (BufferType = {}));

// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
/** @ignore */
function getBool$1(_data, _index, byte, bit) {
    return (byte & 1 << bit) !== 0;
}
/** @ignore */
function getBit(_data, _index, byte, bit) {
    return (byte & 1 << bit) >> bit;
}
/** @ignore */
function setBool$1(bytes, index, value) {
    return value ?
        !!(bytes[index >> 3] |= (1 << (index % 8))) || true :
        !(bytes[index >> 3] &= ~(1 << (index % 8))) && false;
}
/** @ignore */
function truncateBitmap(offset, length, bitmap) {
    const alignedSize = (bitmap.byteLength + 7) & ~7;
    if (offset > 0 || bitmap.byteLength < alignedSize) {
        const bytes = new Uint8Array(alignedSize);
        // If the offset is a multiple of 8 bits, it's safe to slice the bitmap
        bytes.set(offset % 8 === 0 ? bitmap.subarray(offset >> 3) :
            // Otherwise iterate each bit from the offset and return a new one
            packBools(new BitIterator(bitmap, offset, length, null, getBool$1)).subarray(0, alignedSize));
        return bytes;
    }
    return bitmap;
}
/** @ignore */
function packBools(values) {
    const xs = [];
    let i = 0, bit = 0, byte = 0;
    for (const value of values) {
        value && (byte |= 1 << bit);
        if (++bit === 8) {
            xs[i++] = byte;
            byte = bit = 0;
        }
    }
    if (i === 0 || bit > 0) {
        xs[i++] = byte;
    }
    const b = new Uint8Array((xs.length + 7) & ~7);
    b.set(xs);
    return b;
}
/** @ignore */
class BitIterator {
    constructor(bytes, begin, length, context, get) {
        this.bytes = bytes;
        this.length = length;
        this.context = context;
        this.get = get;
        this.bit = begin % 8;
        this.byteIndex = begin >> 3;
        this.byte = bytes[this.byteIndex++];
        this.index = 0;
    }
    next() {
        if (this.index < this.length) {
            if (this.bit === 8) {
                this.bit = 0;
                this.byte = this.bytes[this.byteIndex++];
            }
            return {
                value: this.get(this.context, this.index++, this.byte, this.bit++)
            };
        }
        return { done: true, value: null };
    }
    [Symbol.iterator]() {
        return this;
    }
}
/**
 * Compute the population count (the number of bits set to 1) for a range of bits in a Uint8Array.
 * @param vector The Uint8Array of bits for which to compute the population count.
 * @param lhs The range's left-hand side (or start) bit
 * @param rhs The range's right-hand side (or end) bit
 */
/** @ignore */
function popcnt_bit_range(data, lhs, rhs) {
    if (rhs - lhs <= 0) {
        return 0;
    }
    // If the bit range is less than one byte, sum the 1 bits in the bit range
    if (rhs - lhs < 8) {
        let sum = 0;
        for (const bit of new BitIterator(data, lhs, rhs - lhs, data, getBit)) {
            sum += bit;
        }
        return sum;
    }
    // Get the next lowest multiple of 8 from the right hand side
    const rhsInside = rhs >> 3 << 3;
    // Get the next highest multiple of 8 from the left hand side
    const lhsInside = lhs + (lhs % 8 === 0 ? 0 : 8 - lhs % 8);
    return (
    // Get the popcnt of bits between the left hand side, and the next highest multiple of 8
    popcnt_bit_range(data, lhs, lhsInside) +
        // Get the popcnt of bits between the right hand side, and the next lowest multiple of 8
        popcnt_bit_range(data, rhsInside, rhs) +
        // Get the popcnt of all bits between the left and right hand sides' multiples of 8
        popcnt_array(data, lhsInside >> 3, (rhsInside - lhsInside) >> 3));
}
/** @ignore */
function popcnt_array(arr, byteOffset, byteLength) {
    let cnt = 0, pos = byteOffset | 0;
    const view = new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    const len = byteLength === void 0 ? arr.byteLength : pos + byteLength;
    while (len - pos >= 4) {
        cnt += popcnt_uint32(view.getUint32(pos));
        pos += 4;
    }
    while (len - pos >= 2) {
        cnt += popcnt_uint32(view.getUint16(pos));
        pos += 2;
    }
    while (len - pos >= 1) {
        cnt += popcnt_uint32(view.getUint8(pos));
        pos += 1;
    }
    return cnt;
}
/** @ignore */
function popcnt_uint32(uint32) {
    let i = uint32 | 0;
    i = i - ((i >>> 1) & 0x55555555);
    i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
    return (((i + (i >>> 4)) & 0x0F0F0F0F) * 0x01010101) >>> 24;
}

var util_bit_ = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getBool: getBool$1,
    getBit: getBit,
    setBool: setBool$1,
    truncateBitmap: truncateBitmap,
    packBools: packBools,
    BitIterator: BitIterator,
    popcnt_bit_range: popcnt_bit_range,
    popcnt_array: popcnt_array,
    popcnt_uint32: popcnt_uint32
});

// Licensed to the Apache Software Foundation (ASF) under one
/**
 * An abstract base class for classes that encapsulate metadata about each of
 * the logical types that Arrow can represent.
 */
class DataType {
    /** @nocollapse */ static isNull(x) { return (x === null || x === void 0 ? void 0 : x.typeId) === Type.Null; }
    /** @nocollapse */ static isInt(x) { return (x === null || x === void 0 ? void 0 : x.typeId) === Type.Int; }
    /** @nocollapse */ static isFloat(x) { return (x === null || x === void 0 ? void 0 : x.typeId) === Type.Float; }
    /** @nocollapse */ static isBinary(x) { return (x === null || x === void 0 ? void 0 : x.typeId) === Type.Binary; }
    /** @nocollapse */ static isUtf8(x) { return (x === null || x === void 0 ? void 0 : x.typeId) === Type.Utf8; }
    /** @nocollapse */ static isBool(x) { return (x === null || x === void 0 ? void 0 : x.typeId) === Type.Bool; }
    /** @nocollapse */ static isDecimal(x) { return (x === null || x === void 0 ? void 0 : x.typeId) === Type.Decimal; }
    /** @nocollapse */ static isDate(x) { return (x === null || x === void 0 ? void 0 : x.typeId) === Type.Date; }
    /** @nocollapse */ static isTime(x) { return (x === null || x === void 0 ? void 0 : x.typeId) === Type.Time; }
    /** @nocollapse */ static isTimestamp(x) { return (x === null || x === void 0 ? void 0 : x.typeId) === Type.Timestamp; }
    /** @nocollapse */ static isInterval(x) { return (x === null || x === void 0 ? void 0 : x.typeId) === Type.Interval; }
    /** @nocollapse */ static isList(x) { return (x === null || x === void 0 ? void 0 : x.typeId) === Type.List; }
    /** @nocollapse */ static isStruct(x) { return (x === null || x === void 0 ? void 0 : x.typeId) === Type.Struct; }
    /** @nocollapse */ static isUnion(x) { return (x === null || x === void 0 ? void 0 : x.typeId) === Type.Union; }
    /** @nocollapse */ static isFixedSizeBinary(x) { return (x === null || x === void 0 ? void 0 : x.typeId) === Type.FixedSizeBinary; }
    /** @nocollapse */ static isFixedSizeList(x) { return (x === null || x === void 0 ? void 0 : x.typeId) === Type.FixedSizeList; }
    /** @nocollapse */ static isMap(x) { return (x === null || x === void 0 ? void 0 : x.typeId) === Type.Map; }
    /** @nocollapse */ static isDictionary(x) { return (x === null || x === void 0 ? void 0 : x.typeId) === Type.Dictionary; }
    get typeId() { return Type.NONE; }
}
DataType[Symbol.toStringTag] = ((proto) => {
    proto.children = null;
    proto.ArrayType = Array;
    return proto[Symbol.toStringTag] = 'DataType';
})(DataType.prototype);
/** @ignore */
class Null extends DataType {
    toString() { return `Null`; }
    get typeId() { return Type.Null; }
}
Null[Symbol.toStringTag] = ((proto) => {
    return proto[Symbol.toStringTag] = 'Null';
})(Null.prototype);
/** @ignore */
class Int_ extends DataType {
    constructor(isSigned, bitWidth) {
        super();
        this.isSigned = isSigned;
        this.bitWidth = bitWidth;
    }
    get typeId() { return Type.Int; }
    get ArrayType() {
        switch (this.bitWidth) {
            case 8: return this.isSigned ? Int8Array : Uint8Array;
            case 16: return this.isSigned ? Int16Array : Uint16Array;
            case 32: return this.isSigned ? Int32Array : Uint32Array;
            case 64: return this.isSigned ? Int32Array : Uint32Array;
        }
        throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
    }
    toString() { return `${this.isSigned ? `I` : `Ui`}nt${this.bitWidth}`; }
}
Int_[Symbol.toStringTag] = ((proto) => {
    proto.isSigned = null;
    proto.bitWidth = null;
    return proto[Symbol.toStringTag] = 'Int';
})(Int_.prototype);
/** @ignore */
class Int8 extends Int_ {
    constructor() { super(true, 8); }
}
/** @ignore */
class Int16 extends Int_ {
    constructor() { super(true, 16); }
}
/** @ignore */
class Int32 extends Int_ {
    constructor() { super(true, 32); }
}
/** @ignore */
class Int64$1 extends Int_ {
    constructor() { super(true, 64); }
}
/** @ignore */
class Uint8 extends Int_ {
    constructor() { super(false, 8); }
}
/** @ignore */
class Uint16 extends Int_ {
    constructor() { super(false, 16); }
}
/** @ignore */
class Uint32 extends Int_ {
    constructor() { super(false, 32); }
}
/** @ignore */
class Uint64$1 extends Int_ {
    constructor() { super(false, 64); }
}
Object.defineProperty(Int8.prototype, 'ArrayType', { value: Int8Array });
Object.defineProperty(Int16.prototype, 'ArrayType', { value: Int16Array });
Object.defineProperty(Int32.prototype, 'ArrayType', { value: Int32Array });
Object.defineProperty(Int64$1.prototype, 'ArrayType', { value: Int32Array });
Object.defineProperty(Uint8.prototype, 'ArrayType', { value: Uint8Array });
Object.defineProperty(Uint16.prototype, 'ArrayType', { value: Uint16Array });
Object.defineProperty(Uint32.prototype, 'ArrayType', { value: Uint32Array });
Object.defineProperty(Uint64$1.prototype, 'ArrayType', { value: Uint32Array });
/** @ignore */
class Float extends DataType {
    constructor(precision) {
        super();
        this.precision = precision;
    }
    get typeId() { return Type.Float; }
    get ArrayType() {
        switch (this.precision) {
            case Precision.HALF: return Uint16Array;
            case Precision.SINGLE: return Float32Array;
            case Precision.DOUBLE: return Float64Array;
        }
        // @ts-ignore
        throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
    }
    toString() { return `Float${(this.precision << 5) || 16}`; }
}
Float[Symbol.toStringTag] = ((proto) => {
    proto.precision = null;
    return proto[Symbol.toStringTag] = 'Float';
})(Float.prototype);
/** @ignore */
class Float16 extends Float {
    constructor() { super(Precision.HALF); }
}
/** @ignore */
class Float32 extends Float {
    constructor() { super(Precision.SINGLE); }
}
/** @ignore */
class Float64 extends Float {
    constructor() { super(Precision.DOUBLE); }
}
Object.defineProperty(Float16.prototype, 'ArrayType', { value: Uint16Array });
Object.defineProperty(Float32.prototype, 'ArrayType', { value: Float32Array });
Object.defineProperty(Float64.prototype, 'ArrayType', { value: Float64Array });
/** @ignore */
class Binary extends DataType {
    constructor() {
        super();
    }
    get typeId() { return Type.Binary; }
    toString() { return `Binary`; }
}
Binary[Symbol.toStringTag] = ((proto) => {
    proto.ArrayType = Uint8Array;
    return proto[Symbol.toStringTag] = 'Binary';
})(Binary.prototype);
/** @ignore */
class Utf8 extends DataType {
    constructor() {
        super();
    }
    get typeId() { return Type.Utf8; }
    toString() { return `Utf8`; }
}
Utf8[Symbol.toStringTag] = ((proto) => {
    proto.ArrayType = Uint8Array;
    return proto[Symbol.toStringTag] = 'Utf8';
})(Utf8.prototype);
/** @ignore */
class Bool extends DataType {
    constructor() {
        super();
    }
    get typeId() { return Type.Bool; }
    toString() { return `Bool`; }
}
Bool[Symbol.toStringTag] = ((proto) => {
    proto.ArrayType = Uint8Array;
    return proto[Symbol.toStringTag] = 'Bool';
})(Bool.prototype);
/** @ignore */
class Decimal extends DataType {
    constructor(scale, precision) {
        super();
        this.scale = scale;
        this.precision = precision;
    }
    get typeId() { return Type.Decimal; }
    toString() { return `Decimal[${this.precision}e${this.scale > 0 ? `+` : ``}${this.scale}]`; }
}
Decimal[Symbol.toStringTag] = ((proto) => {
    proto.scale = null;
    proto.precision = null;
    proto.ArrayType = Uint32Array;
    return proto[Symbol.toStringTag] = 'Decimal';
})(Decimal.prototype);
/** @ignore */
class Date_ extends DataType {
    constructor(unit) {
        super();
        this.unit = unit;
    }
    get typeId() { return Type.Date; }
    toString() { return `Date${(this.unit + 1) * 32}<${DateUnit[this.unit]}>`; }
}
Date_[Symbol.toStringTag] = ((proto) => {
    proto.unit = null;
    proto.ArrayType = Int32Array;
    return proto[Symbol.toStringTag] = 'Date';
})(Date_.prototype);
/** @ignore */
class DateDay extends Date_ {
    constructor() { super(DateUnit.DAY); }
}
/** @ignore */
class DateMillisecond extends Date_ {
    constructor() { super(DateUnit.MILLISECOND); }
}
/** @ignore */
class Time_ extends DataType {
    constructor(unit, bitWidth) {
        super();
        this.unit = unit;
        this.bitWidth = bitWidth;
    }
    get typeId() { return Type.Time; }
    toString() { return `Time${this.bitWidth}<${TimeUnit[this.unit]}>`; }
}
Time_[Symbol.toStringTag] = ((proto) => {
    proto.unit = null;
    proto.bitWidth = null;
    proto.ArrayType = Int32Array;
    return proto[Symbol.toStringTag] = 'Time';
})(Time_.prototype);
/** @ignore */
class TimeSecond extends Time_ {
    constructor() { super(TimeUnit.SECOND, 32); }
}
/** @ignore */
class TimeMillisecond extends Time_ {
    constructor() { super(TimeUnit.MILLISECOND, 32); }
}
/** @ignore */
class TimeMicrosecond extends Time_ {
    constructor() { super(TimeUnit.MICROSECOND, 64); }
}
/** @ignore */
class TimeNanosecond extends Time_ {
    constructor() { super(TimeUnit.NANOSECOND, 64); }
}
/** @ignore */
class Timestamp_ extends DataType {
    constructor(unit, timezone) {
        super();
        this.unit = unit;
        this.timezone = timezone;
    }
    get typeId() { return Type.Timestamp; }
    toString() { return `Timestamp<${TimeUnit[this.unit]}${this.timezone ? `, ${this.timezone}` : ``}>`; }
}
Timestamp_[Symbol.toStringTag] = ((proto) => {
    proto.unit = null;
    proto.timezone = null;
    proto.ArrayType = Int32Array;
    return proto[Symbol.toStringTag] = 'Timestamp';
})(Timestamp_.prototype);
/** @ignore */
class TimestampSecond extends Timestamp_ {
    constructor(timezone) { super(TimeUnit.SECOND, timezone); }
}
/** @ignore */
class TimestampMillisecond extends Timestamp_ {
    constructor(timezone) { super(TimeUnit.MILLISECOND, timezone); }
}
/** @ignore */
class TimestampMicrosecond extends Timestamp_ {
    constructor(timezone) { super(TimeUnit.MICROSECOND, timezone); }
}
/** @ignore */
class TimestampNanosecond extends Timestamp_ {
    constructor(timezone) { super(TimeUnit.NANOSECOND, timezone); }
}
/** @ignore */
class Interval_ extends DataType {
    constructor(unit) {
        super();
        this.unit = unit;
    }
    get typeId() { return Type.Interval; }
    toString() { return `Interval<${IntervalUnit[this.unit]}>`; }
}
Interval_[Symbol.toStringTag] = ((proto) => {
    proto.unit = null;
    proto.ArrayType = Int32Array;
    return proto[Symbol.toStringTag] = 'Interval';
})(Interval_.prototype);
/** @ignore */
class IntervalDayTime extends Interval_ {
    constructor() { super(IntervalUnit.DAY_TIME); }
}
/** @ignore */
class IntervalYearMonth extends Interval_ {
    constructor() { super(IntervalUnit.YEAR_MONTH); }
}
/** @ignore */
class List extends DataType {
    constructor(child) {
        super();
        this.children = [child];
    }
    get typeId() { return Type.List; }
    toString() { return `List<${this.valueType}>`; }
    get valueType() { return this.children[0].type; }
    get valueField() { return this.children[0]; }
    get ArrayType() { return this.valueType.ArrayType; }
}
List[Symbol.toStringTag] = ((proto) => {
    proto.children = null;
    return proto[Symbol.toStringTag] = 'List';
})(List.prototype);
/** @ignore */
class Struct extends DataType {
    constructor(children) {
        super();
        this.children = children;
    }
    get typeId() { return Type.Struct; }
    toString() { return `Struct<{${this.children.map((f) => `${f.name}:${f.type}`).join(`, `)}}>`; }
}
Struct[Symbol.toStringTag] = ((proto) => {
    proto.children = null;
    return proto[Symbol.toStringTag] = 'Struct';
})(Struct.prototype);
/** @ignore */
class Union_ extends DataType {
    constructor(mode, typeIds, children) {
        super();
        this.mode = mode;
        this.children = children;
        this.typeIds = typeIds = Int32Array.from(typeIds);
        this.typeIdToChildIndex = typeIds.reduce((typeIdToChildIndex, typeId, idx) => {
            return (typeIdToChildIndex[typeId] = idx) && typeIdToChildIndex || typeIdToChildIndex;
        }, Object.create(null));
    }
    get typeId() { return Type.Union; }
    toString() {
        return `${this[Symbol.toStringTag]}<${this.children.map((x) => `${x.type}`).join(` | `)}>`;
    }
}
Union_[Symbol.toStringTag] = ((proto) => {
    proto.mode = null;
    proto.typeIds = null;
    proto.children = null;
    proto.typeIdToChildIndex = null;
    proto.ArrayType = Int8Array;
    return proto[Symbol.toStringTag] = 'Union';
})(Union_.prototype);
/** @ignore */
class DenseUnion extends Union_ {
    constructor(typeIds, children) {
        super(UnionMode.Dense, typeIds, children);
    }
}
/** @ignore */
class SparseUnion extends Union_ {
    constructor(typeIds, children) {
        super(UnionMode.Sparse, typeIds, children);
    }
}
/** @ignore */
class FixedSizeBinary extends DataType {
    constructor(byteWidth) {
        super();
        this.byteWidth = byteWidth;
    }
    get typeId() { return Type.FixedSizeBinary; }
    toString() { return `FixedSizeBinary[${this.byteWidth}]`; }
}
FixedSizeBinary[Symbol.toStringTag] = ((proto) => {
    proto.byteWidth = null;
    proto.ArrayType = Uint8Array;
    return proto[Symbol.toStringTag] = 'FixedSizeBinary';
})(FixedSizeBinary.prototype);
/** @ignore */
class FixedSizeList extends DataType {
    constructor(listSize, child) {
        super();
        this.listSize = listSize;
        this.children = [child];
    }
    get typeId() { return Type.FixedSizeList; }
    get valueType() { return this.children[0].type; }
    get valueField() { return this.children[0]; }
    get ArrayType() { return this.valueType.ArrayType; }
    toString() { return `FixedSizeList[${this.listSize}]<${this.valueType}>`; }
}
FixedSizeList[Symbol.toStringTag] = ((proto) => {
    proto.children = null;
    proto.listSize = null;
    return proto[Symbol.toStringTag] = 'FixedSizeList';
})(FixedSizeList.prototype);
/** @ignore */
class Map_ extends DataType {
    constructor(child, keysSorted = false) {
        super();
        this.children = [child];
        this.keysSorted = keysSorted;
    }
    get typeId() { return Type.Map; }
    get keyType() { return this.children[0].type.children[0].type; }
    get valueType() { return this.children[0].type.children[1].type; }
    toString() { return `Map<{${this.children[0].type.children.map((f) => `${f.name}:${f.type}`).join(`, `)}}>`; }
}
Map_[Symbol.toStringTag] = ((proto) => {
    proto.children = null;
    proto.keysSorted = null;
    return proto[Symbol.toStringTag] = 'Map_';
})(Map_.prototype);
/** @ignore */
const getId = ((atomicDictionaryId) => () => ++atomicDictionaryId)(-1);
/** @ignore */
class Dictionary extends DataType {
    constructor(dictionary, indices, id, isOrdered) {
        super();
        this.indices = indices;
        this.dictionary = dictionary;
        this.isOrdered = isOrdered || false;
        this.id = id == null ? getId() : typeof id === 'number' ? id : id.low;
    }
    get typeId() { return Type.Dictionary; }
    get children() { return this.dictionary.children; }
    get valueType() { return this.dictionary; }
    get ArrayType() { return this.dictionary.ArrayType; }
    toString() { return `Dictionary<${this.indices}, ${this.dictionary}>`; }
}
Dictionary[Symbol.toStringTag] = ((proto) => {
    proto.id = null;
    proto.indices = null;
    proto.isOrdered = null;
    proto.dictionary = null;
    return proto[Symbol.toStringTag] = 'Dictionary';
})(Dictionary.prototype);
/** @ignore */
function strideForType(type) {
    const t = type;
    switch (type.typeId) {
        case Type.Decimal: return 4;
        case Type.Timestamp: return 2;
        case Type.Date: return 1 + t.unit;
        case Type.Interval: return 1 + t.unit;
        case Type.Int: return 1 + +(t.bitWidth > 32);
        case Type.Time: return 1 + +(t.bitWidth > 32);
        case Type.FixedSizeList: return t.listSize;
        case Type.FixedSizeBinary: return t.byteWidth;
        default: return 1;
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */ const kUnknownNullCount = -1;
/** @ignore */
class Data {
    constructor(type, offset, length, nullCount, buffers, childData, dictionary) {
        this.type = type;
        this.dictionary = dictionary;
        this.offset = Math.floor(Math.max(offset || 0, 0));
        this.length = Math.floor(Math.max(length || 0, 0));
        this._nullCount = Math.floor(Math.max(nullCount || 0, -1));
        this.childData = (childData || []).map((x) => x instanceof Data ? x : x.data);
        let buffer;
        if (buffers instanceof Data) {
            this.stride = buffers.stride;
            this.values = buffers.values;
            this.typeIds = buffers.typeIds;
            this.nullBitmap = buffers.nullBitmap;
            this.valueOffsets = buffers.valueOffsets;
        }
        else {
            this.stride = strideForType(type);
            if (buffers) {
                (buffer = buffers[0]) && (this.valueOffsets = buffer);
                (buffer = buffers[1]) && (this.values = buffer);
                (buffer = buffers[2]) && (this.nullBitmap = buffer);
                (buffer = buffers[3]) && (this.typeIds = buffer);
            }
        }
    }
    get typeId() { return this.type.typeId; }
    get ArrayType() { return this.type.ArrayType; }
    get buffers() {
        return [this.valueOffsets, this.values, this.nullBitmap, this.typeIds];
    }
    get byteLength() {
        let byteLength = 0;
        const { valueOffsets, values, nullBitmap, typeIds } = this;
        valueOffsets && (byteLength += valueOffsets.byteLength);
        values && (byteLength += values.byteLength);
        nullBitmap && (byteLength += nullBitmap.byteLength);
        typeIds && (byteLength += typeIds.byteLength);
        return this.childData.reduce((byteLength, child) => byteLength + child.byteLength, byteLength);
    }
    get nullCount() {
        let nullCount = this._nullCount;
        let nullBitmap;
        if (nullCount <= kUnknownNullCount && (nullBitmap = this.nullBitmap)) {
            this._nullCount = nullCount = this.length - popcnt_bit_range(nullBitmap, this.offset, this.offset + this.length);
        }
        return nullCount;
    }
    clone(type, offset = this.offset, length = this.length, nullCount = this._nullCount, buffers = this, childData = this.childData) {
        return new Data(type, offset, length, nullCount, buffers, childData, this.dictionary);
    }
    slice(offset, length) {
        const { stride, typeId, childData } = this;
        // +true === 1, +false === 0, so this means
        // we keep nullCount at 0 if it's already 0,
        // otherwise set to the invalidated flag -1
        const nullCount = +(this._nullCount === 0) - 1;
        const childStride = typeId === 16 /* FixedSizeList */ ? stride : 1;
        const buffers = this._sliceBuffers(offset, length, stride, typeId);
        return this.clone(this.type, this.offset + offset, length, nullCount, buffers, 
        // Don't slice children if we have value offsets (the variable-width types)
        (!childData.length || this.valueOffsets) ? childData : this._sliceChildren(childData, childStride * offset, childStride * length));
    }
    _changeLengthAndBackfillNullBitmap(newLength) {
        if (this.typeId === Type.Null) {
            return this.clone(this.type, 0, newLength, 0);
        }
        const { length, nullCount } = this;
        // start initialized with 0s (nulls), then fill from 0 to length with 1s (not null)
        const bitmap = new Uint8Array(((newLength + 63) & ~63) >> 3).fill(255, 0, length >> 3);
        // set all the bits in the last byte (up to bit `length - length % 8`) to 1 (not null)
        bitmap[length >> 3] = (1 << (length - (length & ~7))) - 1;
        // if we have a nullBitmap, truncate + slice and set it over the pre-filled 1s
        if (nullCount > 0) {
            bitmap.set(truncateBitmap(this.offset, length, this.nullBitmap), 0);
        }
        const buffers = this.buffers;
        buffers[BufferType.VALIDITY] = bitmap;
        return this.clone(this.type, 0, newLength, nullCount + (newLength - length), buffers);
    }
    _sliceBuffers(offset, length, stride, typeId) {
        let arr;
        const { buffers } = this;
        // If typeIds exist, slice the typeIds buffer
        (arr = buffers[BufferType.TYPE]) && (buffers[BufferType.TYPE] = arr.subarray(offset, offset + length));
        // If offsets exist, only slice the offsets buffer
        (arr = buffers[BufferType.OFFSET]) && (buffers[BufferType.OFFSET] = arr.subarray(offset, offset + length + 1)) ||
            // Otherwise if no offsets, slice the data buffer. Don't slice the data vector for Booleans, since the offset goes by bits not bytes
            (arr = buffers[BufferType.DATA]) && (buffers[BufferType.DATA] = typeId === 6 ? arr : arr.subarray(stride * offset, stride * (offset + length)));
        return buffers;
    }
    _sliceChildren(childData, offset, length) {
        return childData.map((child) => child.slice(offset, length));
    }
    //
    // Convenience methods for creating Data instances for each of the Arrow Vector types
    //
    /** @nocollapse */
    static new(type, offset, length, nullCount, buffers, childData, dictionary) {
        if (buffers instanceof Data) {
            buffers = buffers.buffers;
        }
        else if (!buffers) {
            buffers = [];
        }
        switch (type.typeId) {
            case Type.Null: return Data.Null(type, offset, length);
            case Type.Int: return Data.Int(type, offset, length, nullCount || 0, buffers[BufferType.VALIDITY], buffers[BufferType.DATA] || []);
            case Type.Dictionary: return Data.Dictionary(type, offset, length, nullCount || 0, buffers[BufferType.VALIDITY], buffers[BufferType.DATA] || [], dictionary);
            case Type.Float: return Data.Float(type, offset, length, nullCount || 0, buffers[BufferType.VALIDITY], buffers[BufferType.DATA] || []);
            case Type.Bool: return Data.Bool(type, offset, length, nullCount || 0, buffers[BufferType.VALIDITY], buffers[BufferType.DATA] || []);
            case Type.Decimal: return Data.Decimal(type, offset, length, nullCount || 0, buffers[BufferType.VALIDITY], buffers[BufferType.DATA] || []);
            case Type.Date: return Data.Date(type, offset, length, nullCount || 0, buffers[BufferType.VALIDITY], buffers[BufferType.DATA] || []);
            case Type.Time: return Data.Time(type, offset, length, nullCount || 0, buffers[BufferType.VALIDITY], buffers[BufferType.DATA] || []);
            case Type.Timestamp: return Data.Timestamp(type, offset, length, nullCount || 0, buffers[BufferType.VALIDITY], buffers[BufferType.DATA] || []);
            case Type.Interval: return Data.Interval(type, offset, length, nullCount || 0, buffers[BufferType.VALIDITY], buffers[BufferType.DATA] || []);
            case Type.FixedSizeBinary: return Data.FixedSizeBinary(type, offset, length, nullCount || 0, buffers[BufferType.VALIDITY], buffers[BufferType.DATA] || []);
            case Type.Binary: return Data.Binary(type, offset, length, nullCount || 0, buffers[BufferType.VALIDITY], buffers[BufferType.OFFSET] || [], buffers[BufferType.DATA] || []);
            case Type.Utf8: return Data.Utf8(type, offset, length, nullCount || 0, buffers[BufferType.VALIDITY], buffers[BufferType.OFFSET] || [], buffers[BufferType.DATA] || []);
            case Type.List: return Data.List(type, offset, length, nullCount || 0, buffers[BufferType.VALIDITY], buffers[BufferType.OFFSET] || [], (childData || [])[0]);
            case Type.FixedSizeList: return Data.FixedSizeList(type, offset, length, nullCount || 0, buffers[BufferType.VALIDITY], (childData || [])[0]);
            case Type.Struct: return Data.Struct(type, offset, length, nullCount || 0, buffers[BufferType.VALIDITY], childData || []);
            case Type.Map: return Data.Map(type, offset, length, nullCount || 0, buffers[BufferType.VALIDITY], buffers[BufferType.OFFSET] || [], (childData || [])[0]);
            case Type.Union: return Data.Union(type, offset, length, nullCount || 0, buffers[BufferType.VALIDITY], buffers[BufferType.TYPE] || [], buffers[BufferType.OFFSET] || childData, childData);
        }
        throw new Error(`Unrecognized typeId ${type.typeId}`);
    }
    /** @nocollapse */
    static Null(type, offset, length) {
        return new Data(type, offset, length, 0);
    }
    /** @nocollapse */
    static Int(type, offset, length, nullCount, nullBitmap, data) {
        return new Data(type, offset, length, nullCount, [undefined, toArrayBufferView(type.ArrayType, data), toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static Dictionary(type, offset, length, nullCount, nullBitmap, data, dictionary) {
        return new Data(type, offset, length, nullCount, [undefined, toArrayBufferView(type.indices.ArrayType, data), toUint8Array(nullBitmap)], [], dictionary);
    }
    /** @nocollapse */
    static Float(type, offset, length, nullCount, nullBitmap, data) {
        return new Data(type, offset, length, nullCount, [undefined, toArrayBufferView(type.ArrayType, data), toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static Bool(type, offset, length, nullCount, nullBitmap, data) {
        return new Data(type, offset, length, nullCount, [undefined, toArrayBufferView(type.ArrayType, data), toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static Decimal(type, offset, length, nullCount, nullBitmap, data) {
        return new Data(type, offset, length, nullCount, [undefined, toArrayBufferView(type.ArrayType, data), toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static Date(type, offset, length, nullCount, nullBitmap, data) {
        return new Data(type, offset, length, nullCount, [undefined, toArrayBufferView(type.ArrayType, data), toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static Time(type, offset, length, nullCount, nullBitmap, data) {
        return new Data(type, offset, length, nullCount, [undefined, toArrayBufferView(type.ArrayType, data), toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static Timestamp(type, offset, length, nullCount, nullBitmap, data) {
        return new Data(type, offset, length, nullCount, [undefined, toArrayBufferView(type.ArrayType, data), toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static Interval(type, offset, length, nullCount, nullBitmap, data) {
        return new Data(type, offset, length, nullCount, [undefined, toArrayBufferView(type.ArrayType, data), toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static FixedSizeBinary(type, offset, length, nullCount, nullBitmap, data) {
        return new Data(type, offset, length, nullCount, [undefined, toArrayBufferView(type.ArrayType, data), toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static Binary(type, offset, length, nullCount, nullBitmap, valueOffsets, data) {
        return new Data(type, offset, length, nullCount, [toInt32Array(valueOffsets), toUint8Array(data), toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static Utf8(type, offset, length, nullCount, nullBitmap, valueOffsets, data) {
        return new Data(type, offset, length, nullCount, [toInt32Array(valueOffsets), toUint8Array(data), toUint8Array(nullBitmap)]);
    }
    /** @nocollapse */
    static List(type, offset, length, nullCount, nullBitmap, valueOffsets, child) {
        return new Data(type, offset, length, nullCount, [toInt32Array(valueOffsets), undefined, toUint8Array(nullBitmap)], child ? [child] : []);
    }
    /** @nocollapse */
    static FixedSizeList(type, offset, length, nullCount, nullBitmap, child) {
        return new Data(type, offset, length, nullCount, [undefined, undefined, toUint8Array(nullBitmap)], child ? [child] : []);
    }
    /** @nocollapse */
    static Struct(type, offset, length, nullCount, nullBitmap, children) {
        return new Data(type, offset, length, nullCount, [undefined, undefined, toUint8Array(nullBitmap)], children);
    }
    /** @nocollapse */
    static Map(type, offset, length, nullCount, nullBitmap, valueOffsets, child) {
        return new Data(type, offset, length, nullCount, [toInt32Array(valueOffsets), undefined, toUint8Array(nullBitmap)], child ? [child] : []);
    }
    /** @nocollapse */
    static Union(type, offset, length, nullCount, nullBitmap, typeIds, valueOffsetsOrChildren, children) {
        const buffers = [
            undefined, undefined,
            toUint8Array(nullBitmap),
            toArrayBufferView(type.ArrayType, typeIds)
        ];
        if (type.mode === UnionMode.Sparse) {
            return new Data(type, offset, length, nullCount, buffers, valueOffsetsOrChildren);
        }
        buffers[BufferType.OFFSET] = toInt32Array(valueOffsetsOrChildren);
        return new Data(type, offset, length, nullCount, buffers, children);
    }
}
Data.prototype.childData = Object.freeze([]);

// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
/** @ignore */ const undf = void (0);
/** @ignore */
function valueToString(x) {
    if (x === null) {
        return 'null';
    }
    if (x === undf) {
        return 'undefined';
    }
    switch (typeof x) {
        case 'number': return `${x}`;
        case 'bigint': return `${x}`;
        case 'string': return `"${x}"`;
    }
    // If [Symbol.toPrimitive] is implemented (like in BN)
    // use it instead of JSON.stringify(). This ensures we
    // print BigInts, Decimals, and Binary in their native
    // representation
    if (typeof x[Symbol.toPrimitive] === 'function') {
        return x[Symbol.toPrimitive]('string');
    }
    return ArrayBuffer.isView(x) ? `[${x}]` : JSON.stringify(x);
}

// Licensed to the Apache Software Foundation (ASF) under one
/**
 * Dynamically compile the null values into an `isValid()` function whose
 * implementation is a switch statement. Microbenchmarks in v8 indicate
 * this approach is 25% faster than using an ES6 Map.
 *
 * @example
 * console.log(createIsValidFunction([null, 'N/A', NaN]));
 * `function (x) {
 *     if (x !== x) return false;
 *     switch (x) {
 *         case null:
 *         case "N/A":
 *             return false;
 *     }
 *     return true;
 * }`
 *
 * @ignore
 * @param nullValues
 */
function createIsValidFunction(nullValues) {
    if (!nullValues || nullValues.length <= 0) {
        // @ts-ignore
        return function isValid(value) { return true; };
    }
    let fnBody = '';
    const noNaNs = nullValues.filter((x) => x === x);
    if (noNaNs.length > 0) {
        fnBody = `
    switch (x) {${noNaNs.map((x) => `
        case ${valueToCase(x)}:`).join('')}
            return false;
    }`;
    }
    // NaN doesn't equal anything including itself, so it doesn't work as a
    // switch case. Instead we must explicitly check for NaN before the switch.
    if (nullValues.length !== noNaNs.length) {
        fnBody = `if (x !== x) return false;\n${fnBody}`;
    }
    return new Function(`x`, `${fnBody}\nreturn true;`);
}
/** @ignore */
function valueToCase(x) {
    if (typeof x !== 'bigint') {
        return valueToString(x);
    }
    else if (BigIntAvailable) {
        return `${valueToString(x)}n`;
    }
    return `"${valueToString(x)}"`;
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
const roundLengthUpToNearest64Bytes = (len, BPE) => ((((len * BPE) + 63) & ~63) || 64) / BPE;
/** @ignore */
const sliceOrExtendArray = (arr, len = 0) => (arr.length >= len ? arr.subarray(0, len) : memcpy(new arr.constructor(len), arr, 0));
/** @ignore */
class BufferBuilder {
    constructor(buffer, stride = 1) {
        this.buffer = buffer;
        this.stride = stride;
        this.BYTES_PER_ELEMENT = buffer.BYTES_PER_ELEMENT;
        this.ArrayType = buffer.constructor;
        this._resize(this.length = buffer.length / stride | 0);
    }
    get byteLength() { return this.length * this.stride * this.BYTES_PER_ELEMENT | 0; }
    get reservedLength() { return this.buffer.length / this.stride; }
    get reservedByteLength() { return this.buffer.byteLength; }
    // @ts-ignore
    set(index, value) { return this; }
    append(value) { return this.set(this.length, value); }
    reserve(extra) {
        if (extra > 0) {
            this.length += extra;
            const stride = this.stride;
            const length = this.length * stride;
            const reserved = this.buffer.length;
            if (length >= reserved) {
                this._resize(reserved === 0
                    ? roundLengthUpToNearest64Bytes(length * 1, this.BYTES_PER_ELEMENT)
                    : roundLengthUpToNearest64Bytes(length * 2, this.BYTES_PER_ELEMENT));
            }
        }
        return this;
    }
    flush(length = this.length) {
        length = roundLengthUpToNearest64Bytes(length * this.stride, this.BYTES_PER_ELEMENT);
        const array = sliceOrExtendArray(this.buffer, length);
        this.clear();
        return array;
    }
    clear() {
        this.length = 0;
        this._resize(0);
        return this;
    }
    _resize(newLength) {
        return this.buffer = memcpy(new this.ArrayType(newLength), this.buffer);
    }
}
BufferBuilder.prototype.offset = 0;
/** @ignore */
class DataBufferBuilder extends BufferBuilder {
    last() { return this.get(this.length - 1); }
    get(index) { return this.buffer[index]; }
    set(index, value) {
        this.reserve(index - this.length + 1);
        this.buffer[index * this.stride] = value;
        return this;
    }
}
/** @ignore */
class BitmapBufferBuilder extends DataBufferBuilder {
    constructor(data = new Uint8Array(0)) {
        super(data, 1 / 8);
        this.numValid = 0;
    }
    get numInvalid() { return this.length - this.numValid; }
    get(idx) { return this.buffer[idx >> 3] >> idx % 8 & 1; }
    set(idx, val) {
        const { buffer } = this.reserve(idx - this.length + 1);
        const byte = idx >> 3, bit = idx % 8, cur = buffer[byte] >> bit & 1;
        // If `val` is truthy and the current bit is 0, flip it to 1 and increment `numValid`.
        // If `val` is falsey and the current bit is 1, flip it to 0 and decrement `numValid`.
        val ? cur === 0 && ((buffer[byte] |= (1 << bit)), ++this.numValid)
            : cur === 1 && ((buffer[byte] &= ~(1 << bit)), --this.numValid);
        return this;
    }
    clear() {
        this.numValid = 0;
        return super.clear();
    }
}
/** @ignore */
class OffsetsBufferBuilder extends DataBufferBuilder {
    constructor(data = new Int32Array(1)) { super(data, 1); }
    append(value) {
        return this.set(this.length - 1, value);
    }
    set(index, value) {
        const offset = this.length - 1;
        const buffer = this.reserve(index - offset + 1).buffer;
        if (offset < index++) {
            buffer.fill(buffer[offset], offset, index);
        }
        buffer[index] = buffer[index - 1] + value;
        return this;
    }
    flush(length = this.length - 1) {
        if (length > this.length) {
            this.set(length - 1, 0);
        }
        return super.flush(length + 1);
    }
}
/** @ignore */
class WideBufferBuilder extends BufferBuilder {
    get ArrayType64() {
        return this._ArrayType64 || (this._ArrayType64 = (this.buffer instanceof Int32Array ? BigInt64ArrayCtor : BigUint64ArrayCtor));
    }
    set(index, value) {
        this.reserve(index - this.length + 1);
        switch (typeof value) {
            case 'bigint':
                this.buffer64[index] = value;
                break;
            case 'number':
                this.buffer[index * this.stride] = value;
                break;
            default: this.buffer.set(value, index * this.stride);
        }
        return this;
    }
    _resize(newLength) {
        const data = super._resize(newLength);
        const length = data.byteLength / (this.BYTES_PER_ELEMENT * this.stride);
        if (BigIntAvailable) {
            this.buffer64 = new this.ArrayType64(data.buffer, data.byteOffset, length);
        }
        return data;
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/**
 * An abstract base class for types that construct Arrow Vectors from arbitrary JavaScript values.
 *
 * A `Builder` is responsible for writing arbitrary JavaScript values
 * to ArrayBuffers and/or child Builders according to the Arrow specification
 * for each DataType, creating or resizing the underlying ArrayBuffers as necessary.
 *
 * The `Builder` for each Arrow `DataType` handles converting and appending
 * values for a given `DataType`. The high-level {@link Builder.new `Builder.new()`} convenience
 * method creates the specific `Builder` subclass for the supplied `DataType`.
 *
 * Once created, `Builder` instances support both appending values to the end
 * of the `Builder`, and random-access writes to specific indices
 * (`Builder.prototype.append(value)` is a convenience method for
 * `builder.set(builder.length, value)`). Appending or setting values beyond the
 * Builder's current length may cause the builder to grow its underlying buffers
 * or child Builders (if applicable) to accommodate the new values.
 *
 * After enough values have been written to a `Builder`, `Builder.prototype.flush()`
 * will commit the values to the underlying ArrayBuffers (or child Builders). The
 * internal Builder state will be reset, and an instance of `Data<T>` is returned.
 * Alternatively, `Builder.prototype.toVector()` will flush the `Builder` and return
 * an instance of `Vector<T>` instead.
 *
 * When there are no more values to write, use `Builder.prototype.finish()` to
 * finalize the `Builder`. This does not reset the internal state, so it is
 * necessary to call `Builder.prototype.flush()` or `toVector()` one last time
 * if there are still values queued to be flushed.
 *
 * Note: calling `Builder.prototype.finish()` is required when using a `DictionaryBuilder`,
 * because this is when it flushes the values that have been enqueued in its internal
 * dictionary's `Builder`, and creates the `dictionaryVector` for the `Dictionary` `DataType`.
 *
 * ```ts
 * import { Builder, Utf8 } from 'apache-arrow';
 *
 * const utf8Builder = Builder.new({
 *     type: new Utf8(),
 *     nullValues: [null, 'n/a']
 * });
 *
 * utf8Builder
 *     .append('hello')
 *     .append('n/a')
 *     .append('world')
 *     .append(null);
 *
 * const utf8Vector = utf8Builder.finish().toVector();
 *
 * console.log(utf8Vector.toJSON());
 * // > ["hello", null, "world", null]
 * ```
 *
 * @typeparam T The `DataType` of this `Builder`.
 * @typeparam TNull The type(s) of values which will be considered null-value sentinels.
 */
class Builder$2 {
    /**
     * Construct a builder with the given Arrow DataType with optional null values,
     * which will be interpreted as "null" when set or appended to the `Builder`.
     * @param {{ type: T, nullValues?: any[] }} options A `BuilderOptions` object used to create this `Builder`.
     */
    constructor({ 'type': type, 'nullValues': nulls }) {
        /**
         * The number of values written to the `Builder` that haven't been flushed yet.
         * @readonly
         */
        this.length = 0;
        /**
         * A boolean indicating whether `Builder.prototype.finish()` has been called on this `Builder`.
         * @readonly
         */
        this.finished = false;
        this.type = type;
        this.children = [];
        this.nullValues = nulls;
        this.stride = strideForType(type);
        this._nulls = new BitmapBufferBuilder();
        if (nulls && nulls.length > 0) {
            this._isValid = createIsValidFunction(nulls);
        }
    }
    /**
     * Create a `Builder` instance based on the `type` property of the supplied `options` object.
     * @param {BuilderOptions<T, TNull>} options An object with a required `DataType` instance
     * and other optional parameters to be passed to the `Builder` subclass for the given `type`.
     *
     * @typeparam T The `DataType` of the `Builder` to create.
     * @typeparam TNull The type(s) of values which will be considered null-value sentinels.
     * @nocollapse
     */
    // @ts-ignore
    static new(options) { }
    /** @nocollapse */
    // @ts-ignore
    static throughNode(options) {
        throw new Error(`"throughNode" not available in this environment`);
    }
    /** @nocollapse */
    // @ts-ignore
    static throughDOM(options) {
        throw new Error(`"throughDOM" not available in this environment`);
    }
    /**
     * Transform a synchronous `Iterable` of arbitrary JavaScript values into a
     * sequence of Arrow Vector<T> following the chunking semantics defined in
     * the supplied `options` argument.
     *
     * This function returns a function that accepts an `Iterable` of values to
     * transform. When called, this function returns an Iterator of `Vector<T>`.
     *
     * The resulting `Iterator<Vector<T>>` yields Vectors based on the
     * `queueingStrategy` and `highWaterMark` specified in the `options` argument.
     *
     * * If `queueingStrategy` is `"count"` (or omitted), The `Iterator<Vector<T>>`
     *   will flush the underlying `Builder` (and yield a new `Vector<T>`) once the
     *   Builder's `length` reaches or exceeds the supplied `highWaterMark`.
     * * If `queueingStrategy` is `"bytes"`, the `Iterator<Vector<T>>` will flush
     *   the underlying `Builder` (and yield a new `Vector<T>`) once its `byteLength`
     *   reaches or exceeds the supplied `highWaterMark`.
     *
     * @param {IterableBuilderOptions<T, TNull>} options An object of properties which determine the `Builder` to create and the chunking semantics to use.
     * @returns A function which accepts a JavaScript `Iterable` of values to
     *          write, and returns an `Iterator` that yields Vectors according
     *          to the chunking semantics defined in the `options` argument.
     * @nocollapse
     */
    static throughIterable(options) {
        return throughIterable(options);
    }
    /**
     * Transform an `AsyncIterable` of arbitrary JavaScript values into a
     * sequence of Arrow Vector<T> following the chunking semantics defined in
     * the supplied `options` argument.
     *
     * This function returns a function that accepts an `AsyncIterable` of values to
     * transform. When called, this function returns an AsyncIterator of `Vector<T>`.
     *
     * The resulting `AsyncIterator<Vector<T>>` yields Vectors based on the
     * `queueingStrategy` and `highWaterMark` specified in the `options` argument.
     *
     * * If `queueingStrategy` is `"count"` (or omitted), The `AsyncIterator<Vector<T>>`
     *   will flush the underlying `Builder` (and yield a new `Vector<T>`) once the
     *   Builder's `length` reaches or exceeds the supplied `highWaterMark`.
     * * If `queueingStrategy` is `"bytes"`, the `AsyncIterator<Vector<T>>` will flush
     *   the underlying `Builder` (and yield a new `Vector<T>`) once its `byteLength`
     *   reaches or exceeds the supplied `highWaterMark`.
     *
     * @param {IterableBuilderOptions<T, TNull>} options An object of properties which determine the `Builder` to create and the chunking semantics to use.
     * @returns A function which accepts a JavaScript `AsyncIterable` of values
     *          to write, and returns an `AsyncIterator` that yields Vectors
     *          according to the chunking semantics defined in the `options`
     *          argument.
     * @nocollapse
     */
    static throughAsyncIterable(options) {
        return throughAsyncIterable(options);
    }
    /**
     * Flush the `Builder` and return a `Vector<T>`.
     * @returns {Vector<T>} A `Vector<T>` of the flushed values.
     */
    toVector() { return AbstractVector.new(this.flush()); }
    get ArrayType() { return this.type.ArrayType; }
    get nullCount() { return this._nulls.numInvalid; }
    get numChildren() { return this.children.length; }
    /**
     * @returns The aggregate length (in bytes) of the values that have been written.
     */
    get byteLength() {
        let size = 0;
        this._offsets && (size += this._offsets.byteLength);
        this._values && (size += this._values.byteLength);
        this._nulls && (size += this._nulls.byteLength);
        this._typeIds && (size += this._typeIds.byteLength);
        return this.children.reduce((size, child) => size + child.byteLength, size);
    }
    /**
     * @returns The aggregate number of rows that have been reserved to write new values.
     */
    get reservedLength() {
        return this._nulls.reservedLength;
    }
    /**
     * @returns The aggregate length (in bytes) that has been reserved to write new values.
     */
    get reservedByteLength() {
        let size = 0;
        this._offsets && (size += this._offsets.reservedByteLength);
        this._values && (size += this._values.reservedByteLength);
        this._nulls && (size += this._nulls.reservedByteLength);
        this._typeIds && (size += this._typeIds.reservedByteLength);
        return this.children.reduce((size, child) => size + child.reservedByteLength, size);
    }
    get valueOffsets() { return this._offsets ? this._offsets.buffer : null; }
    get values() { return this._values ? this._values.buffer : null; }
    get nullBitmap() { return this._nulls ? this._nulls.buffer : null; }
    get typeIds() { return this._typeIds ? this._typeIds.buffer : null; }
    /**
     * Appends a value (or null) to this `Builder`.
     * This is equivalent to `builder.set(builder.length, value)`.
     * @param {T['TValue'] | TNull } value The value to append.
     */
    append(value) { return this.set(this.length, value); }
    /**
     * Validates whether a value is valid (true), or null (false)
     * @param {T['TValue'] | TNull } value The value to compare against null the value representations
     */
    isValid(value) { return this._isValid(value); }
    /**
     * Write a value (or null-value sentinel) at the supplied index.
     * If the value matches one of the null-value representations, a 1-bit is
     * written to the null `BitmapBufferBuilder`. Otherwise, a 0 is written to
     * the null `BitmapBufferBuilder`, and the value is passed to
     * `Builder.prototype.setValue()`.
     * @param {number} index The index of the value to write.
     * @param {T['TValue'] | TNull } value The value to write at the supplied index.
     * @returns {this} The updated `Builder` instance.
     */
    set(index, value) {
        if (this.setValid(index, this.isValid(value))) {
            this.setValue(index, value);
        }
        return this;
    }
    /**
     * Write a value to the underlying buffers at the supplied index, bypassing
     * the null-value check. This is a low-level method that
     * @param {number} index
     * @param {T['TValue'] | TNull } value
     */
    setValue(index, value) { this._setValue(this, index, value); }
    setValid(index, valid) {
        this.length = this._nulls.set(index, +valid).length;
        return valid;
    }
    // @ts-ignore
    addChild(child, name = `${this.numChildren}`) {
        throw new Error(`Cannot append children to non-nested type "${this.type}"`);
    }
    /**
     * Retrieve the child `Builder` at the supplied `index`, or null if no child
     * exists at that index.
     * @param {number} index The index of the child `Builder` to retrieve.
     * @returns {Builder | null} The child Builder at the supplied index or null.
     */
    getChildAt(index) {
        return this.children[index] || null;
    }
    /**
     * Commit all the values that have been written to their underlying
     * ArrayBuffers, including any child Builders if applicable, and reset
     * the internal `Builder` state.
     * @returns A `Data<T>` of the buffers and childData representing the values written.
     */
    flush() {
        const buffers = [];
        const values = this._values;
        const offsets = this._offsets;
        const typeIds = this._typeIds;
        const { length, nullCount } = this;
        if (typeIds) { /* Unions */
            buffers[BufferType.TYPE] = typeIds.flush(length);
            // DenseUnions
            offsets && (buffers[BufferType.OFFSET] = offsets.flush(length));
        }
        else if (offsets) { /* Variable-width primitives (Binary, Utf8) and Lists */
            // Binary, Utf8
            values && (buffers[BufferType.DATA] = values.flush(offsets.last()));
            buffers[BufferType.OFFSET] = offsets.flush(length);
        }
        else if (values) { /* Fixed-width primitives (Int, Float, Decimal, Time, Timestamp, and Interval) */
            buffers[BufferType.DATA] = values.flush(length);
        }
        nullCount > 0 && (buffers[BufferType.VALIDITY] = this._nulls.flush(length));
        const data = Data.new(this.type, 0, length, nullCount, buffers, this.children.map((child) => child.flush()));
        this.clear();
        return data;
    }
    /**
     * Finalize this `Builder`, and child builders if applicable.
     * @returns {this} The finalized `Builder` instance.
     */
    finish() {
        this.finished = true;
        this.children.forEach((child) => child.finish());
        return this;
    }
    /**
     * Clear this Builder's internal state, including child Builders if applicable, and reset the length to 0.
     * @returns {this} The cleared `Builder` instance.
     */
    clear() {
        this.length = 0;
        this._offsets && (this._offsets.clear());
        this._values && (this._values.clear());
        this._nulls && (this._nulls.clear());
        this._typeIds && (this._typeIds.clear());
        this.children.forEach((child) => child.clear());
        return this;
    }
}
Builder$2.prototype.length = 1;
Builder$2.prototype.stride = 1;
Builder$2.prototype.children = null;
Builder$2.prototype.finished = false;
Builder$2.prototype.nullValues = null;
Builder$2.prototype._isValid = () => true;
/** @ignore */
class FixedWidthBuilder extends Builder$2 {
    constructor(opts) {
        super(opts);
        this._values = new DataBufferBuilder(new this.ArrayType(0), this.stride);
    }
    setValue(index, value) {
        const values = this._values;
        values.reserve(index - values.length + 1);
        return super.setValue(index, value);
    }
}
/** @ignore */
class VariableWidthBuilder extends Builder$2 {
    constructor(opts) {
        super(opts);
        this._pendingLength = 0;
        this._offsets = new OffsetsBufferBuilder();
    }
    setValue(index, value) {
        const pending = this._pending || (this._pending = new Map());
        const current = pending.get(index);
        current && (this._pendingLength -= current.length);
        this._pendingLength += value.length;
        pending.set(index, value);
    }
    setValid(index, isValid) {
        if (!super.setValid(index, isValid)) {
            (this._pending || (this._pending = new Map())).set(index, undefined);
            return false;
        }
        return true;
    }
    clear() {
        this._pendingLength = 0;
        this._pending = undefined;
        return super.clear();
    }
    flush() {
        this._flush();
        return super.flush();
    }
    finish() {
        this._flush();
        return super.finish();
    }
    _flush() {
        const pending = this._pending;
        const pendingLength = this._pendingLength;
        this._pendingLength = 0;
        this._pending = undefined;
        if (pending && pending.size > 0) {
            this._flushPending(pending, pendingLength);
        }
        return this;
    }
}
/** @ignore */
function throughIterable(options) {
    const { ['queueingStrategy']: queueingStrategy = 'count' } = options;
    const { ['highWaterMark']: highWaterMark = queueingStrategy !== 'bytes' ? 1000 : Math.pow(2, 14) } = options;
    const sizeProperty = queueingStrategy !== 'bytes' ? 'length' : 'byteLength';
    return function* (source) {
        let numChunks = 0;
        const builder = Builder$2.new(options);
        for (const value of source) {
            if (builder.append(value)[sizeProperty] >= highWaterMark) {
                ++numChunks && (yield builder.toVector());
            }
        }
        if (builder.finish().length > 0 || numChunks === 0) {
            yield builder.toVector();
        }
    };
}
/** @ignore */
function throughAsyncIterable(options) {
    const { ['queueingStrategy']: queueingStrategy = 'count' } = options;
    const { ['highWaterMark']: highWaterMark = queueingStrategy !== 'bytes' ? 1000 : Math.pow(2, 14) } = options;
    const sizeProperty = queueingStrategy !== 'bytes' ? 'length' : 'byteLength';
    return function (source) {
        return __asyncGenerator(this, arguments, function* () {
            var e_1, _a;
            let numChunks = 0;
            const builder = Builder$2.new(options);
            try {
                for (var source_1 = __asyncValues(source), source_1_1; source_1_1 = yield __await(source_1.next()), !source_1_1.done;) {
                    const value = source_1_1.value;
                    if (builder.append(value)[sizeProperty] >= highWaterMark) {
                        ++numChunks && (yield yield __await(builder.toVector()));
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (source_1_1 && !source_1_1.done && (_a = source_1.return)) yield __await(_a.call(source_1));
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (builder.finish().length > 0 || numChunks === 0) {
                yield yield __await(builder.toVector());
            }
        });
    };
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class BoolBuilder extends Builder$2 {
    constructor(options) {
        super(options);
        this._values = new BitmapBufferBuilder();
    }
    setValue(index, value) {
        this._values.set(index, +value);
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class NullBuilder extends Builder$2 {
    // @ts-ignore
    setValue(index, value) { }
    setValid(index, valid) {
        this.length = Math.max(index + 1, this.length);
        return valid;
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class DateBuilder extends FixedWidthBuilder {
}
/** @ignore */
class DateDayBuilder extends DateBuilder {
}
/** @ignore */
class DateMillisecondBuilder extends DateBuilder {
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class DecimalBuilder extends FixedWidthBuilder {
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class DictionaryBuilder extends Builder$2 {
    constructor({ 'type': type, 'nullValues': nulls, 'dictionaryHashFunction': hashFn }) {
        super({ type: new Dictionary(type.dictionary, type.indices, type.id, type.isOrdered) });
        this._nulls = null;
        this._dictionaryOffset = 0;
        this._keysToIndices = Object.create(null);
        this.indices = Builder$2.new({ 'type': this.type.indices, 'nullValues': nulls });
        this.dictionary = Builder$2.new({ 'type': this.type.dictionary, 'nullValues': null });
        if (typeof hashFn === 'function') {
            this.valueToKey = hashFn;
        }
    }
    get values() { return this.indices.values; }
    get nullCount() { return this.indices.nullCount; }
    get nullBitmap() { return this.indices.nullBitmap; }
    get byteLength() { return this.indices.byteLength + this.dictionary.byteLength; }
    get reservedLength() { return this.indices.reservedLength + this.dictionary.reservedLength; }
    get reservedByteLength() { return this.indices.reservedByteLength + this.dictionary.reservedByteLength; }
    isValid(value) { return this.indices.isValid(value); }
    setValid(index, valid) {
        const indices = this.indices;
        valid = indices.setValid(index, valid);
        this.length = indices.length;
        return valid;
    }
    setValue(index, value) {
        const keysToIndices = this._keysToIndices;
        const key = this.valueToKey(value);
        let idx = keysToIndices[key];
        if (idx === undefined) {
            keysToIndices[key] = idx = this._dictionaryOffset + this.dictionary.append(value).length - 1;
        }
        return this.indices.setValue(index, idx);
    }
    flush() {
        const type = this.type;
        const prev = this._dictionary;
        const curr = this.dictionary.toVector();
        const data = this.indices.flush().clone(type);
        data.dictionary = prev ? prev.concat(curr) : curr;
        this.finished || (this._dictionaryOffset += curr.length);
        this._dictionary = data.dictionary;
        this.clear();
        return data;
    }
    finish() {
        this.indices.finish();
        this.dictionary.finish();
        this._dictionaryOffset = 0;
        this._keysToIndices = Object.create(null);
        return super.finish();
    }
    clear() {
        this.indices.clear();
        this.dictionary.clear();
        return super.clear();
    }
    valueToKey(val) {
        return typeof val === 'string' ? val : `${val}`;
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class FixedSizeBinaryBuilder extends FixedWidthBuilder {
}

// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
const f64 = new Float64Array(1);
const u32 = new Uint32Array(f64.buffer);
/**
 * Convert uint16 (logically a float16) to a JS float64. Inspired by numpy's `npy_half_to_double`:
 * https://github.com/numpy/numpy/blob/5a5987291dc95376bb098be8d8e5391e89e77a2c/numpy/core/src/npymath/halffloat.c#L29
 * @param h {number} the uint16 to convert
 * @private
 * @ignore
 */
function uint16ToFloat64(h) {
    const expo = (h & 0x7C00) >> 10;
    const sigf = (h & 0x03FF) / 1024;
    const sign = Math.pow((-1), ((h & 0x8000) >> 15));
    switch (expo) {
        case 0x1F: return sign * (sigf ? NaN : 1 / 0);
        case 0x00: return sign * (sigf ? 6.103515625e-5 * sigf : 0);
    }
    return sign * (Math.pow(2, (expo - 15))) * (1 + sigf);
}
/**
 * Convert a float64 to uint16 (assuming the float64 is logically a float16). Inspired by numpy's `npy_double_to_half`:
 * https://github.com/numpy/numpy/blob/5a5987291dc95376bb098be8d8e5391e89e77a2c/numpy/core/src/npymath/halffloat.c#L43
 * @param d {number} The float64 to convert
 * @private
 * @ignore
 */
function float64ToUint16(d) {
    if (d !== d) {
        return 0x7E00;
    } // NaN
    f64[0] = d;
    // Magic numbers:
    // 0x80000000 = 10000000 00000000 00000000 00000000 -- masks the 32nd bit
    // 0x7ff00000 = 01111111 11110000 00000000 00000000 -- masks the 21st-31st bits
    // 0x000fffff = 00000000 00001111 11111111 11111111 -- masks the 1st-20th bit
    const sign = (u32[1] & 0x80000000) >> 16 & 0xFFFF;
    let expo = (u32[1] & 0x7ff00000), sigf = 0x0000;
    if (expo >= 0x40f00000) {
        //
        // If exponent overflowed, the float16 is either NaN or Infinity.
        // Rules to propagate the sign bit: mantissa > 0 ? NaN : +/-Infinity
        //
        // Magic numbers:
        // 0x40F00000 = 01000000 11110000 00000000 00000000 -- 6-bit exponent overflow
        // 0x7C000000 = 01111100 00000000 00000000 00000000 -- masks the 27th-31st bits
        //
        // returns:
        // qNaN, aka 32256 decimal, 0x7E00 hex, or 01111110 00000000 binary
        // sNaN, aka 32000 decimal, 0x7D00 hex, or 01111101 00000000 binary
        // +inf, aka 31744 decimal, 0x7C00 hex, or 01111100 00000000 binary
        // -inf, aka 64512 decimal, 0xFC00 hex, or 11111100 00000000 binary
        //
        // If mantissa is greater than 23 bits, set to +Infinity like numpy
        if (u32[0] > 0) {
            expo = 0x7C00;
        }
        else {
            expo = (expo & 0x7C000000) >> 16;
            sigf = (u32[1] & 0x000fffff) >> 10;
        }
    }
    else if (expo <= 0x3f000000) {
        //
        // If exponent underflowed, the float is either signed zero or subnormal.
        //
        // Magic numbers:
        // 0x3F000000 = 00111111 00000000 00000000 00000000 -- 6-bit exponent underflow
        //
        sigf = 0x100000 + (u32[1] & 0x000fffff);
        sigf = 0x100000 + (sigf << ((expo >> 20) - 998)) >> 21;
        expo = 0;
    }
    else {
        //
        // No overflow or underflow, rebase the exponent and round the mantissa
        // Magic numbers:
        // 0x200 = 00000010 00000000 -- masks off the 10th bit
        //
        // Ensure the first mantissa bit (the 10th one) is 1 and round
        expo = (expo - 0x3f000000) >> 10;
        sigf = ((u32[1] & 0x000fffff) + 0x200) >> 10;
    }
    return sign | expo | sigf & 0xFFFF;
}

var util_math_ = /*#__PURE__*/Object.freeze({
    __proto__: null,
    uint16ToFloat64: uint16ToFloat64,
    float64ToUint16: float64ToUint16
});

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class FloatBuilder extends FixedWidthBuilder {
}
/** @ignore */
class Float16Builder extends FloatBuilder {
    setValue(index, value) {
        // convert JS float64 to a uint16
        this._values.set(index, float64ToUint16(value));
    }
}
/** @ignore */
class Float32Builder extends FloatBuilder {
    setValue(index, value) {
        this._values.set(index, value);
    }
}
/** @ignore */
class Float64Builder extends FloatBuilder {
    setValue(index, value) {
        this._values.set(index, value);
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
const isArrowBigNumSymbol = Symbol.for('isArrowBigNum');
/** @ignore */
function BigNum(x, ...xs) {
    if (xs.length === 0) {
        return Object.setPrototypeOf(toArrayBufferView(this['TypedArray'], x), this.constructor.prototype);
    }
    return Object.setPrototypeOf(new this['TypedArray'](x, ...xs), this.constructor.prototype);
}
BigNum.prototype[isArrowBigNumSymbol] = true;
BigNum.prototype.toJSON = function () { return `"${bignumToString(this)}"`; };
BigNum.prototype.valueOf = function () { return bignumToNumber(this); };
BigNum.prototype.toString = function () { return bignumToString(this); };
BigNum.prototype[Symbol.toPrimitive] = function (hint = 'default') {
    switch (hint) {
        case 'number': return bignumToNumber(this);
        case 'string': return bignumToString(this);
        case 'default': return bignumToBigInt(this);
    }
    // @ts-ignore
    return bignumToString(this);
};
/** @ignore */
function SignedBigNum(...args) { return BigNum.apply(this, args); }
/** @ignore */
function UnsignedBigNum(...args) { return BigNum.apply(this, args); }
/** @ignore */
function DecimalBigNum(...args) { return BigNum.apply(this, args); }
Object.setPrototypeOf(SignedBigNum.prototype, Object.create(Int32Array.prototype));
Object.setPrototypeOf(UnsignedBigNum.prototype, Object.create(Uint32Array.prototype));
Object.setPrototypeOf(DecimalBigNum.prototype, Object.create(Uint32Array.prototype));
Object.assign(SignedBigNum.prototype, BigNum.prototype, { 'constructor': SignedBigNum, 'signed': true, 'TypedArray': Int32Array, 'BigIntArray': BigInt64ArrayCtor });
Object.assign(UnsignedBigNum.prototype, BigNum.prototype, { 'constructor': UnsignedBigNum, 'signed': false, 'TypedArray': Uint32Array, 'BigIntArray': BigUint64ArrayCtor });
Object.assign(DecimalBigNum.prototype, BigNum.prototype, { 'constructor': DecimalBigNum, 'signed': true, 'TypedArray': Uint32Array, 'BigIntArray': BigUint64ArrayCtor });
/** @ignore */
function bignumToNumber(bn) {
    const { buffer, byteOffset, length, 'signed': signed } = bn;
    const words = new Int32Array(buffer, byteOffset, length);
    let number = 0, i = 0;
    const n = words.length;
    let hi, lo;
    while (i < n) {
        lo = words[i++];
        hi = words[i++];
        signed || (hi = hi >>> 0);
        number += (lo >>> 0) + (hi * (Math.pow(i, 32)));
    }
    return number;
}
/** @ignore */
let bignumToString;
/** @ignore */
let bignumToBigInt;
if (!BigIntAvailable) {
    bignumToString = decimalToString;
    bignumToBigInt = bignumToString;
}
else {
    bignumToBigInt = ((a) => a.byteLength === 8 ? new a['BigIntArray'](a.buffer, a.byteOffset, 1)[0] : decimalToString(a));
    bignumToString = ((a) => a.byteLength === 8 ? `${new a['BigIntArray'](a.buffer, a.byteOffset, 1)[0]}` : decimalToString(a));
}
/** @ignore */
function decimalToString(a) {
    let digits = '';
    const base64 = new Uint32Array(2);
    let base32 = new Uint16Array(a.buffer, a.byteOffset, a.byteLength / 2);
    const checks = new Uint32Array((base32 = new Uint16Array(base32).reverse()).buffer);
    let i = -1;
    const n = base32.length - 1;
    do {
        for (base64[0] = base32[i = 0]; i < n;) {
            base32[i++] = base64[1] = base64[0] / 10;
            base64[0] = ((base64[0] - base64[1] * 10) << 16) + base32[i];
        }
        base32[i] = base64[1] = base64[0] / 10;
        base64[0] = base64[0] - base64[1] * 10;
        digits = `${base64[0]}${digits}`;
    } while (checks[0] || checks[1] || checks[2] || checks[3]);
    return digits ? digits : `0`;
}
/** @ignore */
class BN {
    /** @nocollapse */
    static new(num, isSigned) {
        switch (isSigned) {
            case true: return new SignedBigNum(num);
            case false: return new UnsignedBigNum(num);
        }
        switch (num.constructor) {
            case Int8Array:
            case Int16Array:
            case Int32Array:
            case BigInt64ArrayCtor:
                return new SignedBigNum(num);
        }
        if (num.byteLength === 16) {
            return new DecimalBigNum(num);
        }
        return new UnsignedBigNum(num);
    }
    /** @nocollapse */
    static signed(num) {
        return new SignedBigNum(num);
    }
    /** @nocollapse */
    static unsigned(num) {
        return new UnsignedBigNum(num);
    }
    /** @nocollapse */
    static decimal(num) {
        return new DecimalBigNum(num);
    }
    constructor(num, isSigned) {
        return BN.new(num, isSigned);
    }
}

var util_bn_ = /*#__PURE__*/Object.freeze({
    __proto__: null,
    isArrowBigNumSymbol: isArrowBigNumSymbol,
    get bignumToString () { return bignumToString; },
    get bignumToBigInt () { return bignumToBigInt; },
    BN: BN
});

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class IntBuilder extends FixedWidthBuilder {
    setValue(index, value) {
        this._values.set(index, value);
    }
}
/** @ignore */
class Int8Builder extends IntBuilder {
}
/** @ignore */
class Int16Builder extends IntBuilder {
}
/** @ignore */
class Int32Builder extends IntBuilder {
}
/** @ignore */
class Int64Builder extends IntBuilder {
    constructor(options) {
        if (options['nullValues']) {
            options['nullValues'] = options['nullValues'].map(toBigInt);
        }
        super(options);
        this._values = new WideBufferBuilder(new Int32Array(0), 2);
    }
    get values64() { return this._values.buffer64; }
    isValid(value) { return super.isValid(toBigInt(value)); }
}
/** @ignore */
class Uint8Builder extends IntBuilder {
}
/** @ignore */
class Uint16Builder extends IntBuilder {
}
/** @ignore */
class Uint32Builder extends IntBuilder {
}
/** @ignore */
class Uint64Builder extends IntBuilder {
    constructor(options) {
        if (options['nullValues']) {
            options['nullValues'] = options['nullValues'].map(toBigInt);
        }
        super(options);
        this._values = new WideBufferBuilder(new Uint32Array(0), 2);
    }
    get values64() { return this._values.buffer64; }
    isValid(value) { return super.isValid(toBigInt(value)); }
}
const toBigInt = ((memo) => (value) => {
    if (ArrayBuffer.isView(value)) {
        memo.buffer = value.buffer;
        memo.byteOffset = value.byteOffset;
        memo.byteLength = value.byteLength;
        value = bignumToBigInt(memo);
        memo.buffer = null;
    }
    return value;
})({ 'BigIntArray': BigInt64ArrayCtor });

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class TimeBuilder extends FixedWidthBuilder {
}
/** @ignore */
class TimeSecondBuilder extends TimeBuilder {
}
/** @ignore */
class TimeMillisecondBuilder extends TimeBuilder {
}
/** @ignore */
class TimeMicrosecondBuilder extends TimeBuilder {
}
/** @ignore */
class TimeNanosecondBuilder extends TimeBuilder {
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class TimestampBuilder extends FixedWidthBuilder {
}
/** @ignore */
class TimestampSecondBuilder extends TimestampBuilder {
}
/** @ignore */
class TimestampMillisecondBuilder extends TimestampBuilder {
}
/** @ignore */
class TimestampMicrosecondBuilder extends TimestampBuilder {
}
/** @ignore */
class TimestampNanosecondBuilder extends TimestampBuilder {
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class IntervalBuilder extends FixedWidthBuilder {
}
/** @ignore */
class IntervalDayTimeBuilder extends IntervalBuilder {
}
/** @ignore */
class IntervalYearMonthBuilder extends IntervalBuilder {
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class BinaryBuilder extends VariableWidthBuilder {
    constructor(opts) {
        super(opts);
        this._values = new BufferBuilder(new Uint8Array(0));
    }
    get byteLength() {
        let size = this._pendingLength + (this.length * 4);
        this._offsets && (size += this._offsets.byteLength);
        this._values && (size += this._values.byteLength);
        this._nulls && (size += this._nulls.byteLength);
        return size;
    }
    setValue(index, value) {
        return super.setValue(index, toUint8Array(value));
    }
    _flushPending(pending, pendingLength) {
        const offsets = this._offsets;
        const data = this._values.reserve(pendingLength).buffer;
        let index = 0, length = 0, offset = 0, value;
        for ([index, value] of pending) {
            if (value === undefined) {
                offsets.set(index, 0);
            }
            else {
                length = value.length;
                data.set(value, offset);
                offsets.set(index, length);
                offset += length;
            }
        }
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class Utf8Builder extends VariableWidthBuilder {
    constructor(opts) {
        super(opts);
        this._values = new BufferBuilder(new Uint8Array(0));
    }
    get byteLength() {
        let size = this._pendingLength + (this.length * 4);
        this._offsets && (size += this._offsets.byteLength);
        this._values && (size += this._values.byteLength);
        this._nulls && (size += this._nulls.byteLength);
        return size;
    }
    setValue(index, value) {
        return super.setValue(index, encodeUtf8(value));
    }
    // @ts-ignore
    _flushPending(pending, pendingLength) { }
}
Utf8Builder.prototype._flushPending = BinaryBuilder.prototype._flushPending;

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class Run {
    get length() { return this._values.length; }
    get(index) { return this._values[index]; }
    clear() { this._values = null; return this; }
    bind(values) {
        if (values instanceof AbstractVector) {
            return values;
        }
        this._values = values;
        return this;
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
class Schema {
    constructor(fields = [], metadata, dictionaries) {
        this.fields = (fields || []);
        this.metadata = metadata || new Map();
        if (!dictionaries) {
            dictionaries = generateDictionaryMap(fields);
        }
        this.dictionaries = dictionaries;
    }
    get [Symbol.toStringTag]() { return 'Schema'; }
    toString() {
        return `Schema<{ ${this.fields.map((f, i) => `${i}: ${f}`).join(', ')} }>`;
    }
    select(...columnNames) {
        const names = columnNames.reduce((xs, x) => (xs[x] = true) && xs, Object.create(null));
        return new Schema(this.fields.filter((f) => names[f.name]), this.metadata);
    }
    selectAt(...columnIndices) {
        return new Schema(columnIndices.map((i) => this.fields[i]).filter(Boolean), this.metadata);
    }
    assign(...args) {
        const other = (args[0] instanceof Schema
            ? args[0]
            : Array.isArray(args[0])
                ? new Schema(args[0])
                : new Schema(args));
        const curFields = [...this.fields];
        const metadata = mergeMaps(mergeMaps(new Map(), this.metadata), other.metadata);
        const newFields = other.fields.filter((f2) => {
            const i = curFields.findIndex((f) => f.name === f2.name);
            return ~i ? (curFields[i] = f2.clone({
                metadata: mergeMaps(mergeMaps(new Map(), curFields[i].metadata), f2.metadata)
            })) && false : true;
        });
        const newDictionaries = generateDictionaryMap(newFields, new Map());
        return new Schema([...curFields, ...newFields], metadata, new Map([...this.dictionaries, ...newDictionaries]));
    }
}
class Field {
    constructor(name, type, nullable = false, metadata) {
        this.name = name;
        this.type = type;
        this.nullable = nullable;
        this.metadata = metadata || new Map();
    }
    /** @nocollapse */
    static new(...args) {
        let [name, type, nullable, metadata] = args;
        if (args[0] && typeof args[0] === 'object') {
            ({ name } = args[0]);
            (type === undefined) && (type = args[0].type);
            (nullable === undefined) && (nullable = args[0].nullable);
            (metadata === undefined) && (metadata = args[0].metadata);
        }
        return new Field(`${name}`, type, nullable, metadata);
    }
    get typeId() { return this.type.typeId; }
    get [Symbol.toStringTag]() { return 'Field'; }
    toString() { return `${this.name}: ${this.type}`; }
    clone(...args) {
        let [name, type, nullable, metadata] = args;
        (!args[0] || typeof args[0] !== 'object')
            ? ([name = this.name, type = this.type, nullable = this.nullable, metadata = this.metadata] = args)
            : ({ name = this.name, type = this.type, nullable = this.nullable, metadata = this.metadata } = args[0]);
        return Field.new(name, type, nullable, metadata);
    }
}
/** @ignore */
function mergeMaps(m1, m2) {
    return new Map([...(m1 || new Map()), ...(m2 || new Map())]);
}
/** @ignore */
function generateDictionaryMap(fields, dictionaries = new Map()) {
    for (let i = -1, n = fields.length; ++i < n;) {
        const field = fields[i];
        const type = field.type;
        if (DataType.isDictionary(type)) {
            if (!dictionaries.has(type.id)) {
                dictionaries.set(type.id, type.dictionary);
            }
            else if (dictionaries.get(type.id) !== type.dictionary) {
                throw new Error(`Cannot create Schema containing two different dictionaries with the same Id`);
            }
        }
        if (type.children && type.children.length > 0) {
            generateDictionaryMap(type.children, dictionaries);
        }
    }
    return dictionaries;
}
// Add these here so they're picked up by the externs creator
// in the build, and closure-compiler doesn't minify them away
Schema.prototype.fields = null;
Schema.prototype.metadata = null;
Schema.prototype.dictionaries = null;
Field.prototype.type = null;
Field.prototype.name = null;
Field.prototype.nullable = null;
Field.prototype.metadata = null;

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class ListBuilder extends VariableWidthBuilder {
    constructor(opts) {
        super(opts);
        this._run = new Run();
        this._offsets = new OffsetsBufferBuilder();
    }
    addChild(child, name = '0') {
        if (this.numChildren > 0) {
            throw new Error('ListBuilder can only have one child.');
        }
        this.children[this.numChildren] = child;
        this.type = new List(new Field(name, child.type, true));
        return this.numChildren - 1;
    }
    clear() {
        this._run.clear();
        return super.clear();
    }
    _flushPending(pending) {
        const run = this._run;
        const offsets = this._offsets;
        const setValue = this._setValue;
        let index = 0, value;
        for ([index, value] of pending) {
            if (value === undefined) {
                offsets.set(index, 0);
            }
            else {
                offsets.set(index, value.length);
                setValue(this, index, run.bind(value));
            }
        }
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class FixedSizeListBuilder extends Builder$2 {
    constructor() {
        super(...arguments);
        this._run = new Run();
    }
    setValue(index, value) {
        super.setValue(index, this._run.bind(value));
    }
    addChild(child, name = '0') {
        if (this.numChildren > 0) {
            throw new Error('FixedSizeListBuilder can only have one child.');
        }
        const childIndex = this.children.push(child);
        this.type = new FixedSizeList(this.type.listSize, new Field(name, child.type, true));
        return childIndex;
    }
    clear() {
        this._run.clear();
        return super.clear();
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class MapBuilder extends VariableWidthBuilder {
    set(index, value) {
        return super.set(index, value);
    }
    setValue(index, value) {
        value = value instanceof Map ? value : new Map(Object.entries(value));
        const pending = this._pending || (this._pending = new Map());
        const current = pending.get(index);
        current && (this._pendingLength -= current.size);
        this._pendingLength += value.size;
        pending.set(index, value);
    }
    addChild(child, name = `${this.numChildren}`) {
        if (this.numChildren > 0) {
            throw new Error('ListBuilder can only have one child.');
        }
        this.children[this.numChildren] = child;
        this.type = new Map_(new Field(name, child.type, true), this.type.keysSorted);
        return this.numChildren - 1;
    }
    _flushPending(pending) {
        const offsets = this._offsets;
        const setValue = this._setValue;
        pending.forEach((value, index) => {
            if (value === undefined) {
                offsets.set(index, 0);
            }
            else {
                offsets.set(index, value.size);
                setValue(this, index, value);
            }
        });
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class StructBuilder extends Builder$2 {
    addChild(child, name = `${this.numChildren}`) {
        const childIndex = this.children.push(child);
        this.type = new Struct([...this.type.children, new Field(name, child.type, true)]);
        return childIndex;
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class UnionBuilder extends Builder$2 {
    constructor(options) {
        super(options);
        this._typeIds = new DataBufferBuilder(new Int8Array(0), 1);
        if (typeof options['valueToChildTypeId'] === 'function') {
            this._valueToChildTypeId = options['valueToChildTypeId'];
        }
    }
    get typeIdToChildIndex() { return this.type.typeIdToChildIndex; }
    append(value, childTypeId) {
        return this.set(this.length, value, childTypeId);
    }
    set(index, value, childTypeId) {
        if (childTypeId === undefined) {
            childTypeId = this._valueToChildTypeId(this, value, index);
        }
        if (this.setValid(index, this.isValid(value))) {
            this.setValue(index, value, childTypeId);
        }
        return this;
    }
    setValue(index, value, childTypeId) {
        this._typeIds.set(index, childTypeId);
        super.setValue(index, value);
    }
    addChild(child, name = `${this.children.length}`) {
        const childTypeId = this.children.push(child);
        const { type: { children, mode, typeIds } } = this;
        const fields = [...children, new Field(name, child.type)];
        this.type = new Union_(mode, [...typeIds, childTypeId], fields);
        return childTypeId;
    }
    /** @ignore */
    // @ts-ignore
    _valueToChildTypeId(builder, value, offset) {
        throw new Error(`Cannot map UnionBuilder value to child typeId. \
Pass the \`childTypeId\` as the second argument to unionBuilder.append(), \
or supply a \`valueToChildTypeId\` function as part of the UnionBuilder constructor options.`);
    }
}
/** @ignore */
class SparseUnionBuilder extends UnionBuilder {
}
/** @ignore */
class DenseUnionBuilder extends UnionBuilder {
    constructor(options) {
        super(options);
        this._offsets = new DataBufferBuilder(new Int32Array(0));
    }
    /** @ignore */
    setValue(index, value, childTypeId) {
        const childIndex = this.type.typeIdToChildIndex[childTypeId];
        this._offsets.set(index, this.getChildAt(childIndex).length);
        return super.setValue(index, value, childTypeId);
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
class Visitor {
    visitMany(nodes, ...args) {
        return nodes.map((node, i) => this.visit(node, ...args.map((x) => x[i])));
    }
    visit(...args) {
        return this.getVisitFn(args[0], false).apply(this, args);
    }
    getVisitFn(node, throwIfNotFound = true) {
        return getVisitFn(this, node, throwIfNotFound);
    }
    visitNull(_node, ..._args) { return null; }
    visitBool(_node, ..._args) { return null; }
    visitInt(_node, ..._args) { return null; }
    visitFloat(_node, ..._args) { return null; }
    visitUtf8(_node, ..._args) { return null; }
    visitBinary(_node, ..._args) { return null; }
    visitFixedSizeBinary(_node, ..._args) { return null; }
    visitDate(_node, ..._args) { return null; }
    visitTimestamp(_node, ..._args) { return null; }
    visitTime(_node, ..._args) { return null; }
    visitDecimal(_node, ..._args) { return null; }
    visitList(_node, ..._args) { return null; }
    visitStruct(_node, ..._args) { return null; }
    visitUnion(_node, ..._args) { return null; }
    visitDictionary(_node, ..._args) { return null; }
    visitInterval(_node, ..._args) { return null; }
    visitFixedSizeList(_node, ..._args) { return null; }
    visitMap(_node, ..._args) { return null; }
}
/** @ignore */
function getVisitFn(visitor, node, throwIfNotFound = true) {
    let fn = null;
    let dtype = Type.NONE;
    if (node instanceof Data)
        dtype = inferDType(node.type);
    else if (node instanceof AbstractVector)
        dtype = inferDType(node.type);
    else if (node instanceof DataType)
        dtype = inferDType(node);
    else if (typeof (dtype = node) !== 'number')
        dtype = Type[node];
    switch (dtype) {
        case Type.Null:
            fn = visitor.visitNull;
            break;
        case Type.Bool:
            fn = visitor.visitBool;
            break;
        case Type.Int:
            fn = visitor.visitInt;
            break;
        case Type.Int8:
            fn = visitor.visitInt8 || visitor.visitInt;
            break;
        case Type.Int16:
            fn = visitor.visitInt16 || visitor.visitInt;
            break;
        case Type.Int32:
            fn = visitor.visitInt32 || visitor.visitInt;
            break;
        case Type.Int64:
            fn = visitor.visitInt64 || visitor.visitInt;
            break;
        case Type.Uint8:
            fn = visitor.visitUint8 || visitor.visitInt;
            break;
        case Type.Uint16:
            fn = visitor.visitUint16 || visitor.visitInt;
            break;
        case Type.Uint32:
            fn = visitor.visitUint32 || visitor.visitInt;
            break;
        case Type.Uint64:
            fn = visitor.visitUint64 || visitor.visitInt;
            break;
        case Type.Float:
            fn = visitor.visitFloat;
            break;
        case Type.Float16:
            fn = visitor.visitFloat16 || visitor.visitFloat;
            break;
        case Type.Float32:
            fn = visitor.visitFloat32 || visitor.visitFloat;
            break;
        case Type.Float64:
            fn = visitor.visitFloat64 || visitor.visitFloat;
            break;
        case Type.Utf8:
            fn = visitor.visitUtf8;
            break;
        case Type.Binary:
            fn = visitor.visitBinary;
            break;
        case Type.FixedSizeBinary:
            fn = visitor.visitFixedSizeBinary;
            break;
        case Type.Date:
            fn = visitor.visitDate;
            break;
        case Type.DateDay:
            fn = visitor.visitDateDay || visitor.visitDate;
            break;
        case Type.DateMillisecond:
            fn = visitor.visitDateMillisecond || visitor.visitDate;
            break;
        case Type.Timestamp:
            fn = visitor.visitTimestamp;
            break;
        case Type.TimestampSecond:
            fn = visitor.visitTimestampSecond || visitor.visitTimestamp;
            break;
        case Type.TimestampMillisecond:
            fn = visitor.visitTimestampMillisecond || visitor.visitTimestamp;
            break;
        case Type.TimestampMicrosecond:
            fn = visitor.visitTimestampMicrosecond || visitor.visitTimestamp;
            break;
        case Type.TimestampNanosecond:
            fn = visitor.visitTimestampNanosecond || visitor.visitTimestamp;
            break;
        case Type.Time:
            fn = visitor.visitTime;
            break;
        case Type.TimeSecond:
            fn = visitor.visitTimeSecond || visitor.visitTime;
            break;
        case Type.TimeMillisecond:
            fn = visitor.visitTimeMillisecond || visitor.visitTime;
            break;
        case Type.TimeMicrosecond:
            fn = visitor.visitTimeMicrosecond || visitor.visitTime;
            break;
        case Type.TimeNanosecond:
            fn = visitor.visitTimeNanosecond || visitor.visitTime;
            break;
        case Type.Decimal:
            fn = visitor.visitDecimal;
            break;
        case Type.List:
            fn = visitor.visitList;
            break;
        case Type.Struct:
            fn = visitor.visitStruct;
            break;
        case Type.Union:
            fn = visitor.visitUnion;
            break;
        case Type.DenseUnion:
            fn = visitor.visitDenseUnion || visitor.visitUnion;
            break;
        case Type.SparseUnion:
            fn = visitor.visitSparseUnion || visitor.visitUnion;
            break;
        case Type.Dictionary:
            fn = visitor.visitDictionary;
            break;
        case Type.Interval:
            fn = visitor.visitInterval;
            break;
        case Type.IntervalDayTime:
            fn = visitor.visitIntervalDayTime || visitor.visitInterval;
            break;
        case Type.IntervalYearMonth:
            fn = visitor.visitIntervalYearMonth || visitor.visitInterval;
            break;
        case Type.FixedSizeList:
            fn = visitor.visitFixedSizeList;
            break;
        case Type.Map:
            fn = visitor.visitMap;
            break;
    }
    if (typeof fn === 'function')
        return fn;
    if (!throwIfNotFound)
        return () => null;
    throw new Error(`Unrecognized type '${Type[dtype]}'`);
}
/** @ignore */
function inferDType(type) {
    switch (type.typeId) {
        case Type.Null: return Type.Null;
        case Type.Int: {
            const { bitWidth, isSigned } = type;
            switch (bitWidth) {
                case 8: return isSigned ? Type.Int8 : Type.Uint8;
                case 16: return isSigned ? Type.Int16 : Type.Uint16;
                case 32: return isSigned ? Type.Int32 : Type.Uint32;
                case 64: return isSigned ? Type.Int64 : Type.Uint64;
            }
            // @ts-ignore
            return Type.Int;
        }
        case Type.Float:
            switch (type.precision) {
                case Precision.HALF: return Type.Float16;
                case Precision.SINGLE: return Type.Float32;
                case Precision.DOUBLE: return Type.Float64;
            }
            // @ts-ignore
            return Type.Float;
        case Type.Binary: return Type.Binary;
        case Type.Utf8: return Type.Utf8;
        case Type.Bool: return Type.Bool;
        case Type.Decimal: return Type.Decimal;
        case Type.Time:
            switch (type.unit) {
                case TimeUnit.SECOND: return Type.TimeSecond;
                case TimeUnit.MILLISECOND: return Type.TimeMillisecond;
                case TimeUnit.MICROSECOND: return Type.TimeMicrosecond;
                case TimeUnit.NANOSECOND: return Type.TimeNanosecond;
            }
            // @ts-ignore
            return Type.Time;
        case Type.Timestamp:
            switch (type.unit) {
                case TimeUnit.SECOND: return Type.TimestampSecond;
                case TimeUnit.MILLISECOND: return Type.TimestampMillisecond;
                case TimeUnit.MICROSECOND: return Type.TimestampMicrosecond;
                case TimeUnit.NANOSECOND: return Type.TimestampNanosecond;
            }
            // @ts-ignore
            return Type.Timestamp;
        case Type.Date:
            switch (type.unit) {
                case DateUnit.DAY: return Type.DateDay;
                case DateUnit.MILLISECOND: return Type.DateMillisecond;
            }
            // @ts-ignore
            return Type.Date;
        case Type.Interval:
            switch (type.unit) {
                case IntervalUnit.DAY_TIME: return Type.IntervalDayTime;
                case IntervalUnit.YEAR_MONTH: return Type.IntervalYearMonth;
            }
            // @ts-ignore
            return Type.Interval;
        case Type.Map: return Type.Map;
        case Type.List: return Type.List;
        case Type.Struct: return Type.Struct;
        case Type.Union:
            switch (type.mode) {
                case UnionMode.Dense: return Type.DenseUnion;
                case UnionMode.Sparse: return Type.SparseUnion;
            }
            // @ts-ignore
            return Type.Union;
        case Type.FixedSizeBinary: return Type.FixedSizeBinary;
        case Type.FixedSizeList: return Type.FixedSizeList;
        case Type.Dictionary: return Type.Dictionary;
    }
    throw new Error(`Unrecognized type '${Type[type.typeId]}'`);
}
// Add these here so they're picked up by the externs creator
// in the build, and closure-compiler doesn't minify them away
Visitor.prototype.visitInt8 = null;
Visitor.prototype.visitInt16 = null;
Visitor.prototype.visitInt32 = null;
Visitor.prototype.visitInt64 = null;
Visitor.prototype.visitUint8 = null;
Visitor.prototype.visitUint16 = null;
Visitor.prototype.visitUint32 = null;
Visitor.prototype.visitUint64 = null;
Visitor.prototype.visitFloat16 = null;
Visitor.prototype.visitFloat32 = null;
Visitor.prototype.visitFloat64 = null;
Visitor.prototype.visitDateDay = null;
Visitor.prototype.visitDateMillisecond = null;
Visitor.prototype.visitTimestampSecond = null;
Visitor.prototype.visitTimestampMillisecond = null;
Visitor.prototype.visitTimestampMicrosecond = null;
Visitor.prototype.visitTimestampNanosecond = null;
Visitor.prototype.visitTimeSecond = null;
Visitor.prototype.visitTimeMillisecond = null;
Visitor.prototype.visitTimeMicrosecond = null;
Visitor.prototype.visitTimeNanosecond = null;
Visitor.prototype.visitDenseUnion = null;
Visitor.prototype.visitSparseUnion = null;
Visitor.prototype.visitIntervalDayTime = null;
Visitor.prototype.visitIntervalYearMonth = null;

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class SetVisitor extends Visitor {
}
/** @ignore */
const setEpochMsToDays = (data, index, epochMs) => { data[index] = (epochMs / 86400000) | 0; };
/** @ignore */
const setEpochMsToMillisecondsLong = (data, index, epochMs) => {
    data[index] = (epochMs % 4294967296) | 0;
    data[index + 1] = (epochMs / 4294967296) | 0;
};
/** @ignore */
const setEpochMsToMicrosecondsLong = (data, index, epochMs) => {
    data[index] = ((epochMs * 1000) % 4294967296) | 0;
    data[index + 1] = ((epochMs * 1000) / 4294967296) | 0;
};
/** @ignore */
const setEpochMsToNanosecondsLong = (data, index, epochMs) => {
    data[index] = ((epochMs * 1000000) % 4294967296) | 0;
    data[index + 1] = ((epochMs * 1000000) / 4294967296) | 0;
};
/** @ignore */
const setVariableWidthBytes = (values, valueOffsets, index, value) => {
    const { [index]: x, [index + 1]: y } = valueOffsets;
    if (x != null && y != null) {
        values.set(value.subarray(0, y - x), x);
    }
};
/** @ignore */
const setBool = ({ offset, values }, index, val) => {
    const idx = offset + index;
    val ? (values[idx >> 3] |= (1 << (idx % 8))) // true
        : (values[idx >> 3] &= ~(1 << (idx % 8))); // false
};
/** @ignore */
const setDateDay = ({ values }, index, value) => { setEpochMsToDays(values, index, value.valueOf()); };
/** @ignore */
const setDateMillisecond = ({ values }, index, value) => { setEpochMsToMillisecondsLong(values, index * 2, value.valueOf()); };
/** @ignore */
const setNumeric = ({ stride, values }, index, value) => { values[stride * index] = value; };
/** @ignore */
const setFloat16 = ({ stride, values }, index, value) => { values[stride * index] = float64ToUint16(value); };
/** @ignore */
const setNumericX2 = (vector, index, value) => {
    switch (typeof value) {
        case 'bigint':
            vector.values64[index] = value;
            break;
        case 'number':
            vector.values[index * vector.stride] = value;
            break;
        default: {
            const val = value;
            const { stride, ArrayType } = vector;
            const long = toArrayBufferView(ArrayType, val);
            vector.values.set(long.subarray(0, stride), stride * index);
        }
    }
};
/** @ignore */
const setFixedSizeBinary = ({ stride, values }, index, value) => { values.set(value.subarray(0, stride), stride * index); };
/** @ignore */
const setBinary = ({ values, valueOffsets }, index, value) => setVariableWidthBytes(values, valueOffsets, index, value);
/** @ignore */
const setUtf8 = ({ values, valueOffsets }, index, value) => {
    setVariableWidthBytes(values, valueOffsets, index, encodeUtf8(value));
};
/* istanbul ignore next */
/** @ignore */
const setInt = (vector, index, value) => {
    vector.type.bitWidth < 64
        ? setNumeric(vector, index, value)
        : setNumericX2(vector, index, value);
};
/* istanbul ignore next */
/** @ignore */
const setFloat = (vector, index, value) => {
    vector.type.precision !== Precision.HALF
        ? setNumeric(vector, index, value)
        : setFloat16(vector, index, value);
};
/* istanbul ignore next */
const setDate = (vector, index, value) => {
    vector.type.unit === DateUnit.DAY
        ? setDateDay(vector, index, value)
        : setDateMillisecond(vector, index, value);
};
/** @ignore */
const setTimestampSecond = ({ values }, index, value) => setEpochMsToMillisecondsLong(values, index * 2, value / 1000);
/** @ignore */
const setTimestampMillisecond = ({ values }, index, value) => setEpochMsToMillisecondsLong(values, index * 2, value);
/** @ignore */
const setTimestampMicrosecond = ({ values }, index, value) => setEpochMsToMicrosecondsLong(values, index * 2, value);
/** @ignore */
const setTimestampNanosecond = ({ values }, index, value) => setEpochMsToNanosecondsLong(values, index * 2, value);
/* istanbul ignore next */
/** @ignore */
const setTimestamp = (vector, index, value) => {
    switch (vector.type.unit) {
        case TimeUnit.SECOND: return setTimestampSecond(vector, index, value);
        case TimeUnit.MILLISECOND: return setTimestampMillisecond(vector, index, value);
        case TimeUnit.MICROSECOND: return setTimestampMicrosecond(vector, index, value);
        case TimeUnit.NANOSECOND: return setTimestampNanosecond(vector, index, value);
    }
};
/** @ignore */
const setTimeSecond = ({ values, stride }, index, value) => { values[stride * index] = value; };
/** @ignore */
const setTimeMillisecond = ({ values, stride }, index, value) => { values[stride * index] = value; };
/** @ignore */
const setTimeMicrosecond = ({ values }, index, value) => { values.set(value.subarray(0, 2), 2 * index); };
/** @ignore */
const setTimeNanosecond = ({ values }, index, value) => { values.set(value.subarray(0, 2), 2 * index); };
/* istanbul ignore next */
/** @ignore */
const setTime = (vector, index, value) => {
    switch (vector.type.unit) {
        case TimeUnit.SECOND: return setTimeSecond(vector, index, value);
        case TimeUnit.MILLISECOND: return setTimeMillisecond(vector, index, value);
        case TimeUnit.MICROSECOND: return setTimeMicrosecond(vector, index, value);
        case TimeUnit.NANOSECOND: return setTimeNanosecond(vector, index, value);
    }
};
/** @ignore */
const setDecimal = ({ values }, index, value) => { values.set(value.subarray(0, 4), 4 * index); };
/** @ignore */
const setList = (vector, index, value) => {
    const values = vector.getChildAt(0), valueOffsets = vector.valueOffsets;
    for (let idx = -1, itr = valueOffsets[index], end = valueOffsets[index + 1]; itr < end;) {
        values.set(itr++, value.get(++idx));
    }
};
/** @ignore */
const setMap = (vector, index, value) => {
    const values = vector.getChildAt(0), valueOffsets = vector.valueOffsets;
    const entries = value instanceof Map ? [...value] : Object.entries(value);
    for (let idx = -1, itr = valueOffsets[index], end = valueOffsets[index + 1]; itr < end;) {
        values.set(itr++, entries[++idx]);
    }
};
/** @ignore */ const _setStructArrayValue = (o, v) => (c, _, i) => c === null || c === void 0 ? void 0 : c.set(o, v[i]);
/** @ignore */ const _setStructVectorValue = (o, v) => (c, _, i) => c === null || c === void 0 ? void 0 : c.set(o, v.get(i));
/** @ignore */ const _setStructMapValue = (o, v) => (c, f, _) => c === null || c === void 0 ? void 0 : c.set(o, v.get(f.name));
/** @ignore */ const _setStructObjectValue = (o, v) => (c, f, _) => c === null || c === void 0 ? void 0 : c.set(o, v[f.name]);
/** @ignore */
const setStruct = (vector, index, value) => {
    const setValue = value instanceof Map ? _setStructMapValue(index, value) :
        value instanceof AbstractVector ? _setStructVectorValue(index, value) :
            Array.isArray(value) ? _setStructArrayValue(index, value) :
                _setStructObjectValue(index, value);
    vector.type.children.forEach((f, i) => setValue(vector.getChildAt(i), f, i));
};
/* istanbul ignore next */
/** @ignore */
const setUnion = (vector, index, value) => {
    vector.type.mode === UnionMode.Dense ?
        setDenseUnion(vector, index, value) :
        setSparseUnion(vector, index, value);
};
/** @ignore */
const setDenseUnion = (vector, index, value) => {
    const childIndex = vector.typeIdToChildIndex[vector.typeIds[index]];
    const child = vector.getChildAt(childIndex);
    child && child.set(vector.valueOffsets[index], value);
};
/** @ignore */
const setSparseUnion = (vector, index, value) => {
    const childIndex = vector.typeIdToChildIndex[vector.typeIds[index]];
    const child = vector.getChildAt(childIndex);
    child && child.set(index, value);
};
/** @ignore */
const setDictionary = (vector, index, value) => {
    const key = vector.getKey(index);
    if (key !== null) {
        vector.setValue(key, value);
    }
};
/* istanbul ignore next */
/** @ignore */
const setIntervalValue = (vector, index, value) => {
    (vector.type.unit === IntervalUnit.DAY_TIME)
        ? setIntervalDayTime(vector, index, value)
        : setIntervalYearMonth(vector, index, value);
};
/** @ignore */
const setIntervalDayTime = ({ values }, index, value) => { values.set(value.subarray(0, 2), 2 * index); };
/** @ignore */
const setIntervalYearMonth = ({ values }, index, value) => { values[index] = (value[0] * 12) + (value[1] % 12); };
/** @ignore */
const setFixedSizeList = (vector, index, value) => {
    const child = vector.getChildAt(0), { stride } = vector;
    for (let idx = -1, offset = index * stride; ++idx < stride;) {
        child.set(offset + idx, value.get(idx));
    }
};
SetVisitor.prototype.visitBool = setBool;
SetVisitor.prototype.visitInt = setInt;
SetVisitor.prototype.visitInt8 = setNumeric;
SetVisitor.prototype.visitInt16 = setNumeric;
SetVisitor.prototype.visitInt32 = setNumeric;
SetVisitor.prototype.visitInt64 = setNumericX2;
SetVisitor.prototype.visitUint8 = setNumeric;
SetVisitor.prototype.visitUint16 = setNumeric;
SetVisitor.prototype.visitUint32 = setNumeric;
SetVisitor.prototype.visitUint64 = setNumericX2;
SetVisitor.prototype.visitFloat = setFloat;
SetVisitor.prototype.visitFloat16 = setFloat16;
SetVisitor.prototype.visitFloat32 = setNumeric;
SetVisitor.prototype.visitFloat64 = setNumeric;
SetVisitor.prototype.visitUtf8 = setUtf8;
SetVisitor.prototype.visitBinary = setBinary;
SetVisitor.prototype.visitFixedSizeBinary = setFixedSizeBinary;
SetVisitor.prototype.visitDate = setDate;
SetVisitor.prototype.visitDateDay = setDateDay;
SetVisitor.prototype.visitDateMillisecond = setDateMillisecond;
SetVisitor.prototype.visitTimestamp = setTimestamp;
SetVisitor.prototype.visitTimestampSecond = setTimestampSecond;
SetVisitor.prototype.visitTimestampMillisecond = setTimestampMillisecond;
SetVisitor.prototype.visitTimestampMicrosecond = setTimestampMicrosecond;
SetVisitor.prototype.visitTimestampNanosecond = setTimestampNanosecond;
SetVisitor.prototype.visitTime = setTime;
SetVisitor.prototype.visitTimeSecond = setTimeSecond;
SetVisitor.prototype.visitTimeMillisecond = setTimeMillisecond;
SetVisitor.prototype.visitTimeMicrosecond = setTimeMicrosecond;
SetVisitor.prototype.visitTimeNanosecond = setTimeNanosecond;
SetVisitor.prototype.visitDecimal = setDecimal;
SetVisitor.prototype.visitList = setList;
SetVisitor.prototype.visitStruct = setStruct;
SetVisitor.prototype.visitUnion = setUnion;
SetVisitor.prototype.visitDenseUnion = setDenseUnion;
SetVisitor.prototype.visitSparseUnion = setSparseUnion;
SetVisitor.prototype.visitDictionary = setDictionary;
SetVisitor.prototype.visitInterval = setIntervalValue;
SetVisitor.prototype.visitIntervalDayTime = setIntervalDayTime;
SetVisitor.prototype.visitIntervalYearMonth = setIntervalYearMonth;
SetVisitor.prototype.visitFixedSizeList = setFixedSizeList;
SetVisitor.prototype.visitMap = setMap;
/** @ignore */
const instance$9 = new SetVisitor();

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class GetBuilderCtor extends Visitor {
    visitNull() { return NullBuilder; }
    visitBool() { return BoolBuilder; }
    visitInt() { return IntBuilder; }
    visitInt8() { return Int8Builder; }
    visitInt16() { return Int16Builder; }
    visitInt32() { return Int32Builder; }
    visitInt64() { return Int64Builder; }
    visitUint8() { return Uint8Builder; }
    visitUint16() { return Uint16Builder; }
    visitUint32() { return Uint32Builder; }
    visitUint64() { return Uint64Builder; }
    visitFloat() { return FloatBuilder; }
    visitFloat16() { return Float16Builder; }
    visitFloat32() { return Float32Builder; }
    visitFloat64() { return Float64Builder; }
    visitUtf8() { return Utf8Builder; }
    visitBinary() { return BinaryBuilder; }
    visitFixedSizeBinary() { return FixedSizeBinaryBuilder; }
    visitDate() { return DateBuilder; }
    visitDateDay() { return DateDayBuilder; }
    visitDateMillisecond() { return DateMillisecondBuilder; }
    visitTimestamp() { return TimestampBuilder; }
    visitTimestampSecond() { return TimestampSecondBuilder; }
    visitTimestampMillisecond() { return TimestampMillisecondBuilder; }
    visitTimestampMicrosecond() { return TimestampMicrosecondBuilder; }
    visitTimestampNanosecond() { return TimestampNanosecondBuilder; }
    visitTime() { return TimeBuilder; }
    visitTimeSecond() { return TimeSecondBuilder; }
    visitTimeMillisecond() { return TimeMillisecondBuilder; }
    visitTimeMicrosecond() { return TimeMicrosecondBuilder; }
    visitTimeNanosecond() { return TimeNanosecondBuilder; }
    visitDecimal() { return DecimalBuilder; }
    visitList() { return ListBuilder; }
    visitStruct() { return StructBuilder; }
    visitUnion() { return UnionBuilder; }
    visitDenseUnion() { return DenseUnionBuilder; }
    visitSparseUnion() { return SparseUnionBuilder; }
    visitDictionary() { return DictionaryBuilder; }
    visitInterval() { return IntervalBuilder; }
    visitIntervalDayTime() { return IntervalDayTimeBuilder; }
    visitIntervalYearMonth() { return IntervalYearMonthBuilder; }
    visitFixedSizeList() { return FixedSizeListBuilder; }
    visitMap() { return MapBuilder; }
}
/** @ignore */
const instance$8 = new GetBuilderCtor();

// Licensed to the Apache Software Foundation (ASF) under one
/** @nocollapse */
Builder$2.new = newBuilder;
function newBuilder(options) {
    const type = options.type;
    const builder = new (instance$8.getVisitFn(type)())(options);
    if (type.children && type.children.length > 0) {
        const children = options['children'] || [];
        const defaultOptions = { 'nullValues': options['nullValues'] };
        const getChildOptions = Array.isArray(children)
            ? ((_, i) => children[i] || defaultOptions)
            : (({ name }) => children[name] || defaultOptions);
        type.children.forEach((field, index) => {
            const { type } = field;
            const opts = getChildOptions(field, index);
            builder.children.push(newBuilder(Object.assign(Object.assign({}, opts), { type })));
        });
    }
    return builder;
}
Object.keys(Type)
    .map((T) => Type[T])
    .filter((T) => typeof T === 'number' && T !== Type.NONE)
    .forEach((typeId) => {
    const BuilderCtor = instance$8.visit(typeId);
    BuilderCtor.prototype._setValue = instance$9.getVisitFn(typeId);
});
Utf8Builder.prototype._setValue = instance$9.visitBinary;

// automatically generated by the FlatBuffers compiler, do not modify
/**
 * ----------------------------------------------------------------------
 * Arrow File metadata
 *
 *
 * @constructor
 */
class Footer {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns Footer
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Footer= obj
     * @returns Footer
     */
    static getRootAsFooter(bb, obj) {
        return (obj || new Footer()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param Footer= obj
     * @returns Footer
     */
    static getSizePrefixedRootAsFooter(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Footer()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    /**
     * @returns MetadataVersion
     */
    version() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? /**  */ (this.bb.readInt16(this.bb_pos + offset)) : MetadataVersion.V1;
    }
    /**
     * @param Schema= obj
     * @returns Schema|null
     */
    schema(obj) {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? (obj || new Schema$1()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    /**
     * @param number index
     * @param Block= obj
     * @returns Block
     */
    dictionaries(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? (obj || new Block()).__init(this.bb.__vector(this.bb_pos + offset) + index * 24, this.bb) : null;
    }
    /**
     * @returns number
     */
    dictionariesLength() {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    /**
     * @param number index
     * @param Block= obj
     * @returns Block
     */
    recordBatches(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? (obj || new Block()).__init(this.bb.__vector(this.bb_pos + offset) + index * 24, this.bb) : null;
    }
    /**
     * @returns number
     */
    recordBatchesLength() {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    /**
     * User-defined metadata
     *
     * @param number index
     * @param KeyValue= obj
     * @returns KeyValue
     */
    customMetadata(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 12);
        return offset ? (obj || new KeyValue()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
    }
    /**
     * @returns number
     */
    customMetadataLength() {
        const offset = this.bb.__offset(this.bb_pos, 12);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    /**
     * @param flatbuffers.Builder builder
     */
    static startFooter(builder) {
        builder.startObject(5);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param MetadataVersion version
     */
    static addVersion(builder, version) {
        builder.addFieldInt16(0, version, MetadataVersion.V1);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset schemaOffset
     */
    static addSchema(builder, schemaOffset) {
        builder.addFieldOffset(1, schemaOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset dictionariesOffset
     */
    static addDictionaries(builder, dictionariesOffset) {
        builder.addFieldOffset(2, dictionariesOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param number numElems
     */
    static startDictionariesVector(builder, numElems) {
        builder.startVector(24, numElems, 8);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset recordBatchesOffset
     */
    static addRecordBatches(builder, recordBatchesOffset) {
        builder.addFieldOffset(3, recordBatchesOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param number numElems
     */
    static startRecordBatchesVector(builder, numElems) {
        builder.startVector(24, numElems, 8);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset customMetadataOffset
     */
    static addCustomMetadata(builder, customMetadataOffset) {
        builder.addFieldOffset(4, customMetadataOffset, 0);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param Array.<flatbuffers.Offset> data
     * @returns flatbuffers.Offset
     */
    static createCustomMetadataVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    /**
     * @param flatbuffers.Builder builder
     * @param number numElems
     */
    static startCustomMetadataVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endFooter(builder) {
        const offset = builder.endObject();
        return offset;
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset offset
     */
    static finishFooterBuffer(builder, offset) {
        builder.finish(offset);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset offset
     */
    static finishSizePrefixedFooterBuffer(builder, offset) {
        builder.finish(offset, undefined, true);
    }
    static createFooter(builder, version, schemaOffset, dictionariesOffset, recordBatchesOffset, customMetadataOffset) {
        Footer.startFooter(builder);
        Footer.addVersion(builder, version);
        Footer.addSchema(builder, schemaOffset);
        Footer.addDictionaries(builder, dictionariesOffset);
        Footer.addRecordBatches(builder, recordBatchesOffset);
        Footer.addCustomMetadata(builder, customMetadataOffset);
        return Footer.endFooter(builder);
    }
}
/**
 * @constructor
 */
class Block {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns Block
     */
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    /**
     * Index to the start of the RecordBlock (note this is past the Message header)
     *
     * @returns flatbuffers.Long
     */
    offset() {
        return this.bb.readInt64(this.bb_pos);
    }
    /**
     * Length of the metadata
     *
     * @returns number
     */
    metaDataLength() {
        return this.bb.readInt32(this.bb_pos + 8);
    }
    /**
     * Length of the data (this is aligned so there can be a gap between this and
     * the metadata).
     *
     * @returns flatbuffers.Long
     */
    bodyLength() {
        return this.bb.readInt64(this.bb_pos + 16);
    }
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Long offset
     * @param number metaDataLength
     * @param flatbuffers.Long bodyLength
     * @returns flatbuffers.Offset
     */
    static createBlock(builder, offset, metaDataLength, bodyLength) {
        builder.prep(8, 24);
        builder.writeInt64(bodyLength);
        builder.pad(4);
        builder.writeInt32(metaDataLength);
        builder.writeInt64(offset);
        return builder.offset();
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
var Long$2 = flatbuffers.Long;
var Builder$1 = flatbuffers.Builder;
var ByteBuffer$2 = flatbuffers.ByteBuffer;
/** @ignore */
class Footer_ {
    constructor(schema, version = MetadataVersion.V4, recordBatches, dictionaryBatches) {
        this.schema = schema;
        this.version = version;
        recordBatches && (this._recordBatches = recordBatches);
        dictionaryBatches && (this._dictionaryBatches = dictionaryBatches);
    }
    /** @nocollapse */
    static decode(buf) {
        buf = new ByteBuffer$2(toUint8Array(buf));
        const footer = Footer.getRootAsFooter(buf);
        const schema = Schema.decode(footer.schema());
        return new OffHeapFooter(schema, footer);
    }
    /** @nocollapse */
    static encode(footer) {
        const b = new Builder$1();
        const schemaOffset = Schema.encode(b, footer.schema);
        Footer.startRecordBatchesVector(b, footer.numRecordBatches);
        [...footer.recordBatches()].slice().reverse().forEach((rb) => FileBlock.encode(b, rb));
        const recordBatchesOffset = b.endVector();
        Footer.startDictionariesVector(b, footer.numDictionaries);
        [...footer.dictionaryBatches()].slice().reverse().forEach((db) => FileBlock.encode(b, db));
        const dictionaryBatchesOffset = b.endVector();
        Footer.startFooter(b);
        Footer.addSchema(b, schemaOffset);
        Footer.addVersion(b, MetadataVersion.V4);
        Footer.addRecordBatches(b, recordBatchesOffset);
        Footer.addDictionaries(b, dictionaryBatchesOffset);
        Footer.finishFooterBuffer(b, Footer.endFooter(b));
        return b.asUint8Array();
    }
    get numRecordBatches() { return this._recordBatches.length; }
    get numDictionaries() { return this._dictionaryBatches.length; }
    *recordBatches() {
        for (let block, i = -1, n = this.numRecordBatches; ++i < n;) {
            if (block = this.getRecordBatch(i)) {
                yield block;
            }
        }
    }
    *dictionaryBatches() {
        for (let block, i = -1, n = this.numDictionaries; ++i < n;) {
            if (block = this.getDictionaryBatch(i)) {
                yield block;
            }
        }
    }
    getRecordBatch(index) {
        return index >= 0
            && index < this.numRecordBatches
            && this._recordBatches[index] || null;
    }
    getDictionaryBatch(index) {
        return index >= 0
            && index < this.numDictionaries
            && this._dictionaryBatches[index] || null;
    }
}
/** @ignore */
class OffHeapFooter extends Footer_ {
    constructor(schema, _footer) {
        super(schema, _footer.version());
        this._footer = _footer;
    }
    get numRecordBatches() { return this._footer.recordBatchesLength(); }
    get numDictionaries() { return this._footer.dictionariesLength(); }
    getRecordBatch(index) {
        if (index >= 0 && index < this.numRecordBatches) {
            const fileBlock = this._footer.recordBatches(index);
            if (fileBlock) {
                return FileBlock.decode(fileBlock);
            }
        }
        return null;
    }
    getDictionaryBatch(index) {
        if (index >= 0 && index < this.numDictionaries) {
            const fileBlock = this._footer.dictionaries(index);
            if (fileBlock) {
                return FileBlock.decode(fileBlock);
            }
        }
        return null;
    }
}
/** @ignore */
class FileBlock {
    constructor(metaDataLength, bodyLength, offset) {
        this.metaDataLength = metaDataLength;
        this.offset = typeof offset === 'number' ? offset : offset.low;
        this.bodyLength = typeof bodyLength === 'number' ? bodyLength : bodyLength.low;
    }
    /** @nocollapse */
    static decode(block) {
        return new FileBlock(block.metaDataLength(), block.bodyLength(), block.offset());
    }
    /** @nocollapse */
    static encode(b, fileBlock) {
        const { metaDataLength } = fileBlock;
        const offset = new Long$2(fileBlock.offset, 0);
        const bodyLength = new Long$2(fileBlock.bodyLength, 0);
        return Block.createBlock(b, offset, metaDataLength, bodyLength);
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class AsyncByteQueue extends AsyncQueue {
    write(value) {
        if ((value = toUint8Array(value)).byteLength > 0) {
            return super.write(value);
        }
    }
    toString(sync = false) {
        return sync
            ? decodeUtf8(this.toUint8Array(true))
            : this.toUint8Array(false).then(decodeUtf8);
    }
    toUint8Array(sync = false) {
        return sync ? joinUint8Arrays(this._values)[0] : (() => __awaiter(this, void 0, void 0, function* () {
            var e_1, _a;
            const buffers = [];
            let byteLength = 0;
            try {
                for (var _b = __asyncValues(this), _c; _c = yield _b.next(), !_c.done;) {
                    const chunk = _c.value;
                    buffers.push(chunk);
                    byteLength += chunk.byteLength;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return joinUint8Arrays(buffers, byteLength)[0];
        }))();
    }
}
/** @ignore */
class ByteStream {
    constructor(source) {
        if (source) {
            this.source = new ByteStreamSource(streamAdapters.fromIterable(source));
        }
    }
    [Symbol.iterator]() { return this; }
    next(value) { return this.source.next(value); }
    throw(value) { return this.source.throw(value); }
    return(value) { return this.source.return(value); }
    peek(size) { return this.source.peek(size); }
    read(size) { return this.source.read(size); }
}
/** @ignore */
class AsyncByteStream {
    constructor(source) {
        if (source instanceof AsyncByteStream) {
            this.source = source.source;
        }
        else if (source instanceof AsyncByteQueue) {
            this.source = new AsyncByteStreamSource(streamAdapters.fromAsyncIterable(source));
        }
        else if (isReadableNodeStream(source)) {
            this.source = new AsyncByteStreamSource(streamAdapters.fromNodeStream(source));
        }
        else if (isReadableDOMStream(source)) {
            this.source = new AsyncByteStreamSource(streamAdapters.fromDOMStream(source));
        }
        else if (isFetchResponse(source)) {
            this.source = new AsyncByteStreamSource(streamAdapters.fromDOMStream(source.body));
        }
        else if (isIterable(source)) {
            this.source = new AsyncByteStreamSource(streamAdapters.fromIterable(source));
        }
        else if (isPromise(source)) {
            this.source = new AsyncByteStreamSource(streamAdapters.fromAsyncIterable(source));
        }
        else if (isAsyncIterable(source)) {
            this.source = new AsyncByteStreamSource(streamAdapters.fromAsyncIterable(source));
        }
    }
    [Symbol.asyncIterator]() { return this; }
    next(value) { return this.source.next(value); }
    throw(value) { return this.source.throw(value); }
    return(value) { return this.source.return(value); }
    get closed() { return this.source.closed; }
    cancel(reason) { return this.source.cancel(reason); }
    peek(size) { return this.source.peek(size); }
    read(size) { return this.source.read(size); }
}
/** @ignore */
class ByteStreamSource {
    constructor(source) {
        this.source = source;
    }
    cancel(reason) { this.return(reason); }
    peek(size) { return this.next(size, 'peek').value; }
    read(size) { return this.next(size, 'read').value; }
    next(size, cmd = 'read') { return this.source.next({ cmd, size }); }
    throw(value) { return Object.create((this.source.throw && this.source.throw(value)) || ITERATOR_DONE); }
    return(value) { return Object.create((this.source.return && this.source.return(value)) || ITERATOR_DONE); }
}
/** @ignore */
class AsyncByteStreamSource {
    constructor(source) {
        this.source = source;
        this._closedPromise = new Promise((r) => this._closedPromiseResolve = r);
    }
    cancel(reason) {
        return __awaiter(this, void 0, void 0, function* () { yield this.return(reason); });
    }
    get closed() { return this._closedPromise; }
    read(size) {
        return __awaiter(this, void 0, void 0, function* () { return (yield this.next(size, 'read')).value; });
    }
    peek(size) {
        return __awaiter(this, void 0, void 0, function* () { return (yield this.next(size, 'peek')).value; });
    }
    next(size, cmd = 'read') {
        return __awaiter(this, void 0, void 0, function* () { return (yield this.source.next({ cmd, size })); });
    }
    throw(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (this.source.throw && (yield this.source.throw(value))) || ITERATOR_DONE;
            this._closedPromiseResolve && this._closedPromiseResolve();
            this._closedPromiseResolve = undefined;
            return Object.create(result);
        });
    }
    return(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (this.source.return && (yield this.source.return(value))) || ITERATOR_DONE;
            this._closedPromiseResolve && this._closedPromiseResolve();
            this._closedPromiseResolve = undefined;
            return Object.create(result);
        });
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class RandomAccessFile extends ByteStream {
    constructor(buffer, byteLength) {
        super();
        this.position = 0;
        this.buffer = toUint8Array(buffer);
        this.size = typeof byteLength === 'undefined' ? this.buffer.byteLength : byteLength;
    }
    readInt32(position) {
        const { buffer, byteOffset } = this.readAt(position, 4);
        return new DataView(buffer, byteOffset).getInt32(0, true);
    }
    seek(position) {
        this.position = Math.min(position, this.size);
        return position < this.size;
    }
    read(nBytes) {
        const { buffer, size, position } = this;
        if (buffer && position < size) {
            if (typeof nBytes !== 'number') {
                nBytes = Infinity;
            }
            this.position = Math.min(size, position + Math.min(size - position, nBytes));
            return buffer.subarray(position, this.position);
        }
        return null;
    }
    readAt(position, nBytes) {
        const buf = this.buffer;
        const end = Math.min(this.size, position + nBytes);
        return buf ? buf.subarray(position, end) : new Uint8Array(nBytes);
    }
    close() { this.buffer && (this.buffer = null); }
    throw(value) { this.close(); return { done: true, value }; }
    return(value) { this.close(); return { done: true, value }; }
}
/** @ignore */
class AsyncRandomAccessFile extends AsyncByteStream {
    constructor(file, byteLength) {
        super();
        this.position = 0;
        this._handle = file;
        if (typeof byteLength === 'number') {
            this.size = byteLength;
        }
        else {
            this._pending = (() => __awaiter(this, void 0, void 0, function* () {
                this.size = (yield file.stat()).size;
                delete this._pending;
            }))();
        }
    }
    readInt32(position) {
        return __awaiter(this, void 0, void 0, function* () {
            const { buffer, byteOffset } = yield this.readAt(position, 4);
            return new DataView(buffer, byteOffset).getInt32(0, true);
        });
    }
    seek(position) {
        return __awaiter(this, void 0, void 0, function* () {
            this._pending && (yield this._pending);
            this.position = Math.min(position, this.size);
            return position < this.size;
        });
    }
    read(nBytes) {
        return __awaiter(this, void 0, void 0, function* () {
            this._pending && (yield this._pending);
            const { _handle: file, size, position } = this;
            if (file && position < size) {
                if (typeof nBytes !== 'number') {
                    nBytes = Infinity;
                }
                let pos = position, offset = 0, bytesRead = 0;
                const end = Math.min(size, pos + Math.min(size - pos, nBytes));
                const buffer = new Uint8Array(Math.max(0, (this.position = end) - pos));
                while ((pos += bytesRead) < end && (offset += bytesRead) < buffer.byteLength) {
                    ({ bytesRead } = yield file.read(buffer, offset, buffer.byteLength - offset, pos));
                }
                return buffer;
            }
            return null;
        });
    }
    readAt(position, nBytes) {
        return __awaiter(this, void 0, void 0, function* () {
            this._pending && (yield this._pending);
            const { _handle: file, size } = this;
            if (file && (position + nBytes) < size) {
                const end = Math.min(size, position + nBytes);
                const buffer = new Uint8Array(end - position);
                return (yield file.read(buffer, 0, nBytes, position)).buffer;
            }
            return new Uint8Array(nBytes);
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () { const f = this._handle; this._handle = null; f && (yield f.close()); });
    }
    throw(value) {
        return __awaiter(this, void 0, void 0, function* () { yield this.close(); return { done: true, value }; });
    }
    return(value) {
        return __awaiter(this, void 0, void 0, function* () { yield this.close(); return { done: true, value }; });
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
/** @ignore */
const carryBit16 = 1 << 16;
/** @ignore */
function intAsHex(value) {
    if (value < 0) {
        value = 0xFFFFFFFF + value + 1;
    }
    return `0x${value.toString(16)}`;
}
/** @ignore */
const kInt32DecimalDigits = 8;
/** @ignore */
const kPowersOfTen = [1,
    10,
    100,
    1000,
    10000,
    100000,
    1000000,
    10000000,
    100000000];
/** @ignore */
class BaseInt64 {
    constructor(buffer) {
        this.buffer = buffer;
    }
    high() { return this.buffer[1]; }
    low() { return this.buffer[0]; }
    _times(other) {
        // Break the left and right numbers into 16 bit chunks
        // so that we can multiply them without overflow.
        const L = new Uint32Array([
            this.buffer[1] >>> 16,
            this.buffer[1] & 0xFFFF,
            this.buffer[0] >>> 16,
            this.buffer[0] & 0xFFFF
        ]);
        const R = new Uint32Array([
            other.buffer[1] >>> 16,
            other.buffer[1] & 0xFFFF,
            other.buffer[0] >>> 16,
            other.buffer[0] & 0xFFFF
        ]);
        let product = L[3] * R[3];
        this.buffer[0] = product & 0xFFFF;
        let sum = product >>> 16;
        product = L[2] * R[3];
        sum += product;
        product = (L[3] * R[2]) >>> 0;
        sum += product;
        this.buffer[0] += sum << 16;
        this.buffer[1] = (sum >>> 0 < product ? carryBit16 : 0);
        this.buffer[1] += sum >>> 16;
        this.buffer[1] += L[1] * R[3] + L[2] * R[2] + L[3] * R[1];
        this.buffer[1] += (L[0] * R[3] + L[1] * R[2] + L[2] * R[1] + L[3] * R[0]) << 16;
        return this;
    }
    _plus(other) {
        const sum = (this.buffer[0] + other.buffer[0]) >>> 0;
        this.buffer[1] += other.buffer[1];
        if (sum < (this.buffer[0] >>> 0)) {
            ++this.buffer[1];
        }
        this.buffer[0] = sum;
    }
    lessThan(other) {
        return this.buffer[1] < other.buffer[1] ||
            (this.buffer[1] === other.buffer[1] && this.buffer[0] < other.buffer[0]);
    }
    equals(other) {
        return this.buffer[1] === other.buffer[1] && this.buffer[0] == other.buffer[0];
    }
    greaterThan(other) {
        return other.lessThan(this);
    }
    hex() {
        return `${intAsHex(this.buffer[1])} ${intAsHex(this.buffer[0])}`;
    }
}
/** @ignore */
class Uint64 extends BaseInt64 {
    times(other) {
        this._times(other);
        return this;
    }
    plus(other) {
        this._plus(other);
        return this;
    }
    /** @nocollapse */
    static from(val, out_buffer = new Uint32Array(2)) {
        return Uint64.fromString(typeof (val) === 'string' ? val : val.toString(), out_buffer);
    }
    /** @nocollapse */
    static fromNumber(num, out_buffer = new Uint32Array(2)) {
        // Always parse numbers as strings - pulling out high and low bits
        // directly seems to lose precision sometimes
        // For example:
        //     > -4613034156400212000 >>> 0
        //     721782784
        // The correct lower 32-bits are 721782752
        return Uint64.fromString(num.toString(), out_buffer);
    }
    /** @nocollapse */
    static fromString(str, out_buffer = new Uint32Array(2)) {
        const length = str.length;
        const out = new Uint64(out_buffer);
        for (let posn = 0; posn < length;) {
            const group = kInt32DecimalDigits < length - posn ?
                kInt32DecimalDigits : length - posn;
            const chunk = new Uint64(new Uint32Array([parseInt(str.substr(posn, group), 10), 0]));
            const multiple = new Uint64(new Uint32Array([kPowersOfTen[group], 0]));
            out.times(multiple);
            out.plus(chunk);
            posn += group;
        }
        return out;
    }
    /** @nocollapse */
    static convertArray(values) {
        const data = new Uint32Array(values.length * 2);
        for (let i = -1, n = values.length; ++i < n;) {
            Uint64.from(values[i], new Uint32Array(data.buffer, data.byteOffset + 2 * i * 4, 2));
        }
        return data;
    }
    /** @nocollapse */
    static multiply(left, right) {
        const rtrn = new Uint64(new Uint32Array(left.buffer));
        return rtrn.times(right);
    }
    /** @nocollapse */
    static add(left, right) {
        const rtrn = new Uint64(new Uint32Array(left.buffer));
        return rtrn.plus(right);
    }
}
/** @ignore */
class Int64 extends BaseInt64 {
    negate() {
        this.buffer[0] = ~this.buffer[0] + 1;
        this.buffer[1] = ~this.buffer[1];
        if (this.buffer[0] == 0) {
            ++this.buffer[1];
        }
        return this;
    }
    times(other) {
        this._times(other);
        return this;
    }
    plus(other) {
        this._plus(other);
        return this;
    }
    lessThan(other) {
        // force high bytes to be signed
        const this_high = this.buffer[1] << 0;
        const other_high = other.buffer[1] << 0;
        return this_high < other_high ||
            (this_high === other_high && this.buffer[0] < other.buffer[0]);
    }
    /** @nocollapse */
    static from(val, out_buffer = new Uint32Array(2)) {
        return Int64.fromString(typeof (val) === 'string' ? val : val.toString(), out_buffer);
    }
    /** @nocollapse */
    static fromNumber(num, out_buffer = new Uint32Array(2)) {
        // Always parse numbers as strings - pulling out high and low bits
        // directly seems to lose precision sometimes
        // For example:
        //     > -4613034156400212000 >>> 0
        //     721782784
        // The correct lower 32-bits are 721782752
        return Int64.fromString(num.toString(), out_buffer);
    }
    /** @nocollapse */
    static fromString(str, out_buffer = new Uint32Array(2)) {
        // TODO: Assert that out_buffer is 0 and length = 2
        const negate = str.startsWith('-');
        const length = str.length;
        const out = new Int64(out_buffer);
        for (let posn = negate ? 1 : 0; posn < length;) {
            const group = kInt32DecimalDigits < length - posn ?
                kInt32DecimalDigits : length - posn;
            const chunk = new Int64(new Uint32Array([parseInt(str.substr(posn, group), 10), 0]));
            const multiple = new Int64(new Uint32Array([kPowersOfTen[group], 0]));
            out.times(multiple);
            out.plus(chunk);
            posn += group;
        }
        return negate ? out.negate() : out;
    }
    /** @nocollapse */
    static convertArray(values) {
        const data = new Uint32Array(values.length * 2);
        for (let i = -1, n = values.length; ++i < n;) {
            Int64.from(values[i], new Uint32Array(data.buffer, data.byteOffset + 2 * i * 4, 2));
        }
        return data;
    }
    /** @nocollapse */
    static multiply(left, right) {
        const rtrn = new Int64(new Uint32Array(left.buffer));
        return rtrn.times(right);
    }
    /** @nocollapse */
    static add(left, right) {
        const rtrn = new Int64(new Uint32Array(left.buffer));
        return rtrn.plus(right);
    }
}
/** @ignore */
class Int128 {
    constructor(buffer) {
        this.buffer = buffer;
        // buffer[3] MSB (high)
        // buffer[2]
        // buffer[1]
        // buffer[0] LSB (low)
    }
    high() {
        return new Int64(new Uint32Array(this.buffer.buffer, this.buffer.byteOffset + 8, 2));
    }
    low() {
        return new Int64(new Uint32Array(this.buffer.buffer, this.buffer.byteOffset, 2));
    }
    negate() {
        this.buffer[0] = ~this.buffer[0] + 1;
        this.buffer[1] = ~this.buffer[1];
        this.buffer[2] = ~this.buffer[2];
        this.buffer[3] = ~this.buffer[3];
        if (this.buffer[0] == 0) {
            ++this.buffer[1];
        }
        if (this.buffer[1] == 0) {
            ++this.buffer[2];
        }
        if (this.buffer[2] == 0) {
            ++this.buffer[3];
        }
        return this;
    }
    times(other) {
        // Break the left and right numbers into 32 bit chunks
        // so that we can multiply them without overflow.
        const L0 = new Uint64(new Uint32Array([this.buffer[3], 0]));
        const L1 = new Uint64(new Uint32Array([this.buffer[2], 0]));
        const L2 = new Uint64(new Uint32Array([this.buffer[1], 0]));
        const L3 = new Uint64(new Uint32Array([this.buffer[0], 0]));
        const R0 = new Uint64(new Uint32Array([other.buffer[3], 0]));
        const R1 = new Uint64(new Uint32Array([other.buffer[2], 0]));
        const R2 = new Uint64(new Uint32Array([other.buffer[1], 0]));
        const R3 = new Uint64(new Uint32Array([other.buffer[0], 0]));
        let product = Uint64.multiply(L3, R3);
        this.buffer[0] = product.low();
        const sum = new Uint64(new Uint32Array([product.high(), 0]));
        product = Uint64.multiply(L2, R3);
        sum.plus(product);
        product = Uint64.multiply(L3, R2);
        sum.plus(product);
        this.buffer[1] = sum.low();
        this.buffer[3] = (sum.lessThan(product) ? 1 : 0);
        this.buffer[2] = sum.high();
        const high = new Uint64(new Uint32Array(this.buffer.buffer, this.buffer.byteOffset + 8, 2));
        high.plus(Uint64.multiply(L1, R3))
            .plus(Uint64.multiply(L2, R2))
            .plus(Uint64.multiply(L3, R1));
        this.buffer[3] += Uint64.multiply(L0, R3)
            .plus(Uint64.multiply(L1, R2))
            .plus(Uint64.multiply(L2, R1))
            .plus(Uint64.multiply(L3, R0)).low();
        return this;
    }
    plus(other) {
        const sums = new Uint32Array(4);
        sums[3] = (this.buffer[3] + other.buffer[3]) >>> 0;
        sums[2] = (this.buffer[2] + other.buffer[2]) >>> 0;
        sums[1] = (this.buffer[1] + other.buffer[1]) >>> 0;
        sums[0] = (this.buffer[0] + other.buffer[0]) >>> 0;
        if (sums[0] < (this.buffer[0] >>> 0)) {
            ++sums[1];
        }
        if (sums[1] < (this.buffer[1] >>> 0)) {
            ++sums[2];
        }
        if (sums[2] < (this.buffer[2] >>> 0)) {
            ++sums[3];
        }
        this.buffer[3] = sums[3];
        this.buffer[2] = sums[2];
        this.buffer[1] = sums[1];
        this.buffer[0] = sums[0];
        return this;
    }
    hex() {
        return `${intAsHex(this.buffer[3])} ${intAsHex(this.buffer[2])} ${intAsHex(this.buffer[1])} ${intAsHex(this.buffer[0])}`;
    }
    /** @nocollapse */
    static multiply(left, right) {
        const rtrn = new Int128(new Uint32Array(left.buffer));
        return rtrn.times(right);
    }
    /** @nocollapse */
    static add(left, right) {
        const rtrn = new Int128(new Uint32Array(left.buffer));
        return rtrn.plus(right);
    }
    /** @nocollapse */
    static from(val, out_buffer = new Uint32Array(4)) {
        return Int128.fromString(typeof (val) === 'string' ? val : val.toString(), out_buffer);
    }
    /** @nocollapse */
    static fromNumber(num, out_buffer = new Uint32Array(4)) {
        // Always parse numbers as strings - pulling out high and low bits
        // directly seems to lose precision sometimes
        // For example:
        //     > -4613034156400212000 >>> 0
        //     721782784
        // The correct lower 32-bits are 721782752
        return Int128.fromString(num.toString(), out_buffer);
    }
    /** @nocollapse */
    static fromString(str, out_buffer = new Uint32Array(4)) {
        // TODO: Assert that out_buffer is 0 and length = 4
        const negate = str.startsWith('-');
        const length = str.length;
        const out = new Int128(out_buffer);
        for (let posn = negate ? 1 : 0; posn < length;) {
            const group = kInt32DecimalDigits < length - posn ?
                kInt32DecimalDigits : length - posn;
            const chunk = new Int128(new Uint32Array([parseInt(str.substr(posn, group), 10), 0, 0, 0]));
            const multiple = new Int128(new Uint32Array([kPowersOfTen[group], 0, 0, 0]));
            out.times(multiple);
            out.plus(chunk);
            posn += group;
        }
        return negate ? out.negate() : out;
    }
    /** @nocollapse */
    static convertArray(values) {
        // TODO: Distinguish between string and number at compile-time
        const data = new Uint32Array(values.length * 4);
        for (let i = -1, n = values.length; ++i < n;) {
            Int128.from(values[i], new Uint32Array(data.buffer, data.byteOffset + 4 * 4 * i, 4));
        }
        return data;
    }
}

var util_int_ = /*#__PURE__*/Object.freeze({
    __proto__: null,
    BaseInt64: BaseInt64,
    Uint64: Uint64,
    Int64: Int64,
    Int128: Int128
});

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class VectorLoader extends Visitor {
    constructor(bytes, nodes, buffers, dictionaries) {
        super();
        this.nodesIndex = -1;
        this.buffersIndex = -1;
        this.bytes = bytes;
        this.nodes = nodes;
        this.buffers = buffers;
        this.dictionaries = dictionaries;
    }
    visit(node) {
        return super.visit(node instanceof Field ? node.type : node);
    }
    visitNull(type, { length, } = this.nextFieldNode()) { return Data.Null(type, 0, length); }
    visitBool(type, { length, nullCount } = this.nextFieldNode()) { return Data.Bool(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readData(type)); }
    visitInt(type, { length, nullCount } = this.nextFieldNode()) { return Data.Int(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readData(type)); }
    visitFloat(type, { length, nullCount } = this.nextFieldNode()) { return Data.Float(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readData(type)); }
    visitUtf8(type, { length, nullCount } = this.nextFieldNode()) { return Data.Utf8(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readOffsets(type), this.readData(type)); }
    visitBinary(type, { length, nullCount } = this.nextFieldNode()) { return Data.Binary(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readOffsets(type), this.readData(type)); }
    visitFixedSizeBinary(type, { length, nullCount } = this.nextFieldNode()) { return Data.FixedSizeBinary(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readData(type)); }
    visitDate(type, { length, nullCount } = this.nextFieldNode()) { return Data.Date(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readData(type)); }
    visitTimestamp(type, { length, nullCount } = this.nextFieldNode()) { return Data.Timestamp(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readData(type)); }
    visitTime(type, { length, nullCount } = this.nextFieldNode()) { return Data.Time(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readData(type)); }
    visitDecimal(type, { length, nullCount } = this.nextFieldNode()) { return Data.Decimal(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readData(type)); }
    visitList(type, { length, nullCount } = this.nextFieldNode()) { return Data.List(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readOffsets(type), this.visit(type.children[0])); }
    visitStruct(type, { length, nullCount } = this.nextFieldNode()) { return Data.Struct(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.visitMany(type.children)); }
    visitUnion(type) { return type.mode === UnionMode.Sparse ? this.visitSparseUnion(type) : this.visitDenseUnion(type); }
    visitDenseUnion(type, { length, nullCount } = this.nextFieldNode()) { return Data.Union(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readTypeIds(type), this.readOffsets(type), this.visitMany(type.children)); }
    visitSparseUnion(type, { length, nullCount } = this.nextFieldNode()) { return Data.Union(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readTypeIds(type), this.visitMany(type.children)); }
    visitDictionary(type, { length, nullCount } = this.nextFieldNode()) { return Data.Dictionary(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readData(type.indices), this.readDictionary(type)); }
    visitInterval(type, { length, nullCount } = this.nextFieldNode()) { return Data.Interval(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readData(type)); }
    visitFixedSizeList(type, { length, nullCount } = this.nextFieldNode()) { return Data.FixedSizeList(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.visit(type.children[0])); }
    visitMap(type, { length, nullCount } = this.nextFieldNode()) { return Data.Map(type, 0, length, nullCount, this.readNullBitmap(type, nullCount), this.readOffsets(type), this.visit(type.children[0])); }
    nextFieldNode() { return this.nodes[++this.nodesIndex]; }
    nextBufferRange() { return this.buffers[++this.buffersIndex]; }
    readNullBitmap(type, nullCount, buffer = this.nextBufferRange()) {
        return nullCount > 0 && this.readData(type, buffer) || new Uint8Array(0);
    }
    readOffsets(type, buffer) { return this.readData(type, buffer); }
    readTypeIds(type, buffer) { return this.readData(type, buffer); }
    readData(_type, { length, offset } = this.nextBufferRange()) {
        return this.bytes.subarray(offset, offset + length);
    }
    readDictionary(type) {
        return this.dictionaries.get(type.id);
    }
}
/** @ignore */
class JSONVectorLoader extends VectorLoader {
    constructor(sources, nodes, buffers, dictionaries) {
        super(new Uint8Array(0), nodes, buffers, dictionaries);
        this.sources = sources;
    }
    readNullBitmap(_type, nullCount, { offset } = this.nextBufferRange()) {
        return nullCount <= 0 ? new Uint8Array(0) : packBools(this.sources[offset]);
    }
    readOffsets(_type, { offset } = this.nextBufferRange()) {
        return toArrayBufferView(Uint8Array, toArrayBufferView(Int32Array, this.sources[offset]));
    }
    readTypeIds(type, { offset } = this.nextBufferRange()) {
        return toArrayBufferView(Uint8Array, toArrayBufferView(type.ArrayType, this.sources[offset]));
    }
    readData(type, { offset } = this.nextBufferRange()) {
        const { sources } = this;
        if (DataType.isTimestamp(type)) {
            return toArrayBufferView(Uint8Array, Int64.convertArray(sources[offset]));
        }
        else if ((DataType.isInt(type) || DataType.isTime(type)) && type.bitWidth === 64) {
            return toArrayBufferView(Uint8Array, Int64.convertArray(sources[offset]));
        }
        else if (DataType.isDate(type) && type.unit === DateUnit.MILLISECOND) {
            return toArrayBufferView(Uint8Array, Int64.convertArray(sources[offset]));
        }
        else if (DataType.isDecimal(type)) {
            return toArrayBufferView(Uint8Array, Int128.convertArray(sources[offset]));
        }
        else if (DataType.isBinary(type) || DataType.isFixedSizeBinary(type)) {
            return binaryDataFromJSON(sources[offset]);
        }
        else if (DataType.isBool(type)) {
            return packBools(sources[offset]);
        }
        else if (DataType.isUtf8(type)) {
            return encodeUtf8(sources[offset].join(''));
        }
        return toArrayBufferView(Uint8Array, toArrayBufferView(type.ArrayType, sources[offset].map((x) => +x)));
    }
}
/** @ignore */
function binaryDataFromJSON(values) {
    // "DATA": ["49BC7D5B6C47D2","3F5FB6D9322026"]
    // There are definitely more efficient ways to do this... but it gets the
    // job done.
    const joined = values.join('');
    const data = new Uint8Array(joined.length / 2);
    for (let i = 0; i < joined.length; i += 2) {
        data[i >> 1] = parseInt(joined.substr(i, 2), 16);
    }
    return data;
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */ const kParent = Symbol.for('parent');
/** @ignore */ const kRowIndex$1 = Symbol.for('rowIndex');
/** @ignore */ const kKeyToIdx = Symbol.for('keyToIdx');
/** @ignore */ const kIdxToVal = Symbol.for('idxToVal');
/** @ignore */ const kCustomInspect = Symbol.for('nodejs.util.inspect.custom');
class Row {
    constructor(parent, numKeys) {
        this[kParent] = parent;
        this.size = numKeys;
    }
    entries() { return this[Symbol.iterator](); }
    has(key) { return this.get(key) !== undefined; }
    get(key) {
        let val = undefined;
        if (key != null) {
            const ktoi = this[kKeyToIdx] || (this[kKeyToIdx] = new Map());
            let idx = ktoi.get(key);
            if (idx !== undefined) {
                const itov = this[kIdxToVal] || (this[kIdxToVal] = new Array(this.size));
                ((val = itov[idx]) !== undefined) || (itov[idx] = val = this.getValue(idx));
            }
            else if ((idx = this.getIndex(key)) > -1) {
                ktoi.set(key, idx);
                const itov = this[kIdxToVal] || (this[kIdxToVal] = new Array(this.size));
                ((val = itov[idx]) !== undefined) || (itov[idx] = val = this.getValue(idx));
            }
        }
        return val;
    }
    set(key, val) {
        if (key != null) {
            const ktoi = this[kKeyToIdx] || (this[kKeyToIdx] = new Map());
            let idx = ktoi.get(key);
            if (idx === undefined) {
                ktoi.set(key, idx = this.getIndex(key));
            }
            if (idx > -1) {
                const itov = this[kIdxToVal] || (this[kIdxToVal] = new Array(this.size));
                itov[idx] = this.setValue(idx, val);
            }
        }
        return this;
    }
    clear() { throw new Error(`Clearing ${this[Symbol.toStringTag]} not supported.`); }
    delete(_) { throw new Error(`Deleting ${this[Symbol.toStringTag]} values not supported.`); }
    *[Symbol.iterator]() {
        const ki = this.keys();
        const vi = this.values();
        const ktoi = this[kKeyToIdx] || (this[kKeyToIdx] = new Map());
        const itov = this[kIdxToVal] || (this[kIdxToVal] = new Array(this.size));
        for (let k, v, i = 0, kr, vr; !((kr = ki.next()).done || (vr = vi.next()).done); ++i) {
            k = kr.value;
            v = vr.value;
            itov[i] = v;
            ktoi.has(k) || ktoi.set(k, i);
            yield [k, v];
        }
    }
    forEach(callbackfn, thisArg) {
        const ki = this.keys();
        const vi = this.values();
        const callback = thisArg === undefined ? callbackfn :
            (v, k, m) => callbackfn.call(thisArg, v, k, m);
        const ktoi = this[kKeyToIdx] || (this[kKeyToIdx] = new Map());
        const itov = this[kIdxToVal] || (this[kIdxToVal] = new Array(this.size));
        for (let k, v, i = 0, kr, vr; !((kr = ki.next()).done || (vr = vi.next()).done); ++i) {
            k = kr.value;
            v = vr.value;
            itov[i] = v;
            ktoi.has(k) || ktoi.set(k, i);
            callback(v, k, this);
        }
    }
    toArray() { return [...this.values()]; }
    toJSON() {
        const obj = {};
        this.forEach((val, key) => obj[key] = val);
        return obj;
    }
    inspect() { return this.toString(); }
    [kCustomInspect]() { return this.toString(); }
    toString() {
        const str = [];
        this.forEach((val, key) => {
            key = valueToString(key);
            val = valueToString(val);
            str.push(`${key}: ${val}`);
        });
        return `{ ${str.join(', ')} }`;
    }
}
Row[Symbol.toStringTag] = ((proto) => {
    Object.defineProperties(proto, {
        'size': { writable: true, enumerable: false, configurable: false, value: 0 },
        [kParent]: { writable: true, enumerable: false, configurable: false, value: null },
        [kRowIndex$1]: { writable: true, enumerable: false, configurable: false, value: -1 },
    });
    return proto[Symbol.toStringTag] = 'Row';
})(Row.prototype);
class MapRow extends Row {
    constructor(slice) {
        super(slice, slice.length);
        return createRowProxy(this);
    }
    keys() {
        return this[kParent].getChildAt(0)[Symbol.iterator]();
    }
    values() {
        return this[kParent].getChildAt(1)[Symbol.iterator]();
    }
    getKey(idx) {
        return this[kParent].getChildAt(0).get(idx);
    }
    getIndex(key) {
        return this[kParent].getChildAt(0).indexOf(key);
    }
    getValue(index) {
        return this[kParent].getChildAt(1).get(index);
    }
    setValue(index, value) {
        this[kParent].getChildAt(1).set(index, value);
    }
}
class StructRow extends Row {
    constructor(parent) {
        super(parent, parent.type.children.length);
        return defineRowProxyProperties(this);
    }
    *keys() {
        for (const field of this[kParent].type.children) {
            yield field.name;
        }
    }
    *values() {
        for (const field of this[kParent].type.children) {
            yield this[field.name];
        }
    }
    getKey(idx) {
        return this[kParent].type.children[idx].name;
    }
    getIndex(key) {
        return this[kParent].type.children.findIndex((f) => f.name === key);
    }
    getValue(index) {
        return this[kParent].getChildAt(index).get(this[kRowIndex$1]);
    }
    setValue(index, value) {
        return this[kParent].getChildAt(index).set(this[kRowIndex$1], value);
    }
}
Object.setPrototypeOf(Row.prototype, Map.prototype);
/** @ignore */
const defineRowProxyProperties = (() => {
    const desc = { enumerable: true, configurable: false, get: null, set: null };
    return (row) => {
        let idx = -1;
        const ktoi = row[kKeyToIdx] || (row[kKeyToIdx] = new Map());
        const getter = (key) => function () { return this.get(key); };
        const setter = (key) => function (val) { return this.set(key, val); };
        for (const key of row.keys()) {
            ktoi.set(key, ++idx);
            desc.get = getter(key);
            desc.set = setter(key);
            Object.prototype.hasOwnProperty.call(row, key) || (desc.enumerable = true, Object.defineProperty(row, key, desc));
            Object.prototype.hasOwnProperty.call(row, idx) || (desc.enumerable = false, Object.defineProperty(row, idx, desc));
        }
        desc.get = desc.set = null;
        return row;
    };
})();
/** @ignore */
const createRowProxy = (() => {
    if (typeof Proxy === 'undefined') {
        return defineRowProxyProperties;
    }
    const has = Row.prototype.has;
    const get = Row.prototype.get;
    const set = Row.prototype.set;
    const getKey = Row.prototype.getKey;
    const RowProxyHandler = {
        isExtensible() { return false; },
        deleteProperty() { return false; },
        preventExtensions() { return true; },
        ownKeys(row) { return [...row.keys()].map((x) => `${x}`); },
        has(row, key) {
            switch (key) {
                case 'getKey':
                case 'getIndex':
                case 'getValue':
                case 'setValue':
                case 'toArray':
                case 'toJSON':
                case 'inspect':
                case 'constructor':
                case 'isPrototypeOf':
                case 'propertyIsEnumerable':
                case 'toString':
                case 'toLocaleString':
                case 'valueOf':
                case 'size':
                case 'has':
                case 'get':
                case 'set':
                case 'clear':
                case 'delete':
                case 'keys':
                case 'values':
                case 'entries':
                case 'forEach':
                case '__proto__':
                case '__defineGetter__':
                case '__defineSetter__':
                case 'hasOwnProperty':
                case '__lookupGetter__':
                case '__lookupSetter__':
                case Symbol.iterator:
                case Symbol.toStringTag:
                case kParent:
                case kRowIndex$1:
                case kIdxToVal:
                case kKeyToIdx:
                case kCustomInspect:
                    return true;
            }
            if (typeof key === 'number' && !row.has(key)) {
                key = row.getKey(key);
            }
            return row.has(key);
        },
        get(row, key, receiver) {
            switch (key) {
                case 'getKey':
                case 'getIndex':
                case 'getValue':
                case 'setValue':
                case 'toArray':
                case 'toJSON':
                case 'inspect':
                case 'constructor':
                case 'isPrototypeOf':
                case 'propertyIsEnumerable':
                case 'toString':
                case 'toLocaleString':
                case 'valueOf':
                case 'size':
                case 'has':
                case 'get':
                case 'set':
                case 'clear':
                case 'delete':
                case 'keys':
                case 'values':
                case 'entries':
                case 'forEach':
                case '__proto__':
                case '__defineGetter__':
                case '__defineSetter__':
                case 'hasOwnProperty':
                case '__lookupGetter__':
                case '__lookupSetter__':
                case Symbol.iterator:
                case Symbol.toStringTag:
                case kParent:
                case kRowIndex$1:
                case kIdxToVal:
                case kKeyToIdx:
                case kCustomInspect:
                    return Reflect.get(row, key, receiver);
            }
            if (typeof key === 'number' && !has.call(receiver, key)) {
                key = getKey.call(receiver, key);
            }
            return get.call(receiver, key);
        },
        set(row, key, val, receiver) {
            switch (key) {
                case kParent:
                case kRowIndex$1:
                case kIdxToVal:
                case kKeyToIdx:
                    return Reflect.set(row, key, val, receiver);
                case 'getKey':
                case 'getIndex':
                case 'getValue':
                case 'setValue':
                case 'toArray':
                case 'toJSON':
                case 'inspect':
                case 'constructor':
                case 'isPrototypeOf':
                case 'propertyIsEnumerable':
                case 'toString':
                case 'toLocaleString':
                case 'valueOf':
                case 'size':
                case 'has':
                case 'get':
                case 'set':
                case 'clear':
                case 'delete':
                case 'keys':
                case 'values':
                case 'entries':
                case 'forEach':
                case '__proto__':
                case '__defineGetter__':
                case '__defineSetter__':
                case 'hasOwnProperty':
                case '__lookupGetter__':
                case '__lookupSetter__':
                case Symbol.iterator:
                case Symbol.toStringTag:
                    return false;
            }
            if (typeof key === 'number' && !has.call(receiver, key)) {
                key = getKey.call(receiver, key);
            }
            return has.call(receiver, key) ? !!set.call(receiver, key, val) : false;
        },
    };
    return (row) => new Proxy(row, RowProxyHandler);
})();

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
function clampIndex(source, index, then) {
    const length = source.length;
    const adjust = index > -1 ? index : (length + (index % length));
    return then ? then(source, adjust) : adjust;
}
/** @ignore */
let tmp;
/** @ignore */
function clampRange(source, begin, end, then) {
    // Adjust args similar to Array.prototype.slice. Normalize begin/end to
    // clamp between 0 and length, and wrap around on negative indices, e.g.
    // slice(-1, 5) or slice(5, -1)
    const { length: len = 0 } = source;
    let lhs = typeof begin !== 'number' ? 0 : begin;
    let rhs = typeof end !== 'number' ? len : end;
    // wrap around on negative start/end positions
    (lhs < 0) && (lhs = ((lhs % len) + len) % len);
    (rhs < 0) && (rhs = ((rhs % len) + len) % len);
    // ensure lhs <= rhs
    (rhs < lhs) && (tmp = lhs, lhs = rhs, rhs = tmp);
    // ensure rhs <= length
    (rhs > len) && (rhs = len);
    return then ? then(source, lhs, rhs) : [lhs, rhs];
}
const big0 = BigIntAvailable ? BigIntCtor(0) : 0;
const isNaNFast = (value) => value !== value;
/** @ignore */
function createElementComparator(search) {
    const typeofSearch = typeof search;
    // Compare primitives
    if (typeofSearch !== 'object' || search === null) {
        // Compare NaN
        if (isNaNFast(search)) {
            return isNaNFast;
        }
        return typeofSearch !== 'bigint'
            ? (value) => value === search
            : (value) => (big0 + value) === search;
    }
    // Compare Dates
    if (search instanceof Date) {
        const valueOfSearch = search.valueOf();
        return (value) => value instanceof Date ? (value.valueOf() === valueOfSearch) : false;
    }
    // Compare TypedArrays
    if (ArrayBuffer.isView(search)) {
        return (value) => value ? compareArrayLike(search, value) : false;
    }
    // Compare Maps and Rows
    if (search instanceof Map) {
        return creatMapComparator(search);
    }
    // Compare Array-likes
    if (Array.isArray(search)) {
        return createArrayLikeComparator(search);
    }
    // Compare Vectors
    if (search instanceof AbstractVector) {
        return createVectorComparator(search);
    }
    // Compare non-empty Objects
    return createObjectComparator(search);
}
/** @ignore */
function createArrayLikeComparator(lhs) {
    const comparators = [];
    for (let i = -1, n = lhs.length; ++i < n;) {
        comparators[i] = createElementComparator(lhs[i]);
    }
    return createSubElementsComparator(comparators);
}
/** @ignore */
function creatMapComparator(lhs) {
    let i = -1;
    const comparators = [];
    lhs.forEach((v) => comparators[++i] = createElementComparator(v));
    return createSubElementsComparator(comparators);
}
/** @ignore */
function createVectorComparator(lhs) {
    const comparators = [];
    for (let i = -1, n = lhs.length; ++i < n;) {
        comparators[i] = createElementComparator(lhs.get(i));
    }
    return createSubElementsComparator(comparators);
}
/** @ignore */
function createObjectComparator(lhs) {
    const keys = Object.keys(lhs);
    // Only compare non-empty Objects
    if (keys.length === 0) {
        return () => false;
    }
    const comparators = [];
    for (let i = -1, n = keys.length; ++i < n;) {
        comparators[i] = createElementComparator(lhs[keys[i]]);
    }
    return createSubElementsComparator(comparators, keys);
}
function createSubElementsComparator(comparators, keys) {
    return (rhs) => {
        if (!rhs || typeof rhs !== 'object') {
            return false;
        }
        switch (rhs.constructor) {
            case Array: return compareArray(comparators, rhs);
            case Map:
            case MapRow:
            case StructRow:
                return compareObject(comparators, rhs, rhs.keys());
            case Object:
            case undefined: // support `Object.create(null)` objects
                return compareObject(comparators, rhs, keys || Object.keys(rhs));
        }
        return rhs instanceof AbstractVector ? compareVector(comparators, rhs) : false;
    };
}
function compareArray(comparators, arr) {
    const n = comparators.length;
    if (arr.length !== n) {
        return false;
    }
    for (let i = -1; ++i < n;) {
        if (!(comparators[i](arr[i]))) {
            return false;
        }
    }
    return true;
}
function compareVector(comparators, vec) {
    const n = comparators.length;
    if (vec.length !== n) {
        return false;
    }
    for (let i = -1; ++i < n;) {
        if (!(comparators[i](vec.get(i)))) {
            return false;
        }
    }
    return true;
}
function compareObject(comparators, obj, keys) {
    const lKeyItr = keys[Symbol.iterator]();
    const rKeyItr = obj instanceof Map ? obj.keys() : Object.keys(obj)[Symbol.iterator]();
    const rValItr = obj instanceof Map ? obj.values() : Object.values(obj)[Symbol.iterator]();
    let i = 0;
    const n = comparators.length;
    let rVal = rValItr.next();
    let lKey = lKeyItr.next();
    let rKey = rKeyItr.next();
    for (; i < n && !lKey.done && !rKey.done && !rVal.done; ++i, lKey = lKeyItr.next(), rKey = rKeyItr.next(), rVal = rValItr.next()) {
        if (lKey.value !== rKey.value || !comparators[i](rVal.value)) {
            break;
        }
    }
    if (i === n && lKey.done && rKey.done && rVal.done) {
        return true;
    }
    lKeyItr.return && lKeyItr.return();
    rKeyItr.return && rKeyItr.return();
    rValItr.return && rValItr.return();
    return false;
}

var util_vector_ = /*#__PURE__*/Object.freeze({
    __proto__: null,
    clampIndex: clampIndex,
    clampRange: clampRange,
    createElementComparator: createElementComparator
});

// Licensed to the Apache Software Foundation (ASF) under one
const isArray = Array.isArray;
/** @ignore */
function isTypedArray(arr) {
    return ArrayBuffer.isView(arr) && 'BYTES_PER_ELEMENT' in arr;
}
/** @ignore */
function arrayTypeToDataType$2(ctor) {
    switch (ctor) {
        case Int8Array: return Int8;
        case Int16Array: return Int16;
        case Int32Array: return Int32;
        case BigInt64Array: return Int64$1;
        case Uint8Array: return Uint8;
        case Uint16Array: return Uint16;
        case Uint32Array: return Uint32;
        case BigUint64Array: return Uint64$1;
        case Float32Array: return Float32;
        case Float64Array: return Float64;
        default: return null;
    }
}
/** @ignore */
function vectorFromTypedArray(array) {
    const ArrowType = arrayTypeToDataType$2(array.constructor);
    if (!ArrowType) {
        throw new TypeError('Unrecognized Array input');
    }
    const type = new ArrowType();
    const data = Data.new(type, 0, array.length, 0, [undefined, array]);
    return AbstractVector.new(data);
}
/** @ignore */
const selectArgs = (Ctor, vals) => _selectArgs(Ctor, vals, [], 0);
/** @ignore */
const selectColumnArgs = (args) => {
    const [fields, values] = _selectFieldArgs(args, [[], []]);
    return values.map((x, i) => x instanceof Column ? Column.new(x.field.clone(fields[i]), x) :
        x instanceof AbstractVector ? Column.new(fields[i], x) :
            isTypedArray(x) ? Column.new(fields[i], vectorFromTypedArray(x)) :
                Column.new(fields[i], []));
};
/** @ignore */
const selectFieldArgs = (args) => _selectFieldArgs(args, [[], []]);
/** @ignore */
const selectChunkArgs = (Ctor, vals) => _selectChunkArgs(Ctor, vals, [], 0);
/** @ignore */
const selectVectorChildrenArgs = (Ctor, vals) => _selectVectorChildrenArgs(Ctor, vals, [], 0);
/** @ignore */
const selectColumnChildrenArgs = (Ctor, vals) => _selectColumnChildrenArgs(Ctor, vals, [], 0);
/** @ignore */
function _selectArgs(Ctor, vals, res, idx) {
    let value, j = idx;
    let i = -1;
    const n = vals.length;
    while (++i < n) {
        if (isArray(value = vals[i])) {
            j = _selectArgs(Ctor, value, res, j).length;
        }
        else if (value instanceof Ctor) {
            res[j++] = value;
        }
    }
    return res;
}
/** @ignore */
function _selectChunkArgs(Ctor, vals, res, idx) {
    let value, j = idx;
    let i = -1;
    const n = vals.length;
    while (++i < n) {
        if (isArray(value = vals[i])) {
            j = _selectChunkArgs(Ctor, value, res, j).length;
        }
        else if (value instanceof Chunked) {
            j = _selectChunkArgs(Ctor, value.chunks, res, j).length;
        }
        else if (value instanceof Ctor) {
            res[j++] = value;
        }
    }
    return res;
}
/** @ignore */
function _selectVectorChildrenArgs(Ctor, vals, res, idx) {
    let value, j = idx;
    let i = -1;
    const n = vals.length;
    while (++i < n) {
        if (isArray(value = vals[i])) {
            j = _selectVectorChildrenArgs(Ctor, value, res, j).length;
        }
        else if (value instanceof Ctor) {
            j = _selectArgs(AbstractVector, value.schema.fields.map((_, i) => value.getChildAt(i)), res, j).length;
        }
        else if (value instanceof AbstractVector) {
            res[j++] = value;
        }
    }
    return res;
}
/** @ignore */
function _selectColumnChildrenArgs(Ctor, vals, res, idx) {
    let value, j = idx;
    let i = -1;
    const n = vals.length;
    while (++i < n) {
        if (isArray(value = vals[i])) {
            j = _selectColumnChildrenArgs(Ctor, value, res, j).length;
        }
        else if (value instanceof Ctor) {
            j = _selectArgs(Column, value.schema.fields.map((f, i) => Column.new(f, value.getChildAt(i))), res, j).length;
        }
        else if (value instanceof Column) {
            res[j++] = value;
        }
    }
    return res;
}
/** @ignore */
const toKeysAndValues = (xs, [k, v], i) => (xs[0][i] = k, xs[1][i] = v, xs);
/** @ignore */
function _selectFieldArgs(vals, ret) {
    let keys;
    let n;
    switch (n = vals.length) {
        case 0: return ret;
        case 1:
            keys = ret[0];
            if (!(vals[0])) {
                return ret;
            }
            if (isArray(vals[0])) {
                return _selectFieldArgs(vals[0], ret);
            }
            if (!(vals[0] instanceof Data || vals[0] instanceof AbstractVector || isTypedArray(vals[0]) || vals[0] instanceof DataType)) {
                [keys, vals] = Object.entries(vals[0]).reduce(toKeysAndValues, ret);
            }
            break;
        default:
            !isArray(keys = vals[n - 1])
                ? (vals = isArray(vals[0]) ? vals[0] : vals, keys = [])
                : (vals = isArray(vals[0]) ? vals[0] : vals.slice(0, n - 1));
    }
    let fieldIndex = -1;
    let valueIndex = -1;
    let idx = -1;
    const len = vals.length;
    let field;
    let val;
    const [fields, values] = ret;
    while (++idx < len) {
        val = vals[idx];
        if (val instanceof Column && (values[++valueIndex] = val)) {
            fields[++fieldIndex] = val.field.clone(keys[idx], val.type, true);
        }
        else {
            ({ [idx]: field = idx } = keys);
            if (val instanceof DataType && (values[++valueIndex] = val)) {
                fields[++fieldIndex] = Field.new(field, val, true);
            }
            else if ((val === null || val === void 0 ? void 0 : val.type) && (values[++valueIndex] = val)) {
                val instanceof Data && (values[valueIndex] = val = AbstractVector.new(val));
                fields[++fieldIndex] = Field.new(field, val.type, true);
            }
        }
    }
    return ret;
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class ChunkedIterator {
    constructor(chunks) {
        this.chunks = chunks;
        this.chunkIndex = 0;
        this.chunkIterator = this.getChunkIterator();
    }
    next() {
        while (this.chunkIndex < this.chunks.length) {
            const next = this.chunkIterator.next();
            if (!next.done) {
                return next;
            }
            if (++this.chunkIndex < this.chunks.length) {
                this.chunkIterator = this.getChunkIterator();
            }
        }
        return { done: true, value: null };
    }
    getChunkIterator() {
        return this.chunks[this.chunkIndex][Symbol.iterator]();
    }
    [Symbol.iterator]() {
        return this;
    }
}
/** @ignore */
class Chunked extends AbstractVector {
    constructor(type, chunks = [], offsets = calculateOffsets(chunks)) {
        super();
        this._nullCount = -1;
        this._type = type;
        this._chunks = chunks;
        this._chunkOffsets = offsets;
        this._length = offsets[offsets.length - 1];
        this._numChildren = (this._type.children || []).length;
    }
    /** @nocollapse */
    static flatten(...vectors) {
        return selectChunkArgs(AbstractVector, vectors);
    }
    /** @nocollapse */
    static concat(...vectors) {
        const chunks = Chunked.flatten(...vectors);
        return new Chunked(chunks[0].type, chunks);
    }
    get type() { return this._type; }
    get length() { return this._length; }
    get chunks() { return this._chunks; }
    get typeId() { return this._type.typeId; }
    get VectorName() { return `Chunked<${this._type}>`; }
    get data() {
        return this._chunks[0] ? this._chunks[0].data : null;
    }
    get ArrayType() { return this._type.ArrayType; }
    get numChildren() { return this._numChildren; }
    get stride() { return this._chunks[0] ? this._chunks[0].stride : 1; }
    get byteLength() {
        return this._chunks.reduce((byteLength, chunk) => byteLength + chunk.byteLength, 0);
    }
    get nullCount() {
        let nullCount = this._nullCount;
        if (nullCount < 0) {
            this._nullCount = nullCount = this._chunks.reduce((x, { nullCount }) => x + nullCount, 0);
        }
        return nullCount;
    }
    get indices() {
        if (DataType.isDictionary(this._type)) {
            if (!this._indices) {
                const chunks = this._chunks;
                this._indices = (chunks.length === 1
                    ? chunks[0].indices
                    : Chunked.concat(...chunks.map((x) => x.indices)));
            }
            return this._indices;
        }
        return null;
    }
    get dictionary() {
        if (DataType.isDictionary(this._type)) {
            return this._chunks[this._chunks.length - 1].data.dictionary;
        }
        return null;
    }
    [Symbol.iterator]() {
        return new ChunkedIterator(this._chunks);
    }
    clone(chunks = this._chunks) {
        return new Chunked(this._type, chunks);
    }
    concat(...others) {
        return this.clone(Chunked.flatten(this, ...others));
    }
    slice(begin, end) {
        return clampRange(this, begin, end, this._sliceInternal);
    }
    getChildAt(index) {
        if (index < 0 || index >= this._numChildren) {
            return null;
        }
        const columns = this._children || (this._children = []);
        let child, field, chunks;
        if (child = columns[index]) {
            return child;
        }
        if (field = (this._type.children || [])[index]) {
            chunks = this._chunks
                .map((vector) => vector.getChildAt(index))
                .filter((vec) => vec != null);
            if (chunks.length > 0) {
                return (columns[index] = new Chunked(field.type, chunks));
            }
        }
        return null;
    }
    search(index, then) {
        const idx = index;
        // binary search to find the child vector and value indices
        const offsets = this._chunkOffsets;
        let rhs = offsets.length - 1;
        // return early if out of bounds, or if there's just one child
        if (idx < 0) {
            return null;
        }
        if (idx >= offsets[rhs]) {
            return null;
        }
        if (rhs <= 1) {
            return then ? then(this, 0, idx) : [0, idx];
        }
        let lhs = 0, pos = 0, mid = 0;
        do {
            if (lhs + 1 === rhs) {
                return then ? then(this, lhs, idx - pos) : [lhs, idx - pos];
            }
            mid = lhs + ((rhs - lhs) / 2) | 0;
            idx >= offsets[mid] ? (lhs = mid) : (rhs = mid);
        } while (idx < offsets[rhs] && idx >= (pos = offsets[lhs]));
        return null;
    }
    isValid(index) {
        return !!this.search(index, this.isValidInternal);
    }
    get(index) {
        return this.search(index, this.getInternal);
    }
    set(index, value) {
        this.search(index, ({ chunks }, i, j) => chunks[i].set(j, value));
    }
    indexOf(element, offset) {
        if (offset && typeof offset === 'number') {
            return this.search(offset, (self, i, j) => this.indexOfInternal(self, i, j, element));
        }
        return this.indexOfInternal(this, 0, Math.max(0, offset || 0), element);
    }
    toArray() {
        const { chunks } = this;
        const n = chunks.length;
        let ArrayType = this._type.ArrayType;
        if (n <= 0) {
            return new ArrayType(0);
        }
        if (n <= 1) {
            return chunks[0].toArray();
        }
        let len = 0;
        const src = new Array(n);
        for (let i = -1; ++i < n;) {
            len += (src[i] = chunks[i].toArray()).length;
        }
        if (ArrayType !== src[0].constructor) {
            ArrayType = src[0].constructor;
        }
        const dst = new ArrayType(len);
        const set = ArrayType === Array ? arraySet : typedSet;
        for (let i = -1, idx = 0; ++i < n;) {
            idx = set(src[i], dst, idx);
        }
        return dst;
    }
    getInternal({ _chunks }, i, j) { return _chunks[i].get(j); }
    isValidInternal({ _chunks }, i, j) { return _chunks[i].isValid(j); }
    indexOfInternal({ _chunks }, chunkIndex, fromIndex, element) {
        let i = chunkIndex - 1;
        const n = _chunks.length;
        let start = fromIndex, offset = 0, found = -1;
        while (++i < n) {
            if (~(found = _chunks[i].indexOf(element, start))) {
                return offset + found;
            }
            start = 0;
            offset += _chunks[i].length;
        }
        return -1;
    }
    _sliceInternal(self, begin, end) {
        const slices = [];
        const { chunks, _chunkOffsets: chunkOffsets } = self;
        for (let i = -1, n = chunks.length; ++i < n;) {
            const chunk = chunks[i];
            const chunkLength = chunk.length;
            const chunkOffset = chunkOffsets[i];
            // If the child is to the right of the slice boundary, we can stop
            if (chunkOffset >= end) {
                break;
            }
            // If the child is to the left of of the slice boundary, exclude
            if (begin >= chunkOffset + chunkLength) {
                continue;
            }
            // If the child is between both left and right boundaries, include w/o slicing
            if (chunkOffset >= begin && (chunkOffset + chunkLength) <= end) {
                slices.push(chunk);
                continue;
            }
            // If the child overlaps one of the slice boundaries, include that slice
            const from = Math.max(0, begin - chunkOffset);
            const to = Math.min(end - chunkOffset, chunkLength);
            slices.push(chunk.slice(from, to));
        }
        return self.clone(slices);
    }
}
/** @ignore */
function calculateOffsets(vectors) {
    const offsets = new Uint32Array((vectors || []).length + 1);
    let offset = offsets[0] = 0;
    const length = offsets.length;
    for (let index = 0; ++index < length;) {
        offsets[index] = (offset += vectors[index - 1].length);
    }
    return offsets;
}
/** @ignore */
const typedSet = (src, dst, offset) => {
    dst.set(src, offset);
    return (offset + src.length);
};
/** @ignore */
const arraySet = (src, dst, offset) => {
    let idx = offset;
    for (let i = -1, n = src.length; ++i < n;) {
        dst[idx++] = src[i];
    }
    return idx;
};

// Licensed to the Apache Software Foundation (ASF) under one
class Column extends Chunked {
    constructor(field, vectors = [], offsets) {
        vectors = Chunked.flatten(...vectors);
        super(field.type, vectors, offsets);
        this._field = field;
        if (vectors.length === 1 && !(this instanceof SingleChunkColumn)) {
            return new SingleChunkColumn(field, vectors[0], this._chunkOffsets);
        }
    }
    /** @nocollapse */
    static new(...args) {
        let [field, data, ...rest] = args;
        if (typeof field !== 'string' && !(field instanceof Field)) {
            data = field;
            field = '';
        }
        const chunks = Chunked.flatten(Array.isArray(data) ? [...data, ...rest] :
            data instanceof AbstractVector ? [data, ...rest] :
                [AbstractVector.new(data, ...rest)]);
        if (typeof field === 'string') {
            const type = chunks[0].data.type;
            field = new Field(field, type, true);
        }
        else if (!field.nullable && chunks.some(({ nullCount }) => nullCount > 0)) {
            field = field.clone({ nullable: true });
        }
        return new Column(field, chunks);
    }
    get field() { return this._field; }
    get name() { return this._field.name; }
    get nullable() { return this._field.nullable; }
    get metadata() { return this._field.metadata; }
    clone(chunks = this._chunks) {
        return new Column(this._field, chunks);
    }
    getChildAt(index) {
        if (index < 0 || index >= this.numChildren) {
            return null;
        }
        const columns = this._children || (this._children = []);
        let column, field, chunks;
        if (column = columns[index]) {
            return column;
        }
        if (field = (this.type.children || [])[index]) {
            chunks = this._chunks
                .map((vector) => vector.getChildAt(index))
                .filter((vec) => vec != null);
            if (chunks.length > 0) {
                return (columns[index] = new Column(field, chunks));
            }
        }
        return null;
    }
}
/** @ignore */
class SingleChunkColumn extends Column {
    constructor(field, vector, offsets) {
        super(field, [vector], offsets);
        this._chunk = vector;
    }
    search(index, then) {
        return then ? then(this, 0, index) : [0, index];
    }
    isValid(index) {
        return this._chunk.isValid(index);
    }
    get(index) {
        return this._chunk.get(index);
    }
    set(index, value) {
        this._chunk.set(index, value);
    }
    indexOf(element, offset) {
        return this._chunk.indexOf(element, offset);
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
var Long$1 = flatbuffers.Long;
/** @ignore */
class TypeAssembler extends Visitor {
    visit(node, builder) {
        return (node == null || builder == null) ? undefined : super.visit(node, builder);
    }
    visitNull(_node, b) {
        Null$1.startNull(b);
        return Null$1.endNull(b);
    }
    visitInt(node, b) {
        Int.startInt(b);
        Int.addBitWidth(b, node.bitWidth);
        Int.addIsSigned(b, node.isSigned);
        return Int.endInt(b);
    }
    visitFloat(node, b) {
        FloatingPoint.startFloatingPoint(b);
        FloatingPoint.addPrecision(b, node.precision);
        return FloatingPoint.endFloatingPoint(b);
    }
    visitBinary(_node, b) {
        Binary$1.startBinary(b);
        return Binary$1.endBinary(b);
    }
    visitBool(_node, b) {
        Bool$1.startBool(b);
        return Bool$1.endBool(b);
    }
    visitUtf8(_node, b) {
        Utf8$1.startUtf8(b);
        return Utf8$1.endUtf8(b);
    }
    visitDecimal(node, b) {
        Decimal$1.startDecimal(b);
        Decimal$1.addScale(b, node.scale);
        Decimal$1.addPrecision(b, node.precision);
        return Decimal$1.endDecimal(b);
    }
    visitDate(node, b) {
        Date$1.startDate(b);
        Date$1.addUnit(b, node.unit);
        return Date$1.endDate(b);
    }
    visitTime(node, b) {
        Time.startTime(b);
        Time.addUnit(b, node.unit);
        Time.addBitWidth(b, node.bitWidth);
        return Time.endTime(b);
    }
    visitTimestamp(node, b) {
        const timezone = (node.timezone && b.createString(node.timezone)) || undefined;
        Timestamp.startTimestamp(b);
        Timestamp.addUnit(b, node.unit);
        if (timezone !== undefined) {
            Timestamp.addTimezone(b, timezone);
        }
        return Timestamp.endTimestamp(b);
    }
    visitInterval(node, b) {
        Interval.startInterval(b);
        Interval.addUnit(b, node.unit);
        return Interval.endInterval(b);
    }
    visitList(_node, b) {
        List$1.startList(b);
        return List$1.endList(b);
    }
    visitStruct(_node, b) {
        Struct_.startStruct_(b);
        return Struct_.endStruct_(b);
    }
    visitUnion(node, b) {
        Union.startTypeIdsVector(b, node.typeIds.length);
        const typeIds = Union.createTypeIdsVector(b, node.typeIds);
        Union.startUnion(b);
        Union.addMode(b, node.mode);
        Union.addTypeIds(b, typeIds);
        return Union.endUnion(b);
    }
    visitDictionary(node, b) {
        const indexType = this.visit(node.indices, b);
        DictionaryEncoding.startDictionaryEncoding(b);
        DictionaryEncoding.addId(b, new Long$1(node.id, 0));
        DictionaryEncoding.addIsOrdered(b, node.isOrdered);
        if (indexType !== undefined) {
            DictionaryEncoding.addIndexType(b, indexType);
        }
        return DictionaryEncoding.endDictionaryEncoding(b);
    }
    visitFixedSizeBinary(node, b) {
        FixedSizeBinary$1.startFixedSizeBinary(b);
        FixedSizeBinary$1.addByteWidth(b, node.byteWidth);
        return FixedSizeBinary$1.endFixedSizeBinary(b);
    }
    visitFixedSizeList(node, b) {
        FixedSizeList$1.startFixedSizeList(b);
        FixedSizeList$1.addListSize(b, node.listSize);
        return FixedSizeList$1.endFixedSizeList(b);
    }
    visitMap(node, b) {
        Map$1.startMap(b);
        Map$1.addKeysSorted(b, node.keysSorted);
        return Map$1.endMap(b);
    }
}
/** @ignore */
const instance$7 = new TypeAssembler();

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
function schemaFromJSON(_schema, dictionaries = new Map()) {
    return new Schema(schemaFieldsFromJSON(_schema, dictionaries), customMetadataFromJSON(_schema['customMetadata']), dictionaries);
}
/** @ignore */
function recordBatchFromJSON(b) {
    return new RecordBatch$1(b['count'], fieldNodesFromJSON(b['columns']), buffersFromJSON(b['columns']));
}
/** @ignore */
function dictionaryBatchFromJSON(b) {
    return new DictionaryBatch(recordBatchFromJSON(b['data']), b['id'], b['isDelta']);
}
/** @ignore */
function schemaFieldsFromJSON(_schema, dictionaries) {
    return (_schema['fields'] || []).filter(Boolean).map((f) => Field.fromJSON(f, dictionaries));
}
/** @ignore */
function fieldChildrenFromJSON(_field, dictionaries) {
    return (_field['children'] || []).filter(Boolean).map((f) => Field.fromJSON(f, dictionaries));
}
/** @ignore */
function fieldNodesFromJSON(xs) {
    return (xs || []).reduce((fieldNodes, column) => [
        ...fieldNodes,
        new FieldNode(column['count'], nullCountFromJSON(column['VALIDITY'])),
        ...fieldNodesFromJSON(column['children'])
    ], []);
}
/** @ignore */
function buffersFromJSON(xs, buffers = []) {
    for (let i = -1, n = (xs || []).length; ++i < n;) {
        const column = xs[i];
        column['VALIDITY'] && buffers.push(new BufferRegion(buffers.length, column['VALIDITY'].length));
        column['TYPE'] && buffers.push(new BufferRegion(buffers.length, column['TYPE'].length));
        column['OFFSET'] && buffers.push(new BufferRegion(buffers.length, column['OFFSET'].length));
        column['DATA'] && buffers.push(new BufferRegion(buffers.length, column['DATA'].length));
        buffers = buffersFromJSON(column['children'], buffers);
    }
    return buffers;
}
/** @ignore */
function nullCountFromJSON(validity) {
    return (validity || []).reduce((sum, val) => sum + +(val === 0), 0);
}
/** @ignore */
function fieldFromJSON(_field, dictionaries) {
    let id;
    let keys;
    let field;
    let dictMeta;
    let type;
    let dictType;
    // If no dictionary encoding
    if (!dictionaries || !(dictMeta = _field['dictionary'])) {
        type = typeFromJSON(_field, fieldChildrenFromJSON(_field, dictionaries));
        field = new Field(_field['name'], type, _field['nullable'], customMetadataFromJSON(_field['customMetadata']));
    }
    // If dictionary encoded and the first time we've seen this dictionary id, decode
    // the data type and child fields, then wrap in a Dictionary type and insert the
    // data type into the dictionary types map.
    else if (!dictionaries.has(id = dictMeta['id'])) {
        // a dictionary index defaults to signed 32 bit int if unspecified
        keys = (keys = dictMeta['indexType']) ? indexTypeFromJSON(keys) : new Int32();
        dictionaries.set(id, type = typeFromJSON(_field, fieldChildrenFromJSON(_field, dictionaries)));
        dictType = new Dictionary(type, keys, id, dictMeta['isOrdered']);
        field = new Field(_field['name'], dictType, _field['nullable'], customMetadataFromJSON(_field['customMetadata']));
    }
    // If dictionary encoded, and have already seen this dictionary Id in the schema, then reuse the
    // data type and wrap in a new Dictionary type and field.
    else {
        // a dictionary index defaults to signed 32 bit int if unspecified
        keys = (keys = dictMeta['indexType']) ? indexTypeFromJSON(keys) : new Int32();
        dictType = new Dictionary(dictionaries.get(id), keys, id, dictMeta['isOrdered']);
        field = new Field(_field['name'], dictType, _field['nullable'], customMetadataFromJSON(_field['customMetadata']));
    }
    return field || null;
}
/** @ignore */
function customMetadataFromJSON(_metadata) {
    return new Map(Object.entries(_metadata || {}));
}
/** @ignore */
function indexTypeFromJSON(_type) {
    return new Int_(_type['isSigned'], _type['bitWidth']);
}
/** @ignore */
function typeFromJSON(f, children) {
    const typeId = f['type']['name'];
    switch (typeId) {
        case 'NONE': return new Null();
        case 'null': return new Null();
        case 'binary': return new Binary();
        case 'utf8': return new Utf8();
        case 'bool': return new Bool();
        case 'list': return new List((children || [])[0]);
        case 'struct': return new Struct(children || []);
        case 'struct_': return new Struct(children || []);
    }
    switch (typeId) {
        case 'int': {
            const t = f['type'];
            return new Int_(t['isSigned'], t['bitWidth']);
        }
        case 'floatingpoint': {
            const t = f['type'];
            return new Float(Precision[t['precision']]);
        }
        case 'decimal': {
            const t = f['type'];
            return new Decimal(t['scale'], t['precision']);
        }
        case 'date': {
            const t = f['type'];
            return new Date_(DateUnit[t['unit']]);
        }
        case 'time': {
            const t = f['type'];
            return new Time_(TimeUnit[t['unit']], t['bitWidth']);
        }
        case 'timestamp': {
            const t = f['type'];
            return new Timestamp_(TimeUnit[t['unit']], t['timezone']);
        }
        case 'interval': {
            const t = f['type'];
            return new Interval_(IntervalUnit[t['unit']]);
        }
        case 'union': {
            const t = f['type'];
            return new Union_(UnionMode[t['mode']], (t['typeIds'] || []), children || []);
        }
        case 'fixedsizebinary': {
            const t = f['type'];
            return new FixedSizeBinary(t['byteWidth']);
        }
        case 'fixedsizelist': {
            const t = f['type'];
            return new FixedSizeList(t['listSize'], (children || [])[0]);
        }
        case 'map': {
            const t = f['type'];
            return new Map_((children || [])[0], t['keysSorted']);
        }
    }
    throw new Error(`Unrecognized type: "${typeId}"`);
}

// Licensed to the Apache Software Foundation (ASF) under one
var Long = flatbuffers.Long;
var Builder = flatbuffers.Builder;
var ByteBuffer$1 = flatbuffers.ByteBuffer;
/**
 * @ignore
 * @private
 **/
class Message {
    constructor(bodyLength, version, headerType, header) {
        this._version = version;
        this._headerType = headerType;
        this.body = new Uint8Array(0);
        header && (this._createHeader = () => header);
        this._bodyLength = typeof bodyLength === 'number' ? bodyLength : bodyLength.low;
    }
    /** @nocollapse */
    static fromJSON(msg, headerType) {
        const message = new Message(0, MetadataVersion.V4, headerType);
        message._createHeader = messageHeaderFromJSON(msg, headerType);
        return message;
    }
    /** @nocollapse */
    static decode(buf) {
        buf = new ByteBuffer$1(toUint8Array(buf));
        const _message = Message$1.getRootAsMessage(buf);
        const bodyLength = _message.bodyLength();
        const version = _message.version();
        const headerType = _message.headerType();
        const message = new Message(bodyLength, version, headerType);
        message._createHeader = decodeMessageHeader(_message, headerType);
        return message;
    }
    /** @nocollapse */
    static encode(message) {
        const b = new Builder();
        let headerOffset = -1;
        if (message.isSchema()) {
            headerOffset = Schema.encode(b, message.header());
        }
        else if (message.isRecordBatch()) {
            headerOffset = RecordBatch$1.encode(b, message.header());
        }
        else if (message.isDictionaryBatch()) {
            headerOffset = DictionaryBatch.encode(b, message.header());
        }
        Message$1.startMessage(b);
        Message$1.addVersion(b, MetadataVersion.V4);
        Message$1.addHeader(b, headerOffset);
        Message$1.addHeaderType(b, message.headerType);
        Message$1.addBodyLength(b, new Long(message.bodyLength, 0));
        Message$1.finishMessageBuffer(b, Message$1.endMessage(b));
        return b.asUint8Array();
    }
    /** @nocollapse */
    static from(header, bodyLength = 0) {
        if (header instanceof Schema) {
            return new Message(0, MetadataVersion.V4, MessageHeader.Schema, header);
        }
        if (header instanceof RecordBatch$1) {
            return new Message(bodyLength, MetadataVersion.V4, MessageHeader.RecordBatch, header);
        }
        if (header instanceof DictionaryBatch) {
            return new Message(bodyLength, MetadataVersion.V4, MessageHeader.DictionaryBatch, header);
        }
        throw new Error(`Unrecognized Message header: ${header}`);
    }
    get type() { return this.headerType; }
    get version() { return this._version; }
    get headerType() { return this._headerType; }
    get bodyLength() { return this._bodyLength; }
    header() { return this._createHeader(); }
    isSchema() { return this.headerType === MessageHeader.Schema; }
    isRecordBatch() { return this.headerType === MessageHeader.RecordBatch; }
    isDictionaryBatch() { return this.headerType === MessageHeader.DictionaryBatch; }
}
/**
 * @ignore
 * @private
 **/
class RecordBatch$1 {
    constructor(length, nodes, buffers) {
        this._nodes = nodes;
        this._buffers = buffers;
        this._length = typeof length === 'number' ? length : length.low;
    }
    get nodes() { return this._nodes; }
    get length() { return this._length; }
    get buffers() { return this._buffers; }
}
/**
 * @ignore
 * @private
 **/
class DictionaryBatch {
    constructor(data, id, isDelta = false) {
        this._data = data;
        this._isDelta = isDelta;
        this._id = typeof id === 'number' ? id : id.low;
    }
    get id() { return this._id; }
    get data() { return this._data; }
    get isDelta() { return this._isDelta; }
    get length() { return this.data.length; }
    get nodes() { return this.data.nodes; }
    get buffers() { return this.data.buffers; }
}
/**
 * @ignore
 * @private
 **/
class BufferRegion {
    constructor(offset, length) {
        this.offset = typeof offset === 'number' ? offset : offset.low;
        this.length = typeof length === 'number' ? length : length.low;
    }
}
/**
 * @ignore
 * @private
 **/
class FieldNode {
    constructor(length, nullCount) {
        this.length = typeof length === 'number' ? length : length.low;
        this.nullCount = typeof nullCount === 'number' ? nullCount : nullCount.low;
    }
}
/** @ignore */
function messageHeaderFromJSON(message, type) {
    return (() => {
        switch (type) {
            case MessageHeader.Schema: return Schema.fromJSON(message);
            case MessageHeader.RecordBatch: return RecordBatch$1.fromJSON(message);
            case MessageHeader.DictionaryBatch: return DictionaryBatch.fromJSON(message);
        }
        throw new Error(`Unrecognized Message type: { name: ${MessageHeader[type]}, type: ${type} }`);
    });
}
/** @ignore */
function decodeMessageHeader(message, type) {
    return (() => {
        switch (type) {
            case MessageHeader.Schema: return Schema.decode(message.header(new Schema$1()));
            case MessageHeader.RecordBatch: return RecordBatch$1.decode(message.header(new RecordBatch$2()), message.version());
            case MessageHeader.DictionaryBatch: return DictionaryBatch.decode(message.header(new DictionaryBatch$1()), message.version());
        }
        throw new Error(`Unrecognized Message type: { name: ${MessageHeader[type]}, type: ${type} }`);
    });
}
Field['encode'] = encodeField;
Field['decode'] = decodeField;
Field['fromJSON'] = fieldFromJSON;
Schema['encode'] = encodeSchema;
Schema['decode'] = decodeSchema;
Schema['fromJSON'] = schemaFromJSON;
RecordBatch$1['encode'] = encodeRecordBatch;
RecordBatch$1['decode'] = decodeRecordBatch;
RecordBatch$1['fromJSON'] = recordBatchFromJSON;
DictionaryBatch['encode'] = encodeDictionaryBatch;
DictionaryBatch['decode'] = decodeDictionaryBatch;
DictionaryBatch['fromJSON'] = dictionaryBatchFromJSON;
FieldNode['encode'] = encodeFieldNode;
FieldNode['decode'] = decodeFieldNode;
BufferRegion['encode'] = encodeBufferRegion;
BufferRegion['decode'] = decodeBufferRegion;
/** @ignore */
function decodeSchema(_schema, dictionaries = new Map()) {
    const fields = decodeSchemaFields(_schema, dictionaries);
    return new Schema(fields, decodeCustomMetadata(_schema), dictionaries);
}
/** @ignore */
function decodeRecordBatch(batch, version = MetadataVersion.V4) {
    return new RecordBatch$1(batch.length(), decodeFieldNodes(batch), decodeBuffers(batch, version));
}
/** @ignore */
function decodeDictionaryBatch(batch, version = MetadataVersion.V4) {
    return new DictionaryBatch(RecordBatch$1.decode(batch.data(), version), batch.id(), batch.isDelta());
}
/** @ignore */
function decodeBufferRegion(b) {
    return new BufferRegion(b.offset(), b.length());
}
/** @ignore */
function decodeFieldNode(f) {
    return new FieldNode(f.length(), f.nullCount());
}
/** @ignore */
function decodeFieldNodes(batch) {
    const nodes = [];
    for (let f, i = -1, j = -1, n = batch.nodesLength(); ++i < n;) {
        if (f = batch.nodes(i)) {
            nodes[++j] = FieldNode.decode(f);
        }
    }
    return nodes;
}
/** @ignore */
function decodeBuffers(batch, version) {
    const bufferRegions = [];
    for (let b, i = -1, j = -1, n = batch.buffersLength(); ++i < n;) {
        if (b = batch.buffers(i)) {
            // If this Arrow buffer was written before version 4,
            // advance the buffer's bb_pos 8 bytes to skip past
            // the now-removed page_id field
            if (version < MetadataVersion.V4) {
                b.bb_pos += (8 * (i + 1));
            }
            bufferRegions[++j] = BufferRegion.decode(b);
        }
    }
    return bufferRegions;
}
/** @ignore */
function decodeSchemaFields(schema, dictionaries) {
    const fields = [];
    for (let f, i = -1, j = -1, n = schema.fieldsLength(); ++i < n;) {
        if (f = schema.fields(i)) {
            fields[++j] = Field.decode(f, dictionaries);
        }
    }
    return fields;
}
/** @ignore */
function decodeFieldChildren(field, dictionaries) {
    const children = [];
    for (let f, i = -1, j = -1, n = field.childrenLength(); ++i < n;) {
        if (f = field.children(i)) {
            children[++j] = Field.decode(f, dictionaries);
        }
    }
    return children;
}
/** @ignore */
function decodeField(f, dictionaries) {
    let id;
    let field;
    let type;
    let keys;
    let dictType;
    let dictMeta;
    // If no dictionary encoding
    if (!dictionaries || !(dictMeta = f.dictionary())) {
        type = decodeFieldType(f, decodeFieldChildren(f, dictionaries));
        field = new Field(f.name(), type, f.nullable(), decodeCustomMetadata(f));
    }
    // If dictionary encoded and the first time we've seen this dictionary id, decode
    // the data type and child fields, then wrap in a Dictionary type and insert the
    // data type into the dictionary types map.
    else if (!dictionaries.has(id = dictMeta.id().low)) {
        // a dictionary index defaults to signed 32 bit int if unspecified
        keys = (keys = dictMeta.indexType()) ? decodeIndexType(keys) : new Int32();
        dictionaries.set(id, type = decodeFieldType(f, decodeFieldChildren(f, dictionaries)));
        dictType = new Dictionary(type, keys, id, dictMeta.isOrdered());
        field = new Field(f.name(), dictType, f.nullable(), decodeCustomMetadata(f));
    }
    // If dictionary encoded, and have already seen this dictionary Id in the schema, then reuse the
    // data type and wrap in a new Dictionary type and field.
    else {
        // a dictionary index defaults to signed 32 bit int if unspecified
        keys = (keys = dictMeta.indexType()) ? decodeIndexType(keys) : new Int32();
        dictType = new Dictionary(dictionaries.get(id), keys, id, dictMeta.isOrdered());
        field = new Field(f.name(), dictType, f.nullable(), decodeCustomMetadata(f));
    }
    return field || null;
}
/** @ignore */
function decodeCustomMetadata(parent) {
    const data = new Map();
    if (parent) {
        for (let entry, key, i = -1, n = parent.customMetadataLength() | 0; ++i < n;) {
            if ((entry = parent.customMetadata(i)) && (key = entry.key()) != null) {
                data.set(key, entry.value());
            }
        }
    }
    return data;
}
/** @ignore */
function decodeIndexType(_type) {
    return new Int_(_type.isSigned(), _type.bitWidth());
}
/** @ignore */
function decodeFieldType(f, children) {
    const typeId = f.typeType();
    switch (typeId) {
        case Type$1['NONE']: return new Null();
        case Type$1['Null']: return new Null();
        case Type$1['Binary']: return new Binary();
        case Type$1['Utf8']: return new Utf8();
        case Type$1['Bool']: return new Bool();
        case Type$1['List']: return new List((children || [])[0]);
        case Type$1['Struct_']: return new Struct(children || []);
    }
    switch (typeId) {
        case Type$1['Int']: {
            const t = f.type(new Int());
            return new Int_(t.isSigned(), t.bitWidth());
        }
        case Type$1['FloatingPoint']: {
            const t = f.type(new FloatingPoint());
            return new Float(t.precision());
        }
        case Type$1['Decimal']: {
            const t = f.type(new Decimal$1());
            return new Decimal(t.scale(), t.precision());
        }
        case Type$1['Date']: {
            const t = f.type(new Date$1());
            return new Date_(t.unit());
        }
        case Type$1['Time']: {
            const t = f.type(new Time());
            return new Time_(t.unit(), t.bitWidth());
        }
        case Type$1['Timestamp']: {
            const t = f.type(new Timestamp());
            return new Timestamp_(t.unit(), t.timezone());
        }
        case Type$1['Interval']: {
            const t = f.type(new Interval());
            return new Interval_(t.unit());
        }
        case Type$1['Union']: {
            const t = f.type(new Union());
            return new Union_(t.mode(), t.typeIdsArray() || [], children || []);
        }
        case Type$1['FixedSizeBinary']: {
            const t = f.type(new FixedSizeBinary$1());
            return new FixedSizeBinary(t.byteWidth());
        }
        case Type$1['FixedSizeList']: {
            const t = f.type(new FixedSizeList$1());
            return new FixedSizeList(t.listSize(), (children || [])[0]);
        }
        case Type$1['Map']: {
            const t = f.type(new Map$1());
            return new Map_((children || [])[0], t.keysSorted());
        }
    }
    throw new Error(`Unrecognized type: "${Type$1[typeId]}" (${typeId})`);
}
/** @ignore */
function encodeSchema(b, schema) {
    const fieldOffsets = schema.fields.map((f) => Field.encode(b, f));
    Schema$1.startFieldsVector(b, fieldOffsets.length);
    const fieldsVectorOffset = Schema$1.createFieldsVector(b, fieldOffsets);
    const metadataOffset = !(schema.metadata && schema.metadata.size > 0) ? -1 :
        Schema$1.createCustomMetadataVector(b, [...schema.metadata].map(([k, v]) => {
            const key = b.createString(`${k}`);
            const val = b.createString(`${v}`);
            KeyValue.startKeyValue(b);
            KeyValue.addKey(b, key);
            KeyValue.addValue(b, val);
            return KeyValue.endKeyValue(b);
        }));
    Schema$1.startSchema(b);
    Schema$1.addFields(b, fieldsVectorOffset);
    Schema$1.addEndianness(b, platformIsLittleEndian ? Endianness.Little : Endianness.Big);
    if (metadataOffset !== -1) {
        Schema$1.addCustomMetadata(b, metadataOffset);
    }
    return Schema$1.endSchema(b);
}
/** @ignore */
function encodeField(b, field) {
    let nameOffset = -1;
    let typeOffset = -1;
    let dictionaryOffset = -1;
    const type = field.type;
    let typeId = field.typeId;
    if (!DataType.isDictionary(type)) {
        typeOffset = instance$7.visit(type, b);
    }
    else {
        typeId = type.dictionary.typeId;
        dictionaryOffset = instance$7.visit(type, b);
        typeOffset = instance$7.visit(type.dictionary, b);
    }
    const childOffsets = (type.children || []).map((f) => Field.encode(b, f));
    const childrenVectorOffset = Field$1.createChildrenVector(b, childOffsets);
    const metadataOffset = !(field.metadata && field.metadata.size > 0) ? -1 :
        Field$1.createCustomMetadataVector(b, [...field.metadata].map(([k, v]) => {
            const key = b.createString(`${k}`);
            const val = b.createString(`${v}`);
            KeyValue.startKeyValue(b);
            KeyValue.addKey(b, key);
            KeyValue.addValue(b, val);
            return KeyValue.endKeyValue(b);
        }));
    if (field.name) {
        nameOffset = b.createString(field.name);
    }
    Field$1.startField(b);
    Field$1.addType(b, typeOffset);
    Field$1.addTypeType(b, typeId);
    Field$1.addChildren(b, childrenVectorOffset);
    Field$1.addNullable(b, !!field.nullable);
    if (nameOffset !== -1) {
        Field$1.addName(b, nameOffset);
    }
    if (dictionaryOffset !== -1) {
        Field$1.addDictionary(b, dictionaryOffset);
    }
    if (metadataOffset !== -1) {
        Field$1.addCustomMetadata(b, metadataOffset);
    }
    return Field$1.endField(b);
}
/** @ignore */
function encodeRecordBatch(b, recordBatch) {
    const nodes = recordBatch.nodes || [];
    const buffers = recordBatch.buffers || [];
    RecordBatch$2.startNodesVector(b, nodes.length);
    nodes.slice().reverse().forEach((n) => FieldNode.encode(b, n));
    const nodesVectorOffset = b.endVector();
    RecordBatch$2.startBuffersVector(b, buffers.length);
    buffers.slice().reverse().forEach((b_) => BufferRegion.encode(b, b_));
    const buffersVectorOffset = b.endVector();
    RecordBatch$2.startRecordBatch(b);
    RecordBatch$2.addLength(b, new Long(recordBatch.length, 0));
    RecordBatch$2.addNodes(b, nodesVectorOffset);
    RecordBatch$2.addBuffers(b, buffersVectorOffset);
    return RecordBatch$2.endRecordBatch(b);
}
/** @ignore */
function encodeDictionaryBatch(b, dictionaryBatch) {
    const dataOffset = RecordBatch$1.encode(b, dictionaryBatch.data);
    DictionaryBatch$1.startDictionaryBatch(b);
    DictionaryBatch$1.addId(b, new Long(dictionaryBatch.id, 0));
    DictionaryBatch$1.addIsDelta(b, dictionaryBatch.isDelta);
    DictionaryBatch$1.addData(b, dataOffset);
    return DictionaryBatch$1.endDictionaryBatch(b);
}
/** @ignore */
function encodeFieldNode(b, node) {
    return FieldNode$1.createFieldNode(b, new Long(node.length, 0), new Long(node.nullCount, 0));
}
/** @ignore */
function encodeBufferRegion(b, node) {
    return Buffer.createBuffer(b, new Long(node.offset, 0), new Long(node.length, 0));
}
/** @ignore */
const platformIsLittleEndian = (function () {
    const buffer = new ArrayBuffer(2);
    new DataView(buffer).setInt16(0, 256, true /* littleEndian */);
    // Int16Array uses the platform's endianness.
    return new Int16Array(buffer)[0] === 256;
})();

// Licensed to the Apache Software Foundation (ASF) under one
var ByteBuffer = flatbuffers.ByteBuffer;
/** @ignore */ const invalidMessageType = (type) => `Expected ${MessageHeader[type]} Message in stream, but was null or length 0.`;
/** @ignore */ const nullMessage = (type) => `Header pointer of flatbuffer-encoded ${MessageHeader[type]} Message is null or length 0.`;
/** @ignore */ const invalidMessageMetadata = (expected, actual) => `Expected to read ${expected} metadata bytes, but only read ${actual}.`;
/** @ignore */ const invalidMessageBodyLength = (expected, actual) => `Expected to read ${expected} bytes for message body, but only read ${actual}.`;
/** @ignore */
class MessageReader {
    constructor(source) {
        this.source = source instanceof ByteStream ? source : new ByteStream(source);
    }
    [Symbol.iterator]() { return this; }
    next() {
        let r;
        if ((r = this.readMetadataLength()).done) {
            return ITERATOR_DONE;
        }
        // ARROW-6313: If the first 4 bytes are continuation indicator (-1), read
        // the next 4 for the 32-bit metadata length. Otherwise, assume this is a
        // pre-v0.15 message, where the first 4 bytes are the metadata length.
        if ((r.value === -1) &&
            (r = this.readMetadataLength()).done) {
            return ITERATOR_DONE;
        }
        if ((r = this.readMetadata(r.value)).done) {
            return ITERATOR_DONE;
        }
        return r;
    }
    throw(value) { return this.source.throw(value); }
    return(value) { return this.source.return(value); }
    readMessage(type) {
        let r;
        if ((r = this.next()).done) {
            return null;
        }
        if ((type != null) && r.value.headerType !== type) {
            throw new Error(invalidMessageType(type));
        }
        return r.value;
    }
    readMessageBody(bodyLength) {
        if (bodyLength <= 0) {
            return new Uint8Array(0);
        }
        const buf = toUint8Array(this.source.read(bodyLength));
        if (buf.byteLength < bodyLength) {
            throw new Error(invalidMessageBodyLength(bodyLength, buf.byteLength));
        }
        // 1. Work around bugs in fs.ReadStream's internal Buffer pooling, see: https://github.com/nodejs/node/issues/24817
        // 2. Work around https://github.com/whatwg/streams/blob/0ebe4b042e467d9876d80ae045de3843092ad797/reference-implementation/lib/helpers.js#L126
        return /* 1. */ (buf.byteOffset % 8 === 0) &&
            /* 2. */ (buf.byteOffset + buf.byteLength) <= buf.buffer.byteLength ? buf : buf.slice();
    }
    readSchema(throwIfNull = false) {
        const type = MessageHeader.Schema;
        const message = this.readMessage(type);
        const schema = message === null || message === void 0 ? void 0 : message.header();
        if (throwIfNull && !schema) {
            throw new Error(nullMessage(type));
        }
        return schema;
    }
    readMetadataLength() {
        const buf = this.source.read(PADDING);
        const bb = buf && new ByteBuffer(buf);
        const len = (bb === null || bb === void 0 ? void 0 : bb.readInt32(0)) || 0;
        return { done: len === 0, value: len };
    }
    readMetadata(metadataLength) {
        const buf = this.source.read(metadataLength);
        if (!buf) {
            return ITERATOR_DONE;
        }
        if (buf.byteLength < metadataLength) {
            throw new Error(invalidMessageMetadata(metadataLength, buf.byteLength));
        }
        return { done: false, value: Message.decode(buf) };
    }
}
/** @ignore */
class AsyncMessageReader {
    constructor(source, byteLength) {
        this.source = source instanceof AsyncByteStream ? source
            : isFileHandle(source)
                ? new AsyncRandomAccessFile(source, byteLength)
                : new AsyncByteStream(source);
    }
    [Symbol.asyncIterator]() { return this; }
    next() {
        return __awaiter(this, void 0, void 0, function* () {
            let r;
            if ((r = yield this.readMetadataLength()).done) {
                return ITERATOR_DONE;
            }
            // ARROW-6313: If the first 4 bytes are continuation indicator (-1), read
            // the next 4 for the 32-bit metadata length. Otherwise, assume this is a
            // pre-v0.15 message, where the first 4 bytes are the metadata length.
            if ((r.value === -1) &&
                (r = yield this.readMetadataLength()).done) {
                return ITERATOR_DONE;
            }
            if ((r = yield this.readMetadata(r.value)).done) {
                return ITERATOR_DONE;
            }
            return r;
        });
    }
    throw(value) {
        return __awaiter(this, void 0, void 0, function* () { return yield this.source.throw(value); });
    }
    return(value) {
        return __awaiter(this, void 0, void 0, function* () { return yield this.source.return(value); });
    }
    readMessage(type) {
        return __awaiter(this, void 0, void 0, function* () {
            let r;
            if ((r = yield this.next()).done) {
                return null;
            }
            if ((type != null) && r.value.headerType !== type) {
                throw new Error(invalidMessageType(type));
            }
            return r.value;
        });
    }
    readMessageBody(bodyLength) {
        return __awaiter(this, void 0, void 0, function* () {
            if (bodyLength <= 0) {
                return new Uint8Array(0);
            }
            const buf = toUint8Array(yield this.source.read(bodyLength));
            if (buf.byteLength < bodyLength) {
                throw new Error(invalidMessageBodyLength(bodyLength, buf.byteLength));
            }
            // 1. Work around bugs in fs.ReadStream's internal Buffer pooling, see: https://github.com/nodejs/node/issues/24817
            // 2. Work around https://github.com/whatwg/streams/blob/0ebe4b042e467d9876d80ae045de3843092ad797/reference-implementation/lib/helpers.js#L126
            return /* 1. */ (buf.byteOffset % 8 === 0) &&
                /* 2. */ (buf.byteOffset + buf.byteLength) <= buf.buffer.byteLength ? buf : buf.slice();
        });
    }
    readSchema(throwIfNull = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = MessageHeader.Schema;
            const message = yield this.readMessage(type);
            const schema = message === null || message === void 0 ? void 0 : message.header();
            if (throwIfNull && !schema) {
                throw new Error(nullMessage(type));
            }
            return schema;
        });
    }
    readMetadataLength() {
        return __awaiter(this, void 0, void 0, function* () {
            const buf = yield this.source.read(PADDING);
            const bb = buf && new ByteBuffer(buf);
            const len = (bb === null || bb === void 0 ? void 0 : bb.readInt32(0)) || 0;
            return { done: len === 0, value: len };
        });
    }
    readMetadata(metadataLength) {
        return __awaiter(this, void 0, void 0, function* () {
            const buf = yield this.source.read(metadataLength);
            if (!buf) {
                return ITERATOR_DONE;
            }
            if (buf.byteLength < metadataLength) {
                throw new Error(invalidMessageMetadata(metadataLength, buf.byteLength));
            }
            return { done: false, value: Message.decode(buf) };
        });
    }
}
/** @ignore */
class JSONMessageReader extends MessageReader {
    constructor(source) {
        super(new Uint8Array(0));
        this._schema = false;
        this._body = [];
        this._batchIndex = 0;
        this._dictionaryIndex = 0;
        this._json = source instanceof ArrowJSON ? source : new ArrowJSON(source);
    }
    next() {
        const { _json } = this;
        if (!this._schema) {
            this._schema = true;
            const message = Message.fromJSON(_json.schema, MessageHeader.Schema);
            return { done: false, value: message };
        }
        if (this._dictionaryIndex < _json.dictionaries.length) {
            const batch = _json.dictionaries[this._dictionaryIndex++];
            this._body = batch['data']['columns'];
            const message = Message.fromJSON(batch, MessageHeader.DictionaryBatch);
            return { done: false, value: message };
        }
        if (this._batchIndex < _json.batches.length) {
            const batch = _json.batches[this._batchIndex++];
            this._body = batch['columns'];
            const message = Message.fromJSON(batch, MessageHeader.RecordBatch);
            return { done: false, value: message };
        }
        this._body = [];
        return ITERATOR_DONE;
    }
    readMessageBody(_bodyLength) {
        return flattenDataSources(this._body);
        function flattenDataSources(xs) {
            return (xs || []).reduce((buffers, column) => [
                ...buffers,
                ...(column['VALIDITY'] && [column['VALIDITY']] || []),
                ...(column['TYPE'] && [column['TYPE']] || []),
                ...(column['OFFSET'] && [column['OFFSET']] || []),
                ...(column['DATA'] && [column['DATA']] || []),
                ...flattenDataSources(column['children'])
            ], []);
        }
    }
    readMessage(type) {
        let r;
        if ((r = this.next()).done) {
            return null;
        }
        if ((type != null) && r.value.headerType !== type) {
            throw new Error(invalidMessageType(type));
        }
        return r.value;
    }
    readSchema() {
        const type = MessageHeader.Schema;
        const message = this.readMessage(type);
        const schema = message === null || message === void 0 ? void 0 : message.header();
        if (!message || !schema) {
            throw new Error(nullMessage(type));
        }
        return schema;
    }
}
/** @ignore */
const PADDING = 4;
/** @ignore */
const MAGIC_STR = 'ARROW1';
/** @ignore */
const MAGIC = new Uint8Array(MAGIC_STR.length);
for (let i = 0; i < MAGIC_STR.length; i += 1 | 0) {
    MAGIC[i] = MAGIC_STR.charCodeAt(i);
}
/** @ignore */
function checkForMagicArrowString(buffer, index = 0) {
    for (let i = -1, n = MAGIC.length; ++i < n;) {
        if (MAGIC[i] !== buffer[index + i]) {
            return false;
        }
    }
    return true;
}
/** @ignore */
const magicLength = MAGIC.length;
/** @ignore */
const magicAndPadding = magicLength + PADDING;
/** @ignore */
const magicX2AndPadding = magicLength * 2 + PADDING;

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class TypeComparator extends Visitor {
    compareSchemas(schema, other) {
        return (schema === other) || (other instanceof schema.constructor &&
            this.compareManyFields(schema.fields, other.fields));
    }
    compareManyFields(fields, others) {
        return (fields === others) || (Array.isArray(fields) &&
            Array.isArray(others) &&
            fields.length === others.length &&
            fields.every((f, i) => this.compareFields(f, others[i])));
    }
    compareFields(field, other) {
        return (field === other) || (other instanceof field.constructor &&
            field.name === other.name &&
            field.nullable === other.nullable &&
            this.visit(field.type, other.type));
    }
}
function compareConstructor(type, other) {
    return other instanceof type.constructor;
}
function compareAny(type, other) {
    return (type === other) || compareConstructor(type, other);
}
function compareInt(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.bitWidth === other.bitWidth &&
        type.isSigned === other.isSigned);
}
function compareFloat(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.precision === other.precision);
}
function compareFixedSizeBinary(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.byteWidth === other.byteWidth);
}
function compareDate(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.unit === other.unit);
}
function compareTimestamp(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.unit === other.unit &&
        type.timezone === other.timezone);
}
function compareTime(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.unit === other.unit &&
        type.bitWidth === other.bitWidth);
}
function compareList(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.children.length === other.children.length &&
        instance$6.compareManyFields(type.children, other.children));
}
function compareStruct(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.children.length === other.children.length &&
        instance$6.compareManyFields(type.children, other.children));
}
function compareUnion(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.mode === other.mode &&
        type.typeIds.every((x, i) => x === other.typeIds[i]) &&
        instance$6.compareManyFields(type.children, other.children));
}
function compareDictionary(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.id === other.id &&
        type.isOrdered === other.isOrdered &&
        instance$6.visit(type.indices, other.indices) &&
        instance$6.visit(type.dictionary, other.dictionary));
}
function compareInterval(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.unit === other.unit);
}
function compareFixedSizeList(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.listSize === other.listSize &&
        type.children.length === other.children.length &&
        instance$6.compareManyFields(type.children, other.children));
}
function compareMap(type, other) {
    return (type === other) || (compareConstructor(type, other) &&
        type.keysSorted === other.keysSorted &&
        type.children.length === other.children.length &&
        instance$6.compareManyFields(type.children, other.children));
}
TypeComparator.prototype.visitNull = compareAny;
TypeComparator.prototype.visitBool = compareAny;
TypeComparator.prototype.visitInt = compareInt;
TypeComparator.prototype.visitInt8 = compareInt;
TypeComparator.prototype.visitInt16 = compareInt;
TypeComparator.prototype.visitInt32 = compareInt;
TypeComparator.prototype.visitInt64 = compareInt;
TypeComparator.prototype.visitUint8 = compareInt;
TypeComparator.prototype.visitUint16 = compareInt;
TypeComparator.prototype.visitUint32 = compareInt;
TypeComparator.prototype.visitUint64 = compareInt;
TypeComparator.prototype.visitFloat = compareFloat;
TypeComparator.prototype.visitFloat16 = compareFloat;
TypeComparator.prototype.visitFloat32 = compareFloat;
TypeComparator.prototype.visitFloat64 = compareFloat;
TypeComparator.prototype.visitUtf8 = compareAny;
TypeComparator.prototype.visitBinary = compareAny;
TypeComparator.prototype.visitFixedSizeBinary = compareFixedSizeBinary;
TypeComparator.prototype.visitDate = compareDate;
TypeComparator.prototype.visitDateDay = compareDate;
TypeComparator.prototype.visitDateMillisecond = compareDate;
TypeComparator.prototype.visitTimestamp = compareTimestamp;
TypeComparator.prototype.visitTimestampSecond = compareTimestamp;
TypeComparator.prototype.visitTimestampMillisecond = compareTimestamp;
TypeComparator.prototype.visitTimestampMicrosecond = compareTimestamp;
TypeComparator.prototype.visitTimestampNanosecond = compareTimestamp;
TypeComparator.prototype.visitTime = compareTime;
TypeComparator.prototype.visitTimeSecond = compareTime;
TypeComparator.prototype.visitTimeMillisecond = compareTime;
TypeComparator.prototype.visitTimeMicrosecond = compareTime;
TypeComparator.prototype.visitTimeNanosecond = compareTime;
TypeComparator.prototype.visitDecimal = compareAny;
TypeComparator.prototype.visitList = compareList;
TypeComparator.prototype.visitStruct = compareStruct;
TypeComparator.prototype.visitUnion = compareUnion;
TypeComparator.prototype.visitDenseUnion = compareUnion;
TypeComparator.prototype.visitSparseUnion = compareUnion;
TypeComparator.prototype.visitDictionary = compareDictionary;
TypeComparator.prototype.visitInterval = compareInterval;
TypeComparator.prototype.visitIntervalDayTime = compareInterval;
TypeComparator.prototype.visitIntervalYearMonth = compareInterval;
TypeComparator.prototype.visitFixedSizeList = compareFixedSizeList;
TypeComparator.prototype.visitMap = compareMap;
/** @ignore */
const instance$6 = new TypeComparator();
function compareSchemas(schema, other) {
    return instance$6.compareSchemas(schema, other);
}
function compareFields(field, other) {
    return instance$6.compareFields(field, other);
}
function compareTypes(type, other) {
    return instance$6.visit(type, other);
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class VectorAssembler extends Visitor {
    constructor() {
        super();
        this._byteLength = 0;
        this._nodes = [];
        this._buffers = [];
        this._bufferRegions = [];
    }
    /** @nocollapse */
    static assemble(...args) {
        const assembler = new VectorAssembler();
        const vectorChildren = selectVectorChildrenArgs(RecordBatch, args);
        const [assembleResult = assembler] = assembler.visitMany(vectorChildren);
        return assembleResult;
    }
    visit(vector) {
        if (!DataType.isDictionary(vector.type)) {
            const { data, length, nullCount } = vector;
            if (length > 2147483647) {
                /* istanbul ignore next */
                throw new RangeError('Cannot write arrays larger than 2^31 - 1 in length');
            }
            if (!DataType.isNull(vector.type)) {
                addBuffer.call(this, nullCount <= 0
                    ? new Uint8Array(0) // placeholder validity buffer
                    : truncateBitmap(data.offset, length, data.nullBitmap));
            }
            this.nodes.push(new FieldNode(length, nullCount));
        }
        return super.visit(vector);
    }
    visitNull(_nullV) {
        return this;
    }
    visitDictionary(vector) {
        // Assemble the indices here, Dictionary assembled separately.
        return this.visit(vector.indices);
    }
    get nodes() { return this._nodes; }
    get buffers() { return this._buffers; }
    get byteLength() { return this._byteLength; }
    get bufferRegions() { return this._bufferRegions; }
}
/** @ignore */
function addBuffer(values) {
    const byteLength = (values.byteLength + 7) & ~7; // Round up to a multiple of 8
    this.buffers.push(values);
    this.bufferRegions.push(new BufferRegion(this._byteLength, byteLength));
    this._byteLength += byteLength;
    return this;
}
/** @ignore */
function assembleUnion(vector) {
    const { type, length, typeIds, valueOffsets } = vector;
    // All Union Vectors have a typeIds buffer
    addBuffer.call(this, typeIds);
    // If this is a Sparse Union, treat it like all other Nested types
    if (type.mode === UnionMode.Sparse) {
        return assembleNestedVector.call(this, vector);
    }
    else if (type.mode === UnionMode.Dense) {
        // If this is a Dense Union, add the valueOffsets buffer and potentially slice the children
        if (vector.offset <= 0) {
            // If the Vector hasn't been sliced, write the existing valueOffsets
            addBuffer.call(this, valueOffsets);
            // We can treat this like all other Nested types
            return assembleNestedVector.call(this, vector);
        }
        else {
            // A sliced Dense Union is an unpleasant case. Because the offsets are different for
            // each child vector, we need to "rebase" the valueOffsets for each child
            // Union typeIds are not necessary 0-indexed
            const maxChildTypeId = typeIds.reduce((x, y) => Math.max(x, y), typeIds[0]);
            const childLengths = new Int32Array(maxChildTypeId + 1);
            // Set all to -1 to indicate that we haven't observed a first occurrence of a particular child yet
            const childOffsets = new Int32Array(maxChildTypeId + 1).fill(-1);
            const shiftedOffsets = new Int32Array(length);
            // If we have a non-zero offset, then the value offsets do not start at
            // zero. We must a) create a new offsets array with shifted offsets and
            // b) slice the values array accordingly
            const unshiftedOffsets = rebaseValueOffsets(-valueOffsets[0], length, valueOffsets);
            for (let typeId, shift, index = -1; ++index < length;) {
                if ((shift = childOffsets[typeId = typeIds[index]]) === -1) {
                    shift = childOffsets[typeId] = unshiftedOffsets[typeId];
                }
                shiftedOffsets[index] = unshiftedOffsets[index] - shift;
                ++childLengths[typeId];
            }
            addBuffer.call(this, shiftedOffsets);
            // Slice and visit children accordingly
            for (let child, childIndex = -1, numChildren = type.children.length; ++childIndex < numChildren;) {
                if (child = vector.getChildAt(childIndex)) {
                    const typeId = type.typeIds[childIndex];
                    const childLength = Math.min(length, childLengths[typeId]);
                    this.visit(child.slice(childOffsets[typeId], childLength));
                }
            }
        }
    }
    return this;
}
/** @ignore */
function assembleBoolVector(vector) {
    // Bool vector is a special case of FlatVector, as its data buffer needs to stay packed
    let values;
    if (vector.nullCount >= vector.length) {
        // If all values are null, just insert a placeholder empty data buffer (fastest path)
        return addBuffer.call(this, new Uint8Array(0));
    }
    else if ((values = vector.values) instanceof Uint8Array) {
        // If values is already a Uint8Array, slice the bitmap (fast path)
        return addBuffer.call(this, truncateBitmap(vector.offset, vector.length, values));
    }
    // Otherwise if the underlying data *isn't* a Uint8Array, enumerate the
    // values as bools and re-pack them into a Uint8Array. This code isn't
    // reachable unless you're trying to manipulate the Data internals,
    // we we're only doing this for safety.
    /* istanbul ignore next */
    return addBuffer.call(this, packBools(vector));
}
/** @ignore */
function assembleFlatVector(vector) {
    return addBuffer.call(this, vector.values.subarray(0, vector.length * vector.stride));
}
/** @ignore */
function assembleFlatListVector(vector) {
    const { length, values, valueOffsets } = vector;
    const firstOffset = valueOffsets[0];
    const lastOffset = valueOffsets[length];
    const byteLength = Math.min(lastOffset - firstOffset, values.byteLength - firstOffset);
    // Push in the order FlatList types read their buffers
    addBuffer.call(this, rebaseValueOffsets(-valueOffsets[0], length, valueOffsets)); // valueOffsets buffer first
    addBuffer.call(this, values.subarray(firstOffset, firstOffset + byteLength)); // sliced values buffer second
    return this;
}
/** @ignore */
function assembleListVector(vector) {
    const { length, valueOffsets } = vector;
    // If we have valueOffsets (MapVector, ListVector), push that buffer first
    if (valueOffsets) {
        addBuffer.call(this, rebaseValueOffsets(valueOffsets[0], length, valueOffsets));
    }
    // Then insert the List's values child
    return this.visit(vector.getChildAt(0));
}
/** @ignore */
function assembleNestedVector(vector) {
    return this.visitMany(vector.type.children.map((_, i) => vector.getChildAt(i)).filter(Boolean))[0];
}
VectorAssembler.prototype.visitBool = assembleBoolVector;
VectorAssembler.prototype.visitInt = assembleFlatVector;
VectorAssembler.prototype.visitFloat = assembleFlatVector;
VectorAssembler.prototype.visitUtf8 = assembleFlatListVector;
VectorAssembler.prototype.visitBinary = assembleFlatListVector;
VectorAssembler.prototype.visitFixedSizeBinary = assembleFlatVector;
VectorAssembler.prototype.visitDate = assembleFlatVector;
VectorAssembler.prototype.visitTimestamp = assembleFlatVector;
VectorAssembler.prototype.visitTime = assembleFlatVector;
VectorAssembler.prototype.visitDecimal = assembleFlatVector;
VectorAssembler.prototype.visitList = assembleListVector;
VectorAssembler.prototype.visitStruct = assembleNestedVector;
VectorAssembler.prototype.visitUnion = assembleUnion;
VectorAssembler.prototype.visitInterval = assembleFlatVector;
VectorAssembler.prototype.visitFixedSizeList = assembleListVector;
VectorAssembler.prototype.visitMap = assembleListVector;

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class JSONTypeAssembler extends Visitor {
    visit(node) {
        return node == null ? undefined : super.visit(node);
    }
    visitNull({ typeId }) {
        return { 'name': Type$1[typeId].toLowerCase() };
    }
    visitInt({ typeId, bitWidth, isSigned }) {
        return { 'name': Type$1[typeId].toLowerCase(), 'bitWidth': bitWidth, 'isSigned': isSigned };
    }
    visitFloat({ typeId, precision }) {
        return { 'name': Type$1[typeId].toLowerCase(), 'precision': Precision[precision] };
    }
    visitBinary({ typeId }) {
        return { 'name': Type$1[typeId].toLowerCase() };
    }
    visitBool({ typeId }) {
        return { 'name': Type$1[typeId].toLowerCase() };
    }
    visitUtf8({ typeId }) {
        return { 'name': Type$1[typeId].toLowerCase() };
    }
    visitDecimal({ typeId, scale, precision }) {
        return { 'name': Type$1[typeId].toLowerCase(), 'scale': scale, 'precision': precision };
    }
    visitDate({ typeId, unit }) {
        return { 'name': Type$1[typeId].toLowerCase(), 'unit': DateUnit[unit] };
    }
    visitTime({ typeId, unit, bitWidth }) {
        return { 'name': Type$1[typeId].toLowerCase(), 'unit': TimeUnit[unit], bitWidth };
    }
    visitTimestamp({ typeId, timezone, unit }) {
        return { 'name': Type$1[typeId].toLowerCase(), 'unit': TimeUnit[unit], timezone };
    }
    visitInterval({ typeId, unit }) {
        return { 'name': Type$1[typeId].toLowerCase(), 'unit': IntervalUnit[unit] };
    }
    visitList({ typeId }) {
        return { 'name': Type$1[typeId].toLowerCase() };
    }
    visitStruct({ typeId }) {
        return { 'name': Type$1[typeId].toLowerCase() };
    }
    visitUnion({ typeId, mode, typeIds }) {
        return {
            'name': Type$1[typeId].toLowerCase(),
            'mode': UnionMode[mode],
            'typeIds': [...typeIds]
        };
    }
    visitDictionary(node) {
        return this.visit(node.dictionary);
    }
    visitFixedSizeBinary({ typeId, byteWidth }) {
        return { 'name': Type$1[typeId].toLowerCase(), 'byteWidth': byteWidth };
    }
    visitFixedSizeList({ typeId, listSize }) {
        return { 'name': Type$1[typeId].toLowerCase(), 'listSize': listSize };
    }
    visitMap({ typeId, keysSorted }) {
        return { 'name': Type$1[typeId].toLowerCase(), 'keysSorted': keysSorted };
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class JSONVectorAssembler extends Visitor {
    /** @nocollapse */
    static assemble(...args) {
        return new JSONVectorAssembler().visitMany(selectColumnChildrenArgs(RecordBatch, args));
    }
    visit(column) {
        const { data, name, length } = column;
        const { offset, nullCount, nullBitmap } = data;
        const type = DataType.isDictionary(column.type) ? column.type.indices : column.type;
        const buffers = Object.assign([], data.buffers, { [BufferType.VALIDITY]: undefined });
        return Object.assign({ 'name': name, 'count': length, 'VALIDITY': DataType.isNull(type) ? undefined
                : nullCount <= 0 ? Array.from({ length }, () => 1)
                    : [...new BitIterator(nullBitmap, offset, length, null, getBit)] }, super.visit(AbstractVector.new(data.clone(type, offset, length, 0, buffers))));
    }
    visitNull() { return {}; }
    visitBool({ values, offset, length }) {
        return { 'DATA': [...new BitIterator(values, offset, length, null, getBool$1)] };
    }
    visitInt(vector) {
        return {
            'DATA': vector.type.bitWidth < 64
                ? [...vector.values]
                : [...bigNumsToStrings(vector.values, 2)]
        };
    }
    visitFloat(vector) {
        return { 'DATA': [...vector.values] };
    }
    visitUtf8(vector) {
        return { 'DATA': [...vector], 'OFFSET': [...vector.valueOffsets] };
    }
    visitBinary(vector) {
        return { 'DATA': [...binaryToString(vector)], OFFSET: [...vector.valueOffsets] };
    }
    visitFixedSizeBinary(vector) {
        return { 'DATA': [...binaryToString(vector)] };
    }
    visitDate(vector) {
        return {
            'DATA': vector.type.unit === DateUnit.DAY
                ? [...vector.values]
                : [...bigNumsToStrings(vector.values, 2)]
        };
    }
    visitTimestamp(vector) {
        return { 'DATA': [...bigNumsToStrings(vector.values, 2)] };
    }
    visitTime(vector) {
        return {
            'DATA': vector.type.unit < TimeUnit.MICROSECOND
                ? [...vector.values]
                : [...bigNumsToStrings(vector.values, 2)]
        };
    }
    visitDecimal(vector) {
        return { 'DATA': [...bigNumsToStrings(vector.values, 4)] };
    }
    visitList(vector) {
        return {
            'OFFSET': [...vector.valueOffsets],
            'children': vector.type.children.map((f, i) => this.visit(new Column(f, [vector.getChildAt(i)])))
        };
    }
    visitStruct(vector) {
        return {
            'children': vector.type.children.map((f, i) => this.visit(new Column(f, [vector.getChildAt(i)])))
        };
    }
    visitUnion(vector) {
        return {
            'TYPE': [...vector.typeIds],
            'OFFSET': vector.type.mode === UnionMode.Dense ? [...vector.valueOffsets] : undefined,
            'children': vector.type.children.map((f, i) => this.visit(new Column(f, [vector.getChildAt(i)])))
        };
    }
    visitInterval(vector) {
        return { 'DATA': [...vector.values] };
    }
    visitFixedSizeList(vector) {
        return {
            'children': vector.type.children.map((f, i) => this.visit(new Column(f, [vector.getChildAt(i)])))
        };
    }
    visitMap(vector) {
        return {
            'OFFSET': [...vector.valueOffsets],
            'children': vector.type.children.map((f, i) => this.visit(new Column(f, [vector.getChildAt(i)])))
        };
    }
}
/** @ignore */
function* binaryToString(vector) {
    for (const octets of vector) {
        yield octets.reduce((str, byte) => {
            return `${str}${('0' + (byte & 0xFF).toString(16)).slice(-2)}`;
        }, '').toUpperCase();
    }
}
/** @ignore */
function* bigNumsToStrings(values, stride) {
    for (let i = -1, n = values.length / stride; ++i < n;) {
        yield `${BN.new(values.subarray((i + 0) * stride, (i + 1) * stride), false)}`;
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
class RecordBatchWriter extends ReadableInterop {
    constructor(options) {
        super();
        this._position = 0;
        this._started = false;
        // @ts-ignore
        this._sink = new AsyncByteQueue();
        this._schema = null;
        this._dictionaryBlocks = [];
        this._recordBatchBlocks = [];
        this._dictionaryDeltaOffsets = new Map();
        isObject(options) || (options = { autoDestroy: true, writeLegacyIpcFormat: false });
        this._autoDestroy = (typeof options.autoDestroy === 'boolean') ? options.autoDestroy : true;
        this._writeLegacyIpcFormat = (typeof options.writeLegacyIpcFormat === 'boolean') ? options.writeLegacyIpcFormat : false;
    }
    /** @nocollapse */
    // @ts-ignore
    static throughNode(options) {
        throw new Error(`"throughNode" not available in this environment`);
    }
    /** @nocollapse */
    static throughDOM(
    // @ts-ignore
    writableStrategy, 
    // @ts-ignore
    readableStrategy) {
        throw new Error(`"throughDOM" not available in this environment`);
    }
    toString(sync = false) {
        return this._sink.toString(sync);
    }
    toUint8Array(sync = false) {
        return this._sink.toUint8Array(sync);
    }
    writeAll(input) {
        if (isPromise(input)) {
            return input.then((x) => this.writeAll(x));
        }
        else if (isAsyncIterable(input)) {
            return writeAllAsync(this, input);
        }
        return writeAll(this, input);
    }
    get closed() { return this._sink.closed; }
    [Symbol.asyncIterator]() { return this._sink[Symbol.asyncIterator](); }
    toDOMStream(options) { return this._sink.toDOMStream(options); }
    toNodeStream(options) { return this._sink.toNodeStream(options); }
    close() {
        return this.reset()._sink.close();
    }
    abort(reason) {
        return this.reset()._sink.abort(reason);
    }
    finish() {
        this._autoDestroy ? this.close() : this.reset(this._sink, this._schema);
        return this;
    }
    reset(sink = this._sink, schema = null) {
        if ((sink === this._sink) || (sink instanceof AsyncByteQueue)) {
            this._sink = sink;
        }
        else {
            this._sink = new AsyncByteQueue();
            if (sink && isWritableDOMStream(sink)) {
                this.toDOMStream({ type: 'bytes' }).pipeTo(sink);
            }
            else if (sink && isWritableNodeStream(sink)) {
                this.toNodeStream({ objectMode: false }).pipe(sink);
            }
        }
        if (this._started && this._schema) {
            this._writeFooter(this._schema);
        }
        this._started = false;
        this._dictionaryBlocks = [];
        this._recordBatchBlocks = [];
        this._dictionaryDeltaOffsets = new Map();
        if (!schema || !(compareSchemas(schema, this._schema))) {
            if (schema === null) {
                this._position = 0;
                this._schema = null;
            }
            else {
                this._started = true;
                this._schema = schema;
                this._writeSchema(schema);
            }
        }
        return this;
    }
    write(payload) {
        let schema = null;
        if (!this._sink) {
            throw new Error(`RecordBatchWriter is closed`);
        }
        else if (payload == null) {
            return this.finish() && undefined;
        }
        else if (payload instanceof Table && !(schema = payload.schema)) {
            return this.finish() && undefined;
        }
        else if (payload instanceof RecordBatch && !(schema = payload.schema)) {
            return this.finish() && undefined;
        }
        if (schema && !compareSchemas(schema, this._schema)) {
            if (this._started && this._autoDestroy) {
                return this.close();
            }
            this.reset(this._sink, schema);
        }
        if (payload instanceof RecordBatch) {
            if (!(payload instanceof _InternalEmptyPlaceholderRecordBatch)) {
                this._writeRecordBatch(payload);
            }
        }
        else if (payload instanceof Table) {
            this.writeAll(payload.chunks);
        }
        else if (isIterable(payload)) {
            this.writeAll(payload);
        }
    }
    _writeMessage(message, alignment = 8) {
        const a = alignment - 1;
        const buffer = Message.encode(message);
        const flatbufferSize = buffer.byteLength;
        const prefixSize = !this._writeLegacyIpcFormat ? 8 : 4;
        const alignedSize = (flatbufferSize + prefixSize + a) & ~a;
        const nPaddingBytes = alignedSize - flatbufferSize - prefixSize;
        if (message.headerType === MessageHeader.RecordBatch) {
            this._recordBatchBlocks.push(new FileBlock(alignedSize, message.bodyLength, this._position));
        }
        else if (message.headerType === MessageHeader.DictionaryBatch) {
            this._dictionaryBlocks.push(new FileBlock(alignedSize, message.bodyLength, this._position));
        }
        // If not in legacy pre-0.15.0 mode, write the stream continuation indicator
        if (!this._writeLegacyIpcFormat) {
            this._write(Int32Array.of(-1));
        }
        // Write the flatbuffer size prefix including padding
        this._write(Int32Array.of(alignedSize - prefixSize));
        // Write the flatbuffer
        if (flatbufferSize > 0) {
            this._write(buffer);
        }
        // Write any padding
        return this._writePadding(nPaddingBytes);
    }
    _write(chunk) {
        if (this._started) {
            const buffer = toUint8Array(chunk);
            if (buffer && buffer.byteLength > 0) {
                this._sink.write(buffer);
                this._position += buffer.byteLength;
            }
        }
        return this;
    }
    _writeSchema(schema) {
        return this._writeMessage(Message.from(schema));
    }
    // @ts-ignore
    _writeFooter(schema) {
        // eos bytes
        return this._writeLegacyIpcFormat
            ? this._write(Int32Array.of(0))
            : this._write(Int32Array.of(-1, 0));
    }
    _writeMagic() {
        return this._write(MAGIC);
    }
    _writePadding(nBytes) {
        return nBytes > 0 ? this._write(new Uint8Array(nBytes)) : this;
    }
    _writeRecordBatch(batch) {
        const { byteLength, nodes, bufferRegions, buffers } = VectorAssembler.assemble(batch);
        const recordBatch = new RecordBatch$1(batch.length, nodes, bufferRegions);
        const message = Message.from(recordBatch, byteLength);
        return this
            ._writeDictionaries(batch)
            ._writeMessage(message)
            ._writeBodyBuffers(buffers);
    }
    _writeDictionaryBatch(dictionary, id, isDelta = false) {
        this._dictionaryDeltaOffsets.set(id, dictionary.length + (this._dictionaryDeltaOffsets.get(id) || 0));
        const { byteLength, nodes, bufferRegions, buffers } = VectorAssembler.assemble(dictionary);
        const recordBatch = new RecordBatch$1(dictionary.length, nodes, bufferRegions);
        const dictionaryBatch = new DictionaryBatch(recordBatch, id, isDelta);
        const message = Message.from(dictionaryBatch, byteLength);
        return this
            ._writeMessage(message)
            ._writeBodyBuffers(buffers);
    }
    _writeBodyBuffers(buffers) {
        let buffer;
        let size, padding;
        for (let i = -1, n = buffers.length; ++i < n;) {
            if ((buffer = buffers[i]) && (size = buffer.byteLength) > 0) {
                this._write(buffer);
                if ((padding = ((size + 7) & ~7) - size) > 0) {
                    this._writePadding(padding);
                }
            }
        }
        return this;
    }
    _writeDictionaries(batch) {
        for (let [id, dictionary] of batch.dictionaries) {
            let offset = this._dictionaryDeltaOffsets.get(id) || 0;
            if (offset === 0 || (dictionary = dictionary.slice(offset)).length > 0) {
                const chunks = 'chunks' in dictionary ? dictionary.chunks : [dictionary];
                for (const chunk of chunks) {
                    this._writeDictionaryBatch(chunk, id, offset > 0);
                    offset += chunk.length;
                }
            }
        }
        return this;
    }
}
/** @ignore */
class RecordBatchStreamWriter extends RecordBatchWriter {
    /** @nocollapse */
    static writeAll(input, options) {
        const writer = new RecordBatchStreamWriter(options);
        if (isPromise(input)) {
            return input.then((x) => writer.writeAll(x));
        }
        else if (isAsyncIterable(input)) {
            return writeAllAsync(writer, input);
        }
        return writeAll(writer, input);
    }
}
/** @ignore */
class RecordBatchFileWriter extends RecordBatchWriter {
    /** @nocollapse */
    static writeAll(input) {
        const writer = new RecordBatchFileWriter();
        if (isPromise(input)) {
            return input.then((x) => writer.writeAll(x));
        }
        else if (isAsyncIterable(input)) {
            return writeAllAsync(writer, input);
        }
        return writeAll(writer, input);
    }
    constructor() {
        super();
        this._autoDestroy = true;
    }
    // @ts-ignore
    _writeSchema(schema) {
        return this._writeMagic()._writePadding(2);
    }
    _writeFooter(schema) {
        const buffer = Footer_.encode(new Footer_(schema, MetadataVersion.V4, this._recordBatchBlocks, this._dictionaryBlocks));
        return super
            ._writeFooter(schema) // EOS bytes for sequential readers
            ._write(buffer) // Write the flatbuffer
            ._write(Int32Array.of(buffer.byteLength)) // then the footer size suffix
            ._writeMagic(); // then the magic suffix
    }
}
/** @ignore */
class RecordBatchJSONWriter extends RecordBatchWriter {
    constructor() {
        super();
        this._autoDestroy = true;
        this._recordBatches = [];
        this._dictionaries = [];
    }
    /** @nocollapse */
    static writeAll(input) {
        return new RecordBatchJSONWriter().writeAll(input);
    }
    _writeMessage() { return this; }
    // @ts-ignore
    _writeFooter(schema) { return this; }
    _writeSchema(schema) {
        return this._write(`{\n  "schema": ${JSON.stringify({ fields: schema.fields.map(fieldToJSON) }, null, 2)}`);
    }
    _writeDictionaries(batch) {
        if (batch.dictionaries.size > 0) {
            this._dictionaries.push(batch);
        }
        return this;
    }
    _writeDictionaryBatch(dictionary, id, isDelta = false) {
        this._dictionaryDeltaOffsets.set(id, dictionary.length + (this._dictionaryDeltaOffsets.get(id) || 0));
        this._write(this._dictionaryBlocks.length === 0 ? `    ` : `,\n    `);
        this._write(`${dictionaryBatchToJSON(dictionary, id, isDelta)}`);
        this._dictionaryBlocks.push(new FileBlock(0, 0, 0));
        return this;
    }
    _writeRecordBatch(batch) {
        this._writeDictionaries(batch);
        this._recordBatches.push(batch);
        return this;
    }
    close() {
        if (this._dictionaries.length > 0) {
            this._write(`,\n  "dictionaries": [\n`);
            for (const batch of this._dictionaries) {
                super._writeDictionaries(batch);
            }
            this._write(`\n  ]`);
        }
        if (this._recordBatches.length > 0) {
            for (let i = -1, n = this._recordBatches.length; ++i < n;) {
                this._write(i === 0 ? `,\n  "batches": [\n    ` : `,\n    `);
                this._write(`${recordBatchToJSON(this._recordBatches[i])}`);
                this._recordBatchBlocks.push(new FileBlock(0, 0, 0));
            }
            this._write(`\n  ]`);
        }
        if (this._schema) {
            this._write(`\n}`);
        }
        this._dictionaries = [];
        this._recordBatches = [];
        return super.close();
    }
}
/** @ignore */
function writeAll(writer, input) {
    let chunks = input;
    if (input instanceof Table) {
        chunks = input.chunks;
        writer.reset(undefined, input.schema);
    }
    for (const batch of chunks) {
        writer.write(batch);
    }
    return writer.finish();
}
/** @ignore */
function writeAllAsync(writer, batches) {
    var batches_1, batches_1_1;
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (batches_1 = __asyncValues(batches); batches_1_1 = yield batches_1.next(), !batches_1_1.done;) {
                const batch = batches_1_1.value;
                writer.write(batch);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (batches_1_1 && !batches_1_1.done && (_a = batches_1.return)) yield _a.call(batches_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return writer.finish();
    });
}
/** @ignore */
function fieldToJSON({ name, type, nullable }) {
    const assembler = new JSONTypeAssembler();
    return {
        'name': name, 'nullable': nullable,
        'type': assembler.visit(type),
        'children': (type.children || []).map(fieldToJSON),
        'dictionary': !DataType.isDictionary(type) ? undefined : {
            'id': type.id,
            'isOrdered': type.isOrdered,
            'indexType': assembler.visit(type.indices)
        }
    };
}
/** @ignore */
function dictionaryBatchToJSON(dictionary, id, isDelta = false) {
    const field = new Field(`${id}`, dictionary.type, dictionary.nullCount > 0);
    const columns = JSONVectorAssembler.assemble(new Column(field, [dictionary]));
    return JSON.stringify({
        'id': id,
        'isDelta': isDelta,
        'data': {
            'count': dictionary.length,
            'columns': columns
        }
    }, null, 2);
}
/** @ignore */
function recordBatchToJSON(records) {
    return JSON.stringify({
        'count': records.length,
        'columns': JSONVectorAssembler.assemble(records)
    }, null, 2);
}

// Licensed to the Apache Software Foundation (ASF) under one
const noopBuf = new Uint8Array(0);
const nullBufs = (bitmapLength) => [
    noopBuf, noopBuf, new Uint8Array(bitmapLength), noopBuf
];
/** @ignore */
function ensureSameLengthData(schema, chunks, batchLength = chunks.reduce((l, c) => Math.max(l, c.length), 0)) {
    let data;
    let field;
    let i = -1;
    const n = chunks.length;
    const fields = [...schema.fields];
    const batchData = [];
    const bitmapLength = ((batchLength + 63) & ~63) >> 3;
    while (++i < n) {
        if ((data = chunks[i]) && data.length === batchLength) {
            batchData[i] = data;
        }
        else {
            (field = fields[i]).nullable || (fields[i] = fields[i].clone({ nullable: true }));
            batchData[i] = data ? data._changeLengthAndBackfillNullBitmap(batchLength)
                : Data.new(field.type, 0, batchLength, batchLength, nullBufs(bitmapLength));
        }
    }
    return [new Schema(fields), batchLength, batchData];
}
/** @ignore */
function distributeColumnsIntoRecordBatches(columns) {
    return distributeVectorsIntoRecordBatches(new Schema(columns.map(({ field }) => field)), columns);
}
/** @ignore */
function distributeVectorsIntoRecordBatches(schema, vecs) {
    return uniformlyDistributeChunksAcrossRecordBatches(schema, vecs.map((v) => v instanceof Chunked ? v.chunks.map((c) => c.data) : [v.data]));
}
/** @ignore */
function uniformlyDistributeChunksAcrossRecordBatches(schema, columns) {
    const fields = [...schema.fields];
    const batchArgs = [];
    const memo = { numBatches: columns.reduce((n, c) => Math.max(n, c.length), 0) };
    let numBatches = 0, batchLength = 0;
    let i = -1;
    const numColumns = columns.length;
    let child, childData = [];
    while (memo.numBatches-- > 0) {
        for (batchLength = Number.POSITIVE_INFINITY, i = -1; ++i < numColumns;) {
            childData[i] = child = columns[i].shift();
            batchLength = Math.min(batchLength, child ? child.length : batchLength);
        }
        if (isFinite(batchLength)) {
            childData = distributeChildData(fields, batchLength, childData, columns, memo);
            if (batchLength > 0) {
                batchArgs[numBatches++] = [batchLength, childData.slice()];
            }
        }
    }
    return [
        schema = new Schema(fields, schema.metadata),
        batchArgs.map((xs) => new RecordBatch(schema, ...xs))
    ];
}
/** @ignore */
function distributeChildData(fields, batchLength, childData, columns, memo) {
    let data;
    let field;
    let length = 0, i = -1;
    const n = columns.length;
    const bitmapLength = ((batchLength + 63) & ~63) >> 3;
    while (++i < n) {
        if ((data = childData[i]) && ((length = data.length) >= batchLength)) {
            if (length === batchLength) {
                childData[i] = data;
            }
            else {
                childData[i] = data.slice(0, batchLength);
                data = data.slice(batchLength, length - batchLength);
                memo.numBatches = Math.max(memo.numBatches, columns[i].unshift(data));
            }
        }
        else {
            (field = fields[i]).nullable || (fields[i] = field.clone({ nullable: true }));
            childData[i] = data ? data._changeLengthAndBackfillNullBitmap(batchLength)
                : Data.new(field.type, 0, batchLength, batchLength, nullBufs(bitmapLength));
        }
    }
    return childData;
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class BaseVector extends AbstractVector {
    constructor(data, children) {
        super();
        this._children = children;
        this.numChildren = data.childData.length;
        this._bindDataAccessors(this.data = data);
    }
    get type() { return this.data.type; }
    get typeId() { return this.data.typeId; }
    get length() { return this.data.length; }
    get offset() { return this.data.offset; }
    get stride() { return this.data.stride; }
    get nullCount() { return this.data.nullCount; }
    get byteLength() { return this.data.byteLength; }
    get VectorName() { return `${Type[this.typeId]}Vector`; }
    get ArrayType() { return this.type.ArrayType; }
    get values() { return this.data.values; }
    get typeIds() { return this.data.typeIds; }
    get nullBitmap() { return this.data.nullBitmap; }
    get valueOffsets() { return this.data.valueOffsets; }
    get [Symbol.toStringTag]() { return `${this.VectorName}<${this.type[Symbol.toStringTag]}>`; }
    clone(data, children = this._children) {
        return AbstractVector.new(data, children);
    }
    concat(...others) {
        return Chunked.concat(this, ...others);
    }
    slice(begin, end) {
        // Adjust args similar to Array.prototype.slice. Normalize begin/end to
        // clamp between 0 and length, and wrap around on negative indices, e.g.
        // slice(-1, 5) or slice(5, -1)
        return clampRange(this, begin, end, this._sliceInternal);
    }
    isValid(index) {
        if (this.nullCount > 0) {
            const idx = this.offset + index;
            const val = this.nullBitmap[idx >> 3];
            const mask = (val & (1 << (idx % 8)));
            return mask !== 0;
        }
        return true;
    }
    getChildAt(index) {
        return index < 0 || index >= this.numChildren ? null : ((this._children || (this._children = []))[index] ||
            (this._children[index] = AbstractVector.new(this.data.childData[index])));
    }
    toJSON() { return [...this]; }
    _sliceInternal(self, begin, end) {
        return self.clone(self.data.slice(begin, end - begin), null);
    }
    // @ts-ignore
    _bindDataAccessors(data) {
        // Implementation in src/vectors/index.ts due to circular dependency/packaging shenanigans
    }
}
BaseVector.prototype[Symbol.isConcatSpreadable] = true;

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class BinaryVector extends BaseVector {
    asUtf8() {
        return AbstractVector.new(this.data.clone(new Utf8()));
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class BoolVector extends BaseVector {
    /** @nocollapse */
    static from(input) {
        return vectorFromValuesWithType(() => new Bool(), input);
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class DateVector extends BaseVector {
    /** @nocollapse */
    static from(...args) {
        if (args.length === 2) {
            return vectorFromValuesWithType(() => args[1] === DateUnit.DAY ? new DateDay() : new DateMillisecond(), args[0]);
        }
        return vectorFromValuesWithType(() => new DateMillisecond(), args[0]);
    }
}
/** @ignore */
class DateDayVector extends DateVector {
}
/** @ignore */
class DateMillisecondVector extends DateVector {
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class DecimalVector extends BaseVector {
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class DictionaryVector extends BaseVector {
    constructor(data) {
        super(data);
        this.indices = AbstractVector.new(data.clone(this.type.indices));
    }
    /** @nocollapse */
    static from(...args) {
        if (args.length === 3) {
            const [values, indices, keys] = args;
            const type = new Dictionary(values.type, indices, null, null);
            return AbstractVector.new(Data.Dictionary(type, 0, keys.length, 0, null, keys, values));
        }
        return vectorFromValuesWithType(() => args[0].type, args[0]);
    }
    get dictionary() { return this.data.dictionary; }
    reverseLookup(value) { return this.dictionary.indexOf(value); }
    getKey(idx) { return this.indices.get(idx); }
    getValue(key) { return this.dictionary.get(key); }
    setKey(idx, key) { return this.indices.set(idx, key); }
    setValue(key, value) { return this.dictionary.set(key, value); }
}
DictionaryVector.prototype.indices = null;

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class FixedSizeBinaryVector extends BaseVector {
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class FixedSizeListVector extends BaseVector {
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class FloatVector extends BaseVector {
    /** @nocollapse */
    static from(input) {
        let ArrowType = vectorTypeToDataType$1(this);
        if ((input instanceof ArrayBuffer) || ArrayBuffer.isView(input)) {
            const InputType = arrayTypeToDataType$1(input.constructor) || ArrowType;
            // Special case, infer the Arrow DataType from the input if calling the base
            // FloatVector.from with a TypedArray, e.g. `FloatVector.from(new Float32Array())`
            if (ArrowType === null) {
                ArrowType = InputType;
            }
            // If the DataType inferred from the Vector constructor matches the
            // DataType inferred from the input arguments, return zero-copy view
            if (ArrowType && ArrowType === InputType) {
                const type = new ArrowType();
                const length = input.byteLength / type.ArrayType.BYTES_PER_ELEMENT;
                // If the ArrowType is Float16 but the input type isn't a Uint16Array,
                // let the Float16Builder handle casting the input values to Uint16s.
                if (!convertTo16Bit(ArrowType, input.constructor)) {
                    return AbstractVector.new(Data.Float(type, 0, length, 0, null, input));
                }
            }
        }
        if (ArrowType) {
            // If the DataType inferred from the Vector constructor is different than
            // the DataType inferred from the input TypedArray, or if input isn't a
            // TypedArray, use the Builders to construct the result Vector
            return vectorFromValuesWithType(() => new ArrowType(), input);
        }
        if ((input instanceof DataView) || (input instanceof ArrayBuffer)) {
            throw new TypeError(`Cannot infer float type from instance of ${input.constructor.name}`);
        }
        throw new TypeError('Unrecognized FloatVector input');
    }
}
/** @ignore */
class Float16Vector extends FloatVector {
    // Since JS doesn't have half floats, `toArray()` returns a zero-copy slice
    // of the underlying Uint16Array data. This behavior ensures we don't incur
    // extra compute or copies if you're calling `toArray()` in order to create
    // a buffer for something like WebGL. Buf if you're using JS and want typed
    // arrays of 4-to-8-byte precision, these methods will enumerate the values
    // and clamp to the desired byte lengths.
    toFloat32Array() { return new Float32Array(this); }
    toFloat64Array() { return new Float64Array(this); }
}
/** @ignore */
class Float32Vector extends FloatVector {
}
/** @ignore */
class Float64Vector extends FloatVector {
}
const convertTo16Bit = (typeCtor, dataCtor) => {
    return (typeCtor === Float16) && (dataCtor !== Uint16Array);
};
/** @ignore */
const arrayTypeToDataType$1 = (ctor) => {
    switch (ctor) {
        case Uint16Array: return Float16;
        case Float32Array: return Float32;
        case Float64Array: return Float64;
        default: return null;
    }
};
/** @ignore */
const vectorTypeToDataType$1 = (ctor) => {
    switch (ctor) {
        case Float16Vector: return Float16;
        case Float32Vector: return Float32;
        case Float64Vector: return Float64;
        default: return null;
    }
};

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class IntervalVector extends BaseVector {
}
/** @ignore */
class IntervalDayTimeVector extends IntervalVector {
}
/** @ignore */
class IntervalYearMonthVector extends IntervalVector {
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class IntVector extends BaseVector {
    /** @nocollapse */
    static from(...args) {
        const [input, is64bit = false] = args;
        let ArrowType = vectorTypeToDataType(this, is64bit);
        if ((input instanceof ArrayBuffer) || ArrayBuffer.isView(input)) {
            const InputType = arrayTypeToDataType(input.constructor, is64bit) || ArrowType;
            // Special case, infer the Arrow DataType from the input if calling the base
            // IntVector.from with a TypedArray, e.g. `IntVector.from(new Int32Array())`
            if (ArrowType === null) {
                ArrowType = InputType;
            }
            // If the DataType inferred from the Vector constructor matches the
            // DataType inferred from the input arguments, return zero-copy view
            if (ArrowType && ArrowType === InputType) {
                const type = new ArrowType();
                let length = input.byteLength / type.ArrayType.BYTES_PER_ELEMENT;
                // If the ArrowType is 64bit but the input type is 32bit pairs, update the logical length
                if (convert32To64Bit(ArrowType, input.constructor)) {
                    length *= 0.5;
                }
                return AbstractVector.new(Data.Int(type, 0, length, 0, null, input));
            }
        }
        if (ArrowType) {
            // If the DataType inferred from the Vector constructor is different than
            // the DataType inferred from the input TypedArray, or if input isn't a
            // TypedArray, use the Builders to construct the result Vector
            return vectorFromValuesWithType(() => new ArrowType(), input);
        }
        if ((input instanceof DataView) || (input instanceof ArrayBuffer)) {
            throw new TypeError(`Cannot infer integer type from instance of ${input.constructor.name}`);
        }
        throw new TypeError('Unrecognized IntVector input');
    }
}
/** @ignore */
class Int8Vector extends IntVector {
}
/** @ignore */
class Int16Vector extends IntVector {
}
/** @ignore */
class Int32Vector extends IntVector {
}
/** @ignore */
class Int64Vector extends IntVector {
    toBigInt64Array() {
        return toBigInt64Array(this.values);
    }
    get values64() {
        return this._values64 || (this._values64 = this.toBigInt64Array());
    }
}
/** @ignore */
class Uint8Vector extends IntVector {
}
/** @ignore */
class Uint16Vector extends IntVector {
}
/** @ignore */
class Uint32Vector extends IntVector {
}
/** @ignore */
class Uint64Vector extends IntVector {
    toBigUint64Array() {
        return toBigUint64Array(this.values);
    }
    get values64() {
        return this._values64 || (this._values64 = this.toBigUint64Array());
    }
}
const convert32To64Bit = (typeCtor, dataCtor) => {
    return (typeCtor === Int64$1 || typeCtor === Uint64$1) &&
        (dataCtor === Int32Array || dataCtor === Uint32Array);
};
/** @ignore */
const arrayTypeToDataType = (ctor, is64bit) => {
    switch (ctor) {
        case Int8Array: return Int8;
        case Int16Array: return Int16;
        case Int32Array: return is64bit ? Int64$1 : Int32;
        case BigInt64ArrayCtor: return Int64$1;
        case Uint8Array: return Uint8;
        case Uint16Array: return Uint16;
        case Uint32Array: return is64bit ? Uint64$1 : Uint32;
        case BigUint64ArrayCtor: return Uint64$1;
        default: return null;
    }
};
/** @ignore */
const vectorTypeToDataType = (ctor, is64bit) => {
    switch (ctor) {
        case Int8Vector: return Int8;
        case Int16Vector: return Int16;
        case Int32Vector: return is64bit ? Int64$1 : Int32;
        case Int64Vector: return Int64$1;
        case Uint8Vector: return Uint8;
        case Uint16Vector: return Uint16;
        case Uint32Vector: return is64bit ? Uint64$1 : Uint32;
        case Uint64Vector: return Uint64$1;
        default: return null;
    }
};

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class ListVector extends BaseVector {
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class MapVector extends BaseVector {
    asList() {
        const child = this.type.children[0];
        return AbstractVector.new(this.data.clone(new List(child)));
    }
    bind(index) {
        const child = this.getChildAt(0);
        const { [index]: begin, [index + 1]: end } = this.valueOffsets;
        return new MapRow(child.slice(begin, end));
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class NullVector extends BaseVector {
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */ const kRowIndex = Symbol.for('rowIndex');
/** @ignore */
class StructVector extends BaseVector {
    bind(index) {
        const proto = this._row || (this._row = new StructRow(this));
        const bound = Object.create(proto);
        bound[kRowIndex] = index;
        return bound;
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class TimestampVector extends BaseVector {
}
/** @ignore */
class TimestampSecondVector extends TimestampVector {
}
/** @ignore */
class TimestampMillisecondVector extends TimestampVector {
}
/** @ignore */
class TimestampMicrosecondVector extends TimestampVector {
}
/** @ignore */
class TimestampNanosecondVector extends TimestampVector {
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class TimeVector extends BaseVector {
}
/** @ignore */
class TimeSecondVector extends TimeVector {
}
/** @ignore */
class TimeMillisecondVector extends TimeVector {
}
/** @ignore */
class TimeMicrosecondVector extends TimeVector {
}
/** @ignore */
class TimeNanosecondVector extends TimeVector {
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class UnionVector extends BaseVector {
    get typeIdToChildIndex() { return this.data.type.typeIdToChildIndex; }
}
/** @ignore */
class DenseUnionVector extends UnionVector {
    get valueOffsets() { return this.data.valueOffsets; }
}
/** @ignore */
class SparseUnionVector extends UnionVector {
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class Utf8Vector extends BaseVector {
    /** @nocollapse */
    static from(input) {
        return vectorFromValuesWithType(() => new Utf8(), input);
    }
    asBinary() {
        return AbstractVector.new(this.data.clone(new Binary()));
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
/** @ignore */
function partial0(visit) {
    return function () { return visit(this); };
}
/** @ignore */
function partial1(visit) {
    return function (a) { return visit(this, a); };
}
/** @ignore */
function partial2(visit) {
    return function (a, b) { return visit(this, a, b); };
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class GetVisitor extends Visitor {
}
/** @ignore */ const epochDaysToMs = (data, index) => 86400000 * data[index];
/** @ignore */ const epochMillisecondsLongToMs = (data, index) => 4294967296 * (data[index + 1]) + (data[index] >>> 0);
/** @ignore */ const epochMicrosecondsLongToMs = (data, index) => 4294967296 * (data[index + 1] / 1000) + ((data[index] >>> 0) / 1000);
/** @ignore */ const epochNanosecondsLongToMs = (data, index) => 4294967296 * (data[index + 1] / 1000000) + ((data[index] >>> 0) / 1000000);
/** @ignore */ const epochMillisecondsToDate = (epochMs) => new Date(epochMs);
/** @ignore */ const epochDaysToDate = (data, index) => epochMillisecondsToDate(epochDaysToMs(data, index));
/** @ignore */ const epochMillisecondsLongToDate = (data, index) => epochMillisecondsToDate(epochMillisecondsLongToMs(data, index));
/** @ignore */
const getNull = (_vector, _index) => null;
/** @ignore */
const getVariableWidthBytes = (values, valueOffsets, index) => {
    const { [index]: x, [index + 1]: y } = valueOffsets;
    return x != null && y != null ? values.subarray(x, y) : null;
};
/** @ignore */
const getBool = ({ offset, values }, index) => {
    const idx = offset + index;
    const byte = values[idx >> 3];
    return (byte & 1 << (idx % 8)) !== 0;
};
/** @ignore */
const getDateDay = ({ values }, index) => epochDaysToDate(values, index);
/** @ignore */
const getDateMillisecond = ({ values }, index) => epochMillisecondsLongToDate(values, index * 2);
/** @ignore */
const getNumeric = ({ stride, values }, index) => values[stride * index];
/** @ignore */
const getFloat16 = ({ stride, values }, index) => uint16ToFloat64(values[stride * index]);
/** @ignore */
const getBigInts = ({ stride, values, type }, index) => BN.new(values.subarray(stride * index, stride * (index + 1)), type.isSigned);
/** @ignore */
const getFixedSizeBinary = ({ stride, values }, index) => values.subarray(stride * index, stride * (index + 1));
/** @ignore */
const getBinary = ({ values, valueOffsets }, index) => getVariableWidthBytes(values, valueOffsets, index);
/** @ignore */
const getUtf8 = ({ values, valueOffsets }, index) => {
    const bytes = getVariableWidthBytes(values, valueOffsets, index);
    return bytes !== null ? decodeUtf8(bytes) : null;
};
/* istanbul ignore next */
/** @ignore */
const getInt = (vector, index) => (vector.type.bitWidth < 64
    ? getNumeric(vector, index)
    : getBigInts(vector, index));
/* istanbul ignore next */
/** @ignore */
const getFloat = (vector, index) => (vector.type.precision !== Precision.HALF
    ? getNumeric(vector, index)
    : getFloat16(vector, index));
/* istanbul ignore next */
/** @ignore */
const getDate = (vector, index) => (vector.type.unit === DateUnit.DAY
    ? getDateDay(vector, index)
    : getDateMillisecond(vector, index));
/** @ignore */
const getTimestampSecond = ({ values }, index) => 1000 * epochMillisecondsLongToMs(values, index * 2);
/** @ignore */
const getTimestampMillisecond = ({ values }, index) => epochMillisecondsLongToMs(values, index * 2);
/** @ignore */
const getTimestampMicrosecond = ({ values }, index) => epochMicrosecondsLongToMs(values, index * 2);
/** @ignore */
const getTimestampNanosecond = ({ values }, index) => epochNanosecondsLongToMs(values, index * 2);
/* istanbul ignore next */
/** @ignore */
const getTimestamp = (vector, index) => {
    switch (vector.type.unit) {
        case TimeUnit.SECOND: return getTimestampSecond(vector, index);
        case TimeUnit.MILLISECOND: return getTimestampMillisecond(vector, index);
        case TimeUnit.MICROSECOND: return getTimestampMicrosecond(vector, index);
        case TimeUnit.NANOSECOND: return getTimestampNanosecond(vector, index);
    }
};
/** @ignore */
const getTimeSecond = ({ values, stride }, index) => values[stride * index];
/** @ignore */
const getTimeMillisecond = ({ values, stride }, index) => values[stride * index];
/** @ignore */
const getTimeMicrosecond = ({ values }, index) => BN.signed(values.subarray(2 * index, 2 * (index + 1)));
/** @ignore */
const getTimeNanosecond = ({ values }, index) => BN.signed(values.subarray(2 * index, 2 * (index + 1)));
/* istanbul ignore next */
/** @ignore */
const getTime = (vector, index) => {
    switch (vector.type.unit) {
        case TimeUnit.SECOND: return getTimeSecond(vector, index);
        case TimeUnit.MILLISECOND: return getTimeMillisecond(vector, index);
        case TimeUnit.MICROSECOND: return getTimeMicrosecond(vector, index);
        case TimeUnit.NANOSECOND: return getTimeNanosecond(vector, index);
    }
};
/** @ignore */
const getDecimal = ({ values }, index) => BN.decimal(values.subarray(4 * index, 4 * (index + 1)));
/** @ignore */
const getList = (vector, index) => {
    const child = vector.getChildAt(0), { valueOffsets, stride } = vector;
    return child.slice(valueOffsets[index * stride], valueOffsets[(index * stride) + 1]);
};
/** @ignore */
const getMap = (vector, index) => {
    return vector.bind(index);
};
/** @ignore */
const getStruct = (vector, index) => {
    return vector.bind(index);
};
/* istanbul ignore next */
/** @ignore */
const getUnion = (vector, index) => {
    return vector.type.mode === UnionMode.Dense ?
        getDenseUnion(vector, index) :
        getSparseUnion(vector, index);
};
/** @ignore */
const getDenseUnion = (vector, index) => {
    const childIndex = vector.typeIdToChildIndex[vector.typeIds[index]];
    const child = vector.getChildAt(childIndex);
    return child ? child.get(vector.valueOffsets[index]) : null;
};
/** @ignore */
const getSparseUnion = (vector, index) => {
    const childIndex = vector.typeIdToChildIndex[vector.typeIds[index]];
    const child = vector.getChildAt(childIndex);
    return child ? child.get(index) : null;
};
/** @ignore */
const getDictionary = (vector, index) => {
    return vector.getValue(vector.getKey(index));
};
/* istanbul ignore next */
/** @ignore */
const getInterval = (vector, index) => (vector.type.unit === IntervalUnit.DAY_TIME)
    ? getIntervalDayTime(vector, index)
    : getIntervalYearMonth(vector, index);
/** @ignore */
const getIntervalDayTime = ({ values }, index) => values.subarray(2 * index, 2 * (index + 1));
/** @ignore */
const getIntervalYearMonth = ({ values }, index) => {
    const interval = values[index];
    const int32s = new Int32Array(2);
    int32s[0] = interval / 12 | 0; /* years */
    int32s[1] = interval % 12 | 0; /* months */
    return int32s;
};
/** @ignore */
const getFixedSizeList = (vector, index) => {
    const child = vector.getChildAt(0), { stride } = vector;
    return child.slice(index * stride, (index + 1) * stride);
};
GetVisitor.prototype.visitNull = getNull;
GetVisitor.prototype.visitBool = getBool;
GetVisitor.prototype.visitInt = getInt;
GetVisitor.prototype.visitInt8 = getNumeric;
GetVisitor.prototype.visitInt16 = getNumeric;
GetVisitor.prototype.visitInt32 = getNumeric;
GetVisitor.prototype.visitInt64 = getBigInts;
GetVisitor.prototype.visitUint8 = getNumeric;
GetVisitor.prototype.visitUint16 = getNumeric;
GetVisitor.prototype.visitUint32 = getNumeric;
GetVisitor.prototype.visitUint64 = getBigInts;
GetVisitor.prototype.visitFloat = getFloat;
GetVisitor.prototype.visitFloat16 = getFloat16;
GetVisitor.prototype.visitFloat32 = getNumeric;
GetVisitor.prototype.visitFloat64 = getNumeric;
GetVisitor.prototype.visitUtf8 = getUtf8;
GetVisitor.prototype.visitBinary = getBinary;
GetVisitor.prototype.visitFixedSizeBinary = getFixedSizeBinary;
GetVisitor.prototype.visitDate = getDate;
GetVisitor.prototype.visitDateDay = getDateDay;
GetVisitor.prototype.visitDateMillisecond = getDateMillisecond;
GetVisitor.prototype.visitTimestamp = getTimestamp;
GetVisitor.prototype.visitTimestampSecond = getTimestampSecond;
GetVisitor.prototype.visitTimestampMillisecond = getTimestampMillisecond;
GetVisitor.prototype.visitTimestampMicrosecond = getTimestampMicrosecond;
GetVisitor.prototype.visitTimestampNanosecond = getTimestampNanosecond;
GetVisitor.prototype.visitTime = getTime;
GetVisitor.prototype.visitTimeSecond = getTimeSecond;
GetVisitor.prototype.visitTimeMillisecond = getTimeMillisecond;
GetVisitor.prototype.visitTimeMicrosecond = getTimeMicrosecond;
GetVisitor.prototype.visitTimeNanosecond = getTimeNanosecond;
GetVisitor.prototype.visitDecimal = getDecimal;
GetVisitor.prototype.visitList = getList;
GetVisitor.prototype.visitStruct = getStruct;
GetVisitor.prototype.visitUnion = getUnion;
GetVisitor.prototype.visitDenseUnion = getDenseUnion;
GetVisitor.prototype.visitSparseUnion = getSparseUnion;
GetVisitor.prototype.visitDictionary = getDictionary;
GetVisitor.prototype.visitInterval = getInterval;
GetVisitor.prototype.visitIntervalDayTime = getIntervalDayTime;
GetVisitor.prototype.visitIntervalYearMonth = getIntervalYearMonth;
GetVisitor.prototype.visitFixedSizeList = getFixedSizeList;
GetVisitor.prototype.visitMap = getMap;
/** @ignore */
const instance$5 = new GetVisitor();

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class IndexOfVisitor extends Visitor {
}
/** @ignore */
function nullIndexOf(vector, searchElement) {
    // if you're looking for nulls and the vector isn't empty, we've got 'em!
    return searchElement === null && vector.length > 0 ? 0 : -1;
}
/** @ignore */
function indexOfNull(vector, fromIndex) {
    const { nullBitmap } = vector.data;
    if (!nullBitmap || vector.nullCount <= 0) {
        return -1;
    }
    let i = 0;
    for (const isValid of new BitIterator(nullBitmap, vector.data.offset + (fromIndex || 0), vector.length, nullBitmap, getBool$1)) {
        if (!isValid) {
            return i;
        }
        ++i;
    }
    return -1;
}
/** @ignore */
function indexOfValue(vector, searchElement, fromIndex) {
    if (searchElement === undefined) {
        return -1;
    }
    if (searchElement === null) {
        return indexOfNull(vector, fromIndex);
    }
    const compare = createElementComparator(searchElement);
    for (let i = (fromIndex || 0) - 1, n = vector.length; ++i < n;) {
        if (compare(vector.get(i))) {
            return i;
        }
    }
    return -1;
}
/** @ignore */
function indexOfUnion(vector, searchElement, fromIndex) {
    // Unions are special -- they do have a nullBitmap, but so can their children.
    // If the searchElement is null, we don't know whether it came from the Union's
    // bitmap or one of its childrens'. So we don't interrogate the Union's bitmap,
    // since that will report the wrong index if a child has a null before the Union.
    const compare = createElementComparator(searchElement);
    for (let i = (fromIndex || 0) - 1, n = vector.length; ++i < n;) {
        if (compare(vector.get(i))) {
            return i;
        }
    }
    return -1;
}
IndexOfVisitor.prototype.visitNull = nullIndexOf;
IndexOfVisitor.prototype.visitBool = indexOfValue;
IndexOfVisitor.prototype.visitInt = indexOfValue;
IndexOfVisitor.prototype.visitInt8 = indexOfValue;
IndexOfVisitor.prototype.visitInt16 = indexOfValue;
IndexOfVisitor.prototype.visitInt32 = indexOfValue;
IndexOfVisitor.prototype.visitInt64 = indexOfValue;
IndexOfVisitor.prototype.visitUint8 = indexOfValue;
IndexOfVisitor.prototype.visitUint16 = indexOfValue;
IndexOfVisitor.prototype.visitUint32 = indexOfValue;
IndexOfVisitor.prototype.visitUint64 = indexOfValue;
IndexOfVisitor.prototype.visitFloat = indexOfValue;
IndexOfVisitor.prototype.visitFloat16 = indexOfValue;
IndexOfVisitor.prototype.visitFloat32 = indexOfValue;
IndexOfVisitor.prototype.visitFloat64 = indexOfValue;
IndexOfVisitor.prototype.visitUtf8 = indexOfValue;
IndexOfVisitor.prototype.visitBinary = indexOfValue;
IndexOfVisitor.prototype.visitFixedSizeBinary = indexOfValue;
IndexOfVisitor.prototype.visitDate = indexOfValue;
IndexOfVisitor.prototype.visitDateDay = indexOfValue;
IndexOfVisitor.prototype.visitDateMillisecond = indexOfValue;
IndexOfVisitor.prototype.visitTimestamp = indexOfValue;
IndexOfVisitor.prototype.visitTimestampSecond = indexOfValue;
IndexOfVisitor.prototype.visitTimestampMillisecond = indexOfValue;
IndexOfVisitor.prototype.visitTimestampMicrosecond = indexOfValue;
IndexOfVisitor.prototype.visitTimestampNanosecond = indexOfValue;
IndexOfVisitor.prototype.visitTime = indexOfValue;
IndexOfVisitor.prototype.visitTimeSecond = indexOfValue;
IndexOfVisitor.prototype.visitTimeMillisecond = indexOfValue;
IndexOfVisitor.prototype.visitTimeMicrosecond = indexOfValue;
IndexOfVisitor.prototype.visitTimeNanosecond = indexOfValue;
IndexOfVisitor.prototype.visitDecimal = indexOfValue;
IndexOfVisitor.prototype.visitList = indexOfValue;
IndexOfVisitor.prototype.visitStruct = indexOfValue;
IndexOfVisitor.prototype.visitUnion = indexOfValue;
IndexOfVisitor.prototype.visitDenseUnion = indexOfUnion;
IndexOfVisitor.prototype.visitSparseUnion = indexOfUnion;
IndexOfVisitor.prototype.visitDictionary = indexOfValue;
IndexOfVisitor.prototype.visitInterval = indexOfValue;
IndexOfVisitor.prototype.visitIntervalDayTime = indexOfValue;
IndexOfVisitor.prototype.visitIntervalYearMonth = indexOfValue;
IndexOfVisitor.prototype.visitFixedSizeList = indexOfValue;
IndexOfVisitor.prototype.visitMap = indexOfValue;
/** @ignore */
const instance$4 = new IndexOfVisitor();

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class IteratorVisitor extends Visitor {
}
/** @ignore */
function nullableIterator(vector) {
    const getFn = instance$5.getVisitFn(vector);
    return new BitIterator(vector.data.nullBitmap, vector.data.offset, vector.length, vector, (vec, idx, nullByte, nullBit) => ((nullByte & 1 << nullBit) !== 0) ? getFn(vec, idx) : null);
}
/** @ignore */
class VectorIterator {
    constructor(vector, getFn) {
        this.vector = vector;
        this.getFn = getFn;
        this.index = 0;
    }
    next() {
        if (this.index < this.vector.length) {
            return {
                value: this.getFn(this.vector, this.index++)
            };
        }
        return { done: true, value: null };
    }
    [Symbol.iterator]() {
        return this;
    }
}
/** @ignore */
function vectorIterator(vector) {
    // If nullable, iterate manually
    if (vector.nullCount > 0) {
        return nullableIterator(vector);
    }
    const { type, typeId, length } = vector;
    // Fast case, defer to native iterators if possible
    if (vector.stride === 1 && ((typeId === Type.Timestamp) ||
        (typeId === Type.Int && type.bitWidth !== 64) ||
        (typeId === Type.Time && type.bitWidth !== 64) ||
        (typeId === Type.Float && type.precision > 0 /* Precision.HALF */))) {
        return vector.data.values.subarray(0, length)[Symbol.iterator]();
    }
    // Otherwise, iterate manually
    return new VectorIterator(vector, instance$5.getVisitFn(vector));
}
IteratorVisitor.prototype.visitNull = vectorIterator;
IteratorVisitor.prototype.visitBool = vectorIterator;
IteratorVisitor.prototype.visitInt = vectorIterator;
IteratorVisitor.prototype.visitInt8 = vectorIterator;
IteratorVisitor.prototype.visitInt16 = vectorIterator;
IteratorVisitor.prototype.visitInt32 = vectorIterator;
IteratorVisitor.prototype.visitInt64 = vectorIterator;
IteratorVisitor.prototype.visitUint8 = vectorIterator;
IteratorVisitor.prototype.visitUint16 = vectorIterator;
IteratorVisitor.prototype.visitUint32 = vectorIterator;
IteratorVisitor.prototype.visitUint64 = vectorIterator;
IteratorVisitor.prototype.visitFloat = vectorIterator;
IteratorVisitor.prototype.visitFloat16 = vectorIterator;
IteratorVisitor.prototype.visitFloat32 = vectorIterator;
IteratorVisitor.prototype.visitFloat64 = vectorIterator;
IteratorVisitor.prototype.visitUtf8 = vectorIterator;
IteratorVisitor.prototype.visitBinary = vectorIterator;
IteratorVisitor.prototype.visitFixedSizeBinary = vectorIterator;
IteratorVisitor.prototype.visitDate = vectorIterator;
IteratorVisitor.prototype.visitDateDay = vectorIterator;
IteratorVisitor.prototype.visitDateMillisecond = vectorIterator;
IteratorVisitor.prototype.visitTimestamp = vectorIterator;
IteratorVisitor.prototype.visitTimestampSecond = vectorIterator;
IteratorVisitor.prototype.visitTimestampMillisecond = vectorIterator;
IteratorVisitor.prototype.visitTimestampMicrosecond = vectorIterator;
IteratorVisitor.prototype.visitTimestampNanosecond = vectorIterator;
IteratorVisitor.prototype.visitTime = vectorIterator;
IteratorVisitor.prototype.visitTimeSecond = vectorIterator;
IteratorVisitor.prototype.visitTimeMillisecond = vectorIterator;
IteratorVisitor.prototype.visitTimeMicrosecond = vectorIterator;
IteratorVisitor.prototype.visitTimeNanosecond = vectorIterator;
IteratorVisitor.prototype.visitDecimal = vectorIterator;
IteratorVisitor.prototype.visitList = vectorIterator;
IteratorVisitor.prototype.visitStruct = vectorIterator;
IteratorVisitor.prototype.visitUnion = vectorIterator;
IteratorVisitor.prototype.visitDenseUnion = vectorIterator;
IteratorVisitor.prototype.visitSparseUnion = vectorIterator;
IteratorVisitor.prototype.visitDictionary = vectorIterator;
IteratorVisitor.prototype.visitInterval = vectorIterator;
IteratorVisitor.prototype.visitIntervalDayTime = vectorIterator;
IteratorVisitor.prototype.visitIntervalYearMonth = vectorIterator;
IteratorVisitor.prototype.visitFixedSizeList = vectorIterator;
IteratorVisitor.prototype.visitMap = vectorIterator;
/** @ignore */
const instance$3 = new IteratorVisitor();

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class ToArrayVisitor extends Visitor {
}
/** @ignore */
function arrayOfVector(vector) {
    const { type, length, stride } = vector;
    // Fast case, return subarray if possible
    switch (type.typeId) {
        case Type.Int:
        case Type.Float:
        case Type.Decimal:
        case Type.Time:
        case Type.Timestamp:
            return vector.data.values.subarray(0, length * stride);
    }
    // Otherwise if not primitive, slow copy
    return [...instance$3.visit(vector)];
}
ToArrayVisitor.prototype.visitNull = arrayOfVector;
ToArrayVisitor.prototype.visitBool = arrayOfVector;
ToArrayVisitor.prototype.visitInt = arrayOfVector;
ToArrayVisitor.prototype.visitInt8 = arrayOfVector;
ToArrayVisitor.prototype.visitInt16 = arrayOfVector;
ToArrayVisitor.prototype.visitInt32 = arrayOfVector;
ToArrayVisitor.prototype.visitInt64 = arrayOfVector;
ToArrayVisitor.prototype.visitUint8 = arrayOfVector;
ToArrayVisitor.prototype.visitUint16 = arrayOfVector;
ToArrayVisitor.prototype.visitUint32 = arrayOfVector;
ToArrayVisitor.prototype.visitUint64 = arrayOfVector;
ToArrayVisitor.prototype.visitFloat = arrayOfVector;
ToArrayVisitor.prototype.visitFloat16 = arrayOfVector;
ToArrayVisitor.prototype.visitFloat32 = arrayOfVector;
ToArrayVisitor.prototype.visitFloat64 = arrayOfVector;
ToArrayVisitor.prototype.visitUtf8 = arrayOfVector;
ToArrayVisitor.prototype.visitBinary = arrayOfVector;
ToArrayVisitor.prototype.visitFixedSizeBinary = arrayOfVector;
ToArrayVisitor.prototype.visitDate = arrayOfVector;
ToArrayVisitor.prototype.visitDateDay = arrayOfVector;
ToArrayVisitor.prototype.visitDateMillisecond = arrayOfVector;
ToArrayVisitor.prototype.visitTimestamp = arrayOfVector;
ToArrayVisitor.prototype.visitTimestampSecond = arrayOfVector;
ToArrayVisitor.prototype.visitTimestampMillisecond = arrayOfVector;
ToArrayVisitor.prototype.visitTimestampMicrosecond = arrayOfVector;
ToArrayVisitor.prototype.visitTimestampNanosecond = arrayOfVector;
ToArrayVisitor.prototype.visitTime = arrayOfVector;
ToArrayVisitor.prototype.visitTimeSecond = arrayOfVector;
ToArrayVisitor.prototype.visitTimeMillisecond = arrayOfVector;
ToArrayVisitor.prototype.visitTimeMicrosecond = arrayOfVector;
ToArrayVisitor.prototype.visitTimeNanosecond = arrayOfVector;
ToArrayVisitor.prototype.visitDecimal = arrayOfVector;
ToArrayVisitor.prototype.visitList = arrayOfVector;
ToArrayVisitor.prototype.visitStruct = arrayOfVector;
ToArrayVisitor.prototype.visitUnion = arrayOfVector;
ToArrayVisitor.prototype.visitDenseUnion = arrayOfVector;
ToArrayVisitor.prototype.visitSparseUnion = arrayOfVector;
ToArrayVisitor.prototype.visitDictionary = arrayOfVector;
ToArrayVisitor.prototype.visitInterval = arrayOfVector;
ToArrayVisitor.prototype.visitIntervalDayTime = arrayOfVector;
ToArrayVisitor.prototype.visitIntervalYearMonth = arrayOfVector;
ToArrayVisitor.prototype.visitFixedSizeList = arrayOfVector;
ToArrayVisitor.prototype.visitMap = arrayOfVector;
/** @ignore */
const instance$2 = new ToArrayVisitor();

/* istanbul ignore file */
/** @ignore */ const sum = (x, y) => x + y;
/** @ignore */ const variableWidthColumnErrorMessage = (type) => `Cannot compute the byte width of variable-width column ${type}`;
/** @ignore */
class ByteWidthVisitor extends Visitor {
    visitNull(____) { return 0; }
    visitInt(type) { return type.bitWidth / 8; }
    visitFloat(type) { return type.ArrayType.BYTES_PER_ELEMENT; }
    visitBinary(type) { throw new Error(variableWidthColumnErrorMessage(type)); }
    visitUtf8(type) { throw new Error(variableWidthColumnErrorMessage(type)); }
    visitBool(____) { return 1 / 8; }
    visitDecimal(____) { return 16; }
    visitDate(type) { return (type.unit + 1) * 4; }
    visitTime(type) { return type.bitWidth / 8; }
    visitTimestamp(type) { return type.unit === TimeUnit.SECOND ? 4 : 8; }
    visitInterval(type) { return (type.unit + 1) * 4; }
    visitList(type) { throw new Error(variableWidthColumnErrorMessage(type)); }
    visitStruct(type) { return this.visitFields(type.children).reduce(sum, 0); }
    visitUnion(type) { return this.visitFields(type.children).reduce(sum, 0); }
    visitFixedSizeBinary(type) { return type.byteWidth; }
    visitFixedSizeList(type) { return type.listSize * this.visitFields(type.children).reduce(sum, 0); }
    visitMap(type) { return this.visitFields(type.children).reduce(sum, 0); }
    visitDictionary(type) { return this.visit(type.indices); }
    visitFields(fields) { return (fields || []).map((field) => this.visit(field.type)); }
    visitSchema(schema) { return this.visitFields(schema.fields).reduce(sum, 0); }
}
/** @ignore */
const instance$1 = new ByteWidthVisitor();

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class GetVectorConstructor extends Visitor {
    visitNull() { return NullVector; }
    visitBool() { return BoolVector; }
    visitInt() { return IntVector; }
    visitInt8() { return Int8Vector; }
    visitInt16() { return Int16Vector; }
    visitInt32() { return Int32Vector; }
    visitInt64() { return Int64Vector; }
    visitUint8() { return Uint8Vector; }
    visitUint16() { return Uint16Vector; }
    visitUint32() { return Uint32Vector; }
    visitUint64() { return Uint64Vector; }
    visitFloat() { return FloatVector; }
    visitFloat16() { return Float16Vector; }
    visitFloat32() { return Float32Vector; }
    visitFloat64() { return Float64Vector; }
    visitUtf8() { return Utf8Vector; }
    visitBinary() { return BinaryVector; }
    visitFixedSizeBinary() { return FixedSizeBinaryVector; }
    visitDate() { return DateVector; }
    visitDateDay() { return DateDayVector; }
    visitDateMillisecond() { return DateMillisecondVector; }
    visitTimestamp() { return TimestampVector; }
    visitTimestampSecond() { return TimestampSecondVector; }
    visitTimestampMillisecond() { return TimestampMillisecondVector; }
    visitTimestampMicrosecond() { return TimestampMicrosecondVector; }
    visitTimestampNanosecond() { return TimestampNanosecondVector; }
    visitTime() { return TimeVector; }
    visitTimeSecond() { return TimeSecondVector; }
    visitTimeMillisecond() { return TimeMillisecondVector; }
    visitTimeMicrosecond() { return TimeMicrosecondVector; }
    visitTimeNanosecond() { return TimeNanosecondVector; }
    visitDecimal() { return DecimalVector; }
    visitList() { return ListVector; }
    visitStruct() { return StructVector; }
    visitUnion() { return UnionVector; }
    visitDenseUnion() { return DenseUnionVector; }
    visitSparseUnion() { return SparseUnionVector; }
    visitDictionary() { return DictionaryVector; }
    visitInterval() { return IntervalVector; }
    visitIntervalDayTime() { return IntervalDayTimeVector; }
    visitIntervalYearMonth() { return IntervalYearMonthVector; }
    visitFixedSizeList() { return FixedSizeListVector; }
    visitMap() { return MapVector; }
}
/** @ignore */
const instance = new GetVectorConstructor();

// Licensed to the Apache Software Foundation (ASF) under one
/** @nocollapse */
AbstractVector.new = newVector;
/** @nocollapse */
AbstractVector.from = vectorFrom;
/** @ignore */
function newVector(data, ...args) {
    return new (instance.getVisitFn(data)())(data, ...args);
}
/** @ignore */
function vectorFromValuesWithType(newDataType, input) {
    if (isIterable(input)) {
        return AbstractVector.from({ 'nullValues': [null, undefined], type: newDataType(), 'values': input });
    }
    else if (isAsyncIterable(input)) {
        return AbstractVector.from({ 'nullValues': [null, undefined], type: newDataType(), 'values': input });
    }
    const { 'values': values = [], 'type': type = newDataType(), 'nullValues': nullValues = [null, undefined], } = Object.assign({}, input);
    return isIterable(values)
        ? AbstractVector.from(Object.assign(Object.assign({ nullValues }, input), { type }))
        : AbstractVector.from(Object.assign(Object.assign({ nullValues }, input), { type }));
}
function vectorFrom(input) {
    const _a = Object.assign({ 'nullValues': [null, undefined] }, input), { 'values': values = [] } = _a, options = __rest(_a, ['values']);
    if (isIterable(values)) {
        const chunks = [...Builder$2.throughIterable(options)(values)];
        return (chunks.length === 1 ? chunks[0] : Chunked.concat(chunks));
    }
    return ((chunks) => __awaiter(this, void 0, void 0, function* () {
        var e_1, _b;
        const transform = Builder$2.throughAsyncIterable(options);
        try {
            for (var _c = __asyncValues(transform(values)), _d; _d = yield _c.next(), !_d.done;) {
                const chunk = _d.value;
                chunks.push(chunk);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return)) yield _b.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return (chunks.length === 1 ? chunks[0] : Chunked.concat(chunks));
    }))([]);
}
//
// We provide the following method implementations for code navigability purposes only.
// They're overridden at runtime below with the specific Visitor implementation for each type,
// short-circuiting the usual Visitor traversal and reducing intermediate lookups and calls.
// This comment is here to remind you to not set breakpoints in these function bodies, or to inform
// you why the breakpoints you have already set are not being triggered. Have a great day!
//
BaseVector.prototype.get = function baseVectorGet(index) {
    return instance$5.visit(this, index);
};
BaseVector.prototype.set = function baseVectorSet(index, value) {
    return instance$9.visit(this, index, value);
};
BaseVector.prototype.indexOf = function baseVectorIndexOf(value, fromIndex) {
    return instance$4.visit(this, value, fromIndex);
};
BaseVector.prototype.toArray = function baseVectorToArray() {
    return instance$2.visit(this);
};
BaseVector.prototype.getByteWidth = function baseVectorGetByteWidth() {
    return instance$1.visit(this.type);
};
BaseVector.prototype[Symbol.iterator] = function baseVectorSymbolIterator() {
    return instance$3.visit(this);
};
BaseVector.prototype._bindDataAccessors = bindBaseVectorDataAccessors;
// Perf: bind and assign the operator Visitor methods to each of the Vector subclasses for each Type
Object.keys(Type)
    .map((T) => Type[T])
    .filter((T) => typeof T === 'number')
    .filter((typeId) => typeId !== Type.NONE)
    .forEach((typeId) => {
    const VectorCtor = instance.visit(typeId);
    VectorCtor.prototype['get'] = partial1(instance$5.getVisitFn(typeId));
    VectorCtor.prototype['set'] = partial2(instance$9.getVisitFn(typeId));
    VectorCtor.prototype['indexOf'] = partial2(instance$4.getVisitFn(typeId));
    VectorCtor.prototype['toArray'] = partial0(instance$2.getVisitFn(typeId));
    VectorCtor.prototype['getByteWidth'] = partialType0(instance$1.getVisitFn(typeId));
    VectorCtor.prototype[Symbol.iterator] = partial0(instance$3.getVisitFn(typeId));
});
/** @ignore */
function partialType0(visit) {
    return function () { return visit(this.type); };
}
/** @ignore */
function wrapNullableGet(fn) {
    return function (i) { return this.isValid(i) ? fn.call(this, i) : null; };
}
/** @ignore */
function wrapNullableSet(fn) {
    return function (i, a) {
        if (setBool$1(this.nullBitmap, this.offset + i, !((a == null)))) {
            fn.call(this, i, a);
        }
    };
}
/** @ignore */
function bindBaseVectorDataAccessors() {
    const nullBitmap = this.nullBitmap;
    if (nullBitmap && nullBitmap.byteLength > 0) {
        this.get = wrapNullableGet(this.get);
        this.set = wrapNullableSet(this.set);
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
class Table extends Chunked {
    constructor(...args) {
        var _a;
        let schema = null;
        if (args[0] instanceof Schema) {
            schema = args[0];
        }
        const chunks = args[0] instanceof Table ? args[0].chunks : selectArgs(RecordBatch, args);
        if (!schema && !(schema = (_a = chunks[0]) === null || _a === void 0 ? void 0 : _a.schema)) {
            throw new TypeError('Table must be initialized with a Schema or at least one RecordBatch');
        }
        chunks[0] || (chunks[0] = new _InternalEmptyPlaceholderRecordBatch(schema));
        super(new Struct(schema.fields), chunks);
        this._schema = schema;
        this._chunks = chunks;
    }
    /** @nocollapse */
    static empty(schema = new Schema([])) { return new Table(schema, []); }
    /** @nocollapse */
    static from(input) {
        if (!input) {
            return Table.empty();
        }
        if (typeof input === 'object') {
            const table = isIterable(input['values']) ? tableFromIterable(input)
                : isAsyncIterable(input['values']) ? tableFromAsyncIterable(input)
                    : null;
            if (table !== null) {
                return table;
            }
        }
        let reader = RecordBatchReader.from(input);
        if (isPromise(reader)) {
            return (() => __awaiter(this, void 0, void 0, function* () { return yield Table.from(yield reader); }))();
        }
        if (reader.isSync() && (reader = reader.open())) {
            return !reader.schema ? Table.empty() : new Table(reader.schema, [...reader]);
        }
        return ((opening) => __awaiter(this, void 0, void 0, function* () {
            var e_1, _a;
            const reader = yield opening;
            const schema = reader.schema;
            const batches = [];
            if (schema) {
                try {
                    for (var reader_1 = __asyncValues(reader), reader_1_1; reader_1_1 = yield reader_1.next(), !reader_1_1.done;) {
                        const batch = reader_1_1.value;
                        batches.push(batch);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (reader_1_1 && !reader_1_1.done && (_a = reader_1.return)) yield _a.call(reader_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return new Table(schema, batches);
            }
            return Table.empty();
        }))(reader.open());
    }
    /** @nocollapse */
    static fromAsync(source) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Table.from(source);
        });
    }
    /** @nocollapse */
    static fromStruct(vector) {
        return Table.new(vector.data.childData, vector.type.children);
    }
    /** @nocollapse */
    static new(...cols) {
        return new Table(...distributeColumnsIntoRecordBatches(selectColumnArgs(cols)));
    }
    get schema() { return this._schema; }
    get length() { return this._length; }
    get chunks() { return this._chunks; }
    get numCols() { return this._numChildren; }
    clone(chunks = this._chunks) {
        return new Table(this._schema, chunks);
    }
    getColumn(name) {
        return this.getColumnAt(this.getColumnIndex(name));
    }
    getColumnAt(index) {
        return this.getChildAt(index);
    }
    getColumnIndex(name) {
        return this._schema.fields.findIndex((f) => f.name === name);
    }
    getChildAt(index) {
        if (index < 0 || index >= this.numChildren) {
            return null;
        }
        let field, child;
        const fields = this._schema.fields;
        const columns = this._children || (this._children = []);
        if (child = columns[index]) {
            return child;
        }
        if (field = fields[index]) {
            const chunks = this._chunks
                .map((chunk) => chunk.getChildAt(index))
                .filter((vec) => vec != null);
            if (chunks.length > 0) {
                return (columns[index] = new Column(field, chunks));
            }
        }
        return null;
    }
    // @ts-ignore
    serialize(encoding = 'binary', stream = true) {
        const Writer = !stream
            ? RecordBatchFileWriter
            : RecordBatchStreamWriter;
        return Writer.writeAll(this).toUint8Array(true);
    }
    count() {
        return this._length;
    }
    select(...columnNames) {
        const nameToIndex = this._schema.fields.reduce((m, f, i) => m.set(f.name, i), new Map());
        return this.selectAt(...columnNames.map((columnName) => nameToIndex.get(columnName)).filter((x) => x > -1));
    }
    selectAt(...columnIndices) {
        const schema = this._schema.selectAt(...columnIndices);
        return new Table(schema, this._chunks.map(({ length, data: { childData } }) => {
            return new RecordBatch(schema, length, columnIndices.map((i) => childData[i]).filter(Boolean));
        }));
    }
    assign(other) {
        const fields = this._schema.fields;
        const [indices, oldToNew] = other.schema.fields.reduce((memo, f2, newIdx) => {
            const [indices, oldToNew] = memo;
            const i = fields.findIndex((f) => f.name === f2.name);
            ~i ? (oldToNew[i] = newIdx) : indices.push(newIdx);
            return memo;
        }, [[], []]);
        const schema = this._schema.assign(other.schema);
        const columns = [
            ...fields.map((_f, i, _fs, j = oldToNew[i]) => (j === undefined ? this.getColumnAt(i) : other.getColumnAt(j))),
            ...indices.map((i) => other.getColumnAt(i))
        ].filter(Boolean);
        return new Table(...distributeVectorsIntoRecordBatches(schema, columns));
    }
}
function tableFromIterable(input) {
    const { type } = input;
    if (type instanceof Struct) {
        return Table.fromStruct(StructVector.from(input));
    }
    return null;
}
function tableFromAsyncIterable(input) {
    const { type } = input;
    if (type instanceof Struct) {
        return StructVector.from(input).then((vector) => Table.fromStruct(vector));
    }
    return null;
}

// Licensed to the Apache Software Foundation (ASF) under one
class RecordBatch extends StructVector {
    constructor(...args) {
        let data;
        const schema = args[0];
        let children;
        if (args[1] instanceof Data) {
            [, data, children] = args;
        }
        else {
            const fields = schema.fields;
            const [, length, childData] = args;
            data = Data.Struct(new Struct(fields), 0, length, 0, null, childData);
        }
        super(data, children);
        this._schema = schema;
    }
    /** @nocollapse */
    static from(options) {
        if (isIterable(options['values'])) {
            return Table.from(options);
        }
        return Table.from(options);
    }
    /** @nocollapse */
    static new(...args) {
        const [fs, xs] = selectFieldArgs(args);
        const vs = xs.filter((x) => x instanceof AbstractVector);
        return new RecordBatch(...ensureSameLengthData(new Schema(fs), vs.map((x) => x.data)));
    }
    clone(data, children = this._children) {
        return new RecordBatch(this._schema, data, children);
    }
    concat(...others) {
        const schema = this._schema, chunks = Chunked.flatten(this, ...others);
        return new Table(schema, chunks.map(({ data }) => new RecordBatch(schema, data)));
    }
    get schema() { return this._schema; }
    get numCols() { return this._schema.fields.length; }
    get dictionaries() {
        return this._dictionaries || (this._dictionaries = DictionaryCollector.collect(this));
    }
    select(...columnNames) {
        const nameToIndex = this._schema.fields.reduce((m, f, i) => m.set(f.name, i), new Map());
        return this.selectAt(...columnNames.map((columnName) => nameToIndex.get(columnName)).filter((x) => x > -1));
    }
    selectAt(...columnIndices) {
        const schema = this._schema.selectAt(...columnIndices);
        const childData = columnIndices.map((i) => this.data.childData[i]).filter(Boolean);
        return new RecordBatch(schema, this.length, childData);
    }
}
/**
 * An internal class used by the `RecordBatchReader` and `RecordBatchWriter`
 * implementations to differentiate between a stream with valid zero-length
 * RecordBatches, and a stream with a Schema message, but no RecordBatches.
 * @see https://github.com/apache/arrow/pull/4373
 * @ignore
 * @private
 */
/* eslint-disable @typescript-eslint/naming-convention */
class _InternalEmptyPlaceholderRecordBatch extends RecordBatch {
    constructor(schema) {
        super(schema, 0, schema.fields.map((f) => Data.new(f.type, 0, 0, 0)));
    }
}
/** @ignore */
class DictionaryCollector extends Visitor {
    constructor() {
        super(...arguments);
        this.dictionaries = new Map();
    }
    static collect(batch) {
        return new DictionaryCollector().visit(batch.data, new Struct(batch.schema.fields)).dictionaries;
    }
    visit(data, type) {
        if (DataType.isDictionary(type)) {
            return this.visitDictionary(data, type);
        }
        else {
            data.childData.forEach((child, i) => this.visit(child, type.children[i].type));
        }
        return this;
    }
    visitDictionary(data, type) {
        const dictionary = data.dictionary;
        if (dictionary && dictionary.length > 0) {
            this.dictionaries.set(type.id, dictionary);
        }
        return this;
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
class RecordBatchReader extends ReadableInterop {
    constructor(impl) {
        super();
        this._impl = impl;
    }
    get closed() { return this._impl.closed; }
    get schema() { return this._impl.schema; }
    get autoDestroy() { return this._impl.autoDestroy; }
    get dictionaries() { return this._impl.dictionaries; }
    get numDictionaries() { return this._impl.numDictionaries; }
    get numRecordBatches() { return this._impl.numRecordBatches; }
    get footer() { return this._impl.isFile() ? this._impl.footer : null; }
    isSync() { return this._impl.isSync(); }
    isAsync() { return this._impl.isAsync(); }
    isFile() { return this._impl.isFile(); }
    isStream() { return this._impl.isStream(); }
    next() {
        return this._impl.next();
    }
    throw(value) {
        return this._impl.throw(value);
    }
    return(value) {
        return this._impl.return(value);
    }
    cancel() {
        return this._impl.cancel();
    }
    reset(schema) {
        this._impl.reset(schema);
        this._DOMStream = undefined;
        this._nodeStream = undefined;
        return this;
    }
    open(options) {
        const opening = this._impl.open(options);
        return isPromise(opening) ? opening.then(() => this) : this;
    }
    readRecordBatch(index) {
        return this._impl.isFile() ? this._impl.readRecordBatch(index) : null;
    }
    [Symbol.iterator]() {
        return this._impl[Symbol.iterator]();
    }
    [Symbol.asyncIterator]() {
        return this._impl[Symbol.asyncIterator]();
    }
    toDOMStream() {
        return streamAdapters.toDOMStream((this.isSync()
            ? { [Symbol.iterator]: () => this }
            : { [Symbol.asyncIterator]: () => this }));
    }
    toNodeStream() {
        return streamAdapters.toNodeStream((this.isSync()
            ? { [Symbol.iterator]: () => this }
            : { [Symbol.asyncIterator]: () => this }), { objectMode: true });
    }
    /** @nocollapse */
    // @ts-ignore
    static throughNode(options) {
        throw new Error(`"throughNode" not available in this environment`);
    }
    /** @nocollapse */
    static throughDOM(
    // @ts-ignore
    writableStrategy, 
    // @ts-ignore
    readableStrategy) {
        throw new Error(`"throughDOM" not available in this environment`);
    }
    /** @nocollapse */
    static from(source) {
        if (source instanceof RecordBatchReader) {
            return source;
        }
        else if (isArrowJSON(source)) {
            return fromArrowJSON(source);
        }
        else if (isFileHandle(source)) {
            return fromFileHandle(source);
        }
        else if (isPromise(source)) {
            return (() => __awaiter(this, void 0, void 0, function* () { return yield RecordBatchReader.from(yield source); }))();
        }
        else if (isFetchResponse(source) || isReadableDOMStream(source) || isReadableNodeStream(source) || isAsyncIterable(source)) {
            return fromAsyncByteStream(new AsyncByteStream(source));
        }
        return fromByteStream(new ByteStream(source));
    }
    /** @nocollapse */
    static readAll(source) {
        if (source instanceof RecordBatchReader) {
            return source.isSync() ? readAllSync(source) : readAllAsync(source);
        }
        else if (isArrowJSON(source) || ArrayBuffer.isView(source) || isIterable(source) || isIteratorResult(source)) {
            return readAllSync(source);
        }
        return readAllAsync(source);
    }
}
//
// Since TS is a structural type system, we define the following subclass stubs
// so that concrete types exist to associate with with the interfaces below.
//
// The implementation for each RecordBatchReader is hidden away in the set of
// `RecordBatchReaderImpl` classes in the second half of this file. This allows
// us to export a single RecordBatchReader class, and swap out the impl based
// on the io primitives or underlying arrow (JSON, file, or stream) at runtime.
//
// Async/await makes our job a bit harder, since it forces everything to be
// either fully sync or fully async. This is why the logic for the reader impls
// has been duplicated into both sync and async variants. Since the RBR
// delegates to its impl, an RBR with an AsyncRecordBatchFileReaderImpl for
// example will return async/await-friendly Promises, but one with a (sync)
// RecordBatchStreamReaderImpl will always return values. Nothing should be
// different about their logic, aside from the async handling. This is also why
// this code looks highly structured, as it should be nearly identical and easy
// to follow.
//
/** @ignore */
class RecordBatchStreamReader extends RecordBatchReader {
    constructor(_impl) {
        super(_impl);
        this._impl = _impl;
    }
    [Symbol.iterator]() { return this._impl[Symbol.iterator](); }
    [Symbol.asyncIterator]() { return __asyncGenerator(this, arguments, function* _a() { yield __await(yield* __asyncDelegator(__asyncValues(this[Symbol.iterator]()))); }); }
}
/** @ignore */
class AsyncRecordBatchStreamReader extends RecordBatchReader {
    constructor(_impl) {
        super(_impl);
        this._impl = _impl;
    }
    [Symbol.iterator]() { throw new Error(`AsyncRecordBatchStreamReader is not Iterable`); }
    [Symbol.asyncIterator]() { return this._impl[Symbol.asyncIterator](); }
}
/** @ignore */
class RecordBatchFileReader extends RecordBatchStreamReader {
    constructor(_impl) {
        super(_impl);
        this._impl = _impl;
    }
}
/** @ignore */
class AsyncRecordBatchFileReader extends AsyncRecordBatchStreamReader {
    constructor(_impl) {
        super(_impl);
        this._impl = _impl;
    }
}
/** @ignore */
class RecordBatchReaderImpl {
    constructor(dictionaries = new Map()) {
        this.closed = false;
        this.autoDestroy = true;
        this._dictionaryIndex = 0;
        this._recordBatchIndex = 0;
        this.dictionaries = dictionaries;
    }
    get numDictionaries() { return this._dictionaryIndex; }
    get numRecordBatches() { return this._recordBatchIndex; }
    isSync() { return false; }
    isAsync() { return false; }
    isFile() { return false; }
    isStream() { return false; }
    reset(schema) {
        this._dictionaryIndex = 0;
        this._recordBatchIndex = 0;
        this.schema = schema;
        this.dictionaries = new Map();
        return this;
    }
    _loadRecordBatch(header, body) {
        return new RecordBatch(this.schema, header.length, this._loadVectors(header, body, this.schema.fields));
    }
    _loadDictionaryBatch(header, body) {
        const { id, isDelta, data } = header;
        const { dictionaries, schema } = this;
        const dictionary = dictionaries.get(id);
        if (isDelta || !dictionary) {
            const type = schema.dictionaries.get(id);
            return (dictionary && isDelta ? dictionary.concat(AbstractVector.new(this._loadVectors(data, body, [type])[0])) :
                AbstractVector.new(this._loadVectors(data, body, [type])[0]));
        }
        return dictionary;
    }
    _loadVectors(header, body, types) {
        return new VectorLoader(body, header.nodes, header.buffers, this.dictionaries).visitMany(types);
    }
}
/** @ignore */
class RecordBatchStreamReaderImpl extends RecordBatchReaderImpl {
    constructor(source, dictionaries) {
        super(dictionaries);
        this._reader = !isArrowJSON(source)
            ? new MessageReader(this._handle = source)
            : new JSONMessageReader(this._handle = source);
    }
    isSync() { return true; }
    isStream() { return true; }
    [Symbol.iterator]() {
        return this;
    }
    cancel() {
        if (!this.closed && (this.closed = true)) {
            this.reset()._reader.return();
            this._reader = null;
            this.dictionaries = null;
        }
    }
    open(options) {
        if (!this.closed) {
            this.autoDestroy = shouldAutoDestroy(this, options);
            if (!(this.schema || (this.schema = this._reader.readSchema()))) {
                this.cancel();
            }
        }
        return this;
    }
    throw(value) {
        if (!this.closed && this.autoDestroy && (this.closed = true)) {
            return this.reset()._reader.throw(value);
        }
        return ITERATOR_DONE;
    }
    return(value) {
        if (!this.closed && this.autoDestroy && (this.closed = true)) {
            return this.reset()._reader.return(value);
        }
        return ITERATOR_DONE;
    }
    next() {
        if (this.closed) {
            return ITERATOR_DONE;
        }
        let message;
        const { _reader: reader } = this;
        while (message = this._readNextMessageAndValidate()) {
            if (message.isSchema()) {
                this.reset(message.header());
            }
            else if (message.isRecordBatch()) {
                this._recordBatchIndex++;
                const header = message.header();
                const buffer = reader.readMessageBody(message.bodyLength);
                const recordBatch = this._loadRecordBatch(header, buffer);
                return { done: false, value: recordBatch };
            }
            else if (message.isDictionaryBatch()) {
                this._dictionaryIndex++;
                const header = message.header();
                const buffer = reader.readMessageBody(message.bodyLength);
                const vector = this._loadDictionaryBatch(header, buffer);
                this.dictionaries.set(header.id, vector);
            }
        }
        if (this.schema && this._recordBatchIndex === 0) {
            this._recordBatchIndex++;
            return { done: false, value: new _InternalEmptyPlaceholderRecordBatch(this.schema) };
        }
        return this.return();
    }
    _readNextMessageAndValidate(type) {
        return this._reader.readMessage(type);
    }
}
/** @ignore */
class AsyncRecordBatchStreamReaderImpl extends RecordBatchReaderImpl {
    constructor(source, dictionaries) {
        super(dictionaries);
        this._reader = new AsyncMessageReader(this._handle = source);
    }
    isAsync() { return true; }
    isStream() { return true; }
    [Symbol.asyncIterator]() {
        return this;
    }
    cancel() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.closed && (this.closed = true)) {
                yield this.reset()._reader.return();
                this._reader = null;
                this.dictionaries = null;
            }
        });
    }
    open(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.closed) {
                this.autoDestroy = shouldAutoDestroy(this, options);
                if (!(this.schema || (this.schema = (yield this._reader.readSchema())))) {
                    yield this.cancel();
                }
            }
            return this;
        });
    }
    throw(value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.closed && this.autoDestroy && (this.closed = true)) {
                return yield this.reset()._reader.throw(value);
            }
            return ITERATOR_DONE;
        });
    }
    return(value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.closed && this.autoDestroy && (this.closed = true)) {
                return yield this.reset()._reader.return(value);
            }
            return ITERATOR_DONE;
        });
    }
    next() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.closed) {
                return ITERATOR_DONE;
            }
            let message;
            const { _reader: reader } = this;
            while (message = yield this._readNextMessageAndValidate()) {
                if (message.isSchema()) {
                    yield this.reset(message.header());
                }
                else if (message.isRecordBatch()) {
                    this._recordBatchIndex++;
                    const header = message.header();
                    const buffer = yield reader.readMessageBody(message.bodyLength);
                    const recordBatch = this._loadRecordBatch(header, buffer);
                    return { done: false, value: recordBatch };
                }
                else if (message.isDictionaryBatch()) {
                    this._dictionaryIndex++;
                    const header = message.header();
                    const buffer = yield reader.readMessageBody(message.bodyLength);
                    const vector = this._loadDictionaryBatch(header, buffer);
                    this.dictionaries.set(header.id, vector);
                }
            }
            if (this.schema && this._recordBatchIndex === 0) {
                this._recordBatchIndex++;
                return { done: false, value: new _InternalEmptyPlaceholderRecordBatch(this.schema) };
            }
            return yield this.return();
        });
    }
    _readNextMessageAndValidate(type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._reader.readMessage(type);
        });
    }
}
/** @ignore */
class RecordBatchFileReaderImpl extends RecordBatchStreamReaderImpl {
    constructor(source, dictionaries) {
        super(source instanceof RandomAccessFile ? source : new RandomAccessFile(source), dictionaries);
    }
    get footer() { return this._footer; }
    get numDictionaries() { return this._footer ? this._footer.numDictionaries : 0; }
    get numRecordBatches() { return this._footer ? this._footer.numRecordBatches : 0; }
    isSync() { return true; }
    isFile() { return true; }
    open(options) {
        if (!this.closed && !this._footer) {
            this.schema = (this._footer = this._readFooter()).schema;
            for (const block of this._footer.dictionaryBatches()) {
                block && this._readDictionaryBatch(this._dictionaryIndex++);
            }
        }
        return super.open(options);
    }
    readRecordBatch(index) {
        if (this.closed) {
            return null;
        }
        if (!this._footer) {
            this.open();
        }
        const block = this._footer && this._footer.getRecordBatch(index);
        if (block && this._handle.seek(block.offset)) {
            const message = this._reader.readMessage(MessageHeader.RecordBatch);
            if (message === null || message === void 0 ? void 0 : message.isRecordBatch()) {
                const header = message.header();
                const buffer = this._reader.readMessageBody(message.bodyLength);
                const recordBatch = this._loadRecordBatch(header, buffer);
                return recordBatch;
            }
        }
        return null;
    }
    _readDictionaryBatch(index) {
        const block = this._footer && this._footer.getDictionaryBatch(index);
        if (block && this._handle.seek(block.offset)) {
            const message = this._reader.readMessage(MessageHeader.DictionaryBatch);
            if (message === null || message === void 0 ? void 0 : message.isDictionaryBatch()) {
                const header = message.header();
                const buffer = this._reader.readMessageBody(message.bodyLength);
                const vector = this._loadDictionaryBatch(header, buffer);
                this.dictionaries.set(header.id, vector);
            }
        }
    }
    _readFooter() {
        const { _handle } = this;
        const offset = _handle.size - magicAndPadding;
        const length = _handle.readInt32(offset);
        const buffer = _handle.readAt(offset - length, length);
        return Footer_.decode(buffer);
    }
    _readNextMessageAndValidate(type) {
        if (!this._footer) {
            this.open();
        }
        if (this._footer && this._recordBatchIndex < this.numRecordBatches) {
            const block = this._footer && this._footer.getRecordBatch(this._recordBatchIndex);
            if (block && this._handle.seek(block.offset)) {
                return this._reader.readMessage(type);
            }
        }
        return null;
    }
}
/** @ignore */
class AsyncRecordBatchFileReaderImpl extends AsyncRecordBatchStreamReaderImpl {
    constructor(source, ...rest) {
        const byteLength = typeof rest[0] !== 'number' ? rest.shift() : undefined;
        const dictionaries = rest[0] instanceof Map ? rest.shift() : undefined;
        super(source instanceof AsyncRandomAccessFile ? source : new AsyncRandomAccessFile(source, byteLength), dictionaries);
    }
    get footer() { return this._footer; }
    get numDictionaries() { return this._footer ? this._footer.numDictionaries : 0; }
    get numRecordBatches() { return this._footer ? this._footer.numRecordBatches : 0; }
    isFile() { return true; }
    isAsync() { return true; }
    open(options) {
        const _super = Object.create(null, {
            open: { get: () => super.open }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.closed && !this._footer) {
                this.schema = (this._footer = yield this._readFooter()).schema;
                for (const block of this._footer.dictionaryBatches()) {
                    block && (yield this._readDictionaryBatch(this._dictionaryIndex++));
                }
            }
            return yield _super.open.call(this, options);
        });
    }
    readRecordBatch(index) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.closed) {
                return null;
            }
            if (!this._footer) {
                yield this.open();
            }
            const block = this._footer && this._footer.getRecordBatch(index);
            if (block && (yield this._handle.seek(block.offset))) {
                const message = yield this._reader.readMessage(MessageHeader.RecordBatch);
                if (message === null || message === void 0 ? void 0 : message.isRecordBatch()) {
                    const header = message.header();
                    const buffer = yield this._reader.readMessageBody(message.bodyLength);
                    const recordBatch = this._loadRecordBatch(header, buffer);
                    return recordBatch;
                }
            }
            return null;
        });
    }
    _readDictionaryBatch(index) {
        return __awaiter(this, void 0, void 0, function* () {
            const block = this._footer && this._footer.getDictionaryBatch(index);
            if (block && (yield this._handle.seek(block.offset))) {
                const message = yield this._reader.readMessage(MessageHeader.DictionaryBatch);
                if (message === null || message === void 0 ? void 0 : message.isDictionaryBatch()) {
                    const header = message.header();
                    const buffer = yield this._reader.readMessageBody(message.bodyLength);
                    const vector = this._loadDictionaryBatch(header, buffer);
                    this.dictionaries.set(header.id, vector);
                }
            }
        });
    }
    _readFooter() {
        return __awaiter(this, void 0, void 0, function* () {
            const { _handle } = this;
            _handle._pending && (yield _handle._pending);
            const offset = _handle.size - magicAndPadding;
            const length = yield _handle.readInt32(offset);
            const buffer = yield _handle.readAt(offset - length, length);
            return Footer_.decode(buffer);
        });
    }
    _readNextMessageAndValidate(type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._footer) {
                yield this.open();
            }
            if (this._footer && this._recordBatchIndex < this.numRecordBatches) {
                const block = this._footer.getRecordBatch(this._recordBatchIndex);
                if (block && (yield this._handle.seek(block.offset))) {
                    return yield this._reader.readMessage(type);
                }
            }
            return null;
        });
    }
}
/** @ignore */
class RecordBatchJSONReaderImpl extends RecordBatchStreamReaderImpl {
    constructor(source, dictionaries) {
        super(source, dictionaries);
    }
    _loadVectors(header, body, types) {
        return new JSONVectorLoader(body, header.nodes, header.buffers, this.dictionaries).visitMany(types);
    }
}
//
// Define some helper functions and static implementations down here. There's
// a bit of branching in the static methods that can lead to the same routines
// being executed, so we've broken those out here for readability.
//
/** @ignore */
function shouldAutoDestroy(self, options) {
    return options && (typeof options['autoDestroy'] === 'boolean') ? options['autoDestroy'] : self['autoDestroy'];
}
/** @ignore */
function* readAllSync(source) {
    const reader = RecordBatchReader.from(source);
    try {
        if (!reader.open({ autoDestroy: false }).closed) {
            do {
                yield reader;
            } while (!(reader.reset().open()).closed);
        }
    }
    finally {
        reader.cancel();
    }
}
/** @ignore */
function readAllAsync(source) {
    return __asyncGenerator(this, arguments, function* readAllAsync_1() {
        const reader = yield __await(RecordBatchReader.from(source));
        try {
            if (!(yield __await(reader.open({ autoDestroy: false }))).closed) {
                do {
                    yield yield __await(reader);
                } while (!(yield __await(reader.reset().open())).closed);
            }
        }
        finally {
            yield __await(reader.cancel());
        }
    });
}
/** @ignore */
function fromArrowJSON(source) {
    return new RecordBatchStreamReader(new RecordBatchJSONReaderImpl(source));
}
/** @ignore */
function fromByteStream(source) {
    const bytes = source.peek((magicLength + 7) & ~7);
    return bytes && bytes.byteLength >= 4 ? !checkForMagicArrowString(bytes)
        ? new RecordBatchStreamReader(new RecordBatchStreamReaderImpl(source))
        : new RecordBatchFileReader(new RecordBatchFileReaderImpl(source.read()))
        : new RecordBatchStreamReader(new RecordBatchStreamReaderImpl(function* () { }()));
}
/** @ignore */
function fromAsyncByteStream(source) {
    return __awaiter(this, void 0, void 0, function* () {
        const bytes = yield source.peek((magicLength + 7) & ~7);
        return bytes && bytes.byteLength >= 4 ? !checkForMagicArrowString(bytes)
            ? new AsyncRecordBatchStreamReader(new AsyncRecordBatchStreamReaderImpl(source))
            : new RecordBatchFileReader(new RecordBatchFileReaderImpl(yield source.read()))
            : new AsyncRecordBatchStreamReader(new AsyncRecordBatchStreamReaderImpl(function () { return __asyncGenerator(this, arguments, function* () { }); }()));
    });
}
/** @ignore */
function fromFileHandle(source) {
    return __awaiter(this, void 0, void 0, function* () {
        const { size } = yield source.stat();
        const file = new AsyncRandomAccessFile(source, size);
        if (size >= magicX2AndPadding) {
            if (checkForMagicArrowString(yield file.readAt(0, (magicLength + 7) & ~7))) {
                return new AsyncRecordBatchFileReader(new AsyncRecordBatchFileReaderImpl(file));
            }
        }
        return new AsyncRecordBatchStreamReader(new AsyncRecordBatchStreamReaderImpl(file));
    });
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
function toNodeStream(source, options) {
    if (isAsyncIterable(source)) {
        return new AsyncIterableReadable(source[Symbol.asyncIterator](), options);
    }
    if (isIterable(source)) {
        return new IterableReadable(source[Symbol.iterator](), options);
    }
    /* istanbul ignore next */
    throw new Error(`toNodeStream() must be called with an Iterable or AsyncIterable`);
}
/** @ignore */
class IterableReadable extends stream.Readable {
    constructor(it, options) {
        super(options);
        this._iterator = it;
        this._pulling = false;
        this._bytesMode = !options || !options.objectMode;
    }
    _read(size) {
        const it = this._iterator;
        if (it && !this._pulling && (this._pulling = true)) {
            this._pulling = this._pull(size, it);
        }
    }
    _destroy(e, cb) {
        const it = this._iterator;
        let fn;
        it && (fn = e != null && it.throw || it.return);
        fn === null || fn === void 0 ? void 0 : fn.call(it, e);
        cb && cb(null);
    }
    _pull(size, it) {
        const bm = this._bytesMode;
        let r = null;
        while (this.readable && !(r = it.next(bm ? size : null)).done) {
            if (size != null) {
                size -= (bm && ArrayBuffer.isView(r.value) ? r.value.byteLength : 1);
            }
            if (!this.push(r.value) || size <= 0) {
                break;
            }
        }
        if (((r === null || r === void 0 ? void 0 : r.done) || !this.readable) && (this.push(null) || true)) {
            it.return && it.return();
        }
        return !this.readable;
    }
}
/** @ignore */
class AsyncIterableReadable extends stream.Readable {
    constructor(it, options) {
        super(options);
        this._iterator = it;
        this._pulling = false;
        this._bytesMode = !options || !options.objectMode;
    }
    _read(size) {
        const it = this._iterator;
        if (it && !this._pulling && (this._pulling = true)) {
            (() => __awaiter(this, void 0, void 0, function* () { return this._pulling = yield this._pull(size, it); }))();
        }
    }
    _destroy(e, cb) {
        const it = this._iterator;
        let fn;
        it && (fn = e != null && it.throw || it.return);
        (fn === null || fn === void 0 ? void 0 : fn.call(it, e).then(() => cb && cb(null))) || (cb && cb(null));
    }
    _pull(size, it) {
        return __awaiter(this, void 0, void 0, function* () {
            const bm = this._bytesMode;
            let r = null;
            while (this.readable && !(r = yield it.next(bm ? size : null)).done) {
                if (size != null) {
                    size -= (bm && ArrayBuffer.isView(r.value) ? r.value.byteLength : 1);
                }
                if (!this.push(r.value) || size <= 0) {
                    break;
                }
            }
            if (((r === null || r === void 0 ? void 0 : r.done) || !this.readable) && (this.push(null) || true)) {
                it.return && it.return();
            }
            return !this.readable;
        });
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
function builderThroughNodeStream(options) {
    return new BuilderDuplex(Builder$2.new(options), options);
}
/** @ignore */
class BuilderDuplex extends stream.Duplex {
    constructor(builder, options) {
        const { queueingStrategy = 'count', autoDestroy = true } = options;
        const { highWaterMark = queueingStrategy !== 'bytes' ? 1000 : Math.pow(2, 14) } = options;
        super({ autoDestroy, highWaterMark: 1, allowHalfOpen: true, writableObjectMode: true, readableObjectMode: true });
        this._numChunks = 0;
        this._finished = false;
        this._builder = builder;
        this._desiredSize = highWaterMark;
        this._getSize = queueingStrategy !== 'bytes' ? builderLength : builderByteLength;
    }
    _read(size) {
        this._maybeFlush(this._builder, this._desiredSize = size);
    }
    _final(cb) {
        this._maybeFlush(this._builder.finish(), this._desiredSize);
        cb && cb();
    }
    _write(value, _, cb) {
        const result = this._maybeFlush(this._builder.append(value), this._desiredSize);
        cb && cb();
        return result;
    }
    _destroy(err, cb) {
        this._builder.clear();
        cb && cb(err);
    }
    _maybeFlush(builder, size) {
        if (this._getSize(builder) >= size) {
            ++this._numChunks && this.push(builder.toVector());
        }
        if (builder.finished) {
            if (builder.length > 0 || this._numChunks === 0) {
                ++this._numChunks && this.push(builder.toVector());
            }
            if (!this._finished && (this._finished = true)) {
                this.push(null);
            }
            return false;
        }
        return this._getSize(builder) < this.writableHighWaterMark;
    }
}
/** @ignore */ const builderLength = (builder) => builder.length;
/** @ignore */ const builderByteLength = (builder) => builder.byteLength;

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
function recordBatchReaderThroughNodeStream(options) {
    return new RecordBatchReaderDuplex(options);
}
/** @ignore */
class RecordBatchReaderDuplex extends stream.Duplex {
    constructor(options) {
        super(Object.assign(Object.assign({ allowHalfOpen: false }, options), { readableObjectMode: true, writableObjectMode: false }));
        this._pulling = false;
        this._autoDestroy = true;
        this._reader = null;
        this._pulling = false;
        this._asyncQueue = new AsyncByteQueue();
        this._autoDestroy = options && (typeof options.autoDestroy === 'boolean') ? options.autoDestroy : true;
    }
    _final(cb) {
        const aq = this._asyncQueue;
        aq === null || aq === void 0 ? void 0 : aq.close();
        cb && cb();
    }
    _write(x, _, cb) {
        const aq = this._asyncQueue;
        aq === null || aq === void 0 ? void 0 : aq.write(x);
        cb && cb();
        return true;
    }
    _read(size) {
        const aq = this._asyncQueue;
        if (aq && !this._pulling && (this._pulling = true)) {
            (() => __awaiter(this, void 0, void 0, function* () {
                if (!this._reader) {
                    this._reader = yield this._open(aq);
                }
                this._pulling = yield this._pull(size, this._reader);
            }))();
        }
    }
    _destroy(err, cb) {
        const aq = this._asyncQueue;
        if (aq) {
            err ? aq.abort(err) : aq.close();
        }
        cb(this._asyncQueue = this._reader = null);
    }
    _open(source) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield RecordBatchReader.from(source)).open({ autoDestroy: this._autoDestroy });
        });
    }
    _pull(size, reader) {
        return __awaiter(this, void 0, void 0, function* () {
            let r = null;
            while (this.readable && !(r = yield reader.next()).done) {
                if (!this.push(r.value) || (size != null && --size <= 0)) {
                    break;
                }
            }
            if (!this.readable || ((r === null || r === void 0 ? void 0 : r.done) && (reader.autoDestroy || (yield reader.reset().open()).closed))) {
                this.push(null);
                yield reader.cancel();
            }
            return !this.readable;
        });
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
function recordBatchWriterThroughNodeStream(options) {
    return new RecordBatchWriterDuplex(new this(options));
}
/** @ignore */
class RecordBatchWriterDuplex extends stream.Duplex {
    constructor(writer, options) {
        super(Object.assign(Object.assign({ allowHalfOpen: false }, options), { writableObjectMode: true, readableObjectMode: false }));
        this._pulling = false;
        this._writer = writer;
        this._reader = new AsyncByteStream(writer);
    }
    _final(cb) {
        const writer = this._writer;
        writer === null || writer === void 0 ? void 0 : writer.close();
        cb && cb();
    }
    _write(x, _, cb) {
        const writer = this._writer;
        writer === null || writer === void 0 ? void 0 : writer.write(x);
        cb && cb();
        return true;
    }
    _read(size) {
        const it = this._reader;
        if (it && !this._pulling && (this._pulling = true)) {
            (() => __awaiter(this, void 0, void 0, function* () { return this._pulling = yield this._pull(size, it); }))();
        }
    }
    _destroy(err, cb) {
        const writer = this._writer;
        if (writer) {
            err ? writer.abort(err) : writer.close();
        }
        cb(this._reader = this._writer = null);
    }
    _pull(size, reader) {
        return __awaiter(this, void 0, void 0, function* () {
            let r = null;
            while (this.readable && !(r = yield reader.next(size || null)).done) {
                if (size != null && r.value) {
                    size -= r.value.byteLength;
                }
                if (!this.push(r.value) || size <= 0) {
                    break;
                }
            }
            if (((r === null || r === void 0 ? void 0 : r.done) || !this.readable)) {
                this.push(null);
                yield reader.cancel();
            }
            return !this.readable;
        });
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
function toDOMStream(source, options) {
    if (isAsyncIterable(source)) {
        return asyncIterableAsReadableDOMStream(source, options);
    }
    if (isIterable(source)) {
        return iterableAsReadableDOMStream(source, options);
    }
    /* istanbul ignore next */
    throw new Error(`toDOMStream() must be called with an Iterable or AsyncIterable`);
}
/** @ignore */
function iterableAsReadableDOMStream(source, options) {
    let it = null;
    const bm = ((options === null || options === void 0 ? void 0 : options.type) === 'bytes') || false;
    const hwm = (options === null || options === void 0 ? void 0 : options.highWaterMark) || (Math.pow(2, 24));
    return new ReadableStream(Object.assign(Object.assign({}, options), { start(controller) { next(controller, it || (it = source[Symbol.iterator]())); }, pull(controller) { it ? (next(controller, it)) : controller.close(); }, cancel() { ((it === null || it === void 0 ? void 0 : it.return) && it.return() || true) && (it = null); } }), Object.assign({ highWaterMark: bm ? hwm : undefined }, options));
    function next(controller, it) {
        let buf;
        let r = null;
        let size = controller.desiredSize || null;
        while (!(r = it.next(bm ? size : null)).done) {
            if (ArrayBuffer.isView(r.value) && (buf = toUint8Array(r.value))) {
                size != null && bm && (size = size - buf.byteLength + 1);
                r.value = buf;
            }
            controller.enqueue(r.value);
            if (size != null && --size <= 0) {
                return;
            }
        }
        controller.close();
    }
}
/** @ignore */
function asyncIterableAsReadableDOMStream(source, options) {
    let it = null;
    const bm = ((options === null || options === void 0 ? void 0 : options.type) === 'bytes') || false;
    const hwm = (options === null || options === void 0 ? void 0 : options.highWaterMark) || (Math.pow(2, 24));
    return new ReadableStream(Object.assign(Object.assign({}, options), { start(controller) {
            return __awaiter(this, void 0, void 0, function* () { yield next(controller, it || (it = source[Symbol.asyncIterator]())); });
        },
        pull(controller) {
            return __awaiter(this, void 0, void 0, function* () { it ? (yield next(controller, it)) : controller.close(); });
        },
        cancel() {
            return __awaiter(this, void 0, void 0, function* () { ((it === null || it === void 0 ? void 0 : it.return) && (yield it.return()) || true) && (it = null); });
        } }), Object.assign({ highWaterMark: bm ? hwm : undefined }, options));
    function next(controller, it) {
        return __awaiter(this, void 0, void 0, function* () {
            let buf;
            let r = null;
            let size = controller.desiredSize || null;
            while (!(r = yield it.next(bm ? size : null)).done) {
                if (ArrayBuffer.isView(r.value) && (buf = toUint8Array(r.value))) {
                    size != null && bm && (size = size - buf.byteLength + 1);
                    r.value = buf;
                }
                controller.enqueue(r.value);
                if (size != null && --size <= 0) {
                    return;
                }
            }
            controller.close();
        });
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
function builderThroughDOMStream(options) {
    return new BuilderTransform(options);
}
/** @ignore */
class BuilderTransform {
    constructor(options) {
        // Access properties by string indexers to defeat closure compiler
        this._numChunks = 0;
        this._finished = false;
        this._bufferedSize = 0;
        const { ['readableStrategy']: readableStrategy, ['writableStrategy']: writableStrategy, ['queueingStrategy']: queueingStrategy = 'count' } = options, builderOptions = __rest(options, ['readableStrategy', 'writableStrategy', 'queueingStrategy']);
        this._controller = null;
        this._builder = Builder$2.new(builderOptions);
        this._getSize = queueingStrategy !== 'bytes' ? chunkLength : chunkByteLength;
        const { ['highWaterMark']: readableHighWaterMark = queueingStrategy === 'bytes' ? Math.pow(2, 14) : 1000 } = Object.assign({}, readableStrategy);
        const { ['highWaterMark']: writableHighWaterMark = queueingStrategy === 'bytes' ? Math.pow(2, 14) : 1000 } = Object.assign({}, writableStrategy);
        this['readable'] = new ReadableStream({
            ['cancel']: () => { this._builder.clear(); },
            ['pull']: (c) => { this._maybeFlush(this._builder, this._controller = c); },
            ['start']: (c) => { this._maybeFlush(this._builder, this._controller = c); },
        }, {
            'highWaterMark': readableHighWaterMark,
            'size': queueingStrategy !== 'bytes' ? chunkLength : chunkByteLength,
        });
        this['writable'] = new WritableStream({
            ['abort']: () => { this._builder.clear(); },
            ['write']: () => { this._maybeFlush(this._builder, this._controller); },
            ['close']: () => { this._maybeFlush(this._builder.finish(), this._controller); },
        }, {
            'highWaterMark': writableHighWaterMark,
            'size': (value) => this._writeValueAndReturnChunkSize(value),
        });
    }
    _writeValueAndReturnChunkSize(value) {
        const bufferedSize = this._bufferedSize;
        this._bufferedSize = this._getSize(this._builder.append(value));
        return this._bufferedSize - bufferedSize;
    }
    _maybeFlush(builder, controller) {
        if (controller === null) {
            return;
        }
        if (this._bufferedSize >= controller.desiredSize) {
            ++this._numChunks && this._enqueue(controller, builder.toVector());
        }
        if (builder.finished) {
            if (builder.length > 0 || this._numChunks === 0) {
                ++this._numChunks && this._enqueue(controller, builder.toVector());
            }
            if (!this._finished && (this._finished = true)) {
                this._enqueue(controller, null);
            }
        }
    }
    _enqueue(controller, chunk) {
        this._bufferedSize = 0;
        this._controller = null;
        chunk === null ? controller.close() : controller.enqueue(chunk);
    }
}
/** @ignore */ const chunkLength = (chunk) => chunk.length;
/** @ignore */ const chunkByteLength = (chunk) => chunk.byteLength;

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
function recordBatchReaderThroughDOMStream(writableStrategy, readableStrategy) {
    const queue = new AsyncByteQueue();
    let reader = null;
    const readable = new ReadableStream({
        cancel() {
            return __awaiter(this, void 0, void 0, function* () { yield queue.close(); });
        },
        start(controller) {
            return __awaiter(this, void 0, void 0, function* () { yield next(controller, reader || (reader = yield open())); });
        },
        pull(controller) {
            return __awaiter(this, void 0, void 0, function* () { reader ? yield next(controller, reader) : controller.close(); });
        }
    });
    return { writable: new WritableStream(queue, Object.assign({ 'highWaterMark': Math.pow(2, 14) }, writableStrategy)), readable };
    function open() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield RecordBatchReader.from(queue)).open(readableStrategy);
        });
    }
    function next(controller, reader) {
        return __awaiter(this, void 0, void 0, function* () {
            let size = controller.desiredSize;
            let r = null;
            while (!(r = yield reader.next()).done) {
                controller.enqueue(r.value);
                if (size != null && --size <= 0) {
                    return;
                }
            }
            controller.close();
        });
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
function recordBatchWriterThroughDOMStream(writableStrategy, readableStrategy) {
    const writer = new this(writableStrategy);
    const reader = new AsyncByteStream(writer);
    const readable = new ReadableStream({
        type: 'bytes',
        cancel() {
            return __awaiter(this, void 0, void 0, function* () { yield reader.cancel(); });
        },
        pull(controller) {
            return __awaiter(this, void 0, void 0, function* () { yield next(controller); });
        },
        start(controller) {
            return __awaiter(this, void 0, void 0, function* () { yield next(controller); });
        },
    }, Object.assign({ 'highWaterMark': Math.pow(2, 14) }, readableStrategy));
    return { writable: new WritableStream(writer, writableStrategy), readable };
    function next(controller) {
        return __awaiter(this, void 0, void 0, function* () {
            let buf = null;
            let size = controller.desiredSize;
            while (buf = yield reader.read(size || null)) {
                controller.enqueue(buf);
                if (size != null && (size -= buf.byteLength) <= 0) {
                    return;
                }
            }
            controller.close();
        });
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
class Value {
    eq(other) {
        if (!(other instanceof Value)) {
            other = new Literal(other);
        }
        return new Equals(this, other);
    }
    le(other) {
        if (!(other instanceof Value)) {
            other = new Literal(other);
        }
        return new LTeq(this, other);
    }
    ge(other) {
        if (!(other instanceof Value)) {
            other = new Literal(other);
        }
        return new GTeq(this, other);
    }
    lt(other) {
        return new Not(this.ge(other));
    }
    gt(other) {
        return new Not(this.le(other));
    }
    ne(other) {
        return new Not(this.eq(other));
    }
}
/** @ignore */
class Literal extends Value {
    constructor(v) {
        super();
        this.v = v;
    }
}
/** @ignore */
class Col extends Value {
    constructor(name) {
        super();
        this.name = name;
    }
    bind(batch) {
        if (!this.colidx) {
            // Assume column index doesn't change between calls to bind
            //this.colidx = cols.findIndex(v => v.name.indexOf(this.name) != -1);
            this.colidx = -1;
            const fields = batch.schema.fields;
            for (let idx = -1; ++idx < fields.length;) {
                if (fields[idx].name === this.name) {
                    this.colidx = idx;
                    break;
                }
            }
            if (this.colidx < 0) {
                throw new Error(`Failed to bind Col "${this.name}"`);
            }
        }
        const vec = this.vector = batch.getChildAt(this.colidx);
        return (idx) => vec.get(idx);
    }
}
/** @ignore */
class Predicate {
    and(...expr) { return new And(this, ...expr); }
    or(...expr) { return new Or(this, ...expr); }
    not() { return new Not(this); }
}
/** @ignore */
class ComparisonPredicate extends Predicate {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
    bind(batch) {
        if (this.left instanceof Literal) {
            if (this.right instanceof Literal) {
                return this._bindLitLit(batch, this.left, this.right);
            }
            else { // right is a Col
                return this._bindLitCol(batch, this.left, this.right);
            }
        }
        else { // left is a Col
            if (this.right instanceof Literal) {
                return this._bindColLit(batch, this.left, this.right);
            }
            else { // right is a Col
                return this._bindColCol(batch, this.left, this.right);
            }
        }
    }
}
/** @ignore */
class CombinationPredicate extends Predicate {
    constructor(...children) {
        super();
        this.children = children;
    }
}
// add children to prototype so it doesn't get mangled in es2015/umd
CombinationPredicate.prototype.children = Object.freeze([]); // freeze for safety
/** @ignore */
class And extends CombinationPredicate {
    constructor(...children) {
        // Flatten any Ands
        children = children.reduce((accum, p) => {
            return accum.concat(p instanceof And ? p.children : p);
        }, []);
        super(...children);
    }
    bind(batch) {
        const bound = this.children.map((p) => p.bind(batch));
        return (idx, batch) => bound.every((p) => p(idx, batch));
    }
}
/** @ignore */
class Or extends CombinationPredicate {
    constructor(...children) {
        // Flatten any Ors
        children = children.reduce((accum, p) => {
            return accum.concat(p instanceof Or ? p.children : p);
        }, []);
        super(...children);
    }
    bind(batch) {
        const bound = this.children.map((p) => p.bind(batch));
        return (idx, batch) => bound.some((p) => p(idx, batch));
    }
}
/** @ignore */
class Equals extends ComparisonPredicate {
    _bindLitLit(_batch, left, right) {
        const rtrn = left.v == right.v;
        return () => rtrn;
    }
    _bindColCol(batch, left, right) {
        const left_func = left.bind(batch);
        const right_func = right.bind(batch);
        return (idx, batch) => left_func(idx, batch) == right_func(idx, batch);
    }
    _bindColLit(batch, col, lit) {
        const col_func = col.bind(batch);
        if (col.vector instanceof DictionaryVector) {
            let key;
            const vector = col.vector;
            if (vector.dictionary !== this.lastDictionary) {
                key = vector.reverseLookup(lit.v);
                this.lastDictionary = vector.dictionary;
                this.lastKey = key;
            }
            else {
                key = this.lastKey;
            }
            if (key === -1) {
                // the value doesn't exist in the dictionary - always return
                // false
                // TODO: special-case of PredicateFunc that encapsulates this
                // "always false" behavior. That way filtering operations don't
                // have to bother checking
                return () => false;
            }
            else {
                return (idx) => {
                    return vector.getKey(idx) === key;
                };
            }
        }
        else {
            return (idx, cols) => col_func(idx, cols) == lit.v;
        }
    }
    _bindLitCol(batch, lit, col) {
        // Equals is commutative
        return this._bindColLit(batch, col, lit);
    }
}
/** @ignore */
class LTeq extends ComparisonPredicate {
    _bindLitLit(_batch, left, right) {
        const rtrn = left.v <= right.v;
        return () => rtrn;
    }
    _bindColCol(batch, left, right) {
        const left_func = left.bind(batch);
        const right_func = right.bind(batch);
        return (idx, cols) => left_func(idx, cols) <= right_func(idx, cols);
    }
    _bindColLit(batch, col, lit) {
        const col_func = col.bind(batch);
        return (idx, cols) => col_func(idx, cols) <= lit.v;
    }
    _bindLitCol(batch, lit, col) {
        const col_func = col.bind(batch);
        return (idx, cols) => lit.v <= col_func(idx, cols);
    }
}
/** @ignore */
class GTeq extends ComparisonPredicate {
    _bindLitLit(_batch, left, right) {
        const rtrn = left.v >= right.v;
        return () => rtrn;
    }
    _bindColCol(batch, left, right) {
        const left_func = left.bind(batch);
        const right_func = right.bind(batch);
        return (idx, cols) => left_func(idx, cols) >= right_func(idx, cols);
    }
    _bindColLit(batch, col, lit) {
        const col_func = col.bind(batch);
        return (idx, cols) => col_func(idx, cols) >= lit.v;
    }
    _bindLitCol(batch, lit, col) {
        const col_func = col.bind(batch);
        return (idx, cols) => lit.v >= col_func(idx, cols);
    }
}
/** @ignore */
class Not extends Predicate {
    constructor(child) {
        super();
        this.child = child;
    }
    bind(batch) {
        const func = this.child.bind(batch);
        return (idx, batch) => !func(idx, batch);
    }
}
/** @ignore */
class CustomPredicate extends Predicate {
    constructor(next, bind_) {
        super();
        this.next = next;
        this.bind_ = bind_;
    }
    bind(batch) {
        this.bind_(batch);
        return this.next;
    }
}
function lit(v) { return new Literal(v); }
function col(n) { return new Col(n); }
function and(...p) { return new And(...p); }
function or(...p) { return new Or(...p); }
function custom(next, bind) {
    return new CustomPredicate(next, bind);
}

var predicate = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Value: Value,
    Literal: Literal,
    Col: Col,
    Predicate: Predicate,
    ComparisonPredicate: ComparisonPredicate,
    CombinationPredicate: CombinationPredicate,
    And: And,
    Or: Or,
    Equals: Equals,
    LTeq: LTeq,
    GTeq: GTeq,
    Not: Not,
    CustomPredicate: CustomPredicate,
    lit: lit,
    col: col,
    and: and,
    or: or,
    custom: custom
});

// Licensed to the Apache Software Foundation (ASF) under one
/**
 * `DataFrame` extends {@link Table} with support for predicate filtering.
 *
 * You can construct `DataFrames` like tables or convert a `Table` to a `DataFrame`
 * with the constructor.
 *
 * ```ts
 * const df = new DataFrame(table);
 * ```
 */
class DataFrame extends Table {
    filter(predicate) {
        return new FilteredDataFrame(this.chunks, predicate);
    }
    scan(next, bind) {
        const batches = this.chunks, numBatches = batches.length;
        for (let batchIndex = -1; ++batchIndex < numBatches;) {
            // load batches
            const batch = batches[batchIndex];
            if (bind) {
                bind(batch);
            }
            // yield all indices
            for (let index = -1, numRows = batch.length; ++index < numRows;) {
                next(index, batch);
            }
        }
    }
    scanReverse(next, bind) {
        const batches = this.chunks, numBatches = batches.length;
        for (let batchIndex = numBatches; --batchIndex >= 0;) {
            // load batches
            const batch = batches[batchIndex];
            if (bind) {
                bind(batch);
            }
            // yield all indices
            for (let index = batch.length; --index >= 0;) {
                next(index, batch);
            }
        }
    }
    countBy(name) {
        const batches = this.chunks, numBatches = batches.length;
        const count_by = typeof name === 'string' ? new Col(name) : name;
        // Assume that all dictionary batches are deltas, which means that the
        // last record batch has the most complete dictionary
        count_by.bind(batches[numBatches - 1]);
        const vector = count_by.vector;
        if (!DataType.isDictionary(vector.type)) {
            throw new Error('countBy currently only supports dictionary-encoded columns');
        }
        const countByteLength = Math.ceil(Math.log(vector.length) / Math.log(256));
        const CountsArrayType = countByteLength == 4 ? Uint32Array :
            countByteLength >= 2 ? Uint16Array : Uint8Array;
        const counts = new CountsArrayType(vector.dictionary.length);
        for (let batchIndex = -1; ++batchIndex < numBatches;) {
            // load batches
            const batch = batches[batchIndex];
            // rebind the countBy Col
            count_by.bind(batch);
            const keys = count_by.vector.indices;
            // yield all indices
            for (let index = -1, numRows = batch.length; ++index < numRows;) {
                const key = keys.get(index);
                if (key !== null) {
                    counts[key]++;
                }
            }
        }
        return new CountByResult(vector.dictionary, IntVector.from(counts));
    }
}
/** @ignore */
class CountByResult extends Table {
    constructor(values, counts) {
        const schema = new Schema([
            new Field('values', values.type),
            new Field('counts', counts.type)
        ]);
        super(new RecordBatch(schema, counts.length, [values, counts]));
    }
    toJSON() {
        const values = this.getColumnAt(0);
        const counts = this.getColumnAt(1);
        const result = {};
        for (let i = -1; ++i < this.length;) {
            result[values.get(i)] = counts.get(i);
        }
        return result;
    }
}
/** @ignore */
class FilteredBatchIterator {
    constructor(batches, predicate) {
        this.batches = batches;
        this.predicate = predicate;
        this.batchIndex = 0;
        this.index = 0;
        // TODO: bind batches lazily
        // If predicate doesn't match anything in the batch we don't need
        // to bind the callback
        this.batch = this.batches[this.batchIndex];
        this.predicateFunc = this.predicate.bind(this.batch);
    }
    next() {
        while (this.batchIndex < this.batches.length) {
            while (this.index < this.batch.length) {
                if (this.predicateFunc(this.index, this.batch)) {
                    return {
                        value: this.batch.get(this.index++),
                    };
                }
                this.index++;
            }
            if (++this.batchIndex < this.batches.length) {
                this.index = 0;
                this.batch = this.batches[this.batchIndex];
                this.predicateFunc = this.predicate.bind(this.batch);
            }
        }
        return { done: true, value: null };
    }
    [Symbol.iterator]() {
        return this;
    }
}
/** @ignore */
class FilteredDataFrame extends DataFrame {
    constructor(batches, predicate) {
        super(batches);
        this._predicate = predicate;
    }
    scan(next, bind) {
        // inlined version of this:
        // this.parent.scan((idx, columns) => {
        //     if (this.predicate(idx, columns)) next(idx, columns);
        // });
        const batches = this._chunks;
        const numBatches = batches.length;
        for (let batchIndex = -1; ++batchIndex < numBatches;) {
            // load batches
            const batch = batches[batchIndex];
            const predicate = this._predicate.bind(batch);
            let isBound = false;
            // yield all indices
            for (let index = -1, numRows = batch.length; ++index < numRows;) {
                if (predicate(index, batch)) {
                    // bind batches lazily - if predicate doesn't match anything
                    // in the batch we don't need to call bind on the batch
                    if (bind && !isBound) {
                        bind(batch);
                        isBound = true;
                    }
                    next(index, batch);
                }
            }
        }
    }
    scanReverse(next, bind) {
        const batches = this._chunks;
        const numBatches = batches.length;
        for (let batchIndex = numBatches; --batchIndex >= 0;) {
            // load batches
            const batch = batches[batchIndex];
            const predicate = this._predicate.bind(batch);
            let isBound = false;
            // yield all indices
            for (let index = batch.length; --index >= 0;) {
                if (predicate(index, batch)) {
                    // bind batches lazily - if predicate doesn't match anything
                    // in the batch we don't need to call bind on the batch
                    if (bind && !isBound) {
                        bind(batch);
                        isBound = true;
                    }
                    next(index, batch);
                }
            }
        }
    }
    count() {
        // inlined version of this:
        // let sum = 0;
        // this.parent.scan((idx, columns) => {
        //     if (this.predicate(idx, columns)) ++sum;
        // });
        // return sum;
        let sum = 0;
        const batches = this._chunks;
        const numBatches = batches.length;
        for (let batchIndex = -1; ++batchIndex < numBatches;) {
            // load batches
            const batch = batches[batchIndex];
            const predicate = this._predicate.bind(batch);
            for (let index = -1, numRows = batch.length; ++index < numRows;) {
                if (predicate(index, batch)) {
                    ++sum;
                }
            }
        }
        return sum;
    }
    [Symbol.iterator]() {
        // inlined version of this:
        // this.parent.scan((idx, columns) => {
        //     if (this.predicate(idx, columns)) next(idx, columns);
        // });
        return new FilteredBatchIterator(this._chunks, this._predicate);
    }
    filter(predicate) {
        return new FilteredDataFrame(this._chunks, this._predicate.and(predicate));
    }
    countBy(name) {
        const batches = this._chunks, numBatches = batches.length;
        const count_by = typeof name === 'string' ? new Col(name) : name;
        // Assume that all dictionary batches are deltas, which means that the
        // last record batch has the most complete dictionary
        count_by.bind(batches[numBatches - 1]);
        const vector = count_by.vector;
        if (!DataType.isDictionary(vector.type)) {
            throw new Error('countBy currently only supports dictionary-encoded columns');
        }
        const countByteLength = Math.ceil(Math.log(vector.length) / Math.log(256));
        const CountsArrayType = countByteLength == 4 ? Uint32Array :
            countByteLength >= 2 ? Uint16Array : Uint8Array;
        const counts = new CountsArrayType(vector.dictionary.length);
        for (let batchIndex = -1; ++batchIndex < numBatches;) {
            // load batches
            const batch = batches[batchIndex];
            const predicate = this._predicate.bind(batch);
            // rebind the countBy Col
            count_by.bind(batch);
            const keys = count_by.vector.indices;
            // yield all indices
            for (let index = -1, numRows = batch.length; ++index < numRows;) {
                const key = keys.get(index);
                if (key !== null && predicate(index, batch)) {
                    counts[key]++;
                }
            }
        }
        return new CountByResult(vector.dictionary, IntVector.from(counts));
    }
}

// Licensed to the Apache Software Foundation (ASF) under one
/** @ignore */
const util = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, util_bn_), util_int_), util_bit_), util_math_), util_buffer_), util_vector_), { compareSchemas,
    compareFields,
    compareTypes });

// Licensed to the Apache Software Foundation (ASF) under one
streamAdapters.toDOMStream = toDOMStream;
Builder$2['throughDOM'] = builderThroughDOMStream;
RecordBatchReader['throughDOM'] = recordBatchReaderThroughDOMStream;
RecordBatchFileReader['throughDOM'] = recordBatchReaderThroughDOMStream;
RecordBatchStreamReader['throughDOM'] = recordBatchReaderThroughDOMStream;
RecordBatchWriter['throughDOM'] = recordBatchWriterThroughDOMStream;
RecordBatchFileWriter['throughDOM'] = recordBatchWriterThroughDOMStream;
RecordBatchStreamWriter['throughDOM'] = recordBatchWriterThroughDOMStream;

// Licensed to the Apache Software Foundation (ASF) under one
streamAdapters.toNodeStream = toNodeStream;
Builder$2['throughNode'] = builderThroughNodeStream;
RecordBatchReader['throughNode'] = recordBatchReaderThroughNodeStream;
RecordBatchWriter['throughNode'] = recordBatchWriterThroughNodeStream;

var arrow = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get DateUnit () { return DateUnit; },
    get IntervalUnit () { return IntervalUnit; },
    get MessageHeader () { return MessageHeader; },
    get MetadataVersion () { return MetadataVersion; },
    get Precision () { return Precision; },
    get TimeUnit () { return TimeUnit; },
    get Type () { return Type; },
    get UnionMode () { return UnionMode; },
    get BufferType () { return BufferType; },
    Data: Data,
    DataType: DataType,
    Null: Null,
    Bool: Bool,
    Int: Int_,
    Int8: Int8,
    Int16: Int16,
    Int32: Int32,
    Int64: Int64$1,
    Uint8: Uint8,
    Uint16: Uint16,
    Uint32: Uint32,
    Uint64: Uint64$1,
    Float: Float,
    Float16: Float16,
    Float32: Float32,
    Float64: Float64,
    Utf8: Utf8,
    Binary: Binary,
    FixedSizeBinary: FixedSizeBinary,
    Date_: Date_,
    DateDay: DateDay,
    DateMillisecond: DateMillisecond,
    Timestamp: Timestamp_,
    TimestampSecond: TimestampSecond,
    TimestampMillisecond: TimestampMillisecond,
    TimestampMicrosecond: TimestampMicrosecond,
    TimestampNanosecond: TimestampNanosecond,
    Time: Time_,
    TimeSecond: TimeSecond,
    TimeMillisecond: TimeMillisecond,
    TimeMicrosecond: TimeMicrosecond,
    TimeNanosecond: TimeNanosecond,
    Decimal: Decimal,
    List: List,
    Struct: Struct,
    Union: Union_,
    DenseUnion: DenseUnion,
    SparseUnion: SparseUnion,
    Dictionary: Dictionary,
    Interval: Interval_,
    IntervalDayTime: IntervalDayTime,
    IntervalYearMonth: IntervalYearMonth,
    FixedSizeList: FixedSizeList,
    Map_: Map_,
    Table: Table,
    Column: Column,
    Schema: Schema,
    Field: Field,
    Visitor: Visitor,
    Vector: AbstractVector,
    BaseVector: BaseVector,
    BinaryVector: BinaryVector,
    BoolVector: BoolVector,
    Chunked: Chunked,
    DateVector: DateVector,
    DateDayVector: DateDayVector,
    DateMillisecondVector: DateMillisecondVector,
    DecimalVector: DecimalVector,
    DictionaryVector: DictionaryVector,
    FixedSizeBinaryVector: FixedSizeBinaryVector,
    FixedSizeListVector: FixedSizeListVector,
    FloatVector: FloatVector,
    Float16Vector: Float16Vector,
    Float32Vector: Float32Vector,
    Float64Vector: Float64Vector,
    IntervalVector: IntervalVector,
    IntervalDayTimeVector: IntervalDayTimeVector,
    IntervalYearMonthVector: IntervalYearMonthVector,
    IntVector: IntVector,
    Int8Vector: Int8Vector,
    Int16Vector: Int16Vector,
    Int32Vector: Int32Vector,
    Int64Vector: Int64Vector,
    Uint8Vector: Uint8Vector,
    Uint16Vector: Uint16Vector,
    Uint32Vector: Uint32Vector,
    Uint64Vector: Uint64Vector,
    ListVector: ListVector,
    MapVector: MapVector,
    NullVector: NullVector,
    StructVector: StructVector,
    TimestampVector: TimestampVector,
    TimestampSecondVector: TimestampSecondVector,
    TimestampMillisecondVector: TimestampMillisecondVector,
    TimestampMicrosecondVector: TimestampMicrosecondVector,
    TimestampNanosecondVector: TimestampNanosecondVector,
    TimeVector: TimeVector,
    TimeSecondVector: TimeSecondVector,
    TimeMillisecondVector: TimeMillisecondVector,
    TimeMicrosecondVector: TimeMicrosecondVector,
    TimeNanosecondVector: TimeNanosecondVector,
    UnionVector: UnionVector,
    DenseUnionVector: DenseUnionVector,
    SparseUnionVector: SparseUnionVector,
    Utf8Vector: Utf8Vector,
    ByteStream: ByteStream,
    AsyncByteStream: AsyncByteStream,
    AsyncByteQueue: AsyncByteQueue,
    RecordBatchReader: RecordBatchReader,
    RecordBatchFileReader: RecordBatchFileReader,
    RecordBatchStreamReader: RecordBatchStreamReader,
    AsyncRecordBatchFileReader: AsyncRecordBatchFileReader,
    AsyncRecordBatchStreamReader: AsyncRecordBatchStreamReader,
    RecordBatchWriter: RecordBatchWriter,
    RecordBatchFileWriter: RecordBatchFileWriter,
    RecordBatchStreamWriter: RecordBatchStreamWriter,
    RecordBatchJSONWriter: RecordBatchJSONWriter,
    MessageReader: MessageReader,
    AsyncMessageReader: AsyncMessageReader,
    JSONMessageReader: JSONMessageReader,
    Message: Message,
    RecordBatch: RecordBatch,
    DataFrame: DataFrame,
    FilteredDataFrame: FilteredDataFrame,
    CountByResult: CountByResult,
    predicate: predicate,
    util: util,
    Builder: Builder$2,
    BinaryBuilder: BinaryBuilder,
    BoolBuilder: BoolBuilder,
    DateBuilder: DateBuilder,
    DateDayBuilder: DateDayBuilder,
    DateMillisecondBuilder: DateMillisecondBuilder,
    DecimalBuilder: DecimalBuilder,
    DictionaryBuilder: DictionaryBuilder,
    FixedSizeBinaryBuilder: FixedSizeBinaryBuilder,
    FixedSizeListBuilder: FixedSizeListBuilder,
    FloatBuilder: FloatBuilder,
    Float16Builder: Float16Builder,
    Float32Builder: Float32Builder,
    Float64Builder: Float64Builder,
    IntervalBuilder: IntervalBuilder,
    IntervalDayTimeBuilder: IntervalDayTimeBuilder,
    IntervalYearMonthBuilder: IntervalYearMonthBuilder,
    IntBuilder: IntBuilder,
    Int8Builder: Int8Builder,
    Int16Builder: Int16Builder,
    Int32Builder: Int32Builder,
    Int64Builder: Int64Builder,
    Uint8Builder: Uint8Builder,
    Uint16Builder: Uint16Builder,
    Uint32Builder: Uint32Builder,
    Uint64Builder: Uint64Builder,
    ListBuilder: ListBuilder,
    MapBuilder: MapBuilder,
    NullBuilder: NullBuilder,
    StructBuilder: StructBuilder,
    TimestampBuilder: TimestampBuilder,
    TimestampSecondBuilder: TimestampSecondBuilder,
    TimestampMillisecondBuilder: TimestampMillisecondBuilder,
    TimestampMicrosecondBuilder: TimestampMicrosecondBuilder,
    TimestampNanosecondBuilder: TimestampNanosecondBuilder,
    TimeBuilder: TimeBuilder,
    TimeSecondBuilder: TimeSecondBuilder,
    TimeMillisecondBuilder: TimeMillisecondBuilder,
    TimeMicrosecondBuilder: TimeMicrosecondBuilder,
    TimeNanosecondBuilder: TimeNanosecondBuilder,
    UnionBuilder: UnionBuilder,
    DenseUnionBuilder: DenseUnionBuilder,
    SparseUnionBuilder: SparseUnionBuilder,
    Utf8Builder: Utf8Builder,
    isTypedArray: isTypedArray
});

console.log(arrow);
