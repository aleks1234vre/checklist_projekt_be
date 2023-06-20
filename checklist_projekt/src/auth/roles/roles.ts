import { Ability, AbilityBuilder } from '@casl/ability';

export enum UserRole {
    GUEST = 'guest',
    USER = 'user',
    ADMIN = 'admin',
}

export const defineAbilitiesFor = (userRole: UserRole, user?: { id: number }) => {
    const { can, build } = new AbilityBuilder(Ability);

    switch (userRole) {
        case UserRole.ADMIN:
            can('manage', 'all');
            break;
        case UserRole.USER:
            can('read', 'Post');
            can('create', 'Post');
            can('update', 'Post', { userId: user?.id });
            can('delete', 'Post', { userId: user?.id });
            break;
        case UserRole.GUEST:
        default:
            can('read', 'Post');
            break;
    }

    return build();
};