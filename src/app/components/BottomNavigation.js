import Image from 'next/image'
import Link from 'next/link'

import ticketPic from 'public/ticket.svg'
import rekeningPic from 'public/rekening.svg'
import searchPic from 'public/search.svg'
import accountPic from 'public/person.svg'

import styles from './bottomNavigation.module.css'

export default function BottomNavigation() {
    return (
        <nav className={styles['bottom-navigation']}>
            <ul>
                <li>
                    <Link href={`rekening`}>
                        <Image
                            src={rekeningPic}
                            alt='rekening'
                        />
                        Rekening
                    </Link>
                </li>
                <li>
                    <Link href={`ticket`}>
                        <Image
                            src={ticketPic}
                            alt='ticket'
                        />
                        Ticket
                    </Link>
                </li>
                <li>
                    <Link href={`search`}>
                        <Image
                            src={searchPic}
                            alt='search glass'
                        />
                        Zoeken
                    </Link>
                </li>
                <li>
                    <Link href={`account`}>
                        <Image
                            src={accountPic}
                            alt='account'
                        />
                        Account
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
