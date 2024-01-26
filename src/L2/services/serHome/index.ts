import { Injectable } from '@nestjs/common';

@Injectable()
export class SerHome {
  private strSerHome: string;

  getHello(): string {
    this.strSerHome = `Hello World! ${process.env.NODE_JS_TEST}`;
    return this.strSerHome;
  }
}
