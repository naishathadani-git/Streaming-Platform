"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingContentController = void 0;
const common_1 = require("@nestjs/common");
const streaming_content_service_1 = require("../../services/streaming-content/streaming-content.service");
const streaming_content_dto_1 = require("../../dto/streaming-content.dto");
const common_2 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../services/auth/jwt-auth.guard");
let StreamingContentController = class StreamingContentController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    create(data) {
        const formatted = {
            title: data.title,
            description: data.description,
            thumbnailUrl: data.thumbnail_url,
            videoUrl: data.video_url,
            year: data.year,
            genre: data.genre,
            rating: data.rating,
            duration: data.duration,
            cast: data.cast,
            watchProgress: data.watch_progress ?? 0,
        };
        return this.service.create(formatted);
    }
    async update(id, data) {
        const updated = await this.service.update(id, data);
        if (!updated) {
            throw new common_1.NotFoundException(`Content with id ${id} not found`);
        }
        return updated;
    }
    remove(id) {
        return this.service.remove(id);
    }
};
exports.StreamingContentController = StreamingContentController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StreamingContentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StreamingContentController.prototype, "findOne", null);
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [streaming_content_dto_1.CreateStreamingContentDto]),
    __metadata("design:returntype", void 0)
], StreamingContentController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, streaming_content_dto_1.CreateStreamingContentDto]),
    __metadata("design:returntype", Promise)
], StreamingContentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StreamingContentController.prototype, "remove", null);
exports.StreamingContentController = StreamingContentController = __decorate([
    (0, common_1.Controller)('streaming-content'),
    __metadata("design:paramtypes", [streaming_content_service_1.StreamingContentService])
], StreamingContentController);
//# sourceMappingURL=streaming-content.controller.js.map