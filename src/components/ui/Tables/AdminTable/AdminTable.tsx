import { ReactNode } from "react";
import styles from "./AdminTable.module.css";
import { LuPencil, LuPlus, LuTrash2 } from "react-icons/lu";
import { Eye } from "lucide-react";

export interface IAdminTableProps<T> {
  data: T[];
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  renderItem: (item: T) => ReactNode;
}

export function AdminTable<T>({
  data,
  onAdd,
  onEdit,
  onDelete,
  onView,
  renderItem,
}: IAdminTableProps<T>) {
  return (
    <div className={styles.container}>
      {onAdd && (
        <button className={styles.addButton} onClick={onAdd}>
          <LuPlus />
        </button>
      )}
      <div className={styles.table}>
        {Array.isArray(data) && data.length > 0 && (
          <>
            {data.map((item, idx) => (
              <div key={idx} className={styles.row}>
                <div className={styles.content}>{renderItem(item)}</div>
                <div className={styles.actions}>
                  {onEdit && (
                    <button onClick={() => onEdit(item)}>
                      <LuPencil />
                    </button>
                  )}
                  {onDelete && (
                    <button onClick={() => onDelete(item)}>
                      <LuTrash2 />
                    </button>
                  )}
                  {onView && (
                    <button onClick={() => onView(item)}>
                      <Eye size={28} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
