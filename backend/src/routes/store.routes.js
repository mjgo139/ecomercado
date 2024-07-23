
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getStores,
    getStore,
    getStoresByOwner,
    createStore,
    deleteStore,
    updateStore,
    updateStatusStore,
    getStoresAdmin
} from '../controllers/store.controller.js';
import upload from "../middlewares/upload.js";

const router = Router()


router.get('/stores/owner', authRequired, getStoresByOwner);
router.get('/stores/admin', authRequired, getStoresAdmin);
router.put('/stores/status/:id', authRequired, updateStatusStore);
router.get('/stores/:id', getStore);
router.get('/stores', getStores);
router.post('/stores', authRequired, upload.single('logo'), createStore);
router.delete('/stores/:id', authRequired, deleteStore);
router.put('/stores/:id', authRequired, upload.single('logo'), updateStore);

export default router;
