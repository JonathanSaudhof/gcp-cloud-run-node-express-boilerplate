import express from "express";

const globalLogFields: any = {};

interface TraceRequestParams {
  projectId: string;
}

export function traceRequest(opts: TraceRequestParams) {
  return (req: express.Request, _: any, done: express.NextFunction) => {
    if (opts.projectId !== null) {
      const traceHeader = req.header("X-Cloud-Trace-Context");
      if (traceHeader != null) {
        const [trace] = traceHeader.split("/");
        globalLogFields[
          "logging.googleapis.com/trace"
        ] = `projects/${opts.projectId}/traces/${trace}`;
      }
    }

    done();
  };
}

export function info(message: string) {
  const consoleMessage = { severity: "INFO", message, ...globalLogFields };

  // tslint:disable: no-console
  console.log(JSON.stringify(consoleMessage));
}

export function error(message: string, ...args: any) {
  const consoleMessage = { severity: "ERROR", message, ...globalLogFields };

  // tslint:disable: no-console
  console.error(JSON.stringify(consoleMessage), ...args);
}
