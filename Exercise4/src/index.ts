function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const startTime = Date.now();
    let val = originalMethod.apply(this, args);
    const endTime = Date.now();
    const duration = endTime - startTime;
    console.log(
      `Method: ${propertyKey}, Duration: ${duration}, Args:${JSON.stringify(args)}`,
    );
    return val;
  };
}

function Validate(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    args.forEach((arg, index) => {
      if (arg === null || arg === undefined) {
        throw new Error(
          `Argument at index ${index} can't be null or undefined`,
        );
      }
    });
    let val = originalMethod.apply(this, args);
    return val;
  };
}

function ReadOnly(target: any, propertyKey: string) {
  const shadowKey = `_${propertyKey}`;
  const initializedFlagKey = `_${propertyKey}_initialized`;

  Object.defineProperty(target, propertyKey, {
    get(this: any) {
      return this[shadowKey];
    },

    set(this: any, newValue: any) {
      if (this[initializedFlagKey]) {
        throw new Error(
          `Property '${propertyKey}' is readonly, can only be assigned once then never reassigned`,
        );
      }
      this[shadowKey] = newValue;
      this[initializedFlagKey] = true;
    },
  });
}

class ReportService {
  @ReadOnly
  declare config: string;

  constructor(config: string) {
    this.config = config;
  }

  @Log
  @Validate
  generate(reportId: string, format: string) {
    console.log(`Generating report ${reportId} in ${format} format...`);
    return { reportId, format, content: "report-content-placeholder" };
  }

  @Log
  @Validate
  export(report: object, destination: string) {
    console.log(`Exporting`, report, `to ${destination}`);
    return `Exported to ${destination}`;
  }
}

// main is ai made
function main() {
  console.log("--- Test 1: normal successful call ---");
  const service = new ReportService("default-config");
  const report = service.generate("r1", "pdf");
  service.export(report, "s3://bucket/reports");

  console.log("\n--- Test 2: @Validate should block null/undefined args ---");
  try {
    service.generate("r2", null as any);
  } catch (e) {
    console.log("Caught expected error:", (e as Error).message);
  }

  console.log("\n--- Test 3: @Readonly should block reassignment ---");
  try {
    service.config = "changed";
  } catch (e) {
    console.log("Caught expected error:", (e as Error).message);
  }

  console.log(
    "\n--- Test 4: @Readonly should not block the constructor's first write ---",
  );
  const service2 = new ReportService("another-config");
  console.log(
    "service.config:",
    service.config,
    "| service2.config:",
    service2.config,
  );
}

main();
