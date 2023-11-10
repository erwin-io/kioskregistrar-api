import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Files } from "./Files";
import { Users } from "./Users";
import { Request } from "./Request";

@Index("Member_pkey", ["memberId"], { unique: true })
@Entity("Member", { schema: "dbo" })
export class Member {
  @PrimaryGeneratedColumn({ type: "bigint", name: "MemberId" })
  memberId: string;

  @Column("character varying", { name: "FirstName" })
  firstName: string;

  @Column("character varying", { name: "MiddleName", nullable: true })
  middleName: string | null;

  @Column("character varying", { name: "LastName" })
  lastName: string;

  @Column("character varying", { name: "Email", nullable: true })
  email: string | null;

  @Column("character varying", { name: "MobileNumber" })
  mobileNumber: string;

  @Column("date", { name: "BirthDate" })
  birthDate: string;

  @Column("character varying", { name: "Address", nullable: true })
  address: string | null;

  @Column("character varying", { name: "Gender" })
  gender: string;

  @Column("character varying", { name: "CourseTaken" })
  courseTaken: string;

  @Column("character varying", { name: "Major", nullable: true })
  major: string | null;

  @Column("boolean", { name: "IsAlumni", default: () => "false" })
  isAlumni: boolean;

  @Column("character varying", { name: "SchoolYearLastAttended" })
  schoolYearLastAttended: string;

  @Column("character varying", { name: "PrimarySchoolName", nullable: true })
  primarySchoolName: string | null;

  @Column("character varying", { name: "PrimarySYGraduated", nullable: true })
  primarySyGraduated: string | null;

  @Column("character varying", { name: "SecondarySchoolName", nullable: true })
  secondarySchoolName: string | null;

  @Column("character varying", { name: "SecondarySYGraduated", nullable: true })
  secondarySyGraduated: string | null;

  @Column("character varying", { name: "FullName", default: () => "''" })
  fullName: string;

  @Column("boolean", { name: "IsVerified", default: () => "false" })
  isVerified: boolean;

  @Column("character varying", { name: "MemberCode", default: () => "''" })
  memberCode: string;

  @ManyToOne(() => Files, (files) => files.members)
  @JoinColumn([{ name: "BirthCertFileId", referencedColumnName: "fileId" }])
  birthCertFile: Files;

  @ManyToOne(() => Users, (users) => users.members)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: Users;

  @OneToMany(() => Request, (request) => request.requestedBy)
  requests: Request[];
}
