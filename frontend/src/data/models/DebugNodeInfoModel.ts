export interface DebugNodeInfoModel {
  id: string;
  addrs: string[];
  repo: string;
  spr: string;
  table: Table;
  codex: Codex;
}

export interface Codex {
  version: string;
  revision: string;
}

export interface Table {
  localNode: Node;
  nodes: Node[];
}

export interface Node {
  nodeId: string;
  peerId: string;
  record: string;
  address: string;
  seen: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toDebugNodeInfoModel(json: string): DebugNodeInfoModel {
    return JSON.parse(json);
  }

  public static debugNodeInfoModelToJson(value: DebugNodeInfoModel): string {
    return JSON.stringify(value);
  }
}
