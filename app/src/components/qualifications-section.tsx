import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  GraduationCap,
  Users,
} from "lucide-react";
import type { RootState, AppDispatch } from "@/app/src/store/store";
import {
  addQualification,
  updateQualification,
  removeQualification,
  type Qualification,
} from "@/app/src/store/slices/teacherSlice";

export default function QualificationsSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { qualifications } = useSelector((state: RootState) => state.teacher);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newQualification, setNewQualification] = useState({
    name: "",
    rate: "",
  });
  const [isAddingNew, setIsAddingNew] = useState<"private" | "group" | null>(
    null
  );

  const privateQualifications = qualifications.filter(
    (q) => q.type === "private"
  );
  const groupQualifications = qualifications.filter((q) => q.type === "group");

  const handleAddQualification = (type: "private" | "group") => {
    if (newQualification.name && newQualification.rate) {
      const qualification: Qualification = {
        id: Date.now().toString(),
        name: newQualification.name,
        rate: newQualification.rate,
        type,
      };
      dispatch(addQualification(qualification));
      setNewQualification({ name: "", rate: "" });
      setIsAddingNew(null);
    }
  };

  const handleUpdateQualification = (qualification: Qualification) => {
    dispatch(updateQualification(qualification));
    setEditingId(null);
  };

  const handleDeleteQualification = (id: string) => {
    if (window.confirm("Are you sure you want to delete this qualification?")) {
      dispatch(removeQualification(id));
    }
  };

  const QualificationTable = ({
    qualifications,
    type,
    title,
    icon: Icon,
    colorClass,
  }: {
    qualifications: Qualification[];
    type: "private" | "group";
    title: string;
    icon: any;
    colorClass: string;
  }) => (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 ${colorClass} rounded-lg flex items-center justify-center`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">
              {qualifications.length} qualification
              {qualifications.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <button onClick={() => setIsAddingNew(type)} className="btn-secondary">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">
            Add {type === "private" ? "Private" : "Group"}
          </span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Qualification Name
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Rate (£/hr)
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {qualifications.map((qual) => (
              <tr key={qual.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  {editingId === qual.id ? (
                    <input
                      type="text"
                      defaultValue={qual.name}
                      onBlur={(e) =>
                        handleUpdateQualification({
                          ...qual,
                          name: e.target.value,
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUpdateQualification({
                            ...qual,
                            name: e.currentTarget.value,
                          });
                        }
                        if (e.key === "Escape") {
                          setEditingId(null);
                        }
                      }}
                      className="input-field"
                      autoFocus
                    />
                  ) : (
                    <span className="text-sm font-medium text-gray-900">
                      {qual.name}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  {editingId === qual.id ? (
                    <input
                      type="text"
                      defaultValue={qual.rate}
                      onBlur={(e) =>
                        handleUpdateQualification({
                          ...qual,
                          rate: e.target.value,
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUpdateQualification({
                            ...qual,
                            rate: e.currentTarget.value,
                          });
                        }
                        if (e.key === "Escape") {
                          setEditingId(null);
                        }
                      }}
                      className="input-field text-right"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-gray-900">
                      {qual.rate}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    {editingId === qual.id ? (
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                        title="Save changes"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingId(qual.id)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit qualification"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteQualification(qual.id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete qualification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* Add New Row */}
            {isAddingNew === type && (
              <tr className="bg-blue-50 border-2 border-blue-200">
                <td className="px-6 py-4">
                  <input
                    type="text"
                    placeholder="Enter qualification name"
                    value={newQualification.name}
                    onChange={(e) =>
                      setNewQualification((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="input-field"
                    autoFocus
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    placeholder="£30.00"
                    value={newQualification.rate}
                    onChange={(e) =>
                      setNewQualification((prev) => ({
                        ...prev,
                        rate: e.target.value,
                      }))
                    }
                    className="input-field text-right"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleAddQualification(type)}
                      className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors"
                      title="Save qualification"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setIsAddingNew(null);
                        setNewQualification({ name: "", rate: "" });
                      }}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                      title="Cancel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )}

            {/* Empty State */}
            {qualifications.length === 0 && isAddingNew !== type && (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center">
                  <div className="text-gray-400">
                    <Icon className="w-12 h-12 mx-auto mb-3" />
                    <p className="text-sm">
                      No {title.toLowerCase()} added yet
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <QualificationTable
        qualifications={privateQualifications}
        type="private"
        title="Private Qualifications"
        icon={GraduationCap}
        colorClass="bg-purple-100 text-purple-600"
      />
      <QualificationTable
        qualifications={groupQualifications}
        type="group"
        title="Group Qualifications"
        icon={Users}
        colorClass="bg-green-100 text-green-600"
      />
    </div>
  );
}
