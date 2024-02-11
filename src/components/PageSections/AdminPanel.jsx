import React from 'react';
import Button from '@/components/UI/Buttons/Button';
import Link from 'next/link';
import Icon from '@/components/icon/Icon';

const AdminPanel = ({ active = 'profile', isAdmin }) => {
    const links = isAdmin
        ? [
              { path: 'profile', icon: 'profile' },
              { path: 'categories', icon: 'tag' },
              { path: 'menu-items', icon: 'cake' },
              { path: 'users', icon: 'users' },
              { path: 'orders', icon: 'shop' }
          ]
        : [
              { path: 'profile', icon: 'profile' },
              { path: 'orders', icon: 'shop' }
          ];

    return (
        <div
            className={
                'flex w-full flex-wrap items-center justify-center gap-4 whitespace-nowrap'
            }
        >
            {links.map((link) => (
                <Link
                    className={'flex w-fit items-center gap-2 rounded-full'}
                    href={'/' + link.path}
                    key={link.path}
                >
                    <Button
                        variant={active === link.path ? 'submit' : 'inactive'}
                        type={'button'}
                        className={'!w-fit capitalize'}
                    >
                        {link.icon && (
                            <Icon
                                className={`!h-4 !w-4 !p-0 ${
                                    active !== link.path && '!text-white'
                                }`}
                                icon={link.icon}
                            />
                        )}
                        {link.path}
                    </Button>
                </Link>
            ))}
        </div>
    );
};

export default AdminPanel;
