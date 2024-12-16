-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "vendors" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';
