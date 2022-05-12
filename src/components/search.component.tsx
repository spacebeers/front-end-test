import { h, JSX } from 'preact'
import { ButtonComponent } from './button.component'
import * as styles from './search.module.less'

export default function SearchComponent(): JSX.Element {
  return (
    <section className={`${styles['search-form']}`}>
      <form action="">
        <div className={styles["form-group"]}>
          <div className={styles["form-control"]}></div>
          <div className={styles["form-control"]}></div>
          <div className={styles["form-control"]}></div>
          <div className={styles["form-control"]}></div>
          <div className={styles["form-control"]}>
            <ButtonComponent text="Search" type="SUBMIT" />
          </div>
        </div>
        
      </form>
    </section>
  )
}