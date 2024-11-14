exports.roleBasedAthorization=(...allowedRoles)=> {
    return(req,res,next) => {
        if(!req.user) {
            return res.status(401).json({message:"user not found"})
        }
        const hasAccess=allowedRoles.includes(req.user.role);
        if(!hasAccess) {
            return res.status(403).json({message:"Access denied"})
        }

        next();
    };
};