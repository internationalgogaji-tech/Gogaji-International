"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function HomeDecorSectionPage() {
    const [form, setForm] = useState({
        sectionTitle: "Trending & New Launches",
        products: [],
    });

    const [uploading, setUploading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const res = await fetch(
            `${API}/api/home-decor-info`
        );

        const data = await res.json();

        if (data) {
            setForm(data);
        }
    };

    const uploadImage = async (
        file,
        index
    ) => {
        try {
            setUploading(true);

            const fd = new FormData();

            fd.append("image", file);
            fd.append("type", "home-decor");

            const res = await fetch(
                `${API}/api/upload`,
                {
                    method: "POST",
                    body: fd,
                }
            );

            const data = await res.json();

            const updated = [...form.products];

            updated[index].image =
                data.url;

            setForm({
                ...form,
                products: updated,
            });
        } finally {
            setUploading(false);
        }
    };

    const uploadHoverImage = async (
        file,
        index
    ) => {
        try {
            setUploading(true);

            const fd = new FormData();

            fd.append("image", file);
            fd.append("type", "home-decor");

            const res = await fetch(
                `${API}/api/upload`,
                {
                    method: "POST",
                    body: fd,
                }
            );

            const data = await res.json();

            const updated = [...form.products];

            updated[index].hoverImage =
                data.url;

            setForm({
                ...form,
                products: updated,
            });
        } finally {
            setUploading(false);
        }
    };

    const saveData = async () => {
        const res = await fetch(
            `${API}/api/home-decor-info`,
            {
                method: "PUT",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify(form),
            }
        );

        if (res.ok) {

            const updatedProducts =
                form.products.map((p) => ({
                    ...p,
                    isEditing: false,
                }));

            setForm({
                ...form,
                products: updatedProducts,
            });

            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }
    };

    return (
    <>
        {showSuccess && (
            <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg animate-pulse">
                ✅ Saved Successfully
            </div>
        )}

        <div className="bg-white p-6 rounded-3xl">

            <h1 className="text-3xl font-bold mb-6">
                Trending Products
            </h1>

            <input
                value={form.sectionTitle}
                onChange={(e) =>
                    setForm({
                        ...form,
                        sectionTitle:
                            e.target.value,
                    })
                }
                className="border p-3 rounded-xl w-full mb-6"
            />

            <input
                value={form.viewAllText || ""}
                placeholder="View All Button Text"
                onChange={(e) =>
                    setForm({
                        ...form,
                        viewAllText: e.target.value,
                    })
                }
                className="border p-3 rounded-xl w-full mb-4"
            />

            <input
                value={form.viewAllLink || ""}
                placeholder="View All Link"
                onChange={(e) =>
                    setForm({
                        ...form,
                        viewAllLink: e.target.value,
                    })
                }
                className="border p-3 rounded-xl w-full mb-6"
            />

            <button
                onClick={() =>
                    setForm({
                        ...form,
                        products: [
                            ...form.products,
                            {
                                image: "",

                                hoverImage: "",

                                title: "",

                                shortDescription: "",

                                category: "",

                                sku: "",

                                badge: "",

                                price: "",

                                mrp: "",

                                discount: "",

                                buttonText: "Add To Cart",

                                buttonLink: "#",

                                isFeatured: false,

                                isNewLaunch: false,

                                sortOrder: 0,
                                isEditing: true,
                            }
                        ],
                    })
                }
                className="bg-green-600 text-white px-6 py-3 rounded-xl mb-6"
            >
                Add Product
            </button>

            <div className="space-y-6">

                {form.products.map(
                    (item, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 bg-white p-6 rounded-3xl shadow-sm"
                        >

                            {item.badge && (
                                <span className="inline-block bg-[#d95a16] text-white px-3 py-1 text-xs uppercase mb-3">
                                    {item.badge}
                                </span>
                            )}
                            <h3 className="font-bold mb-4">
                                Product {index + 1}
                            </h3>

                            <div className="flex gap-3 mb-4">

                                <button
                                    type="button"
                                    onClick={() => {

                                        const p = [...form.products];

                                        p[index].isEditing =
                                            !p[index].isEditing;

                                        setForm({
                                            ...form,
                                            products: p,
                                        });

                                    }}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                >
                                    {item.isEditing
                                        ? "Close"
                                        : "Edit"}
                                </button>

                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    const updated = [...form.products];
                                    updated.splice(index, 1);

                                    setForm({
                                        ...form,
                                        products: updated,
                                    });
                                }}
                                className="mb-4 bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                                Delete Product
                            </button>

                            {item.isEditing && (
                                <>
                                    <label className="block mb-4">

                                        <div className="border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition">

                                            <div className="text-5xl mb-3">
                                                📸
                                            </div>

                                            <h4 className="text-lg font-bold text-gray-800">
                                                Upload Product Image
                                            </h4>

                                            <p className="text-gray-500 mt-2">
                                                Click here to select image
                                            </p>

                                            <p className="text-xs text-gray-400 mt-1">
                                                JPG, PNG, WEBP Supported
                                            </p>

                                        </div>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                uploadImage(
                                                    e.target.files[0],
                                                    index
                                                )
                                            }
                                            className="hidden"
                                        />

                                    </label>

                                    {item.image && (
                                        <div className="mb-5">
                                            <p className="text-green-600 font-semibold mb-2">
                                                ✅ Image Uploaded Successfully
                                            </p>

                                            <img
                                                src={item.image}
                                                alt=""
                                                className="w-[150px] h-[150px] object-cover rounded-xl border shadow-md"
                                            />
                                        </div>
                                    )}

                                    {item.hoverImage && (
                                        <div className="mb-5">
                                            <p className="text-orange-600 font-semibold mb-2">
                                                🔄 Hover Image Uploaded
                                            </p>

                                            <img
                                                src={item.hoverImage}
                                                alt=""
                                                className="w-[150px] h-[150px] object-cover rounded-xl border shadow-md"
                                            />
                                        </div>
                                    )}

                                    <label className="block mb-4">

                                        <div className="border-2 border-dashed border-orange-300 rounded-2xl p-6 text-center cursor-pointer">

                                            <div className="text-4xl">
                                                🔄
                                            </div>

                                            <h4 className="font-bold">
                                                Upload Hover Image
                                            </h4>

                                            <p className="text-sm text-gray-500">
                                                Hover par dikhne wali image
                                            </p>

                                        </div>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                uploadHoverImage(
                                                    e.target.files[0],
                                                    index
                                                )
                                            }
                                            className="hidden"
                                        />

                                    </label>

                                    <div className="grid md:grid-cols-2 gap-4">

                                        <input
                                            placeholder="Title"
                                            value={item.title}
                                            onChange={(e) => {
                                                const p = [
                                                    ...form.products,
                                                ];

                                                p[index].title =
                                                    e.target.value;

                                                setForm({
                                                    ...form,
                                                    products: p,
                                                });
                                            }}
                                            className="border p-3 rounded-xl w-full mb-3"
                                        />

                                        <input
                                            placeholder="Price"
                                            value={item.price}
                                            onChange={(e) => {
                                                const p = [
                                                    ...form.products,
                                                ];

                                                p[index].price =
                                                    e.target.value;

                                                setForm({
                                                    ...form,
                                                    products: p,
                                                });
                                            }}
                                            className="border p-3 rounded-xl w-full mb-3"
                                        />

                                        <input
                                            placeholder="MRP"
                                            value={item.mrp}
                                            onChange={(e) => {
                                                const p = [
                                                    ...form.products,
                                                ];

                                                p[index].mrp =
                                                    e.target.value;

                                                setForm({
                                                    ...form,
                                                    products: p,
                                                });
                                            }}
                                            className="border p-3 rounded-xl w-full mb-3"
                                        />

                                        <input
                                            placeholder="Discount"
                                            value={item.discount}
                                            onChange={(e) => {
                                                const p = [
                                                    ...form.products,
                                                ];

                                                p[index].discount =
                                                    e.target.value;

                                                setForm({
                                                    ...form,
                                                    products: p,
                                                });
                                            }}
                                            className="border p-3 rounded-xl w-full"
                                        />

                                        <input
                                            placeholder="Category"
                                            value={item.category}
                                            onChange={(e) => {
                                                const p = [...form.products];
                                                p[index].category = e.target.value;
                                                setForm({
                                                    ...form,
                                                    products: p,
                                                });
                                            }}
                                            className="border p-3 rounded-xl w-full mb-3"
                                        />

                                        <input
                                            placeholder="Badge (NEW / HOT)"
                                            value={item.badge}
                                            onChange={(e) => {
                                                const p = [...form.products];
                                                p[index].badge = e.target.value;
                                                setForm({
                                                    ...form,
                                                    products: p,
                                                });
                                            }}
                                            className="border p-3 rounded-xl w-full mb-3"
                                        />

                                        <input
                                            placeholder="SKU"
                                            value={item.sku}
                                            onChange={(e) => {
                                                const p = [...form.products];
                                                p[index].sku = e.target.value;
                                                setForm({
                                                    ...form,
                                                    products: p,
                                                });
                                            }}
                                            className="border p-3 rounded-xl w-full mb-3"
                                        />

                                        <input
                                            placeholder="Product Link"
                                            value={item.buttonLink}
                                            onChange={(e) => {
                                                const p = [...form.products];

                                                p[index].buttonLink =
                                                    e.target.value;

                                                setForm({
                                                    ...form,
                                                    products: p,
                                                });
                                            }}
                                            className="border p-3 rounded-xl w-full mb-3"
                                        />

                                        <input
                                            placeholder="Button Text"
                                            value={item.buttonText}
                                            onChange={(e) => {
                                                const p = [...form.products];

                                                p[index].buttonText =
                                                    e.target.value;

                                                setForm({
                                                    ...form,
                                                    products: p,
                                                });
                                            }}
                                            className="border p-3 rounded-xl w-full mb-3"
                                        />


                                        <textarea
                                            placeholder="Short Description"
                                            value={item.shortDescription}
                                            onChange={(e) => {
                                                const p = [...form.products];
                                                p[index].shortDescription = e.target.value;
                                                setForm({
                                                    ...form,
                                                    products: p,
                                                });
                                            }}
                                            className="border p-3 rounded-xl w-full mb-3"
                                        />

                                    </div>
                                </>

                            )}


                        </div>

                    )
                )}

            </div>



            <button
                onClick={saveData}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl mt-8 w-full text-lg font-semibold"
            >
                Save Section
            </button>



        </div>
        </>

    );
}