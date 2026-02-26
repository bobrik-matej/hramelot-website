import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireRole, successResponse, errorResponse } from '@/lib/api-helpers';
import { z } from 'zod';

const reviewSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
  reviewNote: z.string().max(500).optional(),
});

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { session, error } = await requireRole('ADMIN');
  if (error) return error;

  const body = await request.json().catch(() => null);
  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) return errorResponse(parsed.error.message, 400);

  const application = await db.memberApplication.findUnique({ where: { id } });
  if (!application) return errorResponse('Application not found', 404);

  const updated = await db.$transaction(async (tx) => {
    const app = await tx.memberApplication.update({
      where: { id },
      data: {
        status: parsed.data.status,
        reviewedBy: session!.user!.id!,
        reviewNote: parsed.data.reviewNote,
      },
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    if (parsed.data.status === 'APPROVED') {
      await tx.user.update({
        where: { id: application.userId },
        data: { role: 'MEMBER', membershipActive: true, membershipStart: new Date() },
      });
    }

    return app;
  });

  return successResponse(updated);
}
