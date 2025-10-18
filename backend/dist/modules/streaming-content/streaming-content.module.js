"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingContentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const streaming_content_entity_1 = require("../../entities/streaming-content.entity");
const streaming_content_controller_1 = require("../../controllers/streaming-content/streaming-content.controller");
const streaming_content_service_1 = require("../../services/streaming-content/streaming-content.service");
let StreamingContentModule = class StreamingContentModule {
};
exports.StreamingContentModule = StreamingContentModule;
exports.StreamingContentModule = StreamingContentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([streaming_content_entity_1.StreamingContent])],
        controllers: [streaming_content_controller_1.StreamingContentController],
        providers: [streaming_content_service_1.StreamingContentService],
    })
], StreamingContentModule);
//# sourceMappingURL=streaming-content.module.js.map