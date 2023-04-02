import { Controller, Post, Body, Injectable, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Injectable()
@Controller('reports')
@UseGuards(AuthGuard)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Post()
  createReport(@Body() body: CreateReportDto) {
    return this.reportsService.createReport(body);
  }
}
