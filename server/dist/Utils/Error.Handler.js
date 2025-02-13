"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const common_1 = require("@nestjs/common");
class ErrorHandler {
    static handle(error) {
        console.error('error:', error);
        if (error instanceof common_1.HttpException) {
            throw error;
        }
        else {
            throw new common_1.HttpException(error.message || 'Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=Error.Handler.js.map