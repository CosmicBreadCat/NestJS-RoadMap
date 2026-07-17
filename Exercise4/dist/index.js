"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Log(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const startTime = Date.now();
        let val = originalMethod.apply(this, args);
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log(`Method: ${propertyKey}, Duration: ${duration}, Args:${JSON.stringify(args)}`);
        return val;
    };
}
function Validate(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        args.forEach((arg, index) => {
            if (arg === null || arg === undefined) {
                throw new Error(`Argument at index ${index} can't be null or undefined`);
            }
        });
        let val = originalMethod.apply(this, args);
        return val;
    };
}
function ReadOnly(target, propertyKey) {
    const shadowKey = `_${propertyKey}`;
    const initializedKey = `_${propertyKey}_initialized`;
    Object.defineProperty(target, propertyKey, {
        get() {
            return this[shadowKey];
        },
        set(newValue) {
            if (this[initializedKey]) {
                throw new Error(`Property '${propertyKey}' is readonly, can only be assigned once then never reassigned`);
            }
            this[shadowKey] = newValue;
            this[initializedKey] = true;
        },
    });
}
class ReportService {
    constructor(config) {
        this.config = config;
    }
    generate(reportId, format) {
        console.log(`Generating report ${reportId} in ${format} format...`);
        return { reportId, format, content: "report-content-placeholder" };
    }
    export(report, destination) {
        console.log(`Exporting`, report, `to ${destination}`);
        return `Exported to ${destination}`;
    }
}
__decorate([
    ReadOnly
], ReportService.prototype, "config", void 0);
__decorate([
    Log,
    Validate
], ReportService.prototype, "generate", null);
__decorate([
    Log,
    Validate
], ReportService.prototype, "export", null);
function main() {
    console.log("--- Test 1: normal successful call ---");
    const service = new ReportService("default-config");
    const report = service.generate("r1", "pdf");
    service.export(report, "s3://bucket/reports");
    console.log("\n--- Test 2: @Validate should block null/undefined args ---");
    try {
        service.generate("r2", null);
    }
    catch (e) {
        console.log("Caught expected error:", e.message);
    }
    console.log("\n--- Test 3: @Readonly should block reassignment ---");
    try {
        service.config = "changed";
    }
    catch (e) {
        console.log("Caught expected error:", e.message);
    }
    console.log("\n--- Test 4: @Readonly should not block the constructor's first write ---");
    const service2 = new ReportService("another-config");
    console.log("service.config:", service.config, "| service2.config:", service2.config);
}
main();
