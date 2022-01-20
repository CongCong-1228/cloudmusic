import Category from "@/apis/category";

Category.catList()
    .then(res => {
            const path = {}
            this.bigCat = res.data.categories
            res.data.sub.forEach(item => {
                    // this.cats.item.category.concat(item)
                    if (!path[item.category]) {
                        path[item.category] = []
                    }
                    path[item.category].push(item)
                }
            )
        }
    )

