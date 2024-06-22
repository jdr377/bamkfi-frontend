import classNames from 'classnames'
import styles from './RuneNameHeading.module.css'
import { nunito } from './fonts'

export function RuneNameHeading({ children }: { children: string }) {
    return (
        <h1 className={classNames(nunito.className, styles.wrapper)}>
            {children}
        </h1>
    )
}