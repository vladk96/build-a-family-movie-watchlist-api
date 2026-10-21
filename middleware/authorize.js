export function authorizeModification(req, res, next) {
  const { role, id } = req.user;
  const targetUserId = String(req.params.userId);

  if (role === 'parent') {
    return next();
  }
  if (role === 'child' && String(id) === targetUserId) {
    return next();
  }

  return res.status(403).json({ message: 'Access denied' });
}
