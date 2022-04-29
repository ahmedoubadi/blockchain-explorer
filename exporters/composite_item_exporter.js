class CompositeItemExporter{
    constructor(filename_mapping, field_mapping=None, converters=null) {
        this.filename_mapping = filename_mapping
        this.field_mapping = field_mapping?field_mapping: {}

        this.file_mapping = {}
        this.exporter_mapping = {}
        this.counter_mapping = {}
    }
    open(){
        console.log("opening the file, simulation");
    }
    export_items(items){
        for (const key in items) {
            if (Object.hasOwnProperty.call(items, key)) {
                const item = items[key];
                this.export_item(item)
            }
        }
    }
    export_item(item){
        let item_type = item['type']
        if(!item_type){
            console.warn(`type key is not found in item ${JSON.stringify(item)}`);
            return
        }
        let exporter = this.exporter_mapping[item_type]
        if(!exporter){
            console.warn(`Exporter for item type ${item_type} not found`);
        }
        exporter.export_item(this.converter.convert_item(item))

        let counter = this.counter_mapping[item_type]
        if(!counter){
            counter.increment()
        }
    }
    close(){
        for (const item_type in this.file_mapping.items()) {
            if (Object.hasOwnProperty.call(this.file_mapping.items(), item_type)) {
                const file = this.file_mapping.items()[item_type];
                let counter = this.counter_mapping[item_type]
            }
        }
    }
}
module.exports = {CompositeItemExporter}