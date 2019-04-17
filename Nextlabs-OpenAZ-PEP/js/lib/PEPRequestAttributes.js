"use strict";

function PEPRequestAttributes(id, categoryId) {
    this.id = id;
    this.categoryId = categoryId;
    this.attributeMapById = new Map();
}

PEPRequestAttributes.prototype.addAttribute = function(stringKey, value) {
    this.attributeMapById.set(stringKey, value);
}

module.exports = PEPRequestAttributes;