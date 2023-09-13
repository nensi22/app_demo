import Content from "../../../models/contents.js";

export const getContentPage = async (req, res) => {
  console.log("at getContentPage");
  try {
    const subcategory_menu_id = req.query.subcategory_menu_id;
    const category_menu_id = req.query.category_menu_id;

    let content;

    if (subcategory_menu_id) {
      content = await Content.findOne({
        where: { subcategory_menu_id: subcategory_menu_id },
      });
    } else if (category_menu_id) {
      content = await Content.findOne({
        where: { category_menu_id: category_menu_id },
      });
    }

    return res.render("admin/content/index", {
      page: "data",
      content,
      subcategory_menu_id: subcategory_menu_id || "",
      category_menu_id: category_menu_id || "",
    });
  } catch (error) {
    console.log("error_getContentPage : ", error);
  }
};

export const createContent = async (req, res) => {
  console.log("at createContent");
  try {
    const ContentText = await Content.create({
      subcategory_menu_id: req.body.subcategory_menu_id || null,
      category_menu_id: req.body.category_menu_id || null,
      content: req.body.content,
    });
    console.log("content : ", req.body);

    return res.send({ success: ContentText });
  } catch (error) {
    console.log("error_createContent : ", error);
  }
};

export const updateContent = async (req, res) => {
  console.log("at updateContent");
  try {
    const id = req.params.id;
    const {
      subcategory_menu_id,
      category_menu_id,
      content,
    } = req.body;
    console.log("update content body ; ", req.body);

    const contentText = await Content.findByPk(id);

    if (contentText) {
      contentText.subcategory_menu_id = subcategory_menu_id || null;
      contentText.category_menu_id = category_menu_id || null;
      contentText.content = content;
    }
    await contentText.save();
    res.send({ success: contentText });
  } catch (error) {
    console.log("error_updateContent : ", error);
  }
};
