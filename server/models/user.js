const userSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://example.com/product.schema.json",
  "title": "Product",
  "description": "A product in the catalog",
  "type": "object",
  "properties": {
    "userID": {
      "description": "The unique identifier for a user",
      "type": "string"
    },
    "googleid": {
      "description": "The identifier for a specific google account",
      "type": "string"
    }
  }
};

module.exports = userSchema;