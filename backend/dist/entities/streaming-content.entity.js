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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingContent = void 0;
const typeorm_1 = require("typeorm");
let StreamingContent = class StreamingContent {
    id;
    title;
    description;
    thumbnailUrl;
    videoUrl;
    year;
    genre;
    rating;
    duration;
    cast;
    watchProgress;
    createdAt;
};
exports.StreamingContent = StreamingContent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StreamingContent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], StreamingContent.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], StreamingContent.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'thumbnail_url', nullable: true }),
    __metadata("design:type", String)
], StreamingContent.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'video_url', nullable: false }),
    __metadata("design:type", String)
], StreamingContent.prototype, "videoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], StreamingContent.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], StreamingContent.prototype, "genre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 2, scale: 1, nullable: true }),
    __metadata("design:type", Number)
], StreamingContent.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], StreamingContent.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], StreamingContent.prototype, "cast", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'watch_progress', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], StreamingContent.prototype, "watchProgress", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StreamingContent.prototype, "createdAt", void 0);
exports.StreamingContent = StreamingContent = __decorate([
    (0, typeorm_1.Entity)('streaming_content')
], StreamingContent);
//# sourceMappingURL=streaming-content.entity.js.map