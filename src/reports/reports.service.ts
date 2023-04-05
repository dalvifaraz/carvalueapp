import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  createReport(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    console.log('Report Created');
    return this.repo.save(report);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.findOne(parseInt(id));
    if (!report) {
      throw new NotFoundException('Report Not Found');
    }
    report.approved = approved;
    return this.repo.save(report);
  }
}
